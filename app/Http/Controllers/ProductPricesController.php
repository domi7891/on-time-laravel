<?php

namespace App\Http\Controllers;

use App\Models\ProductExtras;
use App\Models\ProductPrices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductPricesController extends Controller
{
    /**
     * Store prices.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function initiatePrices(Request $request)
    {
        // $path = asset('storage/prices.json');
        $contents = Storage::disk('public')->get("prices.json");
        $contents = json_decode($contents, true);

        $inserting = array();
        foreach ($contents as $page => $types) {
            if ($page != "extras") {
                foreach ($types as $type => $materials) {
                    if (is_array($materials)) {
                        foreach ($materials as $material => $price) {
                            array_push($inserting, array(
                                'pages' => $page,
                                'type' => $type,
                                'material' => $material,
                                'price' => $price
                            ));
                        }
                    } else {
                        array_push($inserting, array(
                            'pages' => $page,
                            'type' => $type,
                            'material' => null,
                            'price' => $materials
                        ));
                    }
                }
            }
        }
        ProductPrices::insert($inserting);
    }

    /**
     * Store prices.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getProductPrice(Request $request)
    {
        $data = $request->all();
        $price = ProductPrices::where([
            ['pages', '>=', $data['pages']],
            ['type', $data['type']],
            ['material', array_key_exists('material', $data) ? $data['material'] : null]
        ])->orderBy('pages')->first();
        // echo 'HII';
        return json_encode($price);
    }

    private function createError($type, $material)
    {
        // if($type)
        // return array('error' => 'Zu viele Seiten für eine Spiralbindung Draht', );
        return array('total' => 0, 'basePrice' => 0, 'totalEquipment' => 0, 'totalExtras' => 0, 'totalUnit' => 0, "extras" => array(), "equipment" => array("CD" => array("total" => 0, "value" => 0), "USB" => array("total" => 0, "value" => 0)));
    }

    public function calculatePrice(Request $request)
    {
        $data = $request->all();
        $basePrice = ProductPrices::where([
            ['pages', '>=', $data['pages']],
            ['type', $data['type']],
            ['material', array_key_exists('material', $data) ? $data['material'] : null]
        ])->orderBy('pages')->first();
        if (!$basePrice) return $this->createError($data['type'], $data['material']);
        $basePrice = $basePrice['price'];
        $totalExtras = 0;
        $totalEquipment = 0;

        $extrasCont = new ProductExtrasController();
        $extras = $extrasCont->getPrice($request);
        $extrasDesc = array();
        $equipment = $extrasCont->getEquipmentPrice($request);
        $equipmentDesc = array("CD" => array("total" => 0, "value" => 0), "USB" => array("total" => 0, "value" => 0));
        // return $extras;

        foreach ($extras as $key => $value) {
            if ($value['type'] == 'prägung') {
                $totalExtras += $value['price'];
                $extrasDesc['prägung'] = $value['price'];
            } else if ($value['type'] == 'logo') {
                $totalExtras += $value['price'];
                $extrasDesc['logo'] = $value['price'];
            } else if ($value['type'] == 'a3') {
                $totalA3 = calcA3Price($value['price'], $data['a3_sites']);
                $totalExtras += $totalA3;
                $extrasDesc['a3'] = $totalA3;
            } else if ($value['type'] == 'weight') {
                $weightPrice = ceil($basePrice * floatval($value['factor']));
                $totalExtras += $weightPrice;
                $extrasDesc['weight'] = $weightPrice;
            }
        }

        foreach ($equipment as $key => $value) {
            $eqTotal = calcEquipmentPrice($data['equipment'], $value['desc'], $value['price']);
            if ($data['equipment'][$value['desc']]['selected']) {
                $totalEquipment += $eqTotal;
            }
            $equipmentDesc[$value['desc']]['value'] = $value['price'];
            $equipmentDesc[$value['desc']]['total'] = $eqTotal;
        }

        $totalUnit = $basePrice + $totalExtras;
        $total = $totalUnit * $data['quantity'];
        $total += $totalEquipment;

        return array('total' => $total, 'basePrice' => $basePrice, 'totalEquipment' => $totalEquipment, 'totalExtras' => $totalExtras, 'totalUnit' => $totalUnit, "extras" => $extrasDesc, "equipment" => $equipmentDesc);
    }
}

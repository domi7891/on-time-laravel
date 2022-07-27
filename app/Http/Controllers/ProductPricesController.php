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

    private function productError($type, $material, $color, $pages, $paper_weight, $print, $disabled)
    {

        $error = array('success' => true, 'disabled' => array(), 'text' => array());
        if ($pages < 0) {
            $error['success'] = false;
            $error['change'] = array('pages' => 0);
            return $error;
        }
        if ($pages > 540) {
            array_push($error['text'], 'Bitte Seitenanzahl überprüfen. Maximal 540 Seiten möglich. Falls Sie mehr benötigen, kontaktieren Sie uns bitte direkt über unser Kontaktformular oder per E-Mail.');
            $error['title'] = 'Seitenanzahlfehler!';
            $error['success'] = false;
            $error['showError'] = true;
            $error['change'] = array('pages' => 540);
            return $error;
        }



        $pagesError = null;
        $setDouble = false;

        if (
            $type == 'Hardcover' &&
            $material == 'Leinen' &&
            $color == 'Weiß'
        ) {
            if ($paper_weight == '80g') {
                if ($pages > 125 && $pages <= 250) {
                    $pagesError = 125;
                    $setDouble = true;
                    $error['change']['print'] = 'Doppelseitig';
                } else if ($pages > 250) {
                    $error['success'] = false;
                    $pagesError = 250;
                }
            } else {
                if ($pages > 120 && $pages <= 240) {
                    $pagesError = 120;
                    $setDouble = true;
                    $error['change']['print'] = 'Doppelseitig';
                } else if ($pages > 240) {
                    $error['success'] = false;
                    $pagesError = 240;
                }
            }
        } else if ($type == 'Hardcover' || $type == 'Softcover') {
            if ($paper_weight == '80g') {
                if ($pages > 275 && $pages <= 550) {
                    $pagesError = 275;
                    $setDouble = true;
                    $error['change']['print'] = 'Doppelseitig';
                } else if ($pages > 550) {
                    $error['success'] = false;
                    $pagesError = 550;
                }
            } else {
                if ($pages > 270 && $pages <= 540) {
                    $pagesError = 270;
                    $setDouble = true;
                    $error['change']['print'] = 'Doppelseitig';
                } else if ($pages > 540) {
                    $error['success'] = false;
                    $pagesError = 540;
                }
            }
        }

        if (!$error['success']) {
            array_push($error['text'], "Bitte Seitenanzahl überprüfen. Maximal $pagesError Seiten möglich. Falls Sie mehr benötigen, kontaktieren Sie uns bitte direkt über unser Kontaktformular oder per E-Mail.");
            $error['title'] = 'Seitenanzahlfehler!';
            $error['showError'] = true;
            $error['change'] = array('pages' => $pagesError);
            $pages = $pagesError;
        }

        if ($setDouble && $print != 'Doppelseitig') {
            array_push($error['text'], "Die Seitenanzahl beträgt mehr als
            $pagesError Seiten! Es steht Ihnen nur noch ein doppelseitiger Druck zur Verfügung.");
            $error['showError'] = true;
            $error['success'] = false;
        }

        if ($pages > 70) {
            if ($pages > 250) {
                if (!is_null($disabled) && !in_array('Spiralbindung', $disabled)) {
                    $error['showError'] = true;
                    array_push($error['text'], 'Die Seitenanzahl beträgt mehr als 250 Seiten! Spiralbindung sowohl mit Draht als auch mit Kunststoff steht nun nicht mehr zur Auswahl zur Verfügung!');
                }
                $error['disabled'] = array('Spiralbindung');
                if ($type == 'Spiralbindung') {
                    $error['change'] = array('type' => 'Hardcover', 'material' => 'Standard', 'color' => 'Schwarz');
                    $error['success'] = false;
                }
            } else {
                if (is_null($disabled) || (!in_array('Draht', $disabled) && !in_array('Spiralbindung', $disabled))) {
                    $error['showError'] = true;
                    array_push($error['text'], 'Die Seitenanzahl beträgt mehr als 70 Seiten! Spiralbindung mit Draht steht nun nicht mehr zur Auswahl zur Verfügung!');
                }
                $error['disabled'] = array('Draht');
                if ($type == 'Spiralbindung' && $material == 'Draht') {
                    $error['change'] = array('material' => 'Kunststoff');
                    $error['success'] = false;
                }
            }
        }
        return $error;
    }

    public function calculatePrice(Request $request)
    {
        $in = $request->all();
        $data = $in['product'];
        $pages = $data['pages'];
        if ($pages == "" || is_null($pages)) $pages = 0;
        $material =  array_key_exists('material', $data) ? $data['material'] : null;
        $color =  array_key_exists('color', $data) ? $data['color'] : null;
        $error = $this->productError($data['type'], $material, $color, $pages, $data['paper_weight'], $data['print'], $in['disabled']);
        if (!$error['success']) return array('error' => $error);
        $basePrice = ProductPrices::where([
            ['pages', '>=', $pages],
            ['type', $data['type']],
            ['material', $material]
        ])->orderBy('pages')->first();
        $basePrice = $basePrice['price'];
        $totalExtras = 0;
        $totalEquipment = 0;

        $extrasCont = new ProductExtrasController();
        $extras = $extrasCont->getPrice($request, $data);
        $extrasDesc = array();
        $equipment = $extrasCont->getEquipmentPrice($request);
        $equipmentDesc = array("CD" => array("total" => 0, "value" => 0), "USB" => array("total" => 0, "value" => 0));

        foreach ($extras as $key => $value) {
            if ($value['type'] == 'prägung' && $value['price'] > 0) {
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

        return array('totals' => array('total' => $total, 'basePrice' => $basePrice, 'totalEquipment' => $totalEquipment, 'totalExtras' => $totalExtras, 'totalUnit' => $totalUnit, "extras" => $extrasDesc, "equipment" => $equipmentDesc), 'error' => $error);
    }
}

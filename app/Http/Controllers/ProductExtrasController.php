<?php

namespace App\Http\Controllers;

use App\Models\ProductExtras;
use Illuminate\Http\Request;

class ProductExtrasController extends Controller
{
    /**
     * Store prices.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getPrice(Request $request, $data)
    {
        if (is_null($data))
            $data = $request->all();

        $extras = ProductExtras::when($data, function ($query, $data) {
            $hasEmbossing = $data['embossing'];
            $embossing =  $data['embossing_options'];
            $emb_type = $embossing['method'];
            $emb_position = $embossing['position'];
            $emb_back = $embossing['text']['back_text']['position'];
            $logo = $embossing['schoollogo'];
            $weight = $data['paper_weight'];
            $a3 = $data['a3'];


            if ($hasEmbossing) {
                $query->where([
                    ['type', 'prägung'],
                    ['emb_type', $emb_type],
                    ['emb_position', $emb_position],
                ]);

                if ($emb_back == 'Links- und Rechtsbündig') {
                    if ($emb_position == 'Buchrücken' || $emb_type == 'Digitalprägung' && $emb_position == 'Beides') {
                        $query->where('emb_back', $embossing['text']['back_text']['position']);
                    }
                }

                if ($logo) {
                    $query->orWhere('type', 'logo');
                }
            }
            if ($a3) {
                $query->orWhere('type', 'a3');
            }

            $query->orWhere('weight', $weight);

            return $query;
        })->get();
        return $extras;
    }

    public function getEquipmentPrice(Request $request)
    {
        $extras = ProductExtras::where('type', 'equipment')->get();
        return $extras;
    }
}

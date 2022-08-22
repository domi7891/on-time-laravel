<?php

namespace App\Http\Controllers;

use App\Models\Baskets;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class BasketsController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    private function initiateBasket(Request $request)
    {

        $basket = Baskets::create();

        $basket->save();
        $basket = Baskets::where('basket_id', $basket->basket_id)->first();
        $newBasket = array('basket_id' => $basket->basket_id, 'timestamp' => $basket->date, 'items' => array(), 'totals' => array('quantity' => 0, 'total' => 0.0, 'subtotal' => 0.0, 'discount' => array('total' => 0.0), 'shipping' => 0.0));
        $request->session()->put('cart', $newBasket);
        // session(['basket_id' => $basket->basket_id]);
    }

    public function retrieveBasket(Request $request)
    {
        if (!$request->session()->exists('cart')) {
            $this->initiateBasket($request);
        }
        // $session_id = $request->session()->get('cart.basket_id');
        // $basket = Baskets::where('basket_id',  $session_id)->first();

        return json_encode($request->session()->get('cart'));
    }

    public function addItemToCart(Request $request)
    {
        $product = $request->all();
        if (count($request->session()->get('cart.items')) == 0 && !isset($product['pdf'])) return array('success' => false, 'error' => "Es wurde keine Arbeit hochgeladen!");
        $pricesCont = new ProductPricesController();
        $totals = $pricesCont->calculatePrice($request, true);
        if (array_key_exists('success', $totals) && !$totals['success']) return $totals;
        $product['productId'] = str_replace("-", "", Str::uuid()->toString());
        $product['totals'] = $totals['totals'];
        if (count($request->session()->get('cart.items')) == 0) {
            $pdf = $product['pdf'];
            $pdf['pages'] = $product['pages'];
            $request->session()->put('cart.pdf', $pdf);
        }
        unset($product['pdf']);
        $request->session()->push('cart.items', $product);
        return $request->session()->get('cart');
    }

    public function updateCart(Request $request)
    {
    }

    public function removeItemFromCart(Request $request)
    {
        $input = $request->all();
        $items = $request->session()->get('cart.items');
        $items = array_values(array_filter($items, function ($item) use ($input) {
            return $item['productId'] != $input['id'];
        }));
        $request->session()->put('cart.items', $items);
        if (count($items) == 0) {
            $prodCont = new ProductController();
            $prodCont->removePdf($request, $request->session()->get('cart.pdf.name'));
            $request->session()->forget('cart.pdf');
        }
        return $request;
    }

    public function changeProduct(Request $request)
    {
        $input = $request->all();
        $items = $request->session()->pull('cart.items', []);
        $newItems = array_map(function ($item) use ($input) {
            if ($item['productId'] == $input['productId']) {
                $item['quantity'] = $input['quantity'];
                $item['totals']['total'] = $item['quantity'] * $item['totals']['totalUnit'] + $item['totals']['totalEquipment'];
            }
            return $item;
        }, $items);
        $request->session()->put('cart.items', $newItems);
        return $request;
    }
}

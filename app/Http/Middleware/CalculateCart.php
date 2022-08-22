<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CalculateCart
{
  public function handle($request, Closure $next)
  {
    $response = $next($request);
    $data = $response->getData();
    if (isset($data->success) && !$data->success) {
      $response->setData(array('error' => $data->error, 'success' => false));
      return $response;
    }
    $cart = $request->session()->get('cart');
    $cart = calc_totals($cart);
    $request->session()->put('cart', $cart);
    $response->setData(array('cart' => $cart, 'success' => true));
    return $response;
  }
}

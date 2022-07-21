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
    $cart = $request->session()->get('cart');
    $cart = calc_totals($cart);
    $request->session()->put('cart', $cart);
    $response->setData($cart);
    return $response;
  }
}

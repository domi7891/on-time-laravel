<?php

use Illuminate\Support\Facades\File;

if (!function_exists('calc_totals')) {
  function calc_totals($cart)
  {
    $cart['totals']['quantity'] = array_reduce(
      $cart['items'],
      function ($prev, $item) {
        return $prev += $item['quantity'];
      }
    ) ?: 0;

    $cart = calc_shipping($cart);

    $cart['totals']['subtotal'] = array_reduce(
      $cart['items'],
      function ($prev, $item) {
        return $prev += $item['totals']['total'];
      }
    ) ?: 0;

    $cart['totals']['total'] =  $cart['totals']['subtotal'] + $cart['totals']['shipping'];

    return $cart;
  }
}

if (!function_exists('calc_shipping')) {
  function calc_shipping($cart)
  {
    $quantity = $cart['totals']['quantity'];
    $val = 0;
    for ($i = 1; $i <= $quantity; $i++) {
      if ($i == 1) {
        $val = 5;
      } else {
        $val += 2;
      }
    }

    $cart['totals']['shipping'] = $val;

    return $cart;
  }
}

if (!function_exists('scan_dir')) {
  function scan_dir($path)
  {
    $files = File::allFiles($path);
    // dd($files);
    $images = array();
    foreach ($files as $file) {
      array_push($images, array('path' => $file->getPathname(), 'name' => $file->getFilename()));
    }
    return $images;
  }
}

if (!function_exists('calcA3Price')) {
  function calcA3Price($price, $a3)
  {
    $total = 0;
    foreach ($a3 as $item) {
      $from = $item['from'];
      $to = $item['to'];
      $total += (($to - $from) + 1) * $price;
    }
    return $total;
  }
}

if (!function_exists('calcEquipmentPrice')) {
  function calcEquipmentPrice($equipment, $desc, $price)
  {
    return $price * $equipment[$desc]['quantity'];
  }
}

if (!function_exists('countPDFPages')) {
  function countPDFPages($path)
  {
    $cmd = base_path() . '\pdfinfo.exe';  // Windows

    $path = storage_path('app') . "\\" . str_replace("/", "\\", $path);
    $command = "$cmd \"$path\"";
    // Parse entire output
    // Surround with double quotes if file name has spaces
    exec($command, $output);

    // Iterate through lines
    $pagecount = 0;
    foreach ($output as $op) {
      // Extract the number
      if (preg_match("/Pages:\s*(\d+)/i", $op, $matches) === 1) {
        $pagecount = intval($matches[1]);
        break;
      }
    }

    return $pagecount;
  }
}

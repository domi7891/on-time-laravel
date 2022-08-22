<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
  public function uploadPdf(Request $request)
  {
    if (count($request->session()->get('cart.items')) > 0) return array('error' => true, 'msg' => 'Es wurde bereits eine Arbeit hochgeladen!');
    $pdfName = 'arbeit_zum_drucken.pdf';
    if (!$request->session()->has('cart.folder_name')) {
      $folderName = date('Ymd') . '_' . $request->session()->get('cart.basket_id');
      $request->session()->put('cart.folder_name', $folderName);
    }
    $path = 'orders/' . $request->session()->get('cart.folder_name');
    if (!Storage::exists($path)) {
      Storage::makeDirectory($path);
    }
    $file = $request->file('pdf');
    $out = $file->storeAs(
      $path,
      $pdfName
    );

    $pages = countPDFPages($out);
    return array('pdf' => array('name' => $pdfName, 'display_name' => $file->getClientOriginalName()), 'pages' => $pages);
  }

  public function removePdf(Request $request, $name = null)
  {
    if (count($request->session()->get('cart.items')) > 0) {
      return array('pdf' => $request->session()->get('cart.pdf'));
    }
    if (is_null($name)) {
      $name = $request->all()['name'];
    }
    $path = "orders/" . $request->session()->get('cart.folder_name') . "/" . $name;
    if (Storage::exists($path)) {
      Storage::delete($path);
    }

    return array('pdf' => null, 'pages' => 0);
  }

  public function uploadCustom(Request $request)
  {
    // if (count($request->session()->get('cart.items')) > 0) return array('error' => true, 'msg' => 'Es wurde bereits eine Arbeit hochgeladen!');
    if (!$request->session()->has('cart.folder_name')) {
      $folderName = date('Ymd') . '_' . $request->session()->get('cart.basket_id');
      $request->session()->put('cart.folder_name', $folderName);
    }
    $path = 'orders/' . $request->session()->get('cart.folder_name');
    $public_path = 'uploads/' . $request->session()->get('cart.folder_name');
    if (!Storage::disk("public")->exists($public_path)) {
      Storage::disk("public")->makeDirectory($public_path);
    }
    $pdfName = "praegungPdf.pdf";
    $file = $request->file('pdf');
    $file->storeAs(
      $public_path,
      $pdfName,
      "public"
    );
    $file->storeAs(
      $path,
      $pdfName,
    );

    return array('custom' => array('name' => $pdfName, 'display_name' => $file->getClientOriginalName()));
  }

  public function removeCustom(Request $request, $name = null)
  {
    if (is_null($name)) {
      $name = $request->all()['name'];
    }
    $path = "uploads/" . $request->session()->get('cart.folder_name') . "/" . $name;
    if (Storage::disk("public")->exists($path)) {
      Storage::disk("public")->delete($path);
    }

    return array('custom' => null);
  }
}

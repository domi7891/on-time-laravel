<?php

use App\Http\Controllers\BasketsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductPricesController;
use App\Http\Controllers\RatingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::fallback(function () {
    return Inertia::render('NotFound', [
        'notFound' => true,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/{url}', function ($url) {
    $title = 'OnTime | Übersicht - ';
    if ($url == 'schools') $title .= 'Schulen';
    if ($url == 'companies') $title .= 'Unternehmen';
    if ($url == 'universities') $title .= 'Universitäten';
    return Inertia::render('ProductOverview', ['title' => $title]);
})->where(['url' => 'schools|companies|universities']);

Route::prefix('/shop')->group(function () {
    Route::get('/{fac}/{type}', function (Request $request, $fac, $type) {
        return Inertia::render('Shop', ['facility' => $fac, 'type' => $type]);
    });
    // Route::post('/create', [RatingController::class, 'createRating']);
    // Route::get('/get', [RatingController::class, 'getRatings']);
});

Route::prefix('/basket')->group(function () {
    Route::post('/create', [BasketsController::class, 'initiateBasket']);
    Route::get('/get', [BasketsController::class, 'retrieveBasket']);
    Route::post('/addProduct', [BasketsController::class, 'addItemToCart'])->middleware(['calc']);
    Route::post('/removeProduct', [BasketsController::class, 'removeItemFromCart'])->middleware(['calc']);
    Route::post('/changeProduct', [BasketsController::class, 'changeProduct'])->middleware(['calc']);
    // Route::post('/changeProduct', [BasketsController::class, 'changeProduct']);
    // Route::post('/removeProduct', [BasketsController::class, 'removeItemFromCart']);
});

Route::prefix('/ratings')->group(function () {
    Route::get('/', function (Request $request) {
        $rateCont = new RatingController();
        $ratings = $rateCont->getRatings($request);
        return Inertia::render('Ratings', ['ratings' => $ratings]);
    });
    Route::post('/create', [RatingController::class, 'createRating']);
    // Route::get('/get', [RatingController::class, 'getRatings']);
});

Route::get('/aboutus', function (Request $request) {
    return Inertia::render('AboutUs');
});

Route::get('/gallery', function (Request $request) {
    $perPage = 12;
    $currentPage = request("page") ?? 1;
    $images = scan_dir('images\products\Galerie');
    $sliceIdx = ($currentPage - 1) * $perPage;
    $paginator = new \Illuminate\Pagination\LengthAwarePaginator(array_slice($images, $sliceIdx, $perPage), count($images), $perPage, Paginator::resolveCurrentPage(), ['path' => Paginator::resolveCurrentPath()]);
    return Inertia::render('Gallery', ['images' => $images, 'paginator' => $paginator]);
});

Route::get('/prices', [ProductPricesController::class, 'initiatePrices']);

Route::get('/add', [ProductPricesController::class, 'getProductPrice']);

Route::prefix('/product')->group(function () {
    Route::post('/calculatePrice', [ProductPricesController::class, 'calculatePrice']);
    Route::post('/pdf', [ProductController::class, 'uploadPdf']);
    Route::post('/removePdf', [ProductController::class, 'removePdf']);
    Route::post('/custom', [ProductController::class, 'uploadCustom']);
    Route::post('/removeCustom', [ProductController::class, 'removeCustom']);
    // Route::get('/get', [BasketsController::class, 'retrieveBasket']);
    // Route::post('/addProduct', [BasketsController::class, 'addItemToCart'])->middleware('calc');
    // Route::post('/removeProduct', [BasketsController::class, 'removeItemFromCart'])->middleware('calc');
    // Route::post('/changeProduct', [BasketsController::class, 'changeProduct'])->middleware('calc');
    // Route::post('/changeProduct', [BasketsController::class, 'changeProduct']);
    // Route::post('/removeProduct', [BasketsController::class, 'removeItemFromCart']);
});

// Route::get('/test', function () {
//     return view('test');
// });



// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard');
// ->middleware(['auth', 'verified'])

require __DIR__ . '/auth.php';

<?php

namespace App\Observers;

use App\Models\Baskets;
use Illuminate\Support\Str;

class BasketObserver
{

    /**
     * Handle the Product "created" event.
     *
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function creating(Baskets $baskets)
    {
        $uuid = Str::uuid()->toString();
        $uuid = str_replace("-", "", $uuid);
        $baskets->basket_id = $uuid;
    }

    /**
     * Handle the Baskets "created" event.
     *
     * @param  \App\Models\Baskets  $baskets
     * @return void
     */
    public function created(Baskets $baskets)
    {
        //
    }

    /**
     * Handle the Baskets "updated" event.
     *
     * @param  \App\Models\Baskets  $baskets
     * @return void
     */
    public function updated(Baskets $baskets)
    {
        //
    }

    /**
     * Handle the Baskets "deleted" event.
     *
     * @param  \App\Models\Baskets  $baskets
     * @return void
     */
    public function deleted(Baskets $baskets)
    {
        //
    }

    /**
     * Handle the Baskets "restored" event.
     *
     * @param  \App\Models\Baskets  $baskets
     * @return void
     */
    public function restored(Baskets $baskets)
    {
        //
    }

    /**
     * Handle the Baskets "force deleted" event.
     *
     * @param  \App\Models\Baskets  $baskets
     * @return void
     */
    public function forceDeleted(Baskets $baskets)
    {
        //
    }
}

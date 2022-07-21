<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function createRating(Request $request)
    {
        $input = $request->all();
        $data = array(
            'name' => $input['name'],
            'title' => $input['title'],
            'recession' => $input['recession'],
            'rating' => $input['rating'],
            'recommend' => $input['recommend'] == 'yes' ? true : false
        );
        if (!is_null($input['facility']) && !is_null($input['facilityName'])) {
            $data['facility'] = $input['facility'];
            $data['facility_name'] = $input['facilityName'];
        }
        if (!is_null($input['photo'])) {
            $data['photo_path'] = $input['photo'];
        }
        $rating = Rating::insert($data);
        return redirect('/ratings');
    }

    public function getRatings(Request $request)
    {
        $ratings = Rating::orderBy('date', 'desc')->paginate(10);
        $avgRating = Rating::selectRaw('rating, count(rating)')->groupBy('rating')->get();

        $out = array('pagination' => $ratings, 'stats' => $avgRating);

        return $out;
    }
}

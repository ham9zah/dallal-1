<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::all();
        return response()->json($cities);
    }

    public function districts($cityId)
    {
        $city = City::findOrFail($cityId);
        $districts = $city->districts;
        return response()->json($districts);
    }
}

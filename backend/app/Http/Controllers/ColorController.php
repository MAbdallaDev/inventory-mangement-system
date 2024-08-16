<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreColor;
use App\Http\Requests\UpdateColor;
use App\Http\Resources\ColorCollection;
use App\Http\Resources\ColorResource;
use App\Models\Color;

class ColorController extends Controller
{
    /*  Show All Color  */
    public function index()
    {
        $colors = Color::select('id', 'name')->paginate(6);
        return response()->json(new ColorCollection($colors));
    }

    /*  Show All Color without Paginate */
    public function show($r)
    {
        $colors = Color::select('id', 'name')->get();
        return response()->json($colors);
    }

    /*  Store Color  */
    public function store(StoreColor $request)
    {
       $color= Color::create($request->validated());
        return response()->json(['message' => 'تم اضافة اللون بنجاح',  'color' => new ColorResource($color)
        ]);
    }

    /*  Update Color By Id  */
    public function update(UpdateColor $request, Color $color)
    {
        $color->update($request->validated());
        return response()->json(['message' => 'تم تنحديث اللون بنجاح','color' => new ColorResource($color)]);
    }

    /*  delete Color  By Id */
    public function destroy(Color $color)
    {
        $color->delete();
        return response()->json(['message' => 'تم حذف اللون بنجاح']);
    }
}

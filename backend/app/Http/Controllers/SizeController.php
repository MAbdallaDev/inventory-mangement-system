<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSize;
use App\Http\Requests\UpdateSize;
use App\Http\Resources\SizeResource;
use App\Models\Size;

class SizeController extends Controller
{
    /*  Show All Size  */
    public function index()
    {
        $sizes = Size::select('id', 'name')->get();
        return response()->json($sizes);
    }

    /*  Store Size  */

    public function store(StoreSize $request)
    {
        $size = Size::create($request->validated());
        return response()->json(['message' => 'تم اضافة المقاس بنجاح',
            'size' => new SizeResource($size)
        ]);
    }

    /*  Update Size By Id  */
    public function update(UpdateSize $request, Size $size)
    {
        $size->update($request->validated());
        return response()->json(['message' => 'تم التحديث اسم المقاس بنجاح','size' => new SizeResource($size)
        ]);
    }

    /*  delete Size  By Id */
    public function destroy(Size $size)
    {
        $size->delete();
        return response()->json(['message' => 'تم حذف المقاس بنجاح']);
    }

}

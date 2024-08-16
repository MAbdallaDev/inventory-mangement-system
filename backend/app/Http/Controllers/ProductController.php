<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetColorRequest;
use App\Http\Requests\SearchRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ColorProductResource;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Http\Traits\productTrait;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    use productTrait;

    public function index()
    {
        $products = Product::paginate(6);
        return response()->json(new ProductCollection($products));
    }

    public function productsAll()
    {
        return response()->json(Product::select('name')->get());
    }


    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();
        try {
            return $this->storeRequest($request);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()]);
        }
    }


    public function update(UpdateProductRequest $request, Product $product)
    {
        DB::beginTransaction();
        try {
            return $this->updateRequest($request, $product);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function show(Product $product)
    {
        return response()->json(new ProductResource($product));
    }

    public function search(SearchRequest $request)
    {
        $search = $request['name'];
        if ($request['status'] === "1") {
            $product = Product::where('name', $search)->first();
            return response()->json(new ProductResource($product));
        } else {
            $products = Product::where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%");
            })->paginate(6);
            return response()->json(new ProductCollection($products));
        }
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'تم حذف المنتج بنجاح']);
    }


    public function getColor(GetColorRequest $request)
    {
        $product = Product::where('name', $request['product_name'])->first();
        $size = $product->sizes()->wherePivot('size_id', $request['size_id'])->first();
        return response()->json(ColorProductResource::collection($size->colorsProduct()
            ->wherePivot('product_id', $product->id)->get()));
    }
}

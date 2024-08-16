<?php

namespace App\Http\Traits;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

trait productTrait
{
    /* Store Method */
    private function storeRequest($request)
    {
        $product = Product::create($request->validated());
        foreach ($request['sizes'] as $size) {
            $this->storeSize($product, $size['size']);
            foreach ($size['colors'] as $colorRequest) {
                $this->storeColor($product, $colorRequest, $size['size']);
            }
        }
        DB::commit();
        return response()->json(['message' => 'تم اضافة المنتج بنجاح ', 'product' => new ProductResource($product)]);
    }

    private function storeSize($product, $sizeId)
    {
        $size = $product->sizes()->wherePivot('size_id', $sizeId)->first();
        if (!$size) {
            $product->sizes()->attach($sizeId);
        }
    }


    private function storeColor($product, $colorRequest, $sizeId)
    {
        $size = $product->sizes()->wherePivot('size_id', $sizeId)->first();
        $color = $size->colorsProduct()->wherePivot('product_id', $product->id)
            ->wherePivot('color_id', $colorRequest['color'])->first();
        if (!$color) {
            $size->colorsProduct()->attach($colorRequest['color'], [
                'product_id' => $product->id, 'product_quantity' => $colorRequest['quantity']]);
        } else {
            DB::table('size_colors_pivot')->where('size_id', $sizeId)
                ->where('color_id', $colorRequest['color'])->where('product_id', $product->id)->update([
                    'product_quantity' => $color->pivot->product_quantity + $colorRequest['quantity'],
                ]);
        }


    }

    /* End Store Method */


    /*   Update Method */
    private function updateRequest($request, $product)
    {
        $product->update($request->validated());
        if (!empty($request['sizes'])) {
            $product->sizes()->detach();
            foreach ($request['sizes'] as $sizeRequest) {
                $product->sizes()->attach($sizeRequest['id'] ?? $sizeRequest['size']);
                $size = $product->sizes()->wherePivot('size_id', $sizeRequest['id'] ?? $sizeRequest['size'])->first();
                $size->colorsProduct()->wherePivot('product_id', $product->id)->detach();
                foreach ($sizeRequest['colors'] as $colorRequest) {
                    $size->colorsProduct()->attach($colorRequest['id'] ?? $colorRequest['color'], ['product_id' => $product->id, 'product_quantity' => $colorRequest['quantity']]);
                }
            }
        }
        DB::commit();
        return response()->json(['message' => 'تم تحديث المنتج بنجاح ', 'product' => new ProductResource($product)]);
    }

    /* End Update Method */


    private function executeSearch($search)
    {
        return Product::where(function ($q) use ($search) {
            $q->where('name', 'like', "%$search%");
        })->paginate(6);
    }

}

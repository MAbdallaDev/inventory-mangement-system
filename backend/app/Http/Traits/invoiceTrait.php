<?php

namespace App\Http\Traits;

use App\Models\Client;
use App\Models\Color;
use App\Models\Invoice;
use App\Models\invoiceInfo;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Support\Facades\DB;

trait invoiceTrait
{

    public function storeInvoice($request, $client_id)
    {
        $invoiceInfo = $this->saveInvoiceInfo($request, $client_id);
        foreach ($request['order_details']['items'] as $item) {
            if ($this->saveInvoice($item, $invoiceInfo->id)) {

                return $this->saveInvoice($item, $invoiceInfo->id);
            }
        }
        DB::commit();
        return $invoiceInfo;
    }


    private function saveClient($request)
    {
        if (!isset($request['customer_info']['id'])) {
            if ($request['customer_info']['name'] && $request['customer_info']['phone'] && $request['customer_info']['address']) {
                $client = Client::create([
                    'name' => $request['customer_info']['name'], 'phone' => $request['customer_info']['phone'],
                    'address' => $request['customer_info']['address'],
                ]);
            } else {
                return false;
            }
        } else {
            $client = Client::findOrFail($request['customer_info']['id']);
        }
        return $client;
    }

    private function saveInvoiceInfo($request, $client_id)
    {
        return invoiceInfo::create([
            'invoice_id' => $request['invoice_info']['invoiceId'],
            'invoice_date' => $request['invoice_info']['invoiceDate'],
            'due_date' => $request['invoice_info']['dueDate'],
            'payment_method' => $request['invoice_info']['paymentMethod'],
            'description' => $request['order_details']['description'],
            'discount' => $request['order_details']['discount'],
            'total_quantity' => $request['order_details']['totalQuantity'],
            'total_price' => $request['order_details']['totalPrice'],
            'client_id' => $client_id,
        ]);

    }

    private function saveInvoice($item, $invoiceInfo_id)
    {
        if ($this->valInvoice($item)) {
            return $this->valInvoice($item);
        }
        Invoice::create([
            'name' => $item['name'], 'color_id' => $item['color'],
            'size_id' => $item['size'], 'quantity' => $item['quantity'],
            'price' => $item['price'], 'invoice_info_id' => $invoiceInfo_id,
        ]);
        return null;
    }

    private function valInvoice($item)
    {
        $product = Product::where('name', $item['name'])->first();
        $size = $product->sizes()->wherePivot('size_id', $item['size'])->first();

        if (!$size) {
            return response()->json(['message' => ' المقاس غير متوفر للمنتج الذي ادخلتة  ' . $product->name], 404);
        }
        $color = $size->colorsProduct()->wherePivot('color_id', $item['color'])->wherePivot('product_id', $product->id)->first();
        if (!$color) {
            return response()->json(['message' => ' الخاص بهذا المنتج  ' . $product->name . $size->name . 'اللون غير متوفر للمقاس    '], 404);
        }
        if ($color->pivot->product_quantity < $item['quantity']) {
            return response()->json(['message' => '  كمية اللون  ' . $color->name . ' غير متوفر لهذا المنتج ' . $product->name], 404);
        }
        if ($product->price > $item['price']) {
            return response()->json(['message' => 'يجب ان يكون السعر الذ تدخل  يساوي سعر المنتج او اكبر منه ولا يمكن ان يكون اقل '], 404);
        }
        DB::table('size_colors_pivot')->where('size_id', $item['size'])
            ->where('color_id', $item['color'])->where('product_id', $product->id)->update([
                'product_quantity' => $color->pivot->product_quantity - $item['quantity'],
            ]);
        return null;
    }


    private function updateInvoices($request)
    {
        $invoice_info = $this->updateInfoInvoice($request);
        $this->updateInvoice($request,$invoice_info);
        DB::commit();
        return $invoice_info;
    }

    private function updateInfoInvoice($request)
    {
        $invoice_info = invoiceInfo::find($request['invoice_info']['id']);
        $invoice_info->update([
            'description' => $request['order_details']['description'],
            'discount' => $request['order_details']['discount'],
            'total_quantity' => $request['order_details']['totalQuantity'],
            'total_price' => $request['order_details']['totalPrice'],
        ]);
        foreach ($invoice_info->invoices as $invoice) {
            $invoice->delete();
        }
        return $invoice_info;
    }

    private function updateInvoice($request,$invoice_info)
    {
        foreach ($request['order_details']['items'] as $item) {
            $invoice = new Invoice();
            $invoice->name = $item['name'];
            $invoice->quantity = $item['quantity'];
            $invoice->price = $item['price'];
            if (is_numeric($item['color'])) {
                $invoice->color_id = $item['color'];
            } else {
                $color = Color::select('id')->where('name', $item['color'])->first();
                $invoice->color_id = $color->id;
            }
            if (is_numeric($item['size'])) {
                $invoice->size_id = $item['size'];
            } else {
                $size = Size::where('name', $item['size'])->first();
                $invoice->size_id = $size->id;
            }
            $invoice->invoice_info_id = $invoice_info->id;
            $invoice->save();
        }
    }
}

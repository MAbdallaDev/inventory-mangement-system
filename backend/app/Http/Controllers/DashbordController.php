<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Color;
use App\Models\Invoice;
use App\Models\invoiceInfo;
use App\Models\Product;
use App\Models\Size;
use App\Models\User;
use Illuminate\Http\Request;

class DashbordController extends Controller
{
    public function statistics(Request $request)
    {
        $productsCost = 0;
        $products = Product::select('total_quantity', 'price')->get();
        foreach ($products as $product) {
            $productsCost += $product->price * $product->total_quantity;
        }
        $invoicesCost = 0;
        $invoices = invoiceInfo::select('total_price')->get();
        foreach ($invoices as $invoice) {
            $invoicesCost += $invoice->total_price;
        }
        $profit = $productsCost - $invoicesCost;
        return response()->json([
            'stats' => [
                'initial' => 10000,
                'budget' => $profit + 10000,
                'total_cost' => $productsCost,
                'revenue' => $invoicesCost,
                'profit' => $profit,
            ],
            'count' => [
                'total_products' => Product::count(),
                'total_invoices' => invoiceInfo::count(),
                'total_clients' => Client::count(),
                'total_colors' => Color::count(),
                'total_sizes' => Size::count(),
                'total_users' => User::count(),
            ]


        ]);
    }
}

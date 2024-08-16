<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\InvoiceInfoCollection;
use App\Http\Resources\InvoiceInfoResource;
use App\Http\Traits\invoiceTrait;
use App\Models\invoiceInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    use invoiceTrait;

    public function index()
    {
        $invoiceInfos = invoiceInfo::paginate(5);
        return response()->json(new InvoiceInfoCollection($invoiceInfos));
    }

    public function store(StoreInvoiceRequest $request)
    {
        DB::beginTransaction();
        try {
            $client = $this->saveClient($request);
            if ($client === false) {
                return response()->json(['message' => 'برجاء ادخال بيانات العميل بشكل صحيح'], 404);
            }
            $invoiceInfo = $this->storeInvoice($request, $client->id);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()]);
        }
        return response()->json(['invoice' => new invoiceInfoResource($invoiceInfo)]);
    }

    public function update(UpdateInvoiceRequest $request, $invoice)
    {
        DB::beginTransaction();
        try {
            return response()->json(['invoice' => new invoiceInfoResource($this->updateInvoices($request))]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => $e->getMessage()]);
        }
    }

    public function show(invoiceInfo $invoice)
    {
        return response()->json(new invoiceInfoResource($invoice));
    }

    public function destroy(invoiceInfo $invoice)
    {
        $invoice->delete();
        return response()->json(['message' => 'تم حذف الفاتوره بنجاح']);
    }

    public function search_invoice_by_date(Request $request)
    {
        $request->validate([
            'date' => 'date|nullable'
        ]);
        if ($request->date) {
            $invoiceInfos = invoiceInfo::whereBetween('created_at', [
                date('Y-m-d 00:00:00', strtotime($request->date)),
                date('Y-m-d 23:55:59', strtotime($request->date)),
            ])->paginate(5);
        } else {
            $invoiceInfos = invoiceInfo::paginate(5);
        }

        return response()->json(new InvoiceInfoCollection($invoiceInfos));
    }

}

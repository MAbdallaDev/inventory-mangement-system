<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientInvoiceResource;
use App\Http\Resources\ClientResource;
use App\Models\Client;

class ClientController extends Controller
{


    /*  Show All clients  */
    public function index()
    {
        $clients = Client::paginate(6);
        return response()->json(new ClientCollection($clients));
    }

    public function show($p)
    {
        $clients = Client::all();
        return response()->json(ClientResource::collection($clients));
    }

    /*  Store clients  */

    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());
        return response()->json(['message' => 'تم اضافة العميل بنجاح', 'client' => new ClientResource($client)]);
    }

    /*  Update clients By Id  */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());
        return response()->json(['message' => 'تم التحديث العميل بنجاح', 'client' => $client]);
    }

    /*  delete clients  By Id */
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['message' => 'تم حذف العميل بنجاح']);
    }

    public function clientInvoice(Client $client)
    {
        return response()->json(ClientInvoiceResource::collection($client->invoiceInfo));
    }

    public function showClient(Client $client)
    {
        return response()->json(new ClientResource($client));
    }


}

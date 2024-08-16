<?php

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

function valColor($colorRequest)
{
    $validator = Validator::make($colorRequest, [
        'color' => 'required|numeric|exists:colors,id', 'qty' => 'required|numeric'
    ]);
    if ($validator->fails()) {
        return $validator->errors();
    }
    return null;
}

function shoeMessage($message, $model, $resourceName, $token)
{
    $resource_prefix = "App\Http\Resources";
    $resource = $resource_prefix . '\\' . $resourceName;
    if ($token === true && $model !== null && $message !== null && $resourceName !== null) {
        // show Message and Model and Token
        return response()->json(['message' => __($message),
            'token' => $model->createToken("User Token")->plainTextToken, 'User' => new $resource($model)]);
    } elseif ($token === false && $model !== null && $message !== null && $resourceName !== null) {
        // show Message and Model
        return response()->json(['message' => __($message),
            class_basename($model) => $model instanceof Collection ? $resource::collection($model) : new $resource($model)
        ]);
    } elseif ($token === false && $model === null && $message !== null && $resourceName === null) {
        // show Message only
        return response()->json(['message' => __($message)]);
    } elseif ($token === false && $model !== null && $message === null && $resourceName !== null) {
        // show model only
        return response()->json([
            class_basename($model) => $model instanceof Collection ? $resource::collection($model) : new $resource($model)
        ]);
    }
}



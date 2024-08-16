<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'invoice_info.id' => ['nullable', 'min:1', 'max:250', 'exists:invoice_infos,id'],
            'order_details.description' => ['nullable', 'string', 'min:1', 'max:250'],
            'order_details.discount' => ['nullable', 'max:250'],
            'order_details.totalQuantity' => ['nullable', 'max:250'],
            'order_details.totalPrice' => ['nullable', 'max:250'],

            'order_details.items.*.id' => ['nullable', 'min:1', 'max:250', 'exists:invoices,id'],
            'order_details.items.*.name' => ['nullable', 'string', 'min:1', 'max:250', 'exists:products,name'],
            'order_details.items.*.color' => ['nullable', 'min:1', 'max:250'],
            'order_details.items.*.size' => ['nullable', 'min:1', 'max:250'],
            'order_details.items.*.quantity' => ['nullable', 'min:1', 'max:250'],
            'order_details.items.*.price' => ['nullable', 'min:1', 'max:250'],

        ];
    }

    public function messages(): array
    {
        return [
            'customer_info.name.nullable' => 'يمكن ارسال رقم العميل بدلا من اسمة',
            'customer_info.name.string' => 'يجب ان يكون اسم المقاس عبارة عن احرف',
            'customer_info.name.min' => 'يجب عن لا يقل عن حرف واحد',
            'customer_info.name.max' => 'يجب ان لا يزيد عن 250 حرف ',
            'customer_info.phone.nullable' => 'يمكن ارسال رقم العميل بدلا من رقمة',
            'customer_info.phone.min' => 'يجب عن لا يقل رقم الهاتف عن حرف واحد',
            'customer_info.phone.max' => 'يجب ان لا يزيد رقم الهاتف عن 25 حرف ',
            'customer_info.address.nullable' => 'يمكن ارسال رقم العميل بدلا من عنوانة',
            'customer_info.address.string' => 'يجب ان يكون  عنوان عبارة عن احرف',
            'customer_info.address.min' => 'يجب عن لا يقل عنوان عن حرف واحد',
            'customer_info.address.max' => 'يجب ان لا يزيد عنوان عن 250 حرف ',

            'invoice_info.invoiceId.required' => 'لابد من ارسال رقم الفاتورة',
            'invoice_info.invoiceId.min' => 'يجب عن لا يقل رقم الفاتورة عن حرف واحد',
            'invoice_info.invoiceId.max' => 'يجب ان لا يزيد رقم الفاتورة عن 250 حرف ',
            'invoice_info.invoiceDate.required' => 'لابد من ارسال تاريغ الفاتورة',
            'invoice_info.invoiceDate.min' => 'يجب عن لا يقل رقم تاريغ عن حرف واحد',
            'invoice_info.invoiceDate.max' => 'يجب ان لا يزيد رقم تاريغ عن 250 حرف ',
            'invoice_info.dueDate.required' => 'لابد من ارسال تاريغ انتهاء الفاتورة',
            'invoice_info.dueDate.min' => 'يجب عن لا يقل  تاريغ انتهاء  عن حرف واحد',
            'invoice_info.dueDate.max' => 'يجب ان لا يزيد  تاريغ انتهاء عن 250 حرف ',
            'invoice_info.paymentMethod.required' => 'لابد من ارسال طريقة الدفع',
            'invoice_info.paymentMethod.min' => 'يجب عن لا يقل  طريقة الدفع  عن حرف واحد',
            'invoice_info.paymentMethod.max' => 'يجب ان لا يزيد  طريقة الدفع عن 250 حرف ',


            'order_details.items.*.name.required' => 'لابد ان يكون اسم المنتج موجود',
            'order_details.items.*.name.min' => 'لا يقل اسم المنتج عن حرف واحد',
            'order_details.items.*.name.max' => 'لا يزيد اسم المنتج عن250 حرف ',
            'order_details.items.*.name.exists' => 'اسم المنتج لابد عن يكون متوفر اولا ',
            'order_details.items.*.color.required' => 'لابد ان يكون لون المنتج موجود',
            'order_details.items.*.color.min' => 'لا يقل لون المنتج عن حرف واحد',
            'order_details.items.*.color.max' => 'لا يزيد لون المنتج عن250 حرف ',
            'order_details.items.*.color.exists' => 'لون المنتج لابد عن يكون متوفر اولا ',
            'order_details.items.*.size.required' => 'لابد ان يكون المقاس المنتج موجود',
            'order_details.items.*.size.min' => 'لا يقل المقاس المنتج عن حرف واحد',
            'order_details.items.*.size.max' => 'لا يزيد المقاس المنتج عن250 حرف ',
            'order_details.items.*.size.exists' => 'المقاس المنتج لابد عن يكون متوفر اولا ',
            'order_details.items.*.quantity.required' => 'لابد ان يكون كمية  المنتج موجود',
            'order_details.items.*.quantity.min' => 'لا يقل كمية المنتج عن حرف واحد',
            'order_details.items.*.quantity.max' => 'لا يزيد كمية المنتج عن250 حرف ',
            'order_details.items.*.price.required' => 'لابد ان يكون سعر  المنتج موجود',
            'order_details.items.*.price.min' => 'لا يقل سعر المنتج عن حرف واحد',
            'order_details.items.*.price.max' => 'لا يزيد سعر المنتج عن250 حرف ',

            'order_details.description.required' => 'لابد ان يكون  وصف الطلب  موجود',
            'order_details.description.min' => 'لا يقل وصف الطلب عن حرف واحد',
            'order_details.description.max' => 'لا يزيد وصف الطلب عن250 حرف ',

            'order_details.discount.required' => 'لابد ان يكون  الخصم  موجود',
            'order_details.discount.max' => 'لا يزيد الخصم 100 حرف ',

            'order_details.totalQuantity.required' => 'لابد ان يكون  الكمية الكلية  موجود',
            'order_details.totalQuantity.max' => 'لا يزيد الكمية الكلية عن250 حرف ',

            'order_details.totalPrice.required' => 'لابد ان يكون   اجمالي السعر  موجود',
            'order_details.totalPrice.max' => 'لا يزيد  اجمالي السعر عن250 حرف ',
        ];
    }
}

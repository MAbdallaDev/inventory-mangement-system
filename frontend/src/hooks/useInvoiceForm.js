import { format } from "date-fns";
import { nanoid } from "nanoid";
import { useState } from "react";

const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
const useInvoiceForm = (initialInvoiceData, isEditing) => {

   const invoiceInfoInitialState = {
      invoiceId: nanoid(6),
      invoiceDate: formatDate(new Date()),
      dueDate: formatDate(new Date()),
      paymentMethod: ''
   }
   const customerInfoInitialState = { name: '', phone: '', address: '' };
   const orderDetailsInitialState = {
      items: [
         { name: '', color: '', size: '', quantity: '', price: '' }
      ],
      description: '',
      discount: 0,
      totalQuantity: 0,
      totalPrice: 0
   };
   const [customerInfo, setCustomerInfo] = useState(customerInfoInitialState)
   const [invoiceInfo, setInvoiceInfo] = useState(invoiceInfoInitialState)
   const [orderDetails, setOrderDetails] = useState(orderDetailsInitialState)

   const areAllFieldsFilled = () => {

      const isCustomerFilled = Boolean(customerInfo?.id || (customerInfo?.name && customerInfo?.phone && customerInfo?.address));
      const isInvoiceFilled = Boolean(invoiceInfo?.invoiceId && invoiceInfo?.invoiceDate && invoiceInfo?.paymentMethod);
      const isOrderDetailsFilled = Boolean(orderDetails?.description && Array.isArray(orderDetails.items) && orderDetails?.items?.every(item => item.name && item.color && item.size && item.quantity && item.price));
      return isCustomerFilled && isInvoiceFilled && isOrderDetailsFilled;
   };
   return {
      customerInfo,
      invoiceInfo,
      orderDetails,
      setCustomerInfo,
      setInvoiceInfo,
      setOrderDetails,
      areAllFieldsFilled
   };
}
export default useInvoiceForm;
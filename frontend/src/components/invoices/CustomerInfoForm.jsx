import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import useCustomerSuggestions from '../../hooks/useCustomerSuggestion';

const sharedStyle = {
   flexStyle: 'd-sm-flex align-items-md-center gap-md-1',
   formGroup: 'd-md-flex align-items-md-center gap-md-1  py-2 mb-md-1',
}

const CustomerInfoForm = ({ customer, setCustomer, disableEditing }) => {

   const [selectedCustomerId, setSelectedCustomerId] = useState('');
   const handleAddNewCustomer = () => {
      setCustomer({ name: '', phone: '', address: '' })
      setSelectedCustomerId('')
   }
   const {
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      onSuggestionSelected,
      getSuggestionValue,
      renderSuggestion,
      onChange,
      inputValue,
      suggestionsList
   } = useCustomerSuggestions(setCustomer);

   return (
      <section className='invoice-card customer-info-form rounded-2 h-100'>
         <div className="head px-3 py-4 mb-1">
            <h4 className='mb-0'>تفاصيل العميل</h4>
         </div>
         <Form className='p-3'>
            {!disableEditing &&
               <div
                  className="d-block d-md-block d-xl-flex align-items-start gap-3 justify-content-between py-2 mb-md-1"
               >
                  <Form.Group controlId="existing-customer"
                     className={`${sharedStyle?.flexStyle} align-items-center flex-fill`}
                  >
                     <Form.Label className=''>عميل موجود</Form.Label>
                     <Autosuggest
                        suggestions={suggestionsList}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={{
                           className: 'form-control',
                           placeholder: "ابحث عن العميل",
                           value: inputValue,
                           onChange: onChange,
                        }}
                        onSuggestionSelected={onSuggestionSelected}
                     />
                  </Form.Group>
                  <button
                     className='new-cutomer-btn pt-2'
                     type="button"
                     onClick={handleAddNewCustomer}>
                     اضافة عميل جديد
                  </button>
               </div>
            }
            <Form.Group controlId="customer-name"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>اسم العميل</Form.Label>
               <Form.Control
                  type="text"
                  name="name"
                  value={customer?.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  disabled={!!customer?.id}
               />
            </Form.Group>
            <Form.Group controlId="customer-phone"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>رقم التليفون</Form.Label>
               <Form.Control
                  type="tel"
                  name="phone"
                  value={customer?.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  disabled={!!customer?.id}
               />
            </Form.Group>
            <Form.Group controlId="customer-phone"
               className={`${sharedStyle?.formGroup}`}
            >
               <Form.Label>العنوان</Form.Label>
               <Form.Control
                  type="text"
                  name="address"
                  value={customer?.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  disabled={!!customer?.id}
               />
            </Form.Group>
         </Form>
      </section>
   );
};

export default CustomerInfoForm;

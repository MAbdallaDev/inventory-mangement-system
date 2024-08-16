import React, { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getNameOfAllProducts } from '../../store/slices/productSlice';

const ProductNameInOrder = ({ orderDetails, setOrderDetails, item, idx, handleItemChange }) => {
   const dispatch = useDispatch();
   const [suggestions, setSuggestions] = useState([]);
   const [suggestionsList, setSuggestionsList] = useState([]);
   useEffect(() => {
      const fetchProductsName = async () => {
         try {
            const response = await dispatch(getNameOfAllProducts()).unwrap();
            const newProductsName = response?.map(product => product?.name);
            setSuggestions(newProductsName);
         } catch (error) {
            console.log(error);
         }
      }
      fetchProductsName();
   }, [dispatch]);

   const getSuggestions = (value) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      return inputLength === 0 ? [] : suggestions.filter(
         suggestion => suggestion.toLowerCase().includes(inputValue) // Ensure you're checking correctly
      );
   };

   const getSuggestionValue = (suggestion) => suggestion;

   const renderSuggestion = (suggestion) => (
      <div>
         {suggestion}
      </div>
   );

   const onChange = (event, { newValue }) => {
      handleItemChange(idx, 'name', newValue); // Update order details
   };

   const onSuggestionsFetchRequested = ({ value, index }) => {
      const filteredSuggestions = getSuggestions(value);
      const newItems = [...orderDetails.items];
      newItems[index].suggestionsList = filteredSuggestions; // Add suggestions to each item
      setOrderDetails({ ...orderDetails, items: newItems });
   };
   const onSuggestionsClearRequested = () => {
      setSuggestionsList([]);
   };
   return (
      <Form.Group className="mb-0 position-relative">
         <Autosuggest
            suggestions={item.suggestionsList || []} // Use the suggestions specific to this item
            onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value, index: idx })}
            onSuggestionsClearRequested={() => handleItemChange(idx, 'suggestionsList', [])}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
               className: 'form-control',
               placeholder: 'اسم المنتج',
               value: item.name, // Use item name here
               onChange,
               onBlur: () => handleItemChange(idx, 'suggestionsList', []) // Clear suggestions on blur
            }}
         />
      </Form.Group>
   )
}

export default ProductNameInOrder
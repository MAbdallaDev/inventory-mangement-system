
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameOfAllProducts } from '../store/slices/productSlice';

const useProductSuggestions = (name, setName) => {
   const dispatch = useDispatch();
   const [suggestions, setSuggestions] = useState([]);
   const [inputValue, setInputValue] = useState('');
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
         suggestion => suggestion.toLowerCase().includes(inputValue)
      );
   };

   const getSuggestionValue = (suggestion) => suggestion;

   const renderSuggestion = (suggestion) => (
      <div>
         {suggestion}
      </div>
   );

   const onChange = (event, { newValue }) => {
      setInputValue(newValue);
      setName(newValue);
   };

   const onSuggestionsFetchRequested = ({ value }) => {
      setSuggestionsList(getSuggestions(value));
   };

   const onSuggestionsClearRequested = () => {
      setSuggestionsList([]);
   };

   return {
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      onChange,
      setInputValue,
      inputValue,
      suggestionsList,
   };
}

// Ensure export is at the bottom of the file
export default useProductSuggestions;

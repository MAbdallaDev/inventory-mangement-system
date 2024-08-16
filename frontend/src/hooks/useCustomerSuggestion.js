import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../store/slices/CustomerSlice";

const useCustomerSuggestions = (setCustomer) => {
   const dispatch = useDispatch();
   const [suggestions, setSuggestions] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [suggestionsList, setSuggestionsList] = useState([]);

   const getCustomersData = async () => {
      try {
         const response = await dispatch(getAllCustomers()).unwrap();
         setSuggestions(response);
      } catch (e) {
         console.error(e);
      }
   }
   useEffect(() => {
      getCustomersData();
   }, [])

   const getSuggestions = (value) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      return inputLength === 0 ? [] : suggestions?.filter(
         suggestion => suggestion.name.toLowerCase().includes(inputValue)
      );
   };

   const getSuggestionValue = (suggestion) => suggestion.name;

   const renderSuggestion = (suggestion) => (
      <div>
         {suggestion.name}
      </div>
   );

   const onChange = (event, { newValue }) => {
      setInputValue(newValue);
   };

   const onSuggestionsFetchRequested = ({ value }) => {
      setSuggestionsList(getSuggestions(value));
   };

   const onSuggestionsClearRequested = () => {
      setSuggestionsList([]);
   };

   const onSuggestionSelected = async (event, { suggestion }) => {
      setInputValue(suggestion.name);
      const selectedCustomer = suggestions.find((item) => item?.id === suggestion.id);
      setCustomer(selectedCustomer);
   };
   return {
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      onSuggestionSelected,
      getSuggestionValue,
      renderSuggestion,
      onChange,
      inputValue,
      suggestionsList,
   };
}
export default useCustomerSuggestions;
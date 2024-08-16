import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColorsBySize, getProductByName } from "../store/slices/productSlice";
import { useRef } from "react"; // Import useRef
import { useCallback } from 'react';
import { fetchingSizes } from "../store/slices/sizeSlice";


const useOrderDetails = (orderDetails, setOrderDetails, isEditing) => {
   const [totalQty, setTotalQty] = useState(0);
   const [subTotalPrice, setSubTotalPrice] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const [productDetails, setProductDetails] = useState({});
   const [colorOptions, setColorOptions] = useState([]);
   const [maxQuantities, setMaxQuantities] = useState({});
   const dispatch = useDispatch();
   const prevItemsRef = useRef(orderDetails.items); // Store previous orderDetails.items
   const { sizesMap } = useSelector(state => state?.sizes)
   useEffect(() => { dispatch(fetchingSizes()) }, [dispatch])
   useEffect(() => {
      calculateTotals();
      setOrderDetails({
         ...orderDetails,
         totalQuantity: totalQty,
         totalPrice: totalPrice
      });
   }, [orderDetails?.items, totalQty, totalPrice, orderDetails?.discount]);

   useEffect(() => {
      // Check if orderDetails.items has changed
      if (isEditing && prevItemsRef.current !== orderDetails.items) {
         fetchAllProductDetails();
      }

      // Update the ref to the current items
      prevItemsRef.current = orderDetails.items;
   }, [isEditing, orderDetails.items]);

   const fetchAllProductDetails = useCallback(async () => {
      const fetchPromises = orderDetails?.items?.map((item, idx) => {
         if (item?.name) return fetchProductDetails(item?.name, idx);
      });
      await Promise.all(fetchPromises);

      const colorFetchPromises = orderDetails?.items?.map((item, idx) => {
         const sizeId = sizesMap[item?.size] || item?.size;
         if (item?.name && item?.size) return fetchAvailableColors(item?.name, sizeId, idx);
      });
      await Promise.all(colorFetchPromises);
   }, [orderDetails?.items]);

   const fetchProductDetails = async (productName, index) => {
      try {
         const product = await dispatch(getProductByName({ name: productName, status: "1" })).unwrap();
         setProductDetails(prev => ({ ...prev, [index]: product }));
      } catch (error) {
         console.error('Error fetching product details:', error);
      }
   };

   const fetchAvailableColors = async (productName, sizeId, index) => {
      try {
         const response = await dispatch(getColorsBySize({ productName, sizeId })).unwrap();
         setColorOptions(prev => ({ ...prev, [index]: response }));
      } catch (error) {
         console.error('Error fetching available colors:', error);
      }
   };
   const calculateTotals = () => {
      let totalQty = 0;
      let subTotalPrice = 0;
      orderDetails?.items?.forEach((item) => {
         const qty = parseFloat(item?.quantity) || 0;
         const price = parseFloat(item?.price) || 0;
         totalQty += qty;
         subTotalPrice += price * qty;
      });
      const discountAmount = (subTotalPrice * parseFloat(orderDetails?.discount)) / 100;
      setTotalQty(totalQty);
      setSubTotalPrice(subTotalPrice);
      setTotalPrice(subTotalPrice - (discountAmount || 0));
   };
   const handleAddItem = () => {
      setOrderDetails({
         ...orderDetails,
         items: [...orderDetails?.items, { name: '', color: '', size: '', quantity: '', price: '' }]
      });
   };
   const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
         if (timeoutId) {
            clearTimeout(timeoutId);
         }
         timeoutId = setTimeout(() => {
            func(...args);
         }, delay);
      };
   };

   const handleRemoveItem = (index) => {
      const newItems = orderDetails.items.filter((_, idx) => idx !== index);
      setOrderDetails({ ...orderDetails, items: newItems });
   };
   const handleItemChange = useCallback((index, field, value) => {
      const newItems = [...orderDetails.items];
      newItems[index][field] = value;
      setOrderDetails({ ...orderDetails, items: newItems });


      const fetchDetails = debounce(async () => {
         // Fetch product details only if the name changes
         if (field === 'name' && newItems[index].name) {
            await fetchProductDetails(newItems[index].name, index);
         }

         // Fetch available colors only if the size changes and a valid name is provided
         if (field === 'size' && newItems[index].name && newItems[index].size) {
            const sizeId = sizesMap[newItems[index].size] || newItems[index].size;
            await fetchAvailableColors(newItems[index].name, sizeId, index);
         }
      }, 500); // 500ms delay

      fetchDetails(); // Call the debounced function

      if (field === 'color') {
         const selectedColor = value;
         const selectedSize = newItems[index].size;
         const product = productDetails[index];

         if (product && selectedSize && selectedColor) {
            const size = product.sizes.find(size => size.id == selectedSize);
            if (size) {
               const color = size.colors.find(color => color.id == selectedColor);
               if (color) {
                  const maxQty = color.quantity;
                  setMaxQuantities(prev => ({ ...prev, [index]: maxQty }));
                  newItems[index].quantity = Math.min(newItems[index].quantity, maxQty);
                  setOrderDetails({ ...orderDetails, items: newItems });
               }
            }
         }
      }
   }, [orderDetails.items, setOrderDetails]);

   return {
      orderDetails,
      totalQty,
      subTotalPrice,
      totalPrice,
      productDetails,
      colorOptions,
      maxQuantities,
      handleAddItem,
      handleRemoveItem,
      handleItemChange,
   };
}

export default useOrderDetails;

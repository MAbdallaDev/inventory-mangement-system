import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMobileMedia from "./useMobileMedia";
import { nanoid } from "nanoid";
import { fetchingAllColors } from "../store/slices/colorSlice";
import { fetchingSizes } from "../store/slices/sizeSlice";


const initialSizesState = [
   { size: '', colors: [{ color: '', quantity: '' }] }
];
const useProductForm = (isEditing = false, initialState = {}) => {
   const dispatch = useDispatch();
   const initialProductCode = nanoid(6);
   const [productCode, setProductCode] = useState(initialProductCode);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [sizes, setSizes] = useState(initialSizesState);
   const [price, setPrice] = useState('');
   const [totalQuantity, setTotalQuantity] = useState(0);
   const [numberOfColor, setNumberOfColor] = useState(1)
   const isMobile = useMobileMedia();
   const sizesData = useSelector(state => state?.sizes?.sizes)
   const colorsData = useSelector(state => state?.colors?.colors);
   const isLoading = useSelector(state => state?.loading?.isLoading)
   //* if we edit existed product, refill the form fields
   useEffect(() => {
      if (isEditing && initialState) {
         setProductCode(initialState?.code || nanoid(6));
         setName(initialState?.name || 'لا يوجد اسم للمنتج');
         setDescription(initialState?.details || 'لا يوجد تفاصيل عن المنتج')
         setPrice(initialState?.price || 0);
         setSizes(initialState?.sizes?.length ? initialState?.sizes : initialSizesState);
         setNumberOfColor(initialState?.sizes?.reduce((acc, size) => acc + size?.colors?.length, 0));
      }
   }, [isEditing, initialState]);
   //* get the colors and sizes data
   useEffect(() => {
      dispatch(fetchingAllColors());
      dispatch(fetchingSizes());
   }, [dispatch])

   //* handle the total quantity 
   useEffect(() => {
      const totalQty = sizes.reduce((acc, size) => {
         const sizeQty = size?.colors?.reduce((sizeAcc, color) => {
            return sizeAcc + parseInt(color?.quantity)
         }, 0);
         return acc + sizeQty;
      }, 0);
      setTotalQuantity(totalQty);
   }, [sizes]);

   const handleAddSize = () => {
      //TODOedit
      setSizes([...sizes, { size: '', colors: [{ color: '', quantity: '' }] }]);
   };

   const handleRemoveSize = (sizeIndex) => {
      if (sizes?.length === 1)
         return;
      const newSizes = sizes.filter((size, index) => index !== sizeIndex)
      setSizes(newSizes)
   }

   const handleAddColor = (sizeIndex) => {
      const newSizes = sizes.map((size, index) => {
         if (index === sizeIndex) {
            setNumberOfColor(numberOfColor => numberOfColor + 1);
            return { ...size, colors: [...size.colors, { color: '', quantity: '' }] };
         }
         return size;
      });
      setSizes(newSizes);
   };

   const handleRemoveColor = (sizeIndex, colorIndex) => {
      if (sizes?.length === 1 && sizes[0]?.colors?.length === 1)
         return;
      const newSizes = sizes?.map((size, index) => {
         if (index === sizeIndex) {
            const newColor = size.colors.filter((color, index) => colorIndex !== index)
            setNumberOfColor(numberOfColor => numberOfColor - 1);
            return { ...size, colors: newColor };
         }
         return size;
      })
      setSizes(newSizes);
   }

   const handleSizeChange = (index, value) => {
      const newSizes = sizes.map((size, sizeIndex) => {
         if (sizeIndex === index) {
            return { ...size, size: value };
         }
         return size;
      });
      setSizes(newSizes);
   };

   const handleColorChange = (sizeIndex, colorIndex, field, value) => {
      const newSizes = sizes.map((size, sIndex) => {
         if (sIndex === sizeIndex) {
            const newColors = size.colors.map((color, cIndex) => {
               if (cIndex === colorIndex) {
                  value = (value === '') ? 0 : value;
                  return { ...color, [field]: isNaN(parseInt(value)) ? 0 : value };
               }
               return color;
            });
            return { ...size, colors: newColors };
         }
         return size;
      });
      setSizes(newSizes);
   };

   const resetFormFields = () => {
      setName('');
      setDescription('');
      setPrice(0);
      setSizes(initialSizesState);
      setTotalQuantity(0);
      setProductCode(nanoid(6));
      setNumberOfColor(1);
   };
   return {
      productCode,
      name,
      description,
      sizes,
      price,
      totalQuantity,
      numberOfColor,
      colorsData,
      sizesData,
      isLoading,
      isMobile,
      setName,
      setDescription,
      setPrice,
      setSizes,
      setTotalQuantity,
      setProductCode,
      setNumberOfColor,
      handleAddSize,
      handleRemoveSize,
      handleAddColor,
      handleRemoveColor,
      handleSizeChange,
      handleColorChange,
      resetFormFields,
   };
}

export default useProductForm;
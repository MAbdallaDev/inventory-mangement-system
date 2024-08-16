import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addNewProduct } from '../../store/slices/productSlice'; // Import editProduct
import useProductForm from '../../hooks/useProductForm';
import useProductSuggestions from '../../hooks/useProductSuggestions';
import { BtnComp } from '../common';
import { Button } from 'react-bootstrap';
import { FaRegTrashCan } from "react-icons/fa6";
import Autosuggest from 'react-autosuggest'; // Import Autosuggest

const AddProductForm = ({ isEditing = false, editedProductData = null }) => {
   const dispatch = useDispatch();
   const [suggestions, setSuggestions] = useState([]);
   const {
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
      handleAddSize,
      handleRemoveSize,
      handleAddColor,
      handleRemoveColor,
      handleSizeChange,
      handleColorChange,
      resetFormFields,
   } = useProductForm(isEditing, editedProductData);

   const handleSubmit = (e) => {
      e.preventDefault();
      const productData = {
         name,
         details: description,
         code: productCode,
         price,
         total_quantity: totalQuantity,
         sizes,
      };
      if (!isEditing) {
         dispatch(addNewProduct(productData))
            .then((res) => {
               if (res.type.includes('rejected')) {
                  throw res.payload?.message || 'الكود او الاسم موجود بالفعل';
               }
               Swal.fire({
                  icon: 'success',
                  text: `${res?.payload?.message}`,
               }).then(() => {
                  resetFormFields();
               });
            })
            .catch((error) => {
               Swal.fire({
                  icon: 'error',
                  text: `${error || 'حدث خطأ أثناء إضافة المنتج برجاء المحاولة مرة أخرى'}`,
               });
            });
      }
   };

   const {
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      onChange,
      setInputValue,
      inputValue,
      suggestionsList,
   } = useProductSuggestions(name, setName)
   return (
      <form onSubmit={handleSubmit} className="add-product-form me-2 me-md-4 mt-2">
         {/* {!isEditing &&
            <div className="form-group d-flex flex-column flex-sm-row align-items-md-center gap-2 gap-sm-0">
               <label>كود المنتج:</label>
               <input
                  type="text"
                  value={productCode}
                  disabled
               />
            </div>
         } */}
         <div className="form-group">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2 gap-sm-0 mb-2">
               <label>اسم المنتج:</label>
               <Autosuggest
                  suggestions={suggestionsList}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={{
                     placeholder: 'أدخل اسم المنتج',
                     value: inputValue,
                     onChange: onChange
                  }}
               />
            </div>
         </div>
         <div className="form-group ">
            <label className='mb-2 mb-sm-0'>السعر:</label>
            <input
               type="number"
               value={price}
               min={50}
               required
               onChange={(e) => setPrice(e.target.value)}
            />
         </div>
         <div className="form-group">
            <label className='mb-2 mb-sm-0'>الكمية الكلية:</label>
            <input type="number" value={totalQuantity} readOnly />
         </div>
         <div className="form-group d-flex flex-column flex-sm-row gap-2 gap-sm-0">
            <label className='mb-2 mb-sm-0'>تفاصيل :</label>
            <textarea
               rows="4"
               id="product-description"
               className="form-control"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            ></textarea>
         </div>
         {sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="form-group size-color-qty">
               <label className='mb-2 mb-sm-0'>المقاس:</label>
               <select value={size.size} onChange={(e) => handleSizeChange(sizeIndex, e.target.value)}>
                  <option value="">اختار المقاس</option>
                  {sizesData?.map(size => (
                     <option value={size?.id} key={size?.id}>{size?.name}</option>
                  ))}
               </select>
               <div className=" d-flex flex-column">
                  {size?.colors?.map((color, colorIndex) => (
                     <div key={colorIndex}
                        className="align-items-center color-qty d-flex form-group gap-2 gap-sm-4"
                     >
                        <div className="color-qty-wrapper d-flex flex-column flex-sm-row flex-fill ">
                           <div className="color">
                              <label className='mb-2 mb-xl-0'>اللون:</label>
                              <select
                                 className="custom-dropdown-menu"
                                 value={color.color}
                                 required
                                 onChange={(e) => handleColorChange(sizeIndex, colorIndex, 'color', e.target.value)}
                              >
                                 <option value="">اختر اللون</option>
                                 {colorsData?.map(color => (
                                    <option value={color?.id} key={color?.id}>{color?.name}</option>
                                 ))}
                              </select>
                           </div>
                           <div className="qty">
                              <label className='mb-2 mb-xl-0'>الكمية:</label>
                              <input
                                 type="number"
                                 required
                                 value={color.quantity}
                                 min={1}
                                 onChange={(e) =>
                                    handleColorChange(sizeIndex, colorIndex, 'quantity', e.target.value)
                                 }
                              />
                           </div>
                        </div>
                        <FaRegTrashCan
                           className={`delete-btn`}
                           style={{ cursor: numberOfColor === 1 ? 'auto' : 'pointer' }}
                           onClick={() => { handleRemoveColor(sizeIndex, colorIndex) }} />
                     </div>
                  ))}
               </div>
               <div className="btn-wrapper d-flex gap-4 gap-md-5">
                  <BtnComp
                     variant='primary'
                     classes='my-2'
                     onclickFunc={() => { handleAddColor(sizeIndex) }}
                     name='إضافة لون '
                     titleAttr='اضف لون جديد'
                  />
                  <BtnComp
                     variant='danger'
                     classes='my-2'
                     disabled={sizes?.length === 1}
                     onclickFunc={() => { handleRemoveSize(sizeIndex) }}
                     name='حذف المقاس'
                     titleAttr='حذف هذا المقاس'
                  />
               </div>
            </div>
         ))}
         <BtnComp
            variant='secondary'
            onclickFunc={handleAddSize}
            name='إضافة مقاس '
            titleAttr='إضافة مقاس اخر'
            classes='mt-2'
         />
         <Button
            type="submit"
            variant='outline-success'
            className={`submit-btn fw-bold ${isMobile && 'btn-sm'}`}
            disabled={isLoading}
            title='تاكيد اضافة المنتج'
         >{isLoading ? 'يتم اضافة ....' : 'تاكيد'} </Button>
      </form>
   );
}

export default AddProductForm;

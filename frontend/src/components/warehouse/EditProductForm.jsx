import React, { useEffect, useState } from 'react'
import useProductForm from '../../hooks/useProductForm';
import { Button } from 'react-bootstrap';
import { BtnComp } from '../common';
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { editProduct } from '../../store/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const EditProductForm = ({ isEditing, editedProductData }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [initialSizeValue, setInitialSizeValue] = useState([]);
   const [initialColorValue, setInitialColorValue] = useState([]);
   const {
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
      setPrice,
      setDescription,
      handleAddSize,
      handleRemoveSize,
      handleAddColor,
      handleRemoveColor,
      handleSizeChange,
      handleColorChange,
   } = useProductForm(isEditing, editedProductData);
   const getInitialSizeValue = () => {
      const sizesValue = sizes.map(size => {
         return { id: size?.id, name: size?.size }
      })
      setInitialSizeValue(sizesValue);
   }
   const getInitailColorValue = () => {
      let colorValue = sizes.map(size => {
         return size.colors.map(color => ({
            id: color?.id,
            name: color?.color,
            quantity: color?.quantity
         }));
      });
      setInitialColorValue(colorValue);
   };
   useEffect(() => {
      getInitialSizeValue();
      getInitailColorValue();
   }, [sizes])
   const handleSubmit = (e) => {
      e.preventDefault();
      const productData = {
         name,
         details: description,
         price,
         total_quantity: totalQuantity,
         sizes,
      };
      dispatch(editProduct({ id: editedProductData?.id, product: productData }))
         .then((res) => {
            if (res.type.includes('rejected')) {
               throw res.payload?.message || 'حدث خطاء اثناء تعديل المنتج حاول مرة اخري';;
            }
            Swal.fire({
               icon: 'success',
               text: `${res?.payload?.message}`,
            }).then(() => {
               navigate('/منتجات')
            });
         })
         .catch((error) => {
            Swal.fire({
               icon: 'error',
               text: `${error || 'حدث خطأ أثناء تعديل المنتج برجاء المحاولة مرة أخرى'}`,
            });
         });
   };
   
   return (
      <form onSubmit={handleSubmit} className="add-product-form me-2 me-md-4 mt-2">
         <div className="form-group">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-2 gap-md-0 mb-2">
               <label>اسم المنتج:</label>
               <input
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder='أدخل اسم المنتج'
               />
            </div>
         </div>
         <div className="form-group">
            <label className='mb-2 mb-sm-0'>السعر:</label>
            <input
               type="number"
               value={price}
               required
               onChange={(e) => setPrice(e.target.value)}
            />
         </div>
         <div className="form-group">
            <label className='mb-2 mb-sm-0'>الكمية الكلية:</label>
            <input type="number" value={totalQuantity} readOnly />
         </div>
         <div className="form-group d-flex flex-column flex-md-row gap-2 gap-md-0">
            <label className='mb-2 mb-sm-0'>تفاصيل :</label>
            <textarea
               rows="4"
               id="product-description"
               className="form-control"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
            ></textarea>
         </div>
         {
            sizes.map((size, sizeIndex) => (
               <div key={sizeIndex} className="form-group size-color-qty">
                  <label className='mb-2 mb-sm-0'>المقاس:</label>
                  <select value={size.size} onChange={(e) => handleSizeChange(sizeIndex, e.target.value)}>
                     {initialSizeValue[sizeIndex] && initialSizeValue[sizeIndex]?.id !== undefined
                        && <option
                           defaultChecked={true}
                           value={initialSizeValue[sizeIndex]?.id}
                           key={initialSizeValue[sizeIndex]?.id}
                        >
                           {initialSizeValue[sizeIndex]?.name}
                        </option>
                     }
                     <option value="">اختار المقاس</option>
                     {sizesData?.map((size) =>
                        <option
                           value={size?.id}
                           key={size?.id}
                        >{size?.name}</option>
                     )}
                  </select>
                  <div className=" d-flex flex-column">
                     {size?.colors?.map((color, colorIndex) => (
                        <div key={colorIndex}
                           className="align-items-center color-qty d-flex form-group gap-2 gap-sm-4"
                        >
                           <div className="color-qty-wrapper d-flex flex-column flex-md-row flex-fill ">
                              <div className="color">
                                 <label className='mb-2 mb-xl-0'>اللون:</label>
                                 <select
                                    className="custom-dropdown-menu"
                                    value={color.color}
                                    required
                                    onChange={(e) => handleColorChange(sizeIndex, colorIndex, 'color', e.target.value)}
                                 >
                                    {initialColorValue[sizeIndex] && initialColorValue[sizeIndex][colorIndex]
                                       && initialColorValue[sizeIndex][colorIndex]?.id !== undefined
                                       && (<option
                                          value={initialColorValue[sizeIndex][colorIndex]?.id}
                                          key={initialColorValue[sizeIndex][colorIndex]?.id}>
                                          {initialColorValue[sizeIndex][colorIndex]?.name}
                                       </option>)
                                    }
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
                                    defaultValue={initialColorValue[sizeIndex] && initialColorValue[sizeIndex][colorIndex]
                                       && initialColorValue[sizeIndex][colorIndex]?.quantity}
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
            title='تاكيد تعديل المنتج'
         >{isLoading ? 'يتم تعديل ....' : 'تاكيد'} </Button>
      </form>
   )
}

export default EditProductForm
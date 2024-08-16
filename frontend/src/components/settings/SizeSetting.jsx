import React, { useEffect } from 'react'
import SettingModel from './SettingModel'
import { useDispatch, useSelector } from 'react-redux';
import { addNewSize, editSize, fetchingSizes, removeSize } from '../../store/slices/sizeSlice';
import useDecumentTitle from '../../hooks/useDecumentTitle';
const SizeSetting = () => {
   const { sizes, status } = useSelector(state => state.sizes);
   const dispatch = useDispatch();
   useDecumentTitle('مخزنك - المقاسات')
   useEffect(() => {
      dispatch(fetchingSizes());
   }, [dispatch])
   return (
      <div>
         <SettingModel
            modelType={{ en: 'size', ar: 'مقاس' }}
            modelText={{ header: 'جميع المقاسات المتاحة', btn: 'اضافة مقاس جديد' }}
            data={sizes}
            status={status}
            fetchingData={fetchingSizes}
            removeFunction={removeSize}
            popAddFunc={addNewSize}
            popEditFunc={editSize}
            popFetchFunc={fetchingSizes}
         />
      </div>
   )
}

export default SizeSetting
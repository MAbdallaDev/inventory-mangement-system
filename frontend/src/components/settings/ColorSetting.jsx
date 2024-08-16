
import React, { useEffect } from 'react'
import SettingModel from './SettingModel'
import { useDispatch, useSelector } from 'react-redux';
import { addNewColor, editColor, fetchingColors, removeColor } from '../../store/slices/colorSlice';
import useDecumentTitle from '../../hooks/useDecumentTitle';

const ColorSetting = () => {
   const { colors, currentPage, totalPages, perPage, status } = useSelector(state => state.colors);
   const dispatch = useDispatch();
   useDecumentTitle('مخزنك - اللوان')

   useEffect(() => {
      dispatch(fetchingColors({}));
   }, [dispatch])
   return (
      <div>
         <SettingModel
            modelType={{ en: 'color', ar: 'لون' }}
            modelText={{ header: 'جميع الالوان المتاحة', btn: 'اضافة لون جديد' }}
            data={colors}
            status={status}
            currentPage={currentPage}
            totalPages={totalPages}
            perPage={perPage}
            fetchingData={fetchingColors}
            removeFunction={removeColor}
            popAddFunc={addNewColor}
            popEditFunc={editColor}
            popFetchFunc={fetchingColors}
         />
      </div>
   )
}

export default ColorSetting
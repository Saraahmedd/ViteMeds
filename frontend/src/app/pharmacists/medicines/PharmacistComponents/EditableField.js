import React, { useState } from 'react';
import {Button} from  '../../../../../components/Button';
import { useDispatch } from 'react-redux';
import { editMedicine } from '@/app/redux/actions/medicineActions';

function EditableField({  value, nameOfField ,id}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const dispatch=useDispatch()

  
  const handleSave = () => {
    dispatch(editMedicine(id, { [nameOfField]: editedValue }));


    setIsEditing(false);
  };

  return (
    <div>
      
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <Button
  text=""
  className="add-button btn-xs"
  onClick={handleSave}
  
/>

         
        </div>
      ) : (
        <div>
          <span>{value}</span>
          <Button
  text=""
  className="add-button btn-xs"
  onClick={() => setIsEditing(true)}
  
/>

          
        </div>
      )}
    </div>
  );
}

export default EditableField;

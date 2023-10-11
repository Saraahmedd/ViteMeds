import React, { useState } from 'react';
import {Button} from  '../../../../../components/Button';

function EditableField({  value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    // onSave(editedValue);
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

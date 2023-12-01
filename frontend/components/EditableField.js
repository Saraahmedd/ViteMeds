import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { editMedicine } from "@/app/redux/actions/medicineActions";

function EditableField({ value, nameOfField, id, hide, edit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log(nameOfField);
    let medicineIngredientsArray;
    if (nameOfField === "medicineIngredients") {
      medicineIngredientsArray = editedValue.split(",");
    }

    dispatch(
      editMedicine(id, {
        [nameOfField]: medicineIngredientsArray
          ? medicineIngredientsArray
          : editedValue,
      }),
    );

    setIsEditing(false);
    hide();
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="input-style border-primary rounded px-2"
          />
          <Button
            text="save and exit"
            className="add-button btn-sm "
            onClick={handleSave}
          />
        </div>
      ) : (
        <div>
          <span>{value}</span>
          {edit === true && (
            <Button
              text="edit"
              className="add-button btn-sm"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default EditableField;

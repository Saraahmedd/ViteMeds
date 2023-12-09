"use client";

import { addToCart, viewCart } from "@/app/redux/actions/cartActions";
import {
  addMedicine,
  editMedicine,
  getMedicinesAction,
} from "@/app/redux/actions/medicineActions";
import { BottomCallout } from "@/components/BottomCallout";
import { FileUpload } from "@/components/FileUpload";
import { Modal } from "@/components/Modal";
import { ProductCard } from "@/components/ProductCard";
import {
  Button,
  Card,
  Grid,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: null,
    quantity: "",
    medicinalUses: [],
    description: "",
    image: null,
    price: "",
    medicineIngredients: [],
  });
  const [visible, setVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = (name, value) => {
    console.log(value);
    if (name === "medicineIngredients" || name === "medicinalUses") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((ingredient) => ingredient.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileUpload = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleAddMedicine = () => {
    const combinedFormData = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        // Check if the key is an array (medicinalUses and medicineIngredients)
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            combinedFormData.append(`${key}[${index}]`, item);
          });
        } else {
          combinedFormData.append(key, formData[key]);
        }
      }
    }
    dispatch(addMedicine(combinedFormData));
  };

  const {
    success: addSuccess,
    error: addError,
    loading: addLoading,
  } = useSelector((state) => state.addMedicineReducer);
  const medicines = useSelector(
    (state) => state.getMedicinesReducer.medicines?.data
  );
  const medicinesLoading = useSelector(
    (state) => state.getMedicinesReducer.loading
  );
  const medUses = useSelector(
    (state) => state.getMedicinesReducer.medicines?.medUses
  );
  const cart = useSelector((state) => state.getCartReducer.cart);
  const [medUse, setMedUse] = useState({});
  const [name, setName] = useState({});

  const cartLoading = useSelector((state) => state.addToCartReducer.loading);
  useEffect(() => {
    dispatch(getMedicinesAction({ ...name, ...medUse }));
  }, [dispatch, name, medUse, cartLoading, addLoading]);
  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch, cartLoading]);

  function handleCartClick(e, medicine, q) {
    e.stopPropagation();
    dispatch(addToCart(medicine, q, true));

    // console.log(id);
  }

  function getMedicineNumberInCart(medicine) {
    const matchingCart = cart?.cart?.items.filter(
      (i) => i.medicine._id === medicine._id
    );
    if (matchingCart && matchingCart.length > 0) {
      const numInCart = matchingCart[0].quantity;
      return numInCart;
    } else {
      return 0;
    }
  }
  useEffect(() => {
    if (addSuccess) {
      setFormData({});
      setModalVisible(false);
    }
  }, [addLoading]);

  return (
    <Card className="grow flex-1">
      {addSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="Medicine added successfully"
          variant="success"
          visible={true}
          setVisible={setVisible}
        />
      )}

      {addError && (
        // Show error message for registration failure
        <BottomCallout
          message={addError || "Medicine already exists with that name"}
          variant="error"
          visible={true}
          setVisible={setVisible}
        />
      )}
      <h1 className="font-bold text-2xl">Products</h1>
      <br></br>
      <div className="flex justify-between">
        <TextInput
          onChange={(e) => setName({ name: { regex: e.target.value } })}
          type="search"
          className="w-60"
          placeholder="Search For Medicine"
        />
        {JSON.parse(localStorage.getItem("userInfo"))?.data.user.role ===
          "pharmacist" && (
          <Button
            variant="secondary"
            className=" px-4 py-2 rounded"
            onClick={() => setModalVisible(true)}
          >
            New Medicine
          </Button>
        )}
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <div className="p-4 flex flex-col">
          <h1 className="text-center">New Medicine</h1>
          <br />
          <TextInput
            placeholder="Name"
            className="w-full my-4 px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
            value={formData.name}
            error={
              addError && formData.name === null && "Please fill in this field"
            }
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
            errorMesssage={
              addError && formData.name === null && "Please fill in this field"
            }
          />
          <TextInput
            placeholder="Description"
            className="w-full my-4 px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            errorMesssage={
              addError &&
              formData.description == "" &&
              "Please fill in this field"
            }
          />
          <TextInput
            placeholder="Quantity"
            className="w-full my-4 px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
            type="number"
            value={formData.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
            error={
              addError &&
              formData.quantity === "" &&
              "Please fill in this field"
            }
            errorMessage={
              addError &&
              formData.quantity === "" &&
              "Please fill in this field"
            }
          />

          <TextInput
            placeholder="Medicine uses (Enter them comma separated)"
            className="w-full my-4 px-8 py-4 rounded-lg font-medium placeholder-gray-500 text-lg"
            value={formData.medicinalUses?.join(",")}
            onChange={(e) => handleInputChange("medicinalUses", e.target.value)}
            required
            error={addError && formData.medicinalUses == []}
            errorMessage={
              addError &&
              formData.medicinalUses == [] &&
              "Please fill in this field"
            }
          />
          <TextInput
            placeholder="Price"
            className="w-full my-4  px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            required
            errorMessage={
              addError && formData.price === "" && "Please fill in this field"
            }
            error={
              addError && formData.price === "" && "Please fill in this field"
            }
          />
          <TextInput
            className="w-full my-4 px-8 py-4 rounded-lg font-medium placeholder-gray-500 text-lg"
            placeholder="Medicine Ingredients (Enter them comma separated)"
            value={formData.medicineIngredients?.join(",")}
            onChange={(e) =>
              handleInputChange("medicineIngredients", e.target.value)
            }
            errorMessage={
              addError &&
              formData.medicineIngredients == [] &&
              "Please fill in this field"
            }
            error={
              addError &&
              formData.medicineIngredients == [] &&
              "Please fill in this field"
            }
            required
          />

          <FileUpload
            className="w-full my-4  px-8 py-4"
            placeholder="Image"
            callBackFiles={handleFileUpload}
            buttonText={"Upload image (PNG, JPEG, PNG only)"}
            required
          />
          <br></br>

          <Button className="self-end" onClick={handleAddMedicine}>
            Add Medicine
          </Button>
        </div>
      </Modal>
      <br></br>
      <select
        onChange={(e) =>
          setMedUse(
            e.target.value === ""
              ? {}
              : { medicinalUses: { in: e.target.value } }
          )
        }
        className="appearance-none w-60 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
      >
        <option className="bg-gray-800" value="">
          Select Medical Use
        </option>
        {medUses?.map((medUse, index) => (
          <option key={index} value={medUse} className="bg-gray-800">
            {medUse}
          </option>
        ))}
      </select>

      <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="mt-3 gap-4">
        {medicines?.map((item, index) => (
          <ProductCard
            key={item._id}
            id={item._id}
            name={item.name}
            image={`http://localhost:8080/${item.imageURL}`}
            price={item.price}
            initialQuantity={getMedicineNumberInCart(item)}
            cartHandler={handleCartClick}
            stock={item.quantity}
          />
        ))}
      </Grid>
    </Card>
  );
}

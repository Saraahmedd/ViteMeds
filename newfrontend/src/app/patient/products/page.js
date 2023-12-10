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
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../../../../public/loading.json";

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
    // console.log(value);
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
  const [initialLoad, setInitialLoad] = useState(false);

  const cartLoading = useSelector((state) => state.addToCartReducer.loading);
  useEffect(() => {
    dispatch(getMedicinesAction({ ...name, ...medUse }));
  }, [dispatch, name, medUse, addLoading]);
  useEffect(() => {
    dispatch(viewCart());
    // console.log("cart changed");
  }, [dispatch, cartLoading]);

  function handleCartClick(e, medicine, q) {
    e.stopPropagation();
    dispatch(addToCart(medicine, q, true));

    // // console.log(id);
  }
  useEffect(() => {
    if (medicines) setInitialLoad(true);
  }, [medicines]);

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
    <Card className="grow flex-1 flex flex-col">
      <h1 className="font-bold text-2xl mb-4">Medicines</h1>

      {initialLoad && (
        <>
          <div className="w-full flex flex-row gap-4">
            <TextInput
              onChange={(e) => setName({ name: { regex: e.target.value } })}
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-2 w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              type="search"
              className="flex-[3]"
              placeholder="Search For Medicine"
            ></TextInput>

            <Select
              placeholder={`\xa0\xa0\xa0Filter (By Medicinal Use)`}
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="ml-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              )}
              className="flex-[2]"
              onChange={(e) => {
                // console.log(e);
                setMedUse(e ? { medicinalUses: { in: e } } : {});
              }}
            >
              {medUses?.map((medUse, index) => (
                <SelectItem key={index} value={medUse}>
                  {`\xa0\xa0\xa0`}
                  {medUse}
                </SelectItem>
              ))}
            </Select>
          </div>
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

          <div className="flex justify-between">
            {JSON.parse(localStorage.getItem("userInfo"))?.data.user.role ===
              "pharmacist" && (
              <Button
                variant="secondary"
                className=" px-4 py-2 my-2 rounded"
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
                  addError &&
                  formData.name === null &&
                  "Please fill in this field"
                }
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                errorMesssage={
                  addError &&
                  formData.name === null &&
                  "Please fill in this field"
                }
              />
              <TextInput
                placeholder="Description"
                className="w-full my-4 px-8 py-4 rounded-lg font-medium   placeholder-gray-500 text-lg  "
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange("medicinalUses", e.target.value)
                }
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
                  addError &&
                  formData.price === "" &&
                  "Please fill in this field"
                }
                error={
                  addError &&
                  formData.price === "" &&
                  "Please fill in this field"
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

          <Grid
            numItems={1}
            numItemsMd={2}
            numItemsLg={3}
            className="mt-3 gap-4"
          >
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
        </>
      )}
      {!initialLoad && (
        <div className="flex-1 grow flex items-center justify-center">
          <Lottie
            animationData={LoadingAnimation}
            className="w-[15rem] h-[15rem]"
          />
        </div>
      )}
    </Card>
  );
}

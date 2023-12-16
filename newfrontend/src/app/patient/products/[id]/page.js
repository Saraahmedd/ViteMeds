"use client";
import "../button.css";
import { viewCart, addToCart } from "@/app/redux/actions/cartActions";
import {
  editMedicine,
  getMedicineAlternativeAction,
  getMedicineById,
} from "@/app/redux/actions/medicineActions";
import { EditButton } from "@/components/EditButton";
import { FileUpload } from "@/components/FileUpload";
import { Modal } from "@/components/Modal";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { MenuItem } from "@material-tailwind/react";
import {
  Badge,
  Button,
  Card,
  Col,
  Grid,
  Italic,
  ProgressBar,
  TextInput,
} from "@tremor/react";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newFile, setNewFile] = useState({});
  const [newPrice, setNewPrice] = useState("");
  const medicine = useSelector(
    (state) => state.getMedicineByIdReducer.medicine?.data
  );
  const cartItems = useSelector(
    (state) => state.getCartReducer.cart?.cart?.items
  );
  const medicineAlt = useSelector(
    (state) => state.getMedicineAlternativeReducer?.medicine?.alternatives
  );
  // console.log(medicineAlt);

  const [newIngredients, setNewIngredients] = useState([]);
  const cartLoading = useSelector((state) => state.addToCartReducer.loading);
  const editLoading = useSelector((state) => state.editMedicineReducer.loading);

  // const [MedicineNameElement]
  useEffect(() => {
    dispatch(getMedicineById(id));
    dispatch(viewCart());
    dispatch(getMedicineAlternativeAction(id));
  }, [dispatch, cartLoading, editLoading]);

  let colors = ["blue", "green", "red", "yellow", "purple", "pink"];

  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
  });

  function removeIngredient(id) { }
  function getMedicineNumberInCart(medicine) {
    const matchingCart = cartItems?.filter(
      (i) => i.medicine._id === medicine._id
    );
    if (matchingCart && matchingCart.length > 0) {
      const numInCart = matchingCart[0].quantity;
      return numInCart;
    } else {
      return 0;
    }
  }

  function newIngredient() {
    setNewIngredients((prevState) => [...prevState, ""]);
  }

  useEffect(() => {
    if (newIngredients.length === 0) {
      return;
    }
    const newIndex = newIngredients.length - 1;
    const newId = `newingredient${newIndex}`;
    const inputElement = document.getElementById(newId);
    if (inputElement) setTimeout(() => inputElement.focus(), 1);
  }, [newIngredients]);

  const [zoom, setZoom] = useState(1);
  const [quantityCart, setQuantityCart] = useState(
    getMedicineNumberInCart(medicine)
  );

  const [editIngredientsModal, setEditIngredientsModal] = useState(false);
  const [editPriceModal, setEditPriceModal] = useState(false);
  const [editPhotoModal, setEditPhotoModal] = useState(false);
  const [editQModal, seteditQModal] = useState(false);
  const [newQ, setNewQ] = useState("");
  function handleCartClick(e, medicine, q) {
    // console.log(q);
    dispatch(addToCart(medicine, q, true));
  }
  // CAN EDIT!!!
  const canEdit =
    JSON.parse(localStorage.getItem("userInfo"))?.data.user.role ===
    "pharmacist";
  const isAdmin =
    JSON.parse(localStorage.getItem("userInfo"))?.data.user.role ===
    "administrator";
  // JSON.parse(localStorage.getItem("user"))?.role === "pharmacist";
  // console.log(medicine?.medicineIngredients);

  function handleEditMedicine(field, value) {
    const formData = new FormData();
    if (field == "medicineIngredients") {
      // console.log(document.getElementById(`ingredient0`).value);
      for (let i = 0; i < medicine.medicineIngredients.length; i++) {
        // console.log("hena?????");
        formData.append(field, document.getElementById(`ingredient${i}`).value);
        // console.log("here");
      }
      for (let i = 0; i < newIngredients.length; i++)
        formData.append(
          field,
          document.getElementById(`newIngredient${i}`).value
        );
    } else formData.append(field, value);
    // console.log(formData);
    dispatch(editMedicine(id, formData));
  }

  return (
    <>
      <Modal
        visible={editIngredientsModal}
        setVisible={setEditIngredientsModal}
      >
        <h1 className="font-bold text-xl mb-2">Add/Edit Ingredients</h1>
        {medicine?.medicineIngredients?.map((ingredient, i) => {
          return (
            <div className="flex flex-row items-center justify-center">
              <TextInput
                id={`ingredient${i}`}
                className="my-2 me-2"
                key={`ing${i}`}
                defaultValue={ingredient}
              />
            </div>
          );
        })}
        {newIngredients?.map((ingredient, i) => {
          return (
            <div className="flex flex-row items-center justify-center">
              <TextInput
                id={`newIngredient${i}`}
                className="my-2 me-2"
                key={`ing${i}`}
                defaultValue={ingredient}
              />
              <div
                role="button"
                onClick={() => setVisible(false)}
                className="ms-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          );
        })}

        <div className="flex flex-row items-center justify-center">
          <TextInput
            onMouseDown={newIngredient}
            placeholder="New Ingredient"
            className="my-2 me-2"
          />
          <div
            role="button"
            style={{ visibility: "hidden" }}
            className="ms-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="w-full flex flex-row align-end justify-end mt-3">
          <Button
            onClick={() => {
              setEditIngredientsModal(false);
              handleEditMedicine("medicineIngredients", 0);
              setNewIngredients([]);
            }}
            variant="secondary"
            className="self-end me-8"
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal visible={editPriceModal} setVisible={setEditPriceModal}>
        <div className="flex flex-col h-full w-full">
          <h1 className="font-bold text-xl mb-2">Edit Item Price</h1>
          <div className="flex flex-row items-center justify-center">
            <TextInput
              onChange={(e) => setNewPrice(e.target.value)}
              defaultValue={medicine?.price}
              className="me-5"
            />
            USD
          </div>

          <div className="mt-auto mb-5 w-full flex flex-row align-end justify-end">
            <Button
              onClick={() => {
                setEditPriceModal(false);
                handleEditMedicine("price", newPrice);
              }}
              variant="secondary"
              className="self-end"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal visible={editQModal} setVisible={seteditQModal}>
        <div className="flex flex-col h-full w-full">
          <h1 className="font-bold text-xl mb-2">Edit Item Quantity</h1>
          <div className="flex flex-row items-center justify-center">
            <TextInput
              onChange={(e) => setNewQ(e.target.value)}
              defaultValue={medicine?.quantity}
              className="me-5"
            />
          </div>

          <div className="mt-auto mb-5 w-full flex flex-row align-end justify-end">
            <Button
              onClick={() => {
                seteditQModal(false);
                handleEditMedicine("quantity", newQ);
              }}
              variant="secondary"
              className="self-end"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal visible={editPhotoModal} setVisible={setEditPhotoModal}>
        <div className="flex flex-col flex-1 grow w-full">
          <h1 className="font-bold text-xl mb-2">Edit Item Photo</h1>
          <FileUpload callBackFiles={setNewFile} />

          <div className="mt-auto w-full flex flex-row align-end justify-end">
            <Button
              onClick={() => {
                handleEditMedicine("image", newFile);
                setEditPhotoModal(false);
              }}
              variant="secondary"
              className="self-end"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Card className="grow flex flex-1 flex-col">
        <Grid numItems={5} className="gap-4 grow flex-1 h-full">
          <Col numColSpan={2} className="flex-1 grow h-full">
            <Card className="h-full flex flex-col items-center justify-center text-center cardBgColor">
              <div className="w-full p-[5rem] flex grow-1 flex-1">
                <div className="absolute top-0 right-0 m-2">
                  <EditButton
                    canEdit={canEdit}
                    editFn={() => setEditPhotoModal(true)}
                  />
                </div>
                <ProductImage
                  style={{ transform: `scale(${zoom})` }}
                  url={"http://localhost:8080/" + medicine?.imageURL}
                />
              </div>
              {/* <div className="flex flex-row items-center justify-center">
                <svg
                  role="button"
                  onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mx-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5zm4.5 0a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center">{zoom * 100}%</p>
                <svg
                  role="button"
                  onClick={() => setZoom((z) => Math.min(z + 0.5, 3))}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mx-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5zm8.25-3.75a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5h-2.25v2.25a.75.75 0 01-1.5 0v-2.25H7.5a.75.75 0 010-1.5h2.25V7.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-full px-8">
                <ProgressBar className="mt-2" value={(zoom * 100) / 3} />
              </div> */}
            </Card>
          </Col>
          <Col numColSpan={3} className="h-full">
            <div className="h-full flex flex-col">
              <Card className="flex-1 grow cardBgColor p-8">
                <h1
                  className="font-bold text-[2.75rem]"
                  style={{ lineHeight: "2.75rem" }}
                >
                  {medicine?.name}
                </h1>
                <Italic>
                  <span className="text-gray-500 text-sm text-italic">
                    Used for {medicine?.medicinalUses?.join(", ")}
                  </span>
                </Italic>
                <div className="flex-row flex items-center">
                  <h1 className="font-bold text-xl mt-2 mr-2">
                    {medicine?.price} USD
                  </h1>
                  <EditButton
                    canEdit={canEdit}
                    editFn={() => setEditPriceModal(true)}
                  />
                </div>
                <p className="pr-8 mt-2">{medicine?.description}</p>
                <div className="flex flex-row mt-2 items-center">
                  {medicine?.medicineIngredients?.map((ing, i) => (
                    <Badge
                      className="mx-1"
                      key={`badge${i}`}
                      color={colors[i % colors.length]}
                    >
                      {ing.toUpperCase()}
                    </Badge>
                  ))}
                  <EditButton
                    canEdit={canEdit}
                    editFn={() => setEditIngredientsModal(true)}
                  />
                </div>
                {medicine?.quantity <= 0 && (
                  <Button variant="secondary" className="mt-4 mx-2" disabled>
                    Sold Out
                  </Button>
                )}

                {getMedicineNumberInCart(medicine) === 0 &&
                  !canEdit &&
                  !isAdmin &&
                  medicine?.quantity > 0 && (
                    <Button
                      className="mt-4"
                      onClick={(e) => handleCartClick(e, medicine, 1)}
                      icon={function () {
                        return (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-4 h-4"
                          >
                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                          </svg>
                        );
                      }}
                    >
                      <span className="text-white px-2">Add to Cart</span>
                    </Button>
                  )}
                {(getMedicineNumberInCart(medicine) > 0 ||
                  (canEdit && medicine?.quantity > 0)) && (
                    <>
                      <div className="flex flex-row items-center mt-4">
                        <p className="font-bold text-lg me-2">
                          {!isAdmin && <strong> Quantity: </strong>}
                          {canEdit && medicine.quantity}
                        </p>
                        <EditButton
                          canEdit={canEdit}
                          editFn={() => seteditQModal(true)}
                        />
                      </div>

                      <p>
                        {canEdit && (
                          <>
                            <strong>Sales: </strong> {medicine.sales}
                          </>
                        )}
                      </p>
                      {!canEdit && !isAdmin && (
                        <div className="flex flex-row items-center mt-2">
                          <div
                            role="button"
                            onClick={(e) => {
                              handleCartClick(e, id, quantityCart - 1);
                              setQuantityCart((q) => q - 1);
                            }}
                            className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 mr-3 hover:bg-white hover:text-black"
                          >
                            -
                          </div>

                          <span className="font-bold">
                            {getMedicineNumberInCart(medicine)}
                          </span>

                          <div
                            onClick={(e) => {
                              handleCartClick(e, id, quantityCart + 1);
                              setQuantityCart((q) => q + 1);
                            }}
                            role="button"
                            className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 ml-3 hover:bg-white hover:text-black"
                          >
                            +
                          </div>
                        </div>
                      )}
                      {!canEdit && !isAdmin && (
                        <Button
                          className="mt-4"
                          onClick={(e) =>
                            (window.location.href = "/patient/cart")
                          }
                          icon={function () {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-4 h-4"
                              >
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                              </svg>
                            );
                          }}
                        >
                          <span className="text-white px-2">View Cart</span>
                        </Button>
                      )}
                      {!canEdit && !isAdmin && (
                        <Button
                          variant="secondary"
                          className="mt-4 ml-2"
                          icon={function () {
                            return (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="white"
                                className="w-4 h-4"
                              >
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                              </svg>
                            );
                          }}
                        >
                          <span className="text-white px-2">Checkout</span>
                        </Button>
                      )}
                    </>
                  )}
                {canEdit && (
                  <Button
                    className="my-3"
                    onClick={(e) => {
                      medicine.status == "archived"
                        ? handleEditMedicine("status", "unarchived")
                        : handleEditMedicine("status", "archived");
                    }}
                    variant="primary"
                  >
                    <span className="text-white">
                      {medicine?.status == "archived" ? "Unarchive" : "Archive"}
                    </span>
                  </Button>
                )}
              </Card>
              {medicine?.quantity <= 0 && (
                <Card className="cardBgColor mt-2">
                  <h1 className="font-bold text-xl">
                    {medicine?.name} is sold out, check out these alternatives!
                  </h1>
                  <div className="flex flex-row mt-2">
                    {medicineAlt?.map((alternative, index) => {
                      return (
                        <Card>
                          <ProductCard
                            key={alternative._id}
                            id={alternative._id}
                            name={alternative.name}
                            image={`http://localhost:8080/${alternative.imageURL}`}
                            price={alternative.price}
                            initialQuantity={getMedicineNumberInCart(
                              alternative
                            )}
                            cartHandler={handleCartClick}
                            stock={alternative.quantity}
                          />
                        </Card>
                      );
                    })}
                  </div>
                </Card>
              )}{" "}
            </div>
          </Col>
        </Grid>
        {/* <h1 className="font-bold text-2xl">{dummyData.name}</h1> */}
      </Card >
    </>
  );
}

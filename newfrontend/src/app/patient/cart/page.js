"use client";
import { CartProductCard } from "@/components/CartProductCard";
import { BottomCallout } from "@/components/BottomCallout";
import { Button, Card, Grid } from "@tremor/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, viewCart } from "@/app/redux/actions/cartActions";
import { Alert } from "@material-tailwind/react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../public/loading.json";

export default function Cart() {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.getCartReducer.cart?.cart);
  const cartItems = useSelector(
    (state) => state.getCartReducer.cart?.cart?.items
  );

  const deleteFromCartSel = useSelector(
    (state) => state.deleteFromCartReducer.cart
  );
  function handleCartClick(e, medicine, q) {
    e.stopPropagation();
    dispatch(addToCart(medicine, q, true));
  }

  function getMedicineNumberInCart(medicine) {
    const matchingCart = cart?.items.filter(
      (i) => i.medicine._id === medicine._id
    );
    // console.log(cart);
    if (matchingCart && matchingCart.length > 0) {
      const numInCart = matchingCart[0].quantity;

      return numInCart;
    } else {
      return 0;
    }
  }
  const cartLoading = useSelector((state) => state.addToCartReducer.loading);
  const getCartLoading = useSelector((state) => state.getCartReducer.loading);
  const [initialLoad, setInitialLoad] = useState(false);
  useEffect(() => {
    dispatch(viewCart());
    // console.log("cart changed");
  }, [dispatch, cartLoading, deleteFromCartSel]);

  useEffect(() => {
    if (cartItems || getCartLoading == false) setInitialLoad(true);
  }, [cartItems, getCartLoading]);

  return (
    <>
      <Card className="grow flex-1 flex flex-col">
        <h1 className="font-bold text-4xl">Cart</h1>
        {initialLoad && (
          <>
            <Grid numItems={1} className="mt-3 gap-4">
              {!cartItems ||
                (cartItems && cartItems?.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <a
                      href="/patient/products"
                      className="text-center text-2xl text-blue-500 hover:underline"
                    >
                      <Alert className="mx-auto">
                        Your cart is empty. Let's do some shopping.
                      </Alert>
                    </a>
                  </div>
                ))}
              {cartItems?.map((item, index) => (
                <CartProductCard
                  key={item.medicine._id}
                  id={item.medicine._id}
                  name={item.medicine.name}
                  image={`http://localhost:8080/${item.medicine.imageURL}`}
                  price={item.medicine.price}
                  initialQuantity={getMedicineNumberInCart(item.medicine)}
                  cartHandler={handleCartClick}
                  stock={item.medicine.quantity}
                />
              ))}
            </Grid>
            <div className="w-full text-end mt-3">
              <p className="text-lg font-bold">Grand Total</p>
              <p className="text-xs font-normal">(incl. VAT 14%)</p>

              <p className="font-bold text-2xl mt-1">
                {" "}
                {localStorage.getItem("discount")
                  ? cart?.totalPrice.toFixed(2) *
                    localStorage.getItem("discount") *
                    1
                  : cart?.totalPrice.toFixed(2)}{" "}
                USD
              </p>
              <Button
                disabled={cartItems?.length === 0}
                onClick={() => {
                  window.history.pushState({}, "", "/patient/cart/checkout");
                  window.location.reload();
                }}
                className="mt-3 self-end"
                size="xl"
                variant="secondary"
              >
                Checkout
              </Button>
            </div>
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
    </>
  );
}

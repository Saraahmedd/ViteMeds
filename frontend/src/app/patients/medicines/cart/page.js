"use client";
import {
  addToCart,
  deleteFromCart,
  viewCart,
} from "@/app/redux/actions/cartActions";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.getCartReducer.cart);

  const addToCartSel = useSelector((state) => state.addToCartReducer.cart);

  const deleteFromCartSel = useSelector(
    (state) => state.deleteFromCartReducer.cart,
  );

  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch, addToCartSel, deleteFromCartSel]);

  function increaseCart(med) {
    dispatch(addToCart(med.medicine._id, 1));
  }

  function decreaseCart(med) {
    if (med.quantity === 1) {
      dispatch(deleteFromCart(med.medicine._id));
    }
    dispatch(addToCart(med.medicine._id, -1));
  }

  // const cart = "hi";

  return (
    <>
      <ul className="list-group">
        {cart &&
          cart.cart.items.map((item, index) => {
            return (
              <li key={item._id} className="list-group-item">
                <div className="d-flex flex-row align-items-center p-2">
                  <img
                    style={{ maxHeight: "100px" }}
                    className="me-2"
                    src={`http://localhost:8000/${item.medicine.imageURL}`}
                  />
                  <h3>
                    {item.medicine.name} ({item.quantity})
                  </h3>
                  <div className="flex-grow-1"></div>
                  <h5>
                    <Button onClick={() => decreaseCart(item)}>-</Button>
                    &nbsp;{item.quantity}&nbsp;
                    <Button onClick={() => increaseCart(item)}>+</Button>
                  </h5>
                </div>
              </li>
            );
          })}
        <li className="list-group-item text-end">
          <h3>Total: {cart && cart.cart.totalPrice} EGP</h3>
        </li>
      </ul>
      {cart && (
        <Button onClick={() => (window.location.href = "/patients/checkout")}>
          Checkout
        </Button>
      )}
    </>
  );
}

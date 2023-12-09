"use client";

import { addToCart, viewCart } from "@/app/redux/actions/cartActions";
import {
  editMedicine,
  getMedicinesAction,
} from "@/app/redux/actions/medicineActions";
import { ProductCard } from "@/components/ProductCard";
import { Card, Grid, Select, SelectItem, TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();

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
  }, [dispatch, name, medUse, cartLoading]);
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

  return (
    <Card className="grow flex-1">
      <h1 className="font-bold text-2xl">Products</h1>
      <br></br>
      <TextInput
        onChange={(e) => setName({ name: { regex: e.target.value } })}
        type="search"
        className="w-60"
        placeholder="Search For Medicine"
      ></TextInput>
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

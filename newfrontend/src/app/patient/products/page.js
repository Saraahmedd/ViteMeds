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
      <h1 className="font-bold text-2xl mb-4">Products</h1>

      <div className="w-full flex flex-row gap-4">
        <TextInput
          onChange={(e) => setName({ name: { regex: e.target.value } })}
          icon={
            () => (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-2 w-4 h-4">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            )
          }
          type="search"
          className="flex-[3]"
          placeholder="Search For Medicine"
        ></TextInput>

        <Select
          placeholder={`\xa0\xa0\xa0Filter (By Medicinal Use)`}
          icon={
            () => (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            )
          }
          className="flex-[2]"
          onChange={(e) => {
            console.log(e);
            setMedUse(e ? { medicinalUses: { in: e } } : {})
          }}>
          {medUses?.map((medUse, index) => (
            <SelectItem key={index} value={medUse}>
              {medUse}
            </SelectItem>
          ))}
        </Select>
      </div>

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

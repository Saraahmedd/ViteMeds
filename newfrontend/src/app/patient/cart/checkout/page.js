"use client"

import { viewCart } from "@/app/redux/actions/cartActions";
import { ProductImage } from "@/components/ProductImage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Card, Grid, TextInput, Select, SelectItem, Button } = require("@tremor/react")

function Checkout() {
    const [governorate, setGovernorate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [addNewAddress, setAddNewAddress] = useState(false);


    const dispatch = useDispatch();
    const cart = useSelector((state) => state.getCartReducer.cart?.cart);
    const cartItems = useSelector(
        (state) => state.getCartReducer.cart?.cart?.items
    );

    useEffect(() => {
        dispatch(viewCart());
    }, []);

    useEffect(() => {
        console.log("cart");
        console.log(cart);
    }, [cart]);


    return (
        <>
            <Card className="grow flex-1 flex flex-col">
                <h1 className="font-bold text-4xl">Checkout</h1>
                <Grid className="flex-1 grow mt-4" numItems={2}>
                    <div className="border-r-2 border-gray-800 h-full w-full p-5">
                        <h1 className="font-bold text-xl">Address & Payment</h1>
                        {addNewAddress &&
                            <>
                                <label for="address" className="font-semibold text-md">Street Name & House Number</label>
                                <TextInput id="address" className="mt-2" placeholder="Example: 14 Omar St." />

                                <div className="mt-3">
                                    <label for="country" className="font-semibold text-md">Country</label>
                                    <Select disabled value="Egypt" id="country" className="mt-2">
                                        <SelectItem value="Egypt">Egypt</SelectItem>
                                    </Select>
                                </div>

                                <div className="mt-3">
                                    <label for="gov" className="font-semibold text-md">Governorate</label>
                                    <Select id="gov" value={governorate} className="mt-2">
                                        <SelectItem>Alexandria</SelectItem>
                                        <SelectItem>Ad Daqahliyah</SelectItem>
                                        <SelectItem>Red Sea</SelectItem>
                                        <SelectItem>Beheira</SelectItem>
                                        <SelectItem>Faiyum</SelectItem>
                                        <SelectItem>Gharbiyah</SelectItem>
                                        <SelectItem>Minufiyah</SelectItem>
                                        <SelectItem>Minya</SelectItem>
                                        <SelectItem>Cairo</SelectItem>
                                        <SelectItem>Qalyubiyah</SelectItem>
                                        <SelectItem>Luxor</SelectItem>
                                        <SelectItem>New Valley</SelectItem>
                                        <SelectItem>Sharqiyah</SelectItem>
                                        <SelectItem>Suez</SelectItem>
                                        <SelectItem>Aswan</SelectItem>
                                        <SelectItem>Assiut</SelectItem>
                                        <SelectItem>South Sinai</SelectItem>
                                        <SelectItem>Kafr El Sheikh</SelectItem>
                                        <SelectItem>Matrouh</SelectItem>
                                        <SelectItem>Qena</SelectItem>
                                        <SelectItem>North Sinai</SelectItem>
                                        <SelectItem>Sohag</SelectItem>
                                    </Select>
                                </div>

                                <div className="mt-3 flex flex-row gap-x-2">
                                    <div className="flex-1">
                                        <label className="font-semibold text-md" for="district">District</label>
                                        <TextInput id="district" className="mt-2" placeholder="Example: Smouha" />
                                    </div>

                                    <div className="flex-1">
                                        <label className="font-semibold text-md" for="zip">Zip Code</label>
                                        <TextInput id="zip" className="mt-2" placeholder="Example: 21646" />
                                    </div>
                                </div>
                            </>
                        }
                        {!addNewAddress &&
                            <div className="mt-3 flex flex-col">
                                <label className="font-semibold text-md" for="myAddresses">Choose from Saved Addresses</label>
                                <Select className="mt-2" id="myAddresses">
                                    <SelectItem></SelectItem>
                                </Select>
                                <div role="button" onClick={() => setAddNewAddress(true)} className="flex-row flex items-center ms-auto mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-sm">
                                        Add New Address
                                    </p>
                                </div>
                            </div>
                        }

                        <div className="mt-3">
                            <label className="font-semibold text-md" for="paymentMethod">Payment Method</label>
                            {/* <Select id="paymentMethod" className="mt-2">
                                <SelectItem>Cash on Delivery</SelectItem>
                                <SelectItem>Card</SelectItem>
                                <SelectItem>Wallet</SelectItem>
                            </Select> */}
                            <div className="rounded-lg border border-gray-800 mt-2 overflow-hidden">
                                <div onClick={() => setPaymentMethod("COD")} role="button" className={`${paymentMethod === 'COD' ? 'bg-blue-950' : 'bg-gray-900'} h-[4rem] p-2 flex items-center`}>
                                    Cash on Delivery
                                </div>
                                <div onClick={() => setPaymentMethod("CARD")} role="button" className={`${paymentMethod === 'CARD' ? 'bg-blue-950' : 'bg-gray-900'} border-gray-800 border-t-2 h-[4rem] p-2 flex items-center`}>
                                    Card
                                </div>
                                <div onClick={() => setPaymentMethod("WALLET")} role="button" className={`${paymentMethod === 'WALLET' ? 'bg-blue-950' : 'bg-gray-900'} border-gray-800 border-t-2 h-[4rem] p-2 flex items-center`}>
                                    Wallet
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="border-l-1 border-gray-800 h-full w-full p-5">
                        <h1 className="font-bold text-xl">Cart Summary</h1>
                        <div className="rounded-lg border border-gray-800 mt-2 overflow-hidden">
                            {/* <div className={`bg-gray-900 h-[8rem] px-6 py-2 flex flex-row items-center`}>
                                <div className="w-[4rem] h-full">
                                    <ProductImage className="h-full" url={'/med1.png'} />
                                </div>
                                <div className="ml-6">
                                    <h1 className="font-bold text-lg">Medicine Example 1</h1>
                                    <h1 className="font-semibold text-sm">2 x 200 EGP</h1>
                                </div>
                                <div className="flex-1 grow justify-end">
                                    <p className="text-end font-bold">400 EGP</p>
                                </div>
                            </div>
                            <div className={`bg-gray-900 h-[8rem] px-6 py-2 flex flex-row items-center border-t-2 border-gray-800`}>
                                <div className="w-[4rem] h-full">
                                    <ProductImage className="h-full" url={'/med2.png'} />
                                </div>
                                <div className="ml-6">
                                    <h1 className="font-bold text-lg">Medicine Example 2</h1>
                                    <h1 className="font-semibold text-sm">2 x 200 EGP</h1>
                                </div>
                                <div className="flex-1 grow justify-end">
                                    <p className="text-end font-bold">400 EGP</p>
                                </div>
                            </div>
                            <div className={`bg-gray-900 h-[8rem] px-6 py-2 flex flex-row items-center border-t-2 border-gray-800`}>
                                <div className="w-[4rem] h-full">
                                    <ProductImage className="h-full" url={'/med3.png'} />
                                </div>
                                <div className="ml-6">
                                    <h1 className="font-bold text-lg">Medicine Example 3</h1>
                                    <h1 className="font-semibold text-sm">2 x 200 EGP</h1>
                                </div>
                                <div className="flex-1 grow justify-end">
                                    <p className="text-end font-bold">400 EGP</p>
                                </div>
                            </div> */}

                            {
                                cart.items.map((item, index) => (
                                    <div className={`${index !== 0 ? 'border-t-2' : ''} bg-gray-900 h-[8rem] px-6 py-2 flex flex-row items-center border-gray-800`}>
                                        <div className="w-[4rem] h-full">
                                            <ProductImage className="h-full" url={`http://localhost:8080/${item.medicine.imageURL}`} />
                                        </div>
                                        <div className="ml-6">
                                            <h1 className="font-bold text-lg">{item.medicine.name}</h1>
                                            <h1 className="font-semibold text-sm">{item.quantity} x {item.currentPrice} EGP</h1>
                                        </div>
                                        <div className="flex-1 grow justify-end">
                                            <p className="text-end font-bold">{item.currentPrice} EGP</p>
                                        </div>
                                    </div>
                                ))
                            }


                            <div className={`bg-gray-900 px-6 py-2 flex flex-row items-center border-t-2 border-gray-800`}>
                                <p className="font-bold text-end">Total</p>
                                <p className="ml-auto font-bold">{cart.totalPrice} EGP</p>
                            </div>


                        </div>

                        <div className="w-full text-end mt-4">
                            <Button><span className="text-white">Complete Order</span></Button>
                        </div>
                    </div>
                </Grid>
            </Card>
        </>
    )
}

export default Checkout;
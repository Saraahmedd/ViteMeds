"use client";

import { Modal } from "@/components/Modal";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Badge, Button, Card, Col, Grid, Italic, ProgressBar } from "@tremor/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SingleProduct() {
    const { id } = useParams();

    const dummyData = {
        id: 0,
        name: "Medicine Example 1",
        price: 200,
        quantity: 0,
        description: 'DESC',
        ingredients: ['ING', 'ENG', 'BNG', 'WNG', 'FNG'],
        medicinalUses: ['Headache', 'Stomach Ache', 'Pain Killer'],
        image: '/med1.png',
        remaining: 0,
        alternatives: [
            {
                id: 1,
                name: "Medicine Example 2",
                price: 200,
                image: '/med2.png'
            },
            {
                id: 2,
                name: "Medicine Example 3",
                price: 200,
                image: '/med3.png'
            }
        ]
    }

    // const [MedicineNameElement]

    function addToCart() {
        dummyData.quantity++;
    }

    let colors = ["blue", "green", "red", "yellow", "purple", "pink"]

    const [zoomStyle, setZoomStyle] = useState({
        transform: "scale(1)"
    });
    const [zoom, setZoom] = useState(1);
    const [quantity, setQuantity] = useState(dummyData.quantity);

    return (
        <>
            <Modal visible={true}>
                Hello
            </Modal>

            <Card
                className="grow flex flex-1 flex-col"

            >
                <Grid numItems={5} className="gap-4 grow flex-1 h-full">
                    <Col numColSpan={2} className="flex-1 grow h-full">
                        <Card
                            className="h-full flex flex-col items-center justify-center text-center cardBgColor">
                            <div className="w-full p-[5rem] flex grow-1 flex-1">
                                <ProductImage style={{ transform: `scale(${zoom})` }} url={dummyData.image} />
                            </div>
                            <div className="flex flex-row items-center justify-center">
                                <svg role="button" onClick={() => setZoom(z => Math.max(z - 0.5, 1))} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-2">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5zm4.5 0a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                </svg>
                                <p className="text-center">{(zoom) * 100}%</p>
                                <svg role="button" onClick={() => setZoom(z => Math.min(z + 0.5, 3))} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-2">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5zm8.25-3.75a.75.75 0 01.75.75v2.25h2.25a.75.75 0 010 1.5h-2.25v2.25a.75.75 0 01-1.5 0v-2.25H7.5a.75.75 0 010-1.5h2.25V7.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="w-full px-8">
                                <ProgressBar className="mt-2" value={(zoom * 100) / 3} />
                            </div>
                        </Card>
                    </Col>
                    <Col numColSpan={3} className="h-full">
                        <div className="h-full flex flex-col">
                            <Card className="flex-1 grow cardBgColor p-8">
                                <h1 className="font-bold text-[2.75rem]" style={{ lineHeight: '2.75rem' }}>{dummyData.name}</h1>
                                <Italic>
                                    <span className="text-gray-500 text-sm text-italic">Used for {dummyData.medicinalUses.join(", ")}</span>
                                </Italic>
                                <h1 className="font-bold text-xl mt-2">{dummyData.price} EGP</h1>

                                <p className="pr-8 mt-2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <div className="flex flex-row mt-2">
                                    {
                                        dummyData.ingredients.map((ing, i) => (
                                            <Badge className="mx-1" key={`badge${i}`} color={colors[i % colors.length]}>{ing}</Badge>
                                        ))
                                    }
                                </div>
                                {
                                    dummyData.remaining <= 0 &&
                                    <Button variant="secondary" className="mt-4" disabled>Sold Out</Button>
                                }
                                {dummyData.quantity === 0 && dummyData.remaining > 0 &&
                                    <Button
                                        className="mt-4"
                                        icon={
                                            function () {
                                                return (
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                    </svg>
                                                )
                                            }
                                        }><span className="text-white px-2">Add to Cart</span>
                                    </Button>
                                }
                                {dummyData.quantity > 0 && dummyData.remaining > 0 &&
                                    <>
                                        <p className="font-bold text-lg mt-4">Quantity&nbsp;</p>
                                        <div className="flex flex-row items-center mt-2">
                                            <div role="button" onClick={() => setQuantity(q => q - 1 > 0 ? q - 1 : 1)} className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 mr-3 hover:bg-white hover:text-black">
                                                -
                                            </div>

                                            <span className="font-bold">{dummyData.quantity}</span>

                                            <div onClick={() => setQuantity(q => q + 1)} role="button" className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 ml-3 hover:bg-white hover:text-black">
                                                +
                                            </div>
                                        </div>
                                        <Button
                                            className="mt-4"
                                            icon={
                                                function () {
                                                    return (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                        </svg>
                                                    )
                                                }
                                            }><span className="text-white px-2">View Cart</span>
                                        </Button>

                                        <Button
                                            variant="secondary"
                                            className="mt-4 ml-2"
                                            icon={
                                                function () {
                                                    return (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                                                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                        </svg>
                                                    )
                                                }
                                            }><span className="text-white px-2">Checkout</span>
                                        </Button>

                                    </>
                                }
                            </Card>
                            {dummyData.remaining <= 0 &&
                                <Card className="cardBgColor mt-2">
                                    <h1 className="font-bold text-xl">{dummyData.name} is sold out, check out these alternatives!</h1>
                                    <div className="flex flex-row mt-2">
                                        {
                                            dummyData.alternatives.map((alternative, index) => {
                                                return (
                                                    <Card>
                                                        <ProductCard id={alternative.id} name={alternative.name} image={alternative.image} price={alternative.price} initialQuantity={0} />
                                                    </Card>
                                                )
                                            })
                                        }
                                    </div>
                                </Card>
                            }                        </div>
                    </Col>
                </Grid>
                {/* <h1 className="font-bold text-2xl">{dummyData.name}</h1> */}
            </Card>
        </>
    );
}

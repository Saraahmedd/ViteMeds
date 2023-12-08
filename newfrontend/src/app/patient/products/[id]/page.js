"use client";

import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Card, Col, Grid, ProgressBar } from "@tremor/react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SingleProduct() {
    const { id } = useParams();

    const dummyData = {
        name: "Medicine Example 1",
        price: 200,
        quantity: 1,
        description: 'DESC',
        ingredients: ['ING', 'ENG'],
        image: '/med1.png',
        alternatives: [

        ]
    }

    const [zoomStyle, setZoomStyle] = useState({
        transform: "scale(1)"
    });
    const [zoom, setZoom] = useState(1);
    const [quantity, setQuantity] = useState(dummyData.quantity);

    return (
        <>
            <Card
                className="grow flex flex-1 flex-col"

            >
                <Grid numItems={5} className="gap-4 grow flex-1 h-full">
                    <Col numColSpan={2} className="h-full">
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
                        <Card className="h-full cardBgColor p-8">
                            <h1 className="font-bold text-[2.75rem]">{dummyData.name}</h1>
                            <h1 className="font-bold text-xl">{dummyData.price} EGP</h1>
                            <div className="flex flex-row items-center self-end lg:self-center">
                                <div role="button" onClick={() => setQuantity(q => q - 1 > 0 ? q - 1 : 1)} className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 mx-3 hover:bg-white hover:text-black">
                                    -
                                </div>

                                <span className="font-bold">{quantity}</span>

                                <div onClick={() => setQuantity(q => q + 1)} role="button" className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 mx-3 hover:bg-white hover:text-black">
                                    +
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Grid>
                {/* <h1 className="font-bold text-2xl">{dummyData.name}</h1> */}
            </Card>
        </>
    );
}

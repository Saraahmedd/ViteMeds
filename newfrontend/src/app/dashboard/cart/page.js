"use client"
import { CartProductCard } from "@/components/CartProductCard"
import { Button, Card, Grid } from "@tremor/react"



export default function Cart() {
    return (
        <>
            <Card className="grow flex-1">
                <h1 className="font-bold text-2xl">Cart</h1>

                <Grid numItems={1} className="mt-3 gap-4">
                    {
                        (Array.from({ length: 3 })).map((item, index) => (
                            <CartProductCard key={index} id={index} name="Medicine Example" image={`/med${(index % 3) + 1}.png`} price={200} initialQuantity={1} />
                        ))
                    }
                </Grid>

                <div className="w-full text-end mt-3">
                    <p className="text-lg font-bold">Grand Total</p>
                    <p className="text-xs font-normal">(incl. VAT 14%)</p>
                    

                    <p className="font-bold text-2xl mt-1">600 EGP</p>
                    <Button className="mt-3 self-end" size="xl" variant="secondary">Checkout</Button>
                </div>
            </Card>
        </>
    )
}
"use client";

import { ProductCard } from "@/components/ProductCard";
import { Card, Grid } from "@tremor/react";

export default function Dashboard() {
    return (
        <>
            <Card className="grow flex-1">
                <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-4">
                    {
                        (Array.from({ length: 6 })).map((item, index) => (
                            <ProductCard key={index} id={index} name="Medicine Example" image={`/med${(index % 3) + 1}.png`} price={200} initialQuantity={0} />
                        ))
                    }
                </Grid>
            </Card>
        </>
    );
}

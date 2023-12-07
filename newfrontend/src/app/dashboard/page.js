import { ProductCard } from "@/components/ProductCard";
import { Card, Grid } from "@tremor/react";

export default function Dashboard() {
    return (
        <>
            <Card className="grow flex-1">
                <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-2">
                    {
                        (Array.from({ length: 6 })).map((item, index) => (
                            <ProductCard />
                        ))
                    }
                </Grid>
            </Card>
            <ProductCard />
        </>
    );
}
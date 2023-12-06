import { Card } from "@tremor/react";
import GradientText from "./GradientText";

export default function Car({brand, year, model, color, licensePlateLetters, licensePlateNumbers}) {
    return (
        <>
            <Card className="my-3">
                <GradientText text="Car Details" wclass="text-2xl" />
                <h1>{color} {brand} {model} - {year}</h1>
                <h1>{licensePlateLetters} - {licensePlateNumbers}</h1>
            </Card>
        </>
    )
}
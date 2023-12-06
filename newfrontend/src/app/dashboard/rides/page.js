"use client"
import { Button, TextInput } from "@tremor/react";

export default function Rides() {
    function searchRide(e) {
        e.preventDefault();

        const id = e.target[0].value;

        window.location.replace(`/dashboard/rides/${id}`);
    }
    return (
        <>
            <form className="flex flex-row" onSubmit={searchRide}>
                <TextInput placeholder="Enter Ride Number" />
                <Button type="submit" size="xl" className="mx-2 px-5">Go</Button>
            </form>
        </>
    )
}
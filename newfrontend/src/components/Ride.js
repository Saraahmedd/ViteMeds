"use client"
import Link from "next/link";
import Car from "./Car";
import GradientText from "./GradientText";
import MinifiedUserCard from "./MinifiedUserCard";
import { Button, Callout } from "@tremor/react";
import { useState } from "react";
import CommunityCard from "./CommunityCard";

export default function Ride({ rideDetails }) {
    const [cancelled, setCancelled] = useState(false);

    function cancelRide() {
        const body = {
            id: rideDetails.id
        }
        fetch(`/api/staff/cancelride`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(() => {
            setCancelled(true);
        }).catch(console.error);
    }

    return (
        <>
            {
                cancelled &&
                <Callout className="my-2" color="teal" title="Success">Ride successfully cancelled.</Callout>
            }
            {
                rideDetails.status === "SCHEDULED" &&
                <div className="w-full flex flex-row">
                    <GradientText wclass="text-4xl" text={"Ride #" + rideDetails.id} />
                    <span className="flex-1" />
                    <Button onClick={cancelRide} color="red">Cancel Ride</Button>
                </div>
            }
            <p className="text-indigo-700"><Link target="_blank" href={`https://www.google.com/maps/dir/?api=1&origin=${rideDetails.fromLatitude},${rideDetails.fromLongitude}&destination=${rideDetails.toLatitude},${rideDetails.toLongitude}&travelmode=driving`}>View Trip on Google Maps</Link></p>

            <p><span className="font-bold">Status: </span>{rideDetails.status}</p>
            <p><span className="font-bold">From: </span>{rideDetails.mainTextFrom}</p>
            <p><span className="font-bold">To: </span>{rideDetails.mainTextTo}</p>
            <p><span className="font-bold">Price Per Seat: </span>{rideDetails.pricePerSeat} EGP</p>
            <p><span className="font-bold">Date & Time: </span>{new Date(rideDetails.datetime).toString()}</p>
            <p><span className="font-bold">Gender: </span>{rideDetails.gender}</p>
            <p><span className="font-bold">Created On: </span>{new Date(rideDetails.createdAt).toString()}</p>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
                <MinifiedUserCard {...rideDetails.Driver} driver={true} />
                {
                    rideDetails.Passengers.map((passenger, index) => (
                        <MinifiedUserCard {...passenger.User} passengerId={passenger.id} passengerPaymentMethod={passenger.paymentMethod} passengerStatus={passenger.status} />
                    ))
                }
            </div>
            <Car {...rideDetails.Car} />
            <CommunityCard {...rideDetails.Community} />
        </>
    );
}
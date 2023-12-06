import Ride from "@/components/Ride";
import { Card } from "@tremor/react";
import { cookies } from "next/dist/client/components/headers";

export default async function Rides({params}) {
    const id = params.id;
    async function loadRide() {
        const cookiesString = cookies().getAll()
        .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`)
        .join('; ');

        const response = await fetch(`http://3.73.222.159:3000/staff/ride?id=${id}`, {
            method: "GET",
            headers: {
                'Cookie': cookiesString
            }
        });

        const ride = await response.json();
        return ride;
    }

    return (
        <>
            <Card className="flex-1 grow">
                <Ride rideDetails={await loadRide()}/>
            </Card>
        </>
    )
}
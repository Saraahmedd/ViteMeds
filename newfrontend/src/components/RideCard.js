"use client"

import { Card } from "@tremor/react";
import Link from "next/link";

export default function RideCard({ id, mainTextFrom, mainTextTo, pricePerSeat, datetime, status }) {
    function getStatusColor(status) {
        switch (status) {
            case 'SCHEDULED':
                return 'text-yellow-600';
                break;
            case 'ONGOING':
                return 'text-indigo-600';
                break;
            case 'COMPLETED':
                return 'text-green-600';
                break;
            case 'CANCELLED':
                return 'text-red-600';
                break;
        }
    }
    return (
        <Link href={`/dashboard/rides/${id}`}>
            <Card className="hover:bg-gray-100 cursor-pointer">
                <p className="text-gray-500 text-sm">#{id} | {(new Date(datetime)).toDateString()} | <span className={getStatusColor(status)}>{status}</span></p>
                <p className="text-gray-500 text-sm">Price Per Seat: {pricePerSeat} EGP</p>
                <p className="text-md"><span style={{ fontWeight: 'bold' }}>From: </span>{mainTextFrom}</p>
                <p className="text-md"><span style={{ fontWeight: 'bold' }}>To: </span>{mainTextTo}</p>
            </Card>
        </Link>
    );
}
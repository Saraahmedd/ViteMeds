"use client"
import GradientText from "@/components/GradientText";
import LicenseCard from "@/components/LicenseCard";
import ProfilePicture from "@/components/ProfilePicture";
import RideCard from "@/components/RideCard";
import {checkResponse} from "@/helper";
import { Button, Callout, Card, Select, SelectItem, TextInput } from "@tremor/react";
import Image from "next/image";
import { useState } from "react";

export default function Users() {
    const [user, setUser] = useState(null);
    const [rides, setRides] = useState([]);
    const [licenses, setLicenses] = useState([]);

    const [updateSaved, setUpdateSaved] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const searchUser = (e) => {
        setUser(null);
        setRides([]);
        setUpdateSaved(false);

        e.preventDefault();
        const phoneNumber = e.target[0].value;

        fetch(`/api/staff/searchuser?phone=${encodeURIComponent(phoneNumber)}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then(async response => {
            if(!checkResponse(response)) {
                window.location.replace('/');
                return;
            }
            const user = await response.json();
            setUser(user);
            fetch(`/api/staff/userrides?uid=${user.id}`).then(async rides => {
                setRides(await rides.json());
            });

            fetch(`/api/staff/userlicenses?uid=${user.id}`).then(async licenses => {
                setLicenses(await licenses.json());
            });
        });
    };

    const saveUser = () => {
        fetch(`/api/staff/updateuser`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            if(!checkResponse(res)) {
                window.location.replace('/');
                return;
            }
            setUpdateSaved(true);
        }).catch(err => {
            setUpdateError(true);
        })
    }

    return (
        <>
            <form className="w-full flex" onSubmit={searchUser}>
                <TextInput
                    placeholder="Search User by Phone Number"
                />
                <Button className="ml-2" size="md" type="submit">Search</Button>
            </form>
            {
                user && (
                    <>
                        <Card className="grow flex-1 mt-4">
                            {updateSaved &&
                                <Callout className="mt-3 mb-3" title="User profile updated!"
                                    color="teal"
                                >
                                    Your changes have been saved.
                                </Callout>
                            }

                            {updateError &&
                                <Callout className="mt-3 mb-3" title="Error"
                                    color="red"
                                >
                                    An error occurred while trying to update user profile
                                </Callout>
                            }
                            <div className="flex flex-col justify-center md:justify-start md:flex-row items-center w-full">
                                <ProfilePicture size={100} src={user.profilePicture} />&nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                    <GradientText text={user.firstName + " " + user.lastName} wclass="text-4xl" />
                                    <div className="flex flex-row items-center justify-center md:justify-start">
                                        {
                                            [...Array(Math.round(user.rating))].map((value, index) => (
                                                <svg key={"star" + index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="indigo" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                                </svg>
                                            ))
                                        }
                                        <span className="text-indigo-900 text-sm font-bold">&nbsp;({user.numRatings})</span>
                                    </div>

                                </div>
                                <div className="flex-1" />
                                <Button className="justify-self-end" size="xl" color="emerald" onClick={saveUser}>Save User Account</Button>
                            </div>

                            <Card className="mt-4">
                                <h1 className="mb-4 text-xl">Customer Information</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-base text-sm font-medium text-gray-600">First Name</p>
                                        <TextInput
                                            value={user.firstName}
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setUser({
                                                    ...user,
                                                    firstName: newName
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-base text-sm font-medium text-gray-600">Last Name</p>
                                        <TextInput
                                            value={user.lastName}
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setUser({
                                                    ...user,
                                                    lastName: newName
                                                });
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-base text-sm font-medium text-gray-600">Phone Number</p>
                                        <TextInput
                                            value={user.phone}
                                            onChange={(e) => {
                                                const newPhone = e.target.value;
                                                setUser({
                                                    ...user,
                                                    phone: newPhone
                                                });
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-base text-sm font-medium text-gray-600">Email</p>
                                        <TextInput
                                            value={user.email}
                                            onChange={(e) => {
                                                const newEmail = e.target.value;
                                                setUser({
                                                    ...user,
                                                    email: newEmail
                                                });
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-base text-sm font-medium text-gray-600">Gender</p>
                                        <Select
                                            value={user.gender}
                                            onChange={(e) => {
                                                console.log(e);
                                                const newGender = e;
                                                setUser({
                                                    ...user,
                                                    gender: newGender
                                                });
                                            }}
                                        >
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                        </Select>
                                    </div>
                                    <div>
                                        <p className="text-base text-sm font-medium text-gray-600">Profile Picture URL</p>
                                        <TextInput value={user.profilePicture}
                                            onChange={(e) => {
                                                const newPicture = e.target.value;
                                                setUser({
                                                    ...user,
                                                    profilePicture: newPicture
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Card className="mt-3">
                                <h1 className="mb-4 text-xl">Customer Rides</h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {
                                        rides && rides.map(ride => (
                                            <RideCard
                                                key={"ride" + ride.id}
                                                id={ride.id}
                                                mainTextFrom={ride.mainTextFrom}
                                                mainTextTo={ride.mainTextTo}
                                                pricePerSeat={ride.pricePerSeat}
                                                datetime={ride.datetime}
                                                status={ride.status}
                                            />
                                        ))
                                    }
                                </div>
                            </Card>

                            <Card className="mt-3">
                                <h1 className="mb-4 text-xl">Customer Driver's License Requests</h1>
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    {
                                        licenses && licenses.map((license, index) => (
                                            <LicenseCard
                                                key={"license" + index}
                                                {...license}
                                            />
                                        ))
                                    }
                                </div>
                            </Card>
                        </Card>
                    </>
                )
            }
        </>
    );
}
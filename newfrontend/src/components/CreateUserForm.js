"use client"
import { Button, Callout, Card, Select, SelectItem, TextInput } from "@tremor/react";
import GradientText from "./GradientText";
import { useState } from "react";
import { checkResponse } from "@/helper";

export default function CreateUserForm() {
    const [role, setRole] = useState(null);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    function createUser(e) {
        e.preventDefault();
        const username = e.target[0].value;
        const password = e.target[1].value;
        const phone = e.target[2].value;

        const body = {
            username: username,
            password: password,
            phone: phone,
            role: role
        }
        fetch(`/api/staff/createuser`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            setUserCreated(true);
        }).catch(err => {
            setError(true);
        })
    }

    return (
        <>
            {userCreated && <Callout title="Success" color="teal" className="mb-2">User successfully created!</Callout>}
            {error && <Callout title="Error" color="red" className="mb-2">Error while creating user!</Callout>}
            <form onSubmit={createUser}>
                <TextInput placeholder="Username" type="text" className="my-4" />
                <TextInput placeholder="Password" type="password" className="my-4" />
                <TextInput placeholder="Phone" type="text" className="my-4" />
                <Select className="my-4" value={role} onValueChange={setRole}>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="CS">Customer Service</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                </Select>
                <Button type="submit">Create Account</Button>
            </form>
        </>
    );
}
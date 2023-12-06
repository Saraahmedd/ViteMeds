"use client"
import { Button, Select, SelectItem, TextInput } from "@tremor/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function EditStaffForm({id, username, role, phone}) {
    const [_role, setRole] = useState(role);

    const editStaff = (e) => {
        e.preventDefault();
        const newUsername = e.target[0].value;
        const newPassword = e.target[1].value;
        const newPhone = e.target[2].value;
        const newRole = _role;
        
        const body = {
            id: id,
            username: newUsername,
            phone: newPhone,
            role: newRole,
        };

        if(newPassword) {
            body.password = newPassword;
        }

        fetch(`/api/staff/editmember`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            window.location.replace('/dashboard/staff');
        }).catch(err => {
            console.error("An error occurred");
        })
    };

    return (
        <form onSubmit={editStaff}>
            <TextInput className="my-2" defaultValue={username} />
            <TextInput className="my-2" type="password" placeholder="New Password" />
            <TextInput className="my-2" defaultValue={phone} />
            <Select className="my-2" value={_role} onValueChange={setRole}>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="CS">Customer Service</SelectItem>
                <SelectItem value="MARKETING">Marketing</SelectItem>
            </Select>
            <Button className="my-2" type="submit">Submit Changes</Button>
        </form>
    );
}
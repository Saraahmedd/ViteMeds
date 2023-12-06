import CreateUserForm from "@/components/CreateUserForm";
import EditStaffForm from "@/components/EditStaffForm";
import GradientText from "@/components/GradientText";
import StaffMemberCard from "@/components/StaffMemberCard";
import { getHeaders } from "@/helper";
import { Button, Card, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, TextInput } from "@tremor/react";
import { cookies } from "next/dist/client/components/headers";
export default async function EditStaff({params}) {
    
    const id = params.id;
    async function getDetails() {
        const cookiesString = cookies().getAll()
        .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`)
        .join('; ');

        const response = await fetch(`http://3.73.222.159:3000/staff/memberdetails?id=${id}`, {
            method: "GET",
            headers: {
                'Cookie': cookiesString
            }
        });
        
        const member = await response.json();
        console.log(member);
        return member;
    }

    return (
        <Card className="grow flex-1">
            <EditStaffForm {...(await getDetails())} />
        </Card>
    );
}
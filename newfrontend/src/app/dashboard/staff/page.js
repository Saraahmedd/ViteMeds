import CreateUserForm from "@/components/CreateUserForm";
import GradientText from "@/components/GradientText";
import StaffMemberCard from "@/components/StaffMemberCard";
import { getHeaders } from "@/helper";
import { Button, Card, Select, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, TextInput } from "@tremor/react";
import { cookies } from "next/dist/client/components/headers";
export default async function Staff() {

    async function getStaff() {
        const cookiesString = cookies().getAll()
            .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`)
            .join('; ');

        const response = await fetch(`http://3.73.222.159:3000/staff/members`, {
            method: "GET",
            headers: {
                'Cookie': cookiesString
            }
        });
        const members = await response.json();

        return members.map((member, index) => (
            <StaffMemberCard key={"staff" + index} {...member} />
        ));
    }

    // getStaff();
    // console.log(staffMemberCards);

    return (
        <Card className="grow flex-1">
            <TabGroup>
                <TabList>
                    <Tab>Staff Members</Tab>
                    <Tab>New Member</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className="p-5">
                        <GradientText wclass="text-4xl" text="Staff Members" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 my-4">
                            {await getStaff()}
                        </div>
                    </TabPanel>
                    <TabPanel className="p-5">
                        <GradientText wclass="text-4xl" text="New User" />
                        <CreateUserForm />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
    );
}
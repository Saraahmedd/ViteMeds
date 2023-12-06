import AnnouncementBody from "@/components/AnnouncementBody";
import { Accordion, AccordionList, Button, Card } from "@tremor/react";
import { cookies } from "next/dist/client/components/headers";
import Link from "next/link";

export default async function Announcements() {
    async function getAnnouncements() {
        const cookiesString = cookies().getAll()
            .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)}`)
            .join('; ');

        const response = await fetch(`http://3.73.222.159:3000/staff/announcements`, {
            method: "GET",
            headers: {
                'Cookie': cookiesString
            }
        });

        const announcements = await response.json();

        return announcements.map((announcement, index) => (
            <AnnouncementBody key={"ann" + index} {...announcement} />
        ));
    }
    return (
        <>
            <Card className="grow flex-1">
                <div className="w-full text-end my-2">
                    <Link href="/dashboard/announcements/new"><Button>New Announcement</Button></Link>
                </div>
                <AccordionList className="my-2">
                    { await getAnnouncements() }
                </AccordionList>
            </Card>
        </>
    )
}
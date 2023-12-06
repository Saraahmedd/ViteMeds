"use client"
import { Accordion, AccordionBody, AccordionHeader, Button, Callout, DatePicker, Select, SelectItem, TextInput } from "@tremor/react";
import { useState } from "react";

export default function AnnouncementBody({ id, title, text, from, to, active }) {
    const [activity, setActivity] = useState(active + "");
    const [fromDate, setFromDate] = useState(new Date(from));
    const [toDate, setToDate] = useState(new Date(to));
    const [success, setSuccess] = useState(false);

    function updateAnnouncement(e) {
        e.preventDefault();

        const text = e.target[0].value;
        const body = {
            id: id,
            text: text,
            active: activity,
            from: fromDate.toISOString().slice(0, 19).replace('T', ' '),
            to: toDate.toISOString().slice(0, 19).replace('T', ' '),
        };

        fetch(`/api/staff/updateannouncement`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            setSuccess(true);
        }).catch(err => {
            console.error(err);
        })
    };

    return (
        <>
            <Accordion className="overflow-visible">
                <AccordionHeader>Announcement #{id} - {title}</AccordionHeader>
                <AccordionBody>
                    {success && <Callout title="Success!" color="teal">Announcement updated!</Callout>}
                    <form onSubmit={updateAnnouncement}>
                        <p className="my-2 font-bold">Announcement Text</p>
                        <div className="my-2 tremor-TextInput-root relative w-full flex items-center min-w-[10rem] outline-none rounded-tremor-default shadow-tremor-input dark:shadow-dark-tremor-input bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border border">
                            <textarea className="tremor-TextInput-input w-full focus:outline-none focus:ring-0 border-none bg-transparent text-tremor-default text-tremor-content-emphasis dark:text-dark-tremor-content-emphasis [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none pl-4 pr-4 py-2 placeholder:text-tremor-content dark:placeholder:text-dark-tremor-content" defaultValue={text} />
                        </div>

                        <p className="my-2 font-bold">Active From</p>
                        <DatePicker value={fromDate} onValueChange={setFromDate} />
                        <p className="my-2 font-bold">Active Until</p>
                        <DatePicker value={toDate} onValueChange={setToDate} />
                        <p className="my-2 font-bold">State</p>
                        <Select className="my-2" value={activity} onValueChange={setActivity}>
                            <SelectItem value="0">Inactive</SelectItem>
                            <SelectItem value="1">Active</SelectItem>
                        </Select>
                        <div className="w-full text-end my-2">
                            <Button type="submit">Update Announcement</Button>
                        </div>
                    </form>
                </AccordionBody>
            </Accordion>
        </>
    );
}
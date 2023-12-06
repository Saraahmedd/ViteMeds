"use client"

import { updateLicense } from "@/helper";
import { Button, Callout, Card, DatePicker, Select, SelectItem, Table, TableBody, TableCell, TableRow, TextInput } from "@tremor/react";
import { useState } from "react";

export default function LicenseCard({ id, front, back, issuedate, expirydate, licensenumber, nationalid, status, createdAt, layout = "minified", next = null }) {
    const [value, setValue] = useState(status);

    const [issueDateValue, setIssueDateValue] = useState(new Date(issuedate));
    const [expiryDateValue, setExpiryDateValue] = useState(new Date(expirydate));

    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(false);
    function saveLicense(e) {
        e.preventDefault();
        const newLicenseNumber = e.target[0].value;
        const newNationalId = e.target[1].value;
        const newStatus = value;
        const newIssueDate = issueDateValue.toISOString().slice(0, 19).replace('T', ' ');
        const newExpiryDate = expiryDateValue.toISOString().slice(0, 19).replace('T', ' ');
        console.log(issuedate);
        console.log(expirydate);

        updateLicense({ id, newLicenseNumber, newNationalId, newStatus, newIssueDate, newExpiryDate }).then(() => {
            setUpdated(true);
            if (next) { next(); }
        }).catch(err => {
            setError(true);
        });

    }

    return (
        <Card>
            {
                updated &&
                <Callout className="mt-3 mb-3" title="License Updated" color="teal" />
            }
            {
                error &&
                <Callout className="mt-3 mb-3" title="Error updating license!" color="red" />
            }
            <div className={`flex flex-col lg:${layout === "minified" ? "flex-col" : "flex-row"}`}>
                {/* <div className="flex flex-col lg:flex-row">
                    <img src={front} className="w-full lg:w-1/12" />
                    <img src={back} className="w-full lg:w-1/12" />
                </div> */}


                <div className={`${layout === 'expanded' ? `lg:w-5/12` : ``}`}>
                    <div className="w-full h-60">
                        <img src={front} className="w-full h-60" />
                    </div>
                    <div className="w-full h-60">
                        <img src={back} className="w-full h-60" />
                    </div>
                </div>

                <form onSubmit={saveLicense} className={layout === 'expanded' ? `lg:w-7/12` : ``}>
                    {/* <Table className="md:px-4">
                        <TableBody>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell className="table-row md:table-cell">License Number</TableCell>
                                <TableCell className="table-row md:table-cell"><TextInput defaultValue={licensenumber} /></TableCell>
                            </TableRow>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell className="table-row md:table-cell">National ID</TableCell>
                                <TableCell className="table-row md:table-cell"><TextInput defaultValue={nationalid} /></TableCell>
                            </TableRow>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell className="table-row md:table-cell">Status</TableCell>
                                <TableCell className="table-row md:table-cell">
                                    <Select value={value} onValueChange={setValue}>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="REJECTED">Rejected</SelectItem>
                                        <SelectItem value="APPROVED">Approved</SelectItem>
                                    </Select>
                                </TableCell>
                            </TableRow>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell className="table-row md:table-cell">Issue Date</TableCell>
                                <TableCell className="table-row md:table-cell"><DatePicker defaultValue={new Date(issuedate)} /></TableCell>
                            </TableRow>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell className="table-row md:table-cell">Expiry Date</TableCell>
                                <TableCell className="table-row md:table-cell"><DatePicker defaultValue={new Date(expirydate)} /></TableCell>
                            </TableRow>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell className="table-row md:table-cell">Uploaded On</TableCell>
                                <TableCell className="table-row md:table-cell">{(new Date(createdAt)).toDateString()}</TableCell>
                            </TableRow>
                            <TableRow className="text-center py-2 md:py-0 md:text-start">
                                <TableCell colSpan={2} className="text-center lg:text-end"><Button type="submit">{next ? "Save & Next" : "Save"}</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}

                    <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-9 py-4 lg:px-4">
                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">License Number</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={licensenumber} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">National ID</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={nationalid} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Status</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start">
                            <Select value={value} onValueChange={setValue}>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="REJECTED">Rejected</SelectItem>
                                <SelectItem value="APPROVED">Approved</SelectItem>
                            </Select>
                        </div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Issue Date</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><DatePicker value={issueDateValue} onValueChange={setIssueDateValue} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Expiry Date</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><DatePicker defaultValue={expiryDateValue} onValueChange={setExpiryDateValue} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Uploaded On</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start">{(new Date(createdAt)).toDateString()}</div>

                        <div className="col-span-3 text-center md:text-end"><Button type="submit">{next ? "Save & Next" : "Save"}</Button></div>
                    </div>

                </form>


            </div>
        </Card>
    );
}
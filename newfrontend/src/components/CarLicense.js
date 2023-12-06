"use client"

import { updateCar, updateLicense } from "@/helper";
import { Button, Callout, Card, DatePicker, Select, SelectItem, Table, TableBody, TableCell, TableRow, TextInput } from "@tremor/react";
import { useState } from "react";

export default function CarCard({ id, license_front, license_back, issuedate, expirydate, model, color, year, brand, licensePlateLetters, licensePlateNumbers, status, createdAt, layout = "minified", next = null }) {
    const [value, setValue] = useState(status);

    const oldIssueDate = issuedate ? new Date(issuedate) : new Date();
    const oldExpiryDate = expirydate ? new Date(expirydate) : new Date();

    const [issueDateValue, setIssueDateValue] = useState(oldIssueDate);
    const [expiryDateValue, setExpiryDateValue] = useState(oldExpiryDate);

    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState(false);
    function saveLicense(e) {
        e.preventDefault();
        const brand = e.target[0].value;
        const year = e.target[1].value;
        const model = e.target[2].value;
        const color = e.target[3].value;
        const licensePlateLetters = e.target[4].value;
        const licensePlateNumbers = e.target[5].value;

        const status = value;
        const issuedate = issueDateValue.toISOString().slice(0, 19).replace('T', ' ');
        const expirydate = expiryDateValue.toISOString().slice(0, 19).replace('T', ' ');

        updateCar({ id, brand, year, model, color, licensePlateLetters, licensePlateNumbers, status, issuedate, expirydate }).then(() => {
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
                <div className={`${layout === 'expanded' ? `lg:w-5/12` : ``}`}>
                    <div className="w-full h-60">
                        <img src={license_front} className="w-full h-60" />
                    </div>
                    <div className="w-full h-60">
                        <img src={license_back} className="w-full h-60" />
                    </div>
                </div>

                <form onSubmit={saveLicense} className={layout === 'expanded' ? `lg:w-7/12` : ``}>

                    <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-9 py-4 lg:px-4">
                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Brand</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={brand} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Year</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={year} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Model</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={model} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Color</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={color} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">License Letters</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={licensePlateLetters} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">License Numbers</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><TextInput defaultValue={licensePlateNumbers} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Issue Date</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><DatePicker value={issueDateValue} onValueChange={setIssueDateValue} enableYearNavigation={true} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Expiry Date</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start"><DatePicker defaultValue={expiryDateValue} onValueChange={setExpiryDateValue} enableYearNavigation={true} /></div>

                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Status</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start">
                            <Select value={value} onValueChange={setValue}>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="REJECTED">Rejected</SelectItem>
                                <SelectItem value="APPROVED">Approved</SelectItem>
                            </Select>
                        </div>


                        <div className="col-span-3 lg:col-span-1 text-center lg:text-start">Uploaded On</div>
                        <div className="col-span-3 lg:col-span-2 text-center lg:text-start">{(new Date(createdAt)).toDateString()}</div>

                        <div className="col-span-3 text-center md:text-end"><Button type="submit">{next ? "Save & Next" : "Save"}</Button></div>
                    </div>

                </form>


            </div>
        </Card>
    );
}
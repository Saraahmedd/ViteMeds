"use client"
import GradientText from "@/components/GradientText";
import LicenseCard from "@/components/LicenseCard";
import { Button, Card } from "@tremor/react";
import { useEffect, useState } from "react";

export default function Licenses() {
    const [licenses, setLicenses] = useState([]);
    const [currLicense, setCurrentLicense] = useState(null);

    const reloadLicenses = async () => {
        fetch(`/api/staff/pendinglicenses`).then(async res => {
            const data = await res.json();
            console.log(data);
            if (data.length === 0) {
                return setLicenses(null);
            }
            setCurrentLicense(data[0]);
            setLicenses(data.slice(1));
        });
    };

    const nextLicense = () => {
        if (licenses.length == 0) {
            setTimeout(reloadLicenses, 1000);
            return;
        }
        setCurrentLicense(licenses[0]);
        setLicenses(licenses.slice(1));
    }

    useEffect(() => {
        reloadLicenses();
    }, []);

    return (
        <>
            <Card className="grow flex-1 flex flex-col items-center justify-center">
                <GradientText wclass={'text-4xl text-center'} text="Driver's License Approvals" />
                {licenses &&
                    <>
                        <div className="w-full lg:w-10/12 mt-3">
                            {
                                currLicense &&
                                <LicenseCard
                                    key={(new Date()).getUTCMilliseconds()}
                                    id={currLicense.id}
                                    front={currLicense.front}
                                    back={currLicense.back}
                                    issuedate={currLicense.issuedate}
                                    expirydate={currLicense.expirydate}
                                    licensenumber={currLicense.licensenumber}
                                    nationalid={currLicense.nationalid}
                                    status={currLicense.status}
                                    createdAt={currLicense.createdAt}
                                    layout="expanded"
                                    next={nextLicense}
                                />
                            }
                        </div>
                        <div className="w-10/12 text-center md:text-end mt-3">
                            <Button onClick={nextLicense}>Skip</Button>
                        </div>
                    </>
                }
                {!licenses &&
                    <>
                        <GradientText wclass={'text-2xl'} text="All Done!" />
                    </>
                }
            </Card>
        </>
    )
}
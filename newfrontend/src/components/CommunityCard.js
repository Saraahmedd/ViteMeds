// "Community": {
//     "id": 2,
//     "name": "GUC",
//     "picture": "https://www.guc.edu.eg/img/guc_logo_og.png",
//     "description": "Description of community",
//     "joinQuestion": "What is your ID?",
//     "private": true,
//     "createdAt": "2023-07-12T20:47:33.000Z",
//     "updatedAt": "2023-07-12T20:47:33.000Z",
//     "OwnerId": null,
//     "UserId": null
// }

import { Card } from "@tremor/react";
import ProfilePicture from "./ProfilePicture";
import GradientText from "./GradientText";

export default function CommunityCard({ name, picture, description }) {
    return (
        <>
            <Card className="my-3">
                <GradientText text="Community Details" wclass="text-2xl" />
                <div className="flex flex-row items-center my-3">
                    <ProfilePicture src={picture} size={75} />
                    <p className="font-bold mx-3">{name}</p>
                </div>
                <p className="text-sm text-gray-600 my-3">{description}</p>
            </Card>
        </>
    );
}
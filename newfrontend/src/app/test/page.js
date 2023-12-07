"use client";

import PersonalCard from "@/components/PersonCard";
import { ProductCard } from "@/components/ProductCard";
import MembersTable from "@/components/Table";
import { Card, Grid } from "@tremor/react";

const data = {
  email: "john.doe@mail.com",
  birthdate: "Jan 1, 1990",
  username: "johndoe",
  speciality: "Marketing",
  educationalBackground: "Bachelor's in Marketing",
  affiliation: "Denva Corp",
};

const buttons = {
  right: {
    label: "Reject",
    onClick: () => console.log("Purple button clicked"),
  },
  left: {
    label: "Accept",
    onClick: () => console.log("Transparent button clicked"),
  },
};

export default function Dashboard() {
  return (
    <PersonalCard
      imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
      name="Michael Simbal"
      title="Marketing Exec. at Denva Corp"
      description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!"
      data={data}
      displayColumns={["Status", "Joined On"]}
      actualColumns={["status", "joinedOn"]}
      buttons={buttons}
      worker={true}
      fields={["email", "birthdate", "username", "speciality", "affiliation"]}
      displayNames={[
        "Email",
        "Birth Date",
        "Username",
        "Speciality",
        "Affiliation",
      ]}
    />
  );
}

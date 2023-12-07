"use client";
import PricingCard from "@/components/HealthPackagesCard";
import MyComponent from "@/components/PersonCard";

import { ProductCard } from "@/components/ProductCard";
import ChangePasswordModal from "@/components/ChangePassword";
import { Card, Grid } from "@tremor/react";
import MembersTable from "@/components/Table";
import ProfileCard from "@/components/ProfileCard";

export default function Dashboard() {
  return (
    <>
      <Card className="grow flex-1">
        <Grid numItems={1} numItemsMd={2} numItemsLg={3} className="gap-2">
          {Array.from({ length: 6 }).map((item, index) => (
            <ProductCard />
          ))}
        </Grid>
        <MyComponent />

        <PricingCard />
        <ChangePasswordModal />
      </Card>

      <MembersTable />
      <ProductCard />
      <ProfileCard />
    </>
  );
}

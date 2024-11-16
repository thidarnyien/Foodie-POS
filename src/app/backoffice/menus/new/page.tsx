
// import { BackofficeLayout } from "@/components/BackofficeLayout";
"use server";

import { prisma } from "@/libs/prisma";
import NewMenuForm from "./NewMenuForm";
import { getCompanyAddonCategories, getCompanyMenuCategories } from "@/libs/actions";

export default async function NewMenuPage() {
  const menuCategories = await getCompanyMenuCategories();
  
  return (
    <>
      <h3>New Menu</h3>
      <NewMenuForm menuCategories={menuCategories}/>
    </>
  );
}

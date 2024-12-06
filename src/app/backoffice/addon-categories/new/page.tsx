"use server";

import { getCompanyMenus } from "@/libs/actions";
import NewMenuCategoryPage from "../../menu-categories/new/page";
import NewAddonCategoryForm from "./NewAddonCategoryForm";

export default async function NewAddonCategoryPage() {
  const menus = await getCompanyMenus();

  return <NewAddonCategoryForm menus={menus}/>
}

"use server"

import { getMenu, updateMenu } from "../actions";

import { getCompanyAddonCategories, getCompanyMenuCategories } from "@/libs/actions";
import { UpdateMenuForm } from "./UpdateMenuForm";

interface props{
  params: {id:string}
}

export default async function MenuUpdatePage({params}:props) {
  
  const {id} = params;

  const menu = await getMenu(Number(id));
  const selectedMenuCategories = menu.menuCategoriesMenus.map(( item=> item.menuCategoryId))
  const isAvailable = menu.DisabledLocationsMenus.find(item => item.menuId === Number(id)) ? false : true;
  const menuCategories = await getCompanyMenuCategories();
  const addonCategories = await getCompanyAddonCategories();
  const selectedAddonCategories = menu.menusAddonCategories.map((item=> item.addonCategoryId));
  return <UpdateMenuForm selectedMenuCategories={selectedMenuCategories} selectedAddonCategories = {selectedAddonCategories} menu={menu} menuCategories={menuCategories} isAvailable = {isAvailable} addonCategories = {addonCategories}/>


}
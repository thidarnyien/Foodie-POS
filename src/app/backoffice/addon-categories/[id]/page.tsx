
import {  getAddonCategory} from "../actions";
import { getCompanyMenus } from "@/libs/actions";
import UpdateAddonCategoryForm from "./UpdateAddonCategory";

interface Props {
  params: {
    id: string;
  };
}
export default async function AddonCategoryUpdatePage({ params }: Props) {
  const {id} = params;
  const addonCategory = await getAddonCategory(Number(id));
  const menus = await getCompanyMenus();
  const selected = addonCategory?.menusAddonCategories.map(item=> item.menuId);

  return <UpdateAddonCategoryForm addonCategory={addonCategory} selected={selected} menus={menus}/>
    // console.log("hello update page")
}
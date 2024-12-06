
import { getAddon } from "../actions";
import { getCompanyAddonCategories } from "@/libs/actions";
import UpdateAddonForm from "./UpdateAddonForm";

interface props{
  params: {id:string}
}

export default async function AddonUpdatePage({params}:props) {
  
  const {id} = params;

  const addon = await getAddon(Number(id));
  const addonCategories = await getCompanyAddonCategories();

  return <UpdateAddonForm addon={addon} addonCategories={addonCategories}/>
}
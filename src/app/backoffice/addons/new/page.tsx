
import { getCompanyAddonCategories } from "@/libs/actions";
import NewAddonForm from "./NewAddonForm";

  
  export default async function NewAddonPage() {
    
    const addonCategories = await getCompanyAddonCategories();
  
    return <NewAddonForm addonCategories={addonCategories}/>
  }
  
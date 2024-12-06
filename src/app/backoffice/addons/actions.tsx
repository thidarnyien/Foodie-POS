"use server"
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import {number, z} from "zod";

const FormSchema = z.object({
    id: z.number({message: "Id is required"}),
    price : z.number({message: "Price must be number"}),
    name: z.string().min(2, {message: "Name must be at least two characters"}),
    isAvailable : z.boolean()
})

const createAddonValidate = FormSchema.omit({id : true});
const deleteAddonValidate = FormSchema.pick({id: true});
const updateAddonValidate = FormSchema.omit({isAvailable: true})

export async function getAddon(id: number){
    
    const addon = await prisma.addons.findFirst({where: {id}});
    if(!addon) return redirect("/backoffice/addons");
    return addon;
}

export async function createNewAddon(formData: FormData){
    try {
        const{name, price, isAvailable} = createAddonValidate.parse({
            name : formData.get("name"),
           price : Number(formData.get("price")),
           isAvailable : formData.get("isAvailable")? true: false,
       })
       // console.log(formData);
       
       const addonCategoryId = formData.get("addonCategoryId");
   
       const menu = await prisma.addons.create({data: {
           name,
           price,
           isAvailable,
           addonCategoryId: Number(addonCategoryId)
   
       }})
    } catch (error) {
        console.log(error);
        if(error instanceof z.ZodError){
            return {errors: error.errors}
        }else{
            return {errors: [{message: "Something went wrong. Please contact our support"}]}
        }
        
    }
    
    redirect("/backoffice/addons");
    
}

export async function updateAddon(formData: FormData){

    try{
        const {id, name,price} = updateAddonValidate.parse({
            id : Number( formData.get("id")),
            name : formData.get("name") as string,
            price : Number(formData.get("price"))
       })
       // console.log(formData);
       
       const isAvailable = formData.get("isAvailable")? true: false;
       const addonCategoryId = formData.get("addonCategoryId");
       await prisma.addons.update({
           data: {
               id,
               name,
           price,
           isAvailable,
           addonCategoryId: Number(addonCategoryId)
           },
           where: {id: Number(id)}
       });
    } catch(error){
        if(error instanceof z.ZodError){
            return {errors: error.errors}
        }else{
            return {errors: [{message: "Something not quite right. Please contact our support"}]}
        }
    }
    redirect("/backoffice/addons");
}

export async function deleteAddon(formData: FormData) {
    try {
        const {id} = deleteAddonValidate.parse({
            id : Number(formData.get("id"))
        })
        
        
        await prisma.addons.update({
            data: {isArchived: true},
          where: { id },
        });
    } catch (error) {
        if(error instanceof z.ZodError){
            return {erros: error.errors}
        }else{
            return {errors: [{message: "Something not quite right. Please contact our support"}]}
        }
    }
    redirect("/backoffice/addons");
  }
  
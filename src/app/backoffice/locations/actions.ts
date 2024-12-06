"use server";
import { getCompanyId, getCompanyLocations, getSelectedLocation } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { createRouteLoader } from "next/dist/client/route-loader";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";
import {z} from "zod";

const FormSchema = z.object({
    id: z.number(),
    name: z.string({message: "Name is required"}),
    phone: z.string({message: "Phone is required"}),
    address: z.string().min(5, {message: "Address must be at least 5 characters long"})
})

const createLocationValidate = FormSchema.omit({
    id: true, address: true
})
 const updateLocationValidate = FormSchema.omit({
    address: true
 })
const deleteLocationValidate  = FormSchema.pick({
    id: true
})

export async function createLocation(formData: FormData){
  try {
    const {name,phone} = createLocationValidate.parse({
         name : formData.get("name") as string,
         phone : formData.get("phone") as string,
         
    })
    const address = formData.get("address") as string
     await prisma.locations.create({data: {
        name,
        phoneNumber: phone,
        address,
     companyId: (await getCompanyId()) as number,
     }});
  } catch (error) {
    if(error instanceof z.ZodError){
        return {errors: error.errors}
    }else{
        return {errors: [{message: "Something went wrong"}]}
    }
  }
    redirect("/backoffice/locations");
}

export async function getLocation(id: number){
    const location = await prisma.locations.findFirst({where: {id}})
    if(!location) return redirect("/backoffice/locations");
    return location;
}

export async function updateLocation(formData: FormData){
   try {
    const {id,name,phone} = updateLocationValidate.parse({
        id : Number(formData.get("id")),
        name : formData.get("name") as string,
        phone : formData.get("phone")
    })
   
    const phoneNumber = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const selectedLocation = await getSelectedLocation();
    const isSelected = Boolean(formData.get("selected"));
  
    await prisma.locations.update({data:{
        name,address,companyId: (await getCompanyId()) as number,phoneNumber
    },where: {id}});

    if(isSelected){
       await prisma.selectedLocations.update({data: {
        userId: selectedLocation?.userId, 
        locationId: Number(id)
       }, where: { id: selectedLocation?.id}})
    }else{
        await prisma.selectedLocations.update({data: {
            userId: selectedLocation?.userId,
            locationId: (await getCompanyLocations())[0].id,
        },where: {id : selectedLocation?.id}})
    }

   } catch (error) {
    if(error instanceof z.ZodError){
        return {errors: error.errors}
    }else{
        return {errors: [{message: "Something went wrong"}]}
    }
   }
    redirect("/backoffice/locations")
}

export async function deleteLocation(formData: FormData){
    try {
        const {id} = deleteLocationValidate.parse({
            id: Number(formData.get("id"))
        })
        
        await prisma.locations.delete({where: {id}});
    } catch (error) {
        if(error instanceof z.ZodError){
            return {errors: error.errors}
        }else{
            return {errors: [{message: "Something went wrong"}]}
        }
    }
    redirect("/backoffice/locations")
}
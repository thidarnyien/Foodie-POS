"use server";
import { getCompanyId, getCompanyLocations, getSelectedLocation } from "@/libs/actions";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export async function createLocation(formData: FormData){
   const name = formData.get("name") as string;
   const phone = formData.get("phone") as string;
   const address = formData.get("address") as string;
  
    await prisma.locations.create({data: {
       name,
       phoneNumber: phone,
       address,
    companyId: (await getCompanyId()) as number,
    }});
    redirect("/backoffice/locations");
}

export async function getLocation(id: number){
    const location = await prisma.locations.findFirst({where: {id}})
    if(!location) return redirect("/backoffice/locations");
    return location;
}

export async function updateLocation(formData: FormData){
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
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

    redirect("/backoffice/locations")
}

export async function deleteLocation(formData: FormData){
    const id = Number(formData.get("id"));
    await prisma.locations.delete({where: {id}});
    redirect("/backoffice/locations")
}
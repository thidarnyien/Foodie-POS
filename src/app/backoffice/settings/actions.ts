"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getCompany(id: number){
    return await prisma.company.findFirst({where: {id}});
}


export async function updateCompany(formData: FormData){
    const name = formData.get("name") as string;
    const id = Number(formData.get("id"));
    const phoneNumber = formData.get("phoneNumber") as string;
    const address = formData.get("address") as string;

    await prisma.company.update({data: {
        name,
        phoneNumber,
        address
    }, where: {
        id
    }})

    redirect("/backoffice/settings");
}
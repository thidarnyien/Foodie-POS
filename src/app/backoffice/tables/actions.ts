"use server";
import qrCode from "qrcode";
import { put } from "@vercel/blob";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { config } from "@/config";
import { Prisma, Tables } from "@prisma/client";
import { getSelectedLocation } from "@/libs/actions";
import { Scale } from "@mui/icons-material";


export async function createNewTable(formData: FormData){
    const tableNo = formData.get("tableNo") as string;

    const table = await prisma.tables.create({data: {
        tableNo,
        locationId: (await getSelectedLocation())?.locationId as number,
        qrCodeImageUrl: ""
    }});
  
    

    await prisma.tables.update({data: {...table, qrCodeImageUrl: await getQrCodeImageUrl(table)}, where: {id: table.id}});
   
    redirect("/backoffice/tables");
}

export async function getTable(id: number){

    const table = await prisma.tables.findFirst({where: {id}})
    if(!table) return redirect("/backoffice/tables");
    return table;
}

export async function updateTable(formData: FormData){
    const tableNo = formData.get("tableNo") as string;
    const id = formData.get("id");
  
    await prisma.tables.update({data: {
        tableNo,
        id: Number(id),
        locationId: (await getSelectedLocation())?.locationId as number
    }, where:{id: Number(id)}});

    redirect("/backoffice/tables")
}


export async function deleteTable(formData: FormData){
    const id = Number(formData.get("id"));
    await prisma.tables.update({data: {isArchived: true},where: {id}});
    redirect("/backoffice/tables")
}

export async function getQrCodeImageUrl(table : Tables){
    const orderAppUrl = `${config.orderAppUrl}?tableId=${table.id}`
    const qrCodeImage = await qrCode.toBuffer(orderAppUrl, {scale: 7});
    const { url } = await put(`foodie-pos/table-${table.id}.png`, qrCodeImage, { access: 'public' });
    return url;
}
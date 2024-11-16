import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const menuCategories = await prisma.menuCategories.findMany();
  return NextResponse.json({ menuCategories }, { status: 200 });
}

export async function POST(req: Request) {
  const menuCategory = await req.json();
  const isValid = menuCategory.name;
  if (!isValid)
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  await prisma.menuCategories.create({
    data: {
      name: menuCategory.name,
      isAvailable: menuCategory.isAvailable
    },
  });
  return NextResponse.json(null, { status: 200 });
}

export async function PUT(req: Request){
  const menuCategory = await req.json();
  const {id,name, isAvailable} = menuCategory;
  await prisma.menuCategories.update({data: {
      name,
      isAvailable,
  }, where: {id: Number(id)}})
  return NextResponse.json(null, {status: 200});
}
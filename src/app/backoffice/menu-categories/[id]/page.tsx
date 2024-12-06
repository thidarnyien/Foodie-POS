import { prisma } from "@/libs/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteMenuCategory, updateMenuCategory } from "../actions";
import { getCompanyId } from "@/libs/actions";
import UpdateMenuCategoryForm from "./UpdateMenuCategoryForm";
import { Prisma } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}

export type MenuCategoryType = Prisma.MenuCategoriesGetPayload<{
  include: {DisabledLocationsMenuCategories: true}
}>

export default async function MenuUpdatePage({ params }: Props) {
  const { id } = params;
  const companyId = await getCompanyId();
  const menuCategory : MenuCategoryType | null = await prisma.menuCategories.findFirst({
    where: { id: Number(id) }, include: {DisabledLocationsMenuCategories: true}
  });

  const isAvailable = menuCategory?.DisabledLocationsMenuCategories.length ? false : true; // length 0 ဆိုရင် false so yin 

  return <UpdateMenuCategoryForm menuCategory={ menuCategory } companyId={companyId} isAvailable={isAvailable} />
}
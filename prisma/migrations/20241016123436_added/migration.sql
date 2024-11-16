-- CreateTable
CREATE TABLE "DisabledLocationsMenus" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "DisabledLocationsMenus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisabledLocationsMenuCategories" (
    "id" SERIAL NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "DisabledLocationsMenuCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisabledLocationsMenus" ADD CONSTRAINT "DisabledLocationsMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationsMenus" ADD CONSTRAINT "DisabledLocationsMenus_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationsMenuCategories" ADD CONSTRAINT "DisabledLocationsMenuCategories_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisabledLocationsMenuCategories" ADD CONSTRAINT "DisabledLocationsMenuCategories_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

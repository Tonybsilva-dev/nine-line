/*
  Warnings:

  - The primary key for the `_space_amenities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_space_amenities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_space_amenities" DROP CONSTRAINT "_space_amenities_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_space_amenities_AB_unique" ON "_space_amenities"("A", "B");

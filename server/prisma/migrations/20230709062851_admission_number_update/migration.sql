/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admission_number]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "hashed_password",
ALTER COLUMN "image_url" DROP NOT NULL,
ALTER COLUMN "date_of_birth" DROP NOT NULL,
ALTER COLUMN "gender" DROP NOT NULL,
ALTER COLUMN "batch" DROP NOT NULL,
ALTER COLUMN "branch" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_admission_number_key" ON "Student"("admission_number");

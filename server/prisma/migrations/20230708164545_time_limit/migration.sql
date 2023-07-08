/*
  Warnings:

  - Added the required column `time_limit` to the `CourseModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseModule" ADD COLUMN     "time_limit" INTEGER NOT NULL;

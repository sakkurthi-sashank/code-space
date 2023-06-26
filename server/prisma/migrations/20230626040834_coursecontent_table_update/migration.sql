/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_courseId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- CreateTable
CREATE TABLE "CourseContent" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "courseId" TEXT NOT NULL,
    "contentName" TEXT NOT NULL,
    "courseContentStartDate" TIMESTAMP(3) NOT NULL,
    "courseContentEndDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `rutine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `students` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_rutine_id_fkey";

-- DropTable
DROP TABLE "rutine";

-- DropTable
DROP TABLE "students";

-- CreateTable
CREATE TABLE "Students" (
    "roll_no" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "sem" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("roll_no")
);

-- CreateTable
CREATE TABLE "Rutine" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "st_id" INTEGER NOT NULL,

    CONSTRAINT "Rutine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rutine" ADD CONSTRAINT "Rutine_st_id_fkey" FOREIGN KEY ("st_id") REFERENCES "Students"("roll_no") ON DELETE RESTRICT ON UPDATE CASCADE;

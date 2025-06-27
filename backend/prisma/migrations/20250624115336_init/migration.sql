-- CreateTable
CREATE TABLE "students" (
    "roll_no" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "sem" TEXT NOT NULL,
    "rutine_id" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("roll_no")
);

-- CreateTable
CREATE TABLE "rutine" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rutine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_rutine_id_fkey" FOREIGN KEY ("rutine_id") REFERENCES "rutine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

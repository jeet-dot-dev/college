import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

type FormattedRoutine = {
  roll_no: number;
  rawText: string;
};

export async function getFormattedStudentRoutines(): Promise<FormattedRoutine[]> {
  try {
    const students = await prisma.students.findMany({
      include: {
        routines: true,
      },
    });

    const formatted: FormattedRoutine[] = students.map((student) => {
      const routineDetails = student.routines
        .map((routine) => {
          const timeStr = new Date(routine.time).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${routine.subject} on ${routine.day} at ${timeStr}`;
        })
        .join(" and ");

      const text = `${student.name}, Roll No ${student.roll_no}, from ${student.department} semester ${student.sem} has exams like ${routineDetails}.`;

      return {
        roll_no: student.roll_no,
        rawText: text,
      };
    });

    return formatted;
  } catch (err) {
    console.error("Failed to fetch routines:", err);
    return [];
  }
}

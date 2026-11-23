import { auth } from "@clerk/nextjs/server";
import { and, asc, eq, gte, lt } from "drizzle-orm";
import { db } from "@/db";
import { workouts } from "@/db/schema";

export async function getWorkoutsForUserOnDate(date: Date) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      gte(workouts.startedAt, dayStart),
      lt(workouts.startedAt, dayEnd)
    ),
    orderBy: asc(workouts.startedAt),
    with: {
      workoutExercises: {
        orderBy: (we, { asc }) => asc(we.order),
        with: { exercise: true }
      }
    }
  });
}

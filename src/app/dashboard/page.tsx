import { format, isValid, parse } from "date-fns";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getWorkoutsForUserOnDate } from "@/data/workouts";
import { DatePicker } from "./date-picker";

function parseDateParam(value: string | undefined): Date {
  if (value) {
    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) return parsed;
  }
  return new Date();
}

function getDurationMinutes(startedAt: Date, completedAt: Date | null): number | null {
  if (!completedAt) return null;
  return Math.round((completedAt.getTime() - startedAt.getTime()) / 60000);
}

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ date?: string }>;
}): Promise<React.JSX.Element> {
  const { date } = await searchParams;
  const selectedDate = parseDateParam(date);
  const formattedDate = format(selectedDate, "do MMM yyyy");

  const workouts = await getWorkoutsForUserOnDate(selectedDate);

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Workout Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Date Picker */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
                Select Date
              </h2>
              <DatePicker selected={selectedDate} />
              <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Selected Date
                </p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {formattedDate}
                </p>
              </div>
            </Card>
          </div>

          {/* Workouts List */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                Workouts for {formattedDate}
              </h2>

              {workouts.length > 0 ? (
                <div className="space-y-4">
                  {workouts.map((workout) => {
                    const duration = getDurationMinutes(
                      workout.startedAt,
                      workout.completedAt
                    );
                    return (
                      <div
                        key={workout.id}
                        className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                            {workout.name ?? "Untitled Workout"}
                          </h3>
                          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            {format(workout.startedAt, "hh:mm a")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {workout.workoutExercises.map((we) => (
                            <Badge
                              key={we.id}
                              className="text-sm text-zinc-700 dark:text-zinc-300 gap-7 border-2"
                              variant="secondary"
                            >
                              {we.exercise.name}
                            </Badge>
                          ))}
                          {duration !== null && (
                            <div className="mt-2 text-gray-500">
                              Duration: {duration} min
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    No workouts logged for this date
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

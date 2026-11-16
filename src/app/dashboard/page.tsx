"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Exercise = { name: string; durationMinutes: number };

type WorkoutSession = {
  id: number;
  title: string;
  time: string;
  exercises: Exercise[];
};

// Mock workout data - will be replaced with actual data fetching
const mockWorkoutSessions: WorkoutSession[] = [
  {
    id: 1,
    title: "Upper Body Strength",
    time: "09:00 AM",
    exercises: [
      { name: "Bench Press", durationMinutes: 12 },
      { name: "Pull-ups", durationMinutes: 8 },
      { name: "Shoulder Press", durationMinutes: 10 }
    ]
  },
  {
    id: 2,
    title: "Lower Body Strength",
    time: "02:30 PM",
    exercises: [
      { name: "Squats", durationMinutes: 15 },
      { name: "Leg Press", durationMinutes: 10 },
      { name: "Leg Curls", durationMinutes: 8 }
    ]
  },
  {
    id: 3,
    title: "Back & Core",
    time: "06:00 PM",
    exercises: [
      { name: "Deadlifts", durationMinutes: 14 },
      { name: "Barbell Rows", durationMinutes: 12 },
      { name: "Planks", durationMinutes: 6 }
    ]
  }
];

function getTotalMinutes(session: WorkoutSession): number {
  return session.exercises.reduce((sum, e) => sum + e.durationMinutes, 0);
}

export default function DashboardPage(): React.JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  function handleSelectDate(date: Date | undefined): void {
    if (date) setSelectedDate(date);
  }

  const formattedDate = format(selectedDate, "do MMM yyyy");

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
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                className="w-full"
              />
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

              {mockWorkoutSessions.length > 0 ? (
                <div className="space-y-4">
                  {mockWorkoutSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                          {session.title}
                        </h3>
                        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                          {session.time}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {session.exercises.map((exercise) => (
                          <Badge
                            key={exercise.name}
                            className="text-sm text-zinc-700 dark:text-zinc-300 gap-7 border-2"
                            variant="secondary"
                          >
                            {exercise.name}
                          </Badge>
                        ))}
                        <div className="mt-2 text-gray-500">
                          Duration: {getTotalMinutes(session)} min
                        </div>
                      </div>
                    </div>
                  ))}
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

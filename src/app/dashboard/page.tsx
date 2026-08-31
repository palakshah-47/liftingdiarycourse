"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { duration } from "drizzle-orm/gel-core";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock workout data - will be replaced with actual data fetching
  const mockWorkoutSessions = [
    {
      id: 1,
      title: "Upper Body Strength",
      time: "09:00 AM",
      exercises: [
        { name: "Bench Press", duration: "12 min" },
        { name: "Pull-ups", duration: "8 min" },
        { name: "Shoulder Press", duration: "10 min" }
      ]
    },
    {
      id: 2,
      title: "Lower Body Strength",
      time: "02:30 PM",
      exercises: [
        { name: "Squats", duration: "15 min" },
        { name: "Leg Press", duration: "10 min" },
        { name: "Leg Curls", duration: "8 min" }
      ]
    },
    {
      id: 3,
      title: "Back & Core",
      time: "06:00 PM",
      exercises: [
        { name: "Deadlifts", duration: "14 min" },
        { name: "Barbell Rows", duration: "12 min" },
        { name: "Planks", duration: "6 min" }
      ]
    }
  ];

  let duration = 0;

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
                onSelect={(date) => date && setSelectedDate(date)}
                className="w-full"
              />
              <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Selected Date
                </p>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {format(selectedDate, "do MMM yyyy")}
                </p>
              </div>
            </Card>
          </div>

          {/* Workouts List */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                Workouts for {format(selectedDate, "do MMM yyyy")}
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
                        {session.exercises.map((exercise, idx) => {
                          const time = Number(
                            exercise.duration.split(" ")?.[0]
                          );
                          if (time) {
                            duration += time;
                          }
                          return (
                            <Badge
                              key={idx}
                              className="text-sm text-zinc-700 dark:text-zinc-300 gap-7 border-2"
                              variant={"secondary"}
                            >
                              {exercise.name}
                            </Badge>
                          );
                        })}
                        <div className="mt-2 text-gray-500">
                          Duration: {duration} min
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


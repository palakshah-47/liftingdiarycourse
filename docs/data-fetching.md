# Data Fetching Standards

## 1. Server Components ONLY

**ALL data fetching in this app MUST be done via Server Components.** This is incredibly important.

Data must **NOT** be fetched via:

- Route handlers (`src/app/**/route.ts`)
- Client components (`"use client"`), including `useEffect`, SWR, React Query, or `fetch` calls from the browser
- Any other mechanism

If a client component needs data, fetch it in a parent Server Component and pass it down as props.

```tsx
// src/app/dashboard/page.tsx — Server Component (no "use client")
import { auth } from "@clerk/nextjs/server";
import { getWorkoutsForUser } from "@/data/workouts";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const workouts = await getWorkoutsForUser(userId);

  return <WorkoutList workouts={workouts} />;
}
```

## 2. Database Queries via `/data` Helper Functions

All database queries MUST be performed in helper functions located in the `src/data/` directory (e.g. `src/data/workouts.ts`).

- Server Components call these helpers; they must never import `db` and query directly.
- Helpers must use **Drizzle ORM** (the `db` instance from `@/db`).
- **DO NOT USE RAW SQL.** No `sql` template strings for whole queries, no raw query strings, no `db.execute()` with hand-written SQL. Use Drizzle's query builder (`db.select()`, `db.query.*`, `insert`, `update`, `delete`) with operators such as `eq` and `and`.

## 3. Users Can ONLY Access Their Own Data

This is incredibly important. A logged-in user must only ever be able to read or modify their own data. They must NEVER be able to access any other user's data.

Rules:

1. Get the current user's ID from Clerk (`auth()` from `@clerk/nextjs/server`) on the server. Never trust a user ID from URL params, search params, form fields, or any other client-supplied input.
2. Every helper in `src/data/` that touches user-owned data MUST take the `userId` and filter by it in the query (e.g. `eq(workouts.userId, userId)`).
3. Data that is only indirectly owned (e.g. `workoutExercises`, `sets`) MUST be scoped by joining back to `workouts` and filtering on `workouts.userId`.
4. Lookups by ID (e.g. a single workout) MUST also include the `userId` condition, so guessing another user's ID returns nothing.
5. Mutations (update/delete) MUST include the `userId` condition in the `where` clause.
6. If there is no authenticated user, do not query — redirect or throw.

```ts
// src/data/workouts.ts
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { workouts } from "@/db/schema";

//check for authntication
export async function getUserWorkouts() {
  const session = await auth();
  if (session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return await db
    .select()
    .from(workouts)
    .where(eq(workouts.userId, session.user.id));
}
// ❌ NEVER: fetches by ID only, exposing other users' data
// db.select().from(workouts).where(eq(workouts.id, workoutId));
```

```typescript
//Exmaple:Server Componen Usage
// /src/app/workpouts/page.tsx
import {getUserWorkouts} from '@/data/user-workouts'

export default async function WorkoutsPage() {
  const workouts = await getUserWorkouts()

  return (
    <div>
    {workouts.map(workout => (
      <div key={workout.id}>{workout.name}</div>
    ))}
    </div>
  )
}
```

## Checklist

- [ ] Data is fetched in a Server Component, not a route handler or client component
- [ ] The query lives in a helper in `src/data/`
- [ ] The helper uses Drizzle ORM, with no raw SQL
- [ ] `userId` comes from Clerk's `auth()` on the server
- [ ] The query is filtered by `userId` (directly or via a join to `workouts`)



# UI Coding Standards

## Component Library

**Only shadcn/ui components may be used for UI in this project.**

No custom components are permitted. Every UI element — buttons, inputs, dialogs, cards, tables, badges, etc. — must be sourced from shadcn/ui. If a required component does not yet exist in `src/components/ui/`, install it via the shadcn CLI before using it:

```bash
npx shadcn@latest add <component-name>
```

Do not wrap shadcn components in custom wrapper components. Use them directly, and extend their behaviour using the props and variants they already expose.

## Date Formatting

All dates must be formatted using [date-fns](https://date-fns.org/). No other date library or manual string manipulation is permitted.

Dates must be displayed in the following format:

| Raw date       | Displayed as     |
| -------------- | ---------------- |
| 2025-09-01     | 1st Sept 2025    |
| 2025-08-02     | 2nd Aug 2025     |
| 2026-01-03     | 3rd Jan 2026     |
| 2024-06-04     | 4th Jun 2024     |

The format string for this is `do MMM yyyy` using date-fns `format`:

```ts
import { format } from "date-fns";

format(date, "do MMM yyyy"); // "1st Sept 2025"
```

Use this format everywhere a date is displayed to the user. Do not invent alternate formats for different screens or contexts.

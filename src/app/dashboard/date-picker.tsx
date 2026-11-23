"use client";

import { useRef } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export function DatePicker({ selected }: { selected: Date }): React.JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form ref={formRef} action="/dashboard" method="get">
      <input
        ref={inputRef}
        type="hidden"
        name="date"
        defaultValue={format(selected, "yyyy-MM-dd")}
      />
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (!date || !inputRef.current) return;
          inputRef.current.value = format(date, "yyyy-MM-dd");
          formRef.current?.requestSubmit();
        }}
        className="w-full"
      />
    </form>
  );
}

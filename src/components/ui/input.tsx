import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-lg border border-white/12 bg-white/8 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-200/70 focus:ring-2 focus:ring-teal-200/20",
        props.className,
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-32 w-full resize-y rounded-lg border border-white/12 bg-white/8 p-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-teal-200/70 focus:ring-2 focus:ring-teal-200/20",
        props.className,
      )}
    />
  );
}

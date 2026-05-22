import { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div className="max-w-3xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-teal-200">{eyebrow}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}

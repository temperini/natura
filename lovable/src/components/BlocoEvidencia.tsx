import type { ReactNode } from "react";

export function BlocoEvidencia({
  rotulo,
  icone,
  children,
}: {
  rotulo: string;
  icone?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {icone}
        {rotulo}
      </h2>
      <div className="mt-2 text-base leading-relaxed text-card-foreground">{children}</div>
    </section>
  );
}

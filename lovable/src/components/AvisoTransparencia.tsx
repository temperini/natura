import { Info } from "lucide-react";

export function AvisoTransparencia({ texto }: { texto: string }) {
  return (
    <p className="flex gap-2 rounded-xl border border-border bg-secondary/60 p-3 text-sm text-muted-foreground">
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>{texto}</span>
    </p>
  );
}

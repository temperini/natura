import type { ReactNode } from "react";

export function CabecalhoTela({ titulo, voltar }: { titulo: string; voltar: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
      {voltar}
      <h1 className="font-display text-lg font-semibold text-foreground">{titulo}</h1>
    </header>
  );
}

export const estiloBotaoVoltar =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

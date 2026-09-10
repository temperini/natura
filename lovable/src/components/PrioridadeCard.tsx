import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, Clock3 } from "lucide-react";
import { AvatarConsultora } from "@/components/AvatarConsultora";
import { Badge } from "@/components/ui/badge";
import type { Prioridade } from "@/data/prioridades";

export function PrioridadeCard({ p, indice }: { p: Prioridade; indice: number }) {
  const concluida = p.status === "concluida";
  return (
    <Link
      to="/prioridade/$id"
      params={{ id: p.id }}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-soft transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-terra/30 hover:bg-secondary/40 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:translate-y-0"
    >
      <AvatarConsultora nome={p.nomeConsultora} src={p.avatar} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-terra">{indice}</span>
          <p className="truncate font-display text-base font-semibold text-card-foreground">
            {p.nomeConsultora}
          </p>
        </div>
        <p className="mt-0.5 truncate text-sm text-foreground">{p.sinal}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {p.fonte}
          </Badge>
          {concluida ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
              <CheckCircle2 aria-hidden className="size-3.5" /> Apoio registrado
            </span>
          ) : p.status === "adiada" ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Clock3 aria-hidden className="size-3.5" /> Adiado para amanhã
            </span>
          ) : null}
        </div>
      </div>
      <ChevronRight aria-hidden className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-terra" />
    </Link>
  );
}

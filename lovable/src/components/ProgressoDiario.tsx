import { useState } from "react";
import { Check, Clock3, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { StatusPrioridade } from "@/data/prioridades";

const nomesStatus: Record<StatusPrioridade, string> = {
  pendente: "Aguardando seu olhar",
  concluida: "Apoio registrado",
  adiada: "Adiada para amanhã",
};

export function ProgressoDiario({
  concluidas,
  total,
  status,
}: {
  concluidas: number;
  total: number;
  status: StatusPrioridade[];
}) {
  const primeiroPendente = status.findIndex((item) => item === "pendente");
  const [etapaAtiva, setEtapaAtiva] = useState(primeiroPendente >= 0 ? primeiroPendente : 0);
  const selecionado = status[etapaAtiva] ?? "pendente";

  return (
    <section
      className="rounded-xl border border-border bg-card p-5 shadow-soft transition-shadow duration-500 hover:shadow-[var(--shadow-lift)] sm:p-6"
      aria-labelledby="progresso-diario-titulo"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="progresso-diario-titulo" className="font-display text-lg font-semibold text-card-foreground">
            Apoios de hoje
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Seu acompanhamento diário</p>
        </div>
        <p className="flex items-baseline gap-1" aria-label={`${concluidas} de ${total} apoios concluídos`}>
          <span className="font-display text-2xl font-semibold text-primary">{concluidas}</span>
          <span className="text-sm font-medium text-muted-foreground">/ {total}</span>
        </p>
      </div>

      <div className="mt-7 flex gap-2" role="group" aria-label="Cinco etapas do acompanhamento">
        {status.map((item, indice) => (
          <Button
            key={`${item}-${indice}`}
            type="button"
            variant="ghost"
            className={`progress-step progress-step--${item} ${etapaAtiva === indice ? "is-active" : ""}`}
            aria-label={`Prioridade ${indice + 1}: ${nomesStatus[item]}`}
            aria-pressed={etapaAtiva === indice}
            onClick={() => setEtapaAtiva(indice)}
            onMouseEnter={() => setEtapaAtiva(indice)}
            onFocus={() => setEtapaAtiva(indice)}
          >
            <span className="sr-only">Prioridade {indice + 1}</span>
          </Button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg bg-secondary px-3 py-3" aria-live="polite">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-terra shadow-soft">
          {selecionado === "concluida" ? (
            <Check aria-hidden className="size-4" />
          ) : selecionado === "adiada" ? (
            <Clock3 aria-hidden className="size-4" />
          ) : (
            <Radio aria-hidden className="size-4" />
          )}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Prioridade {etapaAtiva + 1}</p>
          <p className="mt-0.5 text-sm font-medium text-foreground">{nomesStatus[selecionado]}</p>
        </div>
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        {concluidas === total
          ? "Você acompanhou todas as pessoas de hoje. Que dia bonito de cuidado."
          : "Cinco pessoas por dia. Sem pressa, no seu ritmo."}
      </p>
    </section>
  );
}

import { useState } from "react";
import { Check, Clock3, Radio } from "lucide-react";
import type { StatusPrioridade } from "@/data/prioridades";

const nomesStatus: Record<StatusPrioridade, string> = {
  pendente: "Aguardando seu olhar",
  concluida: "Apoio registrado",
  adiada: "Adiada para amanhã",
};

function pontoPolar(angulo: number, raio: number) {
  const radianos = ((angulo - 90) * Math.PI) / 180;
  return { x: 50 + raio * Math.cos(radianos), y: 50 + raio * Math.sin(radianos) };
}

function arco(inicio: number, fim: number, raio = 38) {
  const a = pontoPolar(inicio, raio);
  const b = pontoPolar(fim, raio);
  return `M ${a.x} ${a.y} A ${raio} ${raio} 0 0 1 ${b.x} ${b.y}`;
}

export function RadarDiario({ status }: { status: StatusPrioridade[] }) {
  const [ativo, setAtivo] = useState(0);
  const concluidas = status.filter((item) => item === "concluida").length;
  const selecionado = status[ativo] ?? "pendente";

  return (
    <div className="radar-diario" aria-label={`Radar diário: ${concluidas} de 5 apoios concluídos`}>
      <div className="relative size-32 shrink-0" role="img">
        <svg viewBox="0 0 100 100" className="size-full overflow-visible" aria-hidden="true">
          <circle cx="50" cy="50" r="28" className="fill-accent/40 stroke-border" strokeWidth="1" />
          <circle cx="50" cy="50" r="19" className="fill-background stroke-border/70" strokeWidth="1" />
          {status.map((item, indice) => {
            const inicio = indice * 72 + 3;
            const fim = (indice + 1) * 72 - 3;
            return (
              <path
                key={`${item}-${indice}`}
                d={arco(inicio, fim)}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                className={`radar-segment radar-segment--${item} ${ativo === indice ? "is-active" : ""}`}
                tabIndex={0}
                onMouseEnter={() => setAtivo(indice)}
                onFocus={() => setAtivo(indice)}
              />
            );
          })}
          <circle cx="50" cy="50" r="3" className="fill-primary radar-core" />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-semibold text-foreground">{concluidas}</span>
          <span className="text-[10px] font-semibold uppercase text-muted-foreground">de 5</span>
        </div>
      </div>

      <div className="min-w-0 flex-1" aria-live="polite">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
          <Radio aria-hidden className="size-3.5 text-terra" />
          Prioridade {ativo + 1}
        </div>
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
          {selecionado === "concluida" ? (
            <Check aria-hidden className="size-4 text-primary" />
          ) : selecionado === "adiada" ? (
            <Clock3 aria-hidden className="size-4 text-muted-foreground" />
          ) : (
            <span aria-hidden className="size-2 rounded-full bg-terra radar-pulse" />
          )}
          {nomesStatus[selecionado]}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Passe pelos segmentos para acompanhar cada apoio.
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import type { CSSProperties } from "react";
import { Activity, BarChart3, TrendingUp } from "lucide-react";
import type { Prioridade } from "@/data/prioridades";

const intensidades = [82, 64, 48, 34, 72];

export function PanoramaSinais({ prioridades }: { prioridades: Prioridade[] }) {
  const [ativo, setAtivo] = useState(0);
  const prioridade = prioridades[ativo] ?? prioridades[0];

  if (!prioridade) return null;

  return (
    <section className="signal-panel" aria-labelledby="panorama-title">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase text-terra">
            <Activity aria-hidden className="size-4 signal-icon" />
            Leitura do dia
          </p>
          <h2 id="panorama-title" className="mt-1 font-display text-lg font-semibold text-foreground">
            Panorama dos sinais
          </h2>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft">
          <BarChart3 aria-hidden className="size-5" />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-5">
        <div className="flex h-28 items-end gap-2" aria-label="Intensidade relativa dos cinco sinais">
          {prioridades.map((item, indice) => (
            <button
              key={item.id}
              type="button"
              className="signal-column group flex h-full flex-1 items-end"
              aria-label={`Ver sinal de ${item.nomeConsultora}`}
              aria-pressed={ativo === indice}
              onClick={() => setAtivo(indice)}
              onMouseEnter={() => setAtivo(indice)}
              onFocus={() => setAtivo(indice)}
            >
              <span
                className={`signal-bar ${ativo === indice ? "is-active" : ""}`}
                style={{ "--signal-height": `${intensidades[indice] ?? 50}%` } as CSSProperties}
              >
                <span className="sr-only">{intensidades[indice] ?? 50}%</span>
              </span>
            </button>
          ))}
        </div>
        <div className="pb-1 text-right">
          <p className="text-2xl font-semibold text-foreground">5</p>
          <p className="max-w-20 text-xs leading-snug text-muted-foreground">pessoas para apoiar</p>
        </div>
      </div>

      <div className="mt-4 flex min-h-16 items-center gap-3 rounded-lg bg-secondary px-3 py-2.5" aria-live="polite">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-terra">
          <TrendingUp aria-hidden className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{prioridade.nomeConsultora}</p>
          <p className="truncate text-xs text-muted-foreground">{prioridade.sinal}</p>
        </div>
        <span className="ml-auto text-xs font-semibold text-terra">{ativo + 1}/5</span>
      </div>
    </section>
  );
}
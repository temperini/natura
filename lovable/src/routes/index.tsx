import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PrioridadeCard } from "@/components/PrioridadeCard";
import { ProgressoDiario } from "@/components/ProgressoDiario";
import { PanoramaSinais } from "@/components/PanoramaSinais";
import { AvisoTransparencia } from "@/components/AvisoTransparencia";
import { Button } from "@/components/ui/button";
import { usePrioridades } from "@/context/PrioridadesContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radar de Ativação — 5 apoios do dia" },
      {
        name: "description",
        content:
          "Cinco prioridades diárias para líderes apoiarem suas consultoras, com sinal, fonte e evidência sempre visíveis.",
      },
      { property: "og:title", content: "Radar de Ativação — 5 apoios do dia" },
      {
        property: "og:description",
        content: "Cinco prioridades diárias de apoio às consultoras, com evidência transparente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Inicio,
});

function dataDeHoje() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function Inicio() {
  const { lista, concluidas, total, reiniciarDia } = usePrioridades();

  return (
    <div className="page-enter mx-auto w-full max-w-xl px-4 pb-16 pt-8">
      <header>
        <p className="text-sm capitalize text-muted-foreground">{dataDeHoje()}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-foreground">
          Olá, Renata
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Separamos cinco pessoas da sua carteira que podem se beneficiar de um contato seu hoje.
        </p>
      </header>

      <div className="mt-6">
        <ProgressoDiario concluidas={concluidas} total={total} status={lista.map((p) => p.status)} />
      </div>

      <div className="mt-4">
        <PanoramaSinais prioridades={lista} />
      </div>

      {concluidas === total && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/30 bg-accent/40 p-4">
          <Sparkles aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="font-display text-base font-semibold text-foreground">
              Tudo acompanhado por hoje
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Amanhã o radar traz cinco novas pessoas.
            </p>
            <Button variant="outline" size="sm" className="mt-3" onClick={reiniciarDia}>
              Recomeçar o dia
            </Button>
          </div>
        </div>
      )}

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Prioridades de hoje
      </h2>
      <ul className="mt-3 space-y-3">
        {lista.map((p, i) => (
          <li key={p.id} className="priority-item">
            <PrioridadeCard p={p} indice={i + 1} />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <AvisoTransparencia texto="O radar apenas sugere. Você decide se, quando e como falar com cada pessoa — nada é enviado automaticamente." />
      </div>
    </div>
  );
}

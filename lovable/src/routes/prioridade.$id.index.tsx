import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Database, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { AvatarConsultora } from "@/components/AvatarConsultora";
import { AvisoTransparencia } from "@/components/AvisoTransparencia";
import { BlocoEvidencia } from "@/components/BlocoEvidencia";
import { CabecalhoTela, estiloBotaoVoltar } from "@/components/CabecalhoTela";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePrioridades } from "@/context/PrioridadesContext";

export const Route = createFileRoute("/prioridade/$id/")({
  head: () => ({
    meta: [
      { title: "Detalhe da prioridade — Radar de Ativação" },
      {
        name: "description",
        content: "Veja o sinal detectado, a fonte do dado e a evidência antes de decidir o apoio.",
      },
      { property: "og:title", content: "Detalhe da prioridade — Radar de Ativação" },
      {
        property: "og:description",
        content: "Sinal, fonte e evidência de cada sugestão de apoio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Detalhe,
});

function Detalhe() {
  const { id } = Route.useParams();
  const { obter } = usePrioridades();
  const p = obter(id);

  if (!p) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16 text-center">
        <p className="text-base text-muted-foreground">Prioridade não encontrada.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="page-enter mx-auto w-full max-w-xl pb-16">
      <CabecalhoTela
        titulo="Por que esta pessoa"
        voltar={
          <Link to="/" aria-label="Voltar ao início" className={estiloBotaoVoltar}>
            <ArrowLeft aria-hidden className="size-5" />
          </Link>
        }
      />

      <div className="px-4 pt-6">
        <div className="flex items-center gap-4">
          <AvatarConsultora nome={p.nomeConsultora} src={p.avatar} className="size-16" />
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              {p.nomeConsultora}
            </h2>
            <Badge variant="secondary" className="mt-1 font-normal">
              {p.fonte}
            </Badge>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <BlocoEvidencia rotulo="Sinal detectado" icone={<Activity aria-hidden className="size-4" />}>
            {p.sinal}
          </BlocoEvidencia>
          <BlocoEvidencia rotulo="Fonte do dado" icone={<Database aria-hidden className="size-4" />}>
            {p.fonte}
          </BlocoEvidencia>
          <BlocoEvidencia rotulo="Evidência" icone={<FileText aria-hidden className="size-4" />}>
            {p.evidencia}
          </BlocoEvidencia>
        </div>

        <div className="mt-4">
          <AvisoTransparencia texto="Esta é uma leitura de dados, não um julgamento sobre a pessoa. Use seu conhecimento da carteira antes de agir." />
        </div>

        <Button asChild size="lg" className="mt-6 h-12 w-full text-base">
          <Link to="/prioridade/$id/acao" params={{ id: p.id }}>
            Ver sugestão de apoio
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

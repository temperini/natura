import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy, Lightbulb, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { AvatarConsultora } from "@/components/AvatarConsultora";
import { AvisoTransparencia } from "@/components/AvisoTransparencia";
import { BlocoEvidencia } from "@/components/BlocoEvidencia";
import { CabecalhoTela, estiloBotaoVoltar } from "@/components/CabecalhoTela";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePrioridades } from "@/context/PrioridadesContext";
import { rascunhos } from "@/data/rascunhos";


export const Route = createFileRoute("/prioridade/$id/acao")({
  head: () => ({
    meta: [
      { title: "Revisar e registrar apoio — Radar de Ativação" },
      {
        name: "description",
        content:
          "Revise a sugestão de apoio, ajuste a mensagem no seu tom e registre o contato manualmente.",
      },
      { property: "og:title", content: "Revisar e registrar apoio — Radar de Ativação" },
      {
        property: "og:description",
        content: "A sugestão só vira ação depois da sua revisão. Nada é enviado automaticamente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Acao,
});

function Acao() {
  const { id } = Route.useParams();
  const { obter, mensagemDe, concluir, adiar } = usePrioridades();
  const navigate = useNavigate();
  const p = obter(id);
  const [mensagem, setMensagem] = useState(
    () => mensagemDe(id) ?? rascunhos[id] ?? "",
  );
  const [revisado, setRevisado] = useState(false);

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

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensagem);
      toast.success("Mensagem copiada. Envie pelo canal que preferir.");
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  };

  return (
    <div className="page-enter mx-auto w-full max-w-xl pb-20">
      <CabecalhoTela
        titulo="Sua decisão"
        voltar={
          <Link
            to="/prioridade/$id"
            params={{ id: p.id }}
            aria-label="Voltar aos detalhes"
            className={estiloBotaoVoltar}
          >
            <ArrowLeft aria-hidden className="size-5" />
          </Link>
        }
      />

      <div className="px-4 pt-6">
        <div className="flex items-center gap-3">
          <AvatarConsultora nome={p.nomeConsultora} src={p.avatar} />
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              {p.nomeConsultora}
            </p>
            <p className="text-sm text-muted-foreground">{p.sinal}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <BlocoEvidencia
            rotulo="Ação sugerida"
            icone={<MessageCircle aria-hidden className="size-4" />}
          >
            {p.acaoSugerida}
          </BlocoEvidencia>
          <BlocoEvidencia
            rotulo="Tom recomendado"
            icone={<Lightbulb aria-hidden className="size-4" />}
          >
            {p.tomRecomendado}
          </BlocoEvidencia>
        </div>

        <div className="mt-6">
          <Label htmlFor="mensagem" className="text-sm font-medium">
            Rascunho da mensagem (edite no seu jeito de falar)
          </Label>
          <Textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows={6}
            className="mt-2 text-base"
          />
          <Button variant="outline" className="mt-3 h-11" onClick={copiar}>
            <Copy aria-hidden className="size-4" />
            Copiar mensagem
          </Button>
        </div>

        <div className="mt-6">
          <AvisoTransparencia texto="O aplicativo não envia nada por você. Faça o contato pelo canal de sua preferência e depois registre aqui." />
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
          <Checkbox
            id="revisado"
            checked={revisado}
            onCheckedChange={(v) => setRevisado(v === true)}
            className="mt-0.5 size-5"
          />
          <Label htmlFor="revisado" className="text-sm font-normal leading-relaxed">
            Revisei a sugestão, adaptei ao contexto desta pessoa e fiz o contato.
          </Label>
        </div>

        <div className="mt-5 space-y-3">
          <Button
            size="lg"
            className="h-12 w-full text-base"
            disabled={!revisado || p.status === "concluida"}
            onClick={() => {
              concluir(p.id, mensagem);
              toast.success(`Apoio a ${p.nomeConsultora.split(" ")[0]} registrado.`);
              navigate({ to: "/" });
            }}
          >
            <Check aria-hidden className="size-4" />
            {p.status === "concluida" ? "Apoio já registrado" : "Marcar como concluída"}
          </Button>
          <Button
            variant="ghost"
            className="h-11 w-full"
            onClick={() => {
              adiar(p.id);
              toast("Adiado para amanhã.");
              navigate({ to: "/" });
            }}
          >
            Adiar para amanhã
          </Button>
        </div>
      </div>
    </div>
  );
}

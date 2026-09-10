import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Context,
  type ReactNode,
} from "react";
import { prioridades as base, type Prioridade, type StatusPrioridade } from "@/data/prioridades";

const CHAVE = "radar-ativacao:estado-v1";

type Registro = { status: StatusPrioridade; mensagem?: string | undefined };

type Ctx = {
  lista: Prioridade[];
  concluidas: number;
  total: number;
  obter: (id: string) => Prioridade | undefined;
  mensagemDe: (id: string) => string | undefined;
  concluir: (id: string, mensagem: string) => void;
  adiar: (id: string) => void;
  reiniciarDia: () => void;
};

type ContextRegistry = typeof globalThis & {
  __radarPrioridadesContext?: Context<Ctx | null>;
};

// Mantém a mesma instância durante atualizações dinâmicas do preview. Sem isso,
// provider e consumidores podem conservar módulos de momentos diferentes.
const contextRegistry = globalThis as ContextRegistry;
const PrioridadesContext =
  contextRegistry.__radarPrioridadesContext ?? createContext<Ctx | null>(null);

contextRegistry.__radarPrioridadesContext = PrioridadesContext;

export function PrioridadesProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<Record<string, Registro>>({});

  useEffect(() => {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) setRegistros(JSON.parse(bruto) as Record<string, Registro>);
    } catch {
      /* ignora estado inválido */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(registros));
    } catch {
      /* armazenamento indisponível */
    }
  }, [registros]);

  const valor = useMemo<Ctx>(() => {
    const lista = base.map((p) => ({ ...p, status: registros[p.id]?.status ?? p.status }));
    return {
      lista,
      total: lista.length,
      concluidas: lista.filter((p) => p.status === "concluida").length,
      obter: (id) => lista.find((p) => p.id === id),
      mensagemDe: (id) => registros[id]?.mensagem,
      concluir: (id, mensagem) =>
        setRegistros((r) => ({ ...r, [id]: { status: "concluida", mensagem } })),
      adiar: (id) =>
        setRegistros((r) => {
          const anterior = r[id];
          const registro: Registro =
            anterior?.mensagem !== undefined
              ? { status: "adiada", mensagem: anterior.mensagem }
              : { status: "adiada" };
          return { ...r, [id]: registro };
        }),

      reiniciarDia: () => setRegistros({}),
    };
  }, [registros]);

  return <PrioridadesContext.Provider value={valor}>{children}</PrioridadesContext.Provider>;
}

export function usePrioridades() {
  const ctx = useContext(PrioridadesContext);
  if (!ctx) throw new Error("usePrioridades precisa estar dentro de PrioridadesProvider");
  return ctx;
}

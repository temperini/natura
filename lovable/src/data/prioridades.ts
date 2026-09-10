export type StatusPrioridade = "pendente" | "concluida" | "adiada";

export type Prioridade = {
  id: string;
  nomeConsultora: string;
  avatar: string;
  sinal: string;
  fonte: string;
  evidencia: string;
  acaoSugerida: string;
  tomRecomendado: string;
  status: StatusPrioridade;
};

export const prioridades: Prioridade[] = [
  {
    id: "p1",
    nomeConsultora: "Ana Silva",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    sinal: "3 ciclos sem pedido",
    fonte: "Histórico de Vendas",
    evidencia:
      "Ana costumava ser ativa, mas não registra pedidos há 45 dias consecutivos. O último ciclo teve pontuação zero.",
    acaoSugerida:
      "Ligar para entender se há alguma dificuldade técnica ou necessidade de novos catálogos.",
    tomRecomendado: "Empático e parceiro. Não realizar cobrança de metas.",
    status: "pendente",
  },
  {
    id: "p2",
    nomeConsultora: "Beatriz Souza",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    sinal: "Queda drástica no ticket médio",
    fonte: "Análise de Faturamento",
    evidencia: "O ticket médio caiu 60% em relação à média dos últimos 6 meses.",
    acaoSugerida:
      "Enviar mensagem de áudio oferecendo dicas de kits de produtos para aumentar o ticket.",
    tomRecomendado: "Incentivador e educativo.",
    status: "pendente",
  },
  {
    id: "p3",
    nomeConsultora: "Carla Mendes",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    sinal: "Primeiro acesso não concluído",
    fonte: "Log de Plataforma",
    evidencia:
      "Cadastro aprovado há 7 dias, mas o primeiro acesso ao aplicativo de vendas não foi finalizado.",
    acaoSugerida:
      "Compartilhar tutorial em vídeo curto de como acessar o app pela primeira vez.",
    tomRecomendado: "Prestativo e acolhedor.",
    status: "pendente",
  },
  {
    id: "p4",
    nomeConsultora: "Daniela Costa",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    sinal: "Aniversário de 1 ano de parceria",
    fonte: "CRM",
    evidencia: "Completa hoje 1 ano desde o primeiro pedido faturado.",
    acaoSugerida: "Enviar cartão virtual de reconhecimento e agradecimento.",
    tomRecomendado: "Celebrativo e caloroso.",
    status: "pendente",
  },
  {
    id: "p5",
    nomeConsultora: "Elena Rocha",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    sinal: "Reclamação de entrega aberta",
    fonte: "Atendimento ao Cliente (SAC)",
    evidencia: "Pedido #4590 com atraso de 5 dias. Consultora abriu chamado ontem.",
    acaoSugerida:
      "Mensagem proativa atualizando sobre o status do chamado e reforçando que estamos acompanhando.",
    tomRecomendado: "Transparente, ágil e resolutivo.",
    status: "pendente",
  },
];

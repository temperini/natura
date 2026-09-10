# Radar de Ativação — plano

Aplicativo mobile-first para líderes acompanharem 5 prioridades diárias de apoio a consultoras, com dados fictícios já definidos.

## Telas

1. **Início (Dashboard)** — `/`
  - Saudação ao líder e data do dia.
  - Barra de progresso "0 de 5 concluídas" que avança conforme as prioridades são finalizadas.
  - Lista de exatamente 5 cartões: foto (ou iniciais como reserva), nome da consultora, sinal detectado, etiqueta da fonte e estado (pendente/concluída).
  - Mensagem de celebração quando as 5 estiverem concluídas.
2. **Detalhe da prioridade** — `/prioridade/<id>`
  - Cabeçalho com foto, nome e sinal.
  - Blocos "Sinal detectado", "Fonte" e "Evidência" em texto claro, deixando explícito por que a pessoa apareceu na lista.
  - Aviso de transparência: a sugestão é apoio à decisão, quem decide é o líder.
  - Botão para seguir à ação.
3. **Ação** — `/prioridade/<id>/acao`
  - Ação sugerida e tom recomendado.
  - Campo de mensagem editável, pré-preenchido a partir da sugestão, com botão de copiar.
  - Caixa de confirmação obrigatória "Revisei e adaptei a sugestão"; só então o botão "Marcar como concluída" fica ativo.
  - Aviso fixo: nada é enviado automaticamente pelo aplicativo.
  - Opção "Adiar para amanhã" que retorna ao início sem concluir.

## Regras aplicadas

- Sempre 5 prioridades, nunca mais.
- Linguagem de apoio, sem cobrança de metas ou tom de alerta.
- Toda sugestão exibe origem e evidência antes da ação.
- Conclusão só após revisão humana explícita.
- Acessibilidade: alvos de toque grandes, contraste alto, textos alternativos nas fotos, foco visível, navegação por teclado.

## Detalhes técnicos

- Rotas TanStack: `src/routes/index.tsx` (substitui o placeholder), `src/routes/prioridade.$id.index.tsx`, `src/routes/prioridade.$id.acao.tsx`, cada uma com título e descrição próprios.
- Dados em `src/data/prioridades.ts` exatamente como no briefing (URLs de avatar limpas, sem marcação markdown).
- Estado das prioridades num contexto React (`src/context/PrioridadesContext.tsx`) montado no layout raiz, persistido em `localStorage` para o progresso sobreviver ao recarregar.
- Componentes reutilizáveis em `src/components/`: `PrioridadeCard`, `ProgressoDiario`, `AvatarConsultora`, `BlocoEvidencia`, `AvisoTransparencia`, `CabecalhoTela`.
- Design tokens em `src/styles.css`: paleta própria em oklch (verde-petróleo profundo como cor principal, areia quente de fundo, âmbar para destaque), tipografia Fraunces para títulos e Plus Jakarta Sans para texto, carregadas via `<link>` no layout raiz. Sem cores fixas nos componentes.
- Shadcn UI para botões, cartões, barra de progresso, caixa de seleção e avisos; `sonner` para confirmações.
- Layout mobile-first com largura máxima central e barra inferior de navegação; em telas maiores vira layout de coluna confortável.
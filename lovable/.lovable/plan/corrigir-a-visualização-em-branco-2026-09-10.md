# Corrigir a visualização em branco

## Diagnóstico confirmado

- O projeto compila sem erros e a página inicial renderiza normalmente em uma sessão nova, com os cinco cartões, radar e gráfico.
- Os registros atuais não mostram falhas de execução.
- A estrutura do provedor está correta no código. O sintoma anterior (`usePrioridades precisa estar dentro de PrioridadesProvider`) é compatível com uma instância antiga do contexto preservada pela atualização dinâmica da visualização, deixando a aba atual vazia enquanto uma nova sessão funciona.

## Implementação

1. Tornar a identidade do contexto de prioridades estável durante atualizações dinâmicas, evitando que provedor e telas usem instâncias diferentes após uma alteração.
2. Preservar o estado, exatamente cinco prioridades e todos os fluxos atuais de conclusão, adiamento e mensagens.
3. Melhorar a recuperação visual para que qualquer falha futura mostre uma mensagem e uma ação de tentar novamente, em vez de uma área totalmente branca.
4. Validar a página inicial e a navegação até detalhe e ação na dimensão atual da visualização, incluindo recarregamento e atualização dinâmica.
5. Conferir novamente os erros de compilação, execução e console antes de concluir.

## Resultado esperado

A visualização volta a mostrar o Radar de Ativação imediatamente e permanece estável após novas alterações, sem depender de fechar ou recarregar manualmente a aba.

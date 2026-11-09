# VozAtiva

**Sua voz em um toque.** Aplicativo Android de comunicação por cartões para a
oficina de 4 horas da SEMINFO 2026. Demonstração educacional de comunicação
alternativa e ampliada (CAA), não uma solução clínica completa.

## Instalação e execução

Pré-requisitos: Node.js compatível com Expo SDK 58 (mínimo documentado 22.13.x;
prefira LTS), pnpm e Expo Go compatível com SDK 58 no Android.

```bash
cd vozativa
pnpm install --frozen-lockfile
pnpm expo start
```

Abra o QR Code no Expo Go ou pressione `a` para abrir no emulador Android.

### Versões utilizadas

| Pacote / ferramenta | Versão |
| --- | --- |
| Expo | 58.0.23 (SDK 58) |
| React Native | 0.88.1 |
| React | 19.3.0 |
| expo-speech | 58.0.3 |
| TypeScript | 6.0.3 |
| pnpm | 12.18.0 |
| Node.js do ambiente de criação | 26.13.0 |
| Expo Go encontrado no emulador | 58.0.5 |

O template resolveu automaticamente `blank-typescript@sdk-58`. A combinação foi
escolhida após consultar o Expo Go instalado, não apenas o SDK mais recente.
A documentação oficial alerta sobre uma transição SDK 57/58 em celulares:
confira a compatibilidade do Expo Go do laboratório antes da oficina. Não
atualize indiscriminadamente as dependências. Preserve `pnpm-lock.yaml`.

Comandos executados para criar o projeto, a partir da pasta pai:

```bash
pnpm create expo-app vozativa --template blank-typescript
cd vozativa
pnpm expo install expo-speech
```

`expo-speech` está incluído no Expo Go e não exige uma compilação nativa própria.
Não foram adicionados Router, navegação, bibliotecas de UI ou serviços externos.
O template inclui `expo-status-bar`; ESLint e sua configuração Expo são apenas
ferramentas de desenvolvimento, não dependências da interface.

## Como usar

1. A tela abre em **Todas**, exibindo os 12 cartões.
2. Role horizontalmente os filtros para escolher **Necessidades**,
   **Sentimentos** ou **Conversas**; cada categoria tem quatro frases.
3. Toque em **Quero água**: o aplicativo interrompe a fala anterior, atualiza
   **Última mensagem** e solicita a pronúncia em português brasileiro.
4. Role até o fim para acessar **Repetir** e **Parar áudio**.
5. Repetir começa desabilitado e fica disponível após escolher uma mensagem.
   Parar áudio permanece habilitado como ação inofensiva quando não há fala.
6. Mudar de categoria preserva a última frase; reiniciar o aplicativo limpa os
   estados. Não há armazenamento persistente.

## Estrutura e conceitos ensinados

```text
App.tsx           tela única, estados, funções e StyleSheet
src/frases.ts     tipo Frase e array com as 12 mensagens
app.json          nome VozAtiva e configuração básica
index.ts          entrada gerada pelo template
pnpm-lock.yaml    versões reproduzíveis dos pacotes
```

- `View` organiza a interface; `Text` apresenta textos; `Pressable` recebe toques.
- Uma `ScrollView` vertical permite acessar todos os cartões e controles.
  Outra, horizontal, acomoda os filtros sem comprimir seus rótulos.
- Arrays e objetos representam as mensagens; `.map()` cria os botões com chaves
  estáveis; `.filter()` deriva o conteúdo da categoria selecionada.
- Dois `useState` guardam a categoria e a última frase.
- `StyleSheet` organiza a paleta, os espaçamentos e a tipografia nativa.
- `falarFrase` chama `await Speech.stop()` antes de `Speech.speak`, com
  `language: 'pt-BR'` e `rate: 0.9`. Não utiliza pause ou resume.
- Um contador em `useRef` invalida pedidos antigos durante as operações
  assíncronas, evitando que toques rápidos ou Parar áudio deixem uma solicitação
  anterior retomar a fala. Não é um terceiro estado visual.
- A consulta às vozes e o tratamento de erros mostram um aviso simples em caso
  de falha, preservando a comunicação visual.

## Acessibilidade implementada

- Cabeçalhos semânticos para a marca e as seções.
- Cartões com papel botão e rótulos como **Falar: Quero água**.
- Categorias com `accessibilityState.selected` e Repetir com desabilitação
  funcional, visual e semântica.
- Emojis são apenas apoio visual, sem foco independente.
- Alvos de toque de pelo menos 48 dp; cartões com altura mínima de 124 dp.
- Textos escaláveis, sem limite de linhas ou alturas máximas que cortem frases.
- Paleta da especificação, duas colunas e controles ao final da rolagem.
- Sem anúncios automáticos da última frase que concorram com o TTS.
- No Android, o cabeçalho considera `StatusBar.currentHeight`, incluindo o
  recorte da câmera; o conteúdo tem respiro inferior para rolar os controles
  acima da navegação do sistema.

O alvo é Android em retrato. iOS e web não foram homologados.

## Preparação para uso offline

Instale previamente Node, pnpm, dependências, Expo Go, mecanismo de síntese de
voz e dados locais de português (Brasil). No Android, procure as configurações
de **Síntese de voz / Texto para fala**, selecione pt-BR e baixe a voz para uso
offline. Os nomes dos menus variam por fabricante.

Abra o projeto uma vez em cada máquina antes da oficina. Depois da preparação:

```bash
pnpm expo start --offline
```

`--offline` evita requisições externas da CLI, mas não instala pacotes ou vozes.
O Expo Go ainda precisa alcançar o Metro pela rede local ou USB/ADB. Sem
internet externa não significa sem comunicação local com o computador.

`expo-speech` utiliza o mecanismo do dispositivo: instalar a biblioteca não
instala a voz brasileira. A listagem de uma voz não comprova que seus dados
estão disponíveis offline. Confira também volume de mídia, saída de áudio e
possível concorrência com o TalkBack. O aplicativo não usa backend, gravação,
microfone ou serviço próprio de TTS em nuvem.

## Roteiro da oficina — 4 horas exatas

| Horário | Etapa | Conceitos |
| --- | --- | --- |
| 00:00–00:30 | Apresentação (30 min) | React Native, Expo, CAA e acessibilidade |
| 00:30–01:20 | Construção visual (50 min) | View, Text, StyleSheet, ScrollView e Pressable |
| 01:20–02:05 | Dados dos cartões (45 min) | Arrays, objetos, propriedades e map |
| 02:05–02:50 | Aplicativo falando (45 min) | expo-speech, onPress e funções |
| 02:50–03:30 | Categorias e última frase (40 min) | useState, filter e renderização |
| 03:30–03:55 | Acessibilidade e testes (25 min) | TalkBack, fonte, contraste e alvos |
| 03:55–04:00 | Encerramento (5 min) | Revisão e demonstração |

Inclua rótulos e papéis acessíveis ao criar cada botão, não apenas na etapa final.
Prepare o laboratório antes: aparelhos/emuladores, pacotes, voz pt-BR e material
local. Geração de APK não faz parte dos exercícios.

## Validações deixadas para depois

Por solicitação do usuário, os testes foram interrompidos nesta entrega. Antes
disso, `pnpm exec tsc --noEmit`, `pnpm expo install --check` e
`pnpm exec eslint App.tsx src/frases.ts` terminaram sem erros. A primeira chamada
a `CI=1 pnpm expo lint` instalou/configurou ESLint, mas reportou incompatibilidade
de versão; a execução direta do ESLint funcionou. O script `pnpm lint` usa a
execução direta para evitar esse problema.

Não há validação concluída de pronúncia, fila de áudio, TalkBack, fonte ampliada
ou funcionamento offline no Android. Esses itens permanecem pendentes, sem
alegação de aprovação dos critérios de aceitação. Para a etapa futura:

```bash
pnpm typecheck
pnpm lint
```

No Android, conferir as 12 frases e os quatro cartões por grupo, tocar Quero
água, substituir a fala, repetir e parar. Com TalkBack, percorrer todos os
filtros/cartões por gestos, acionar um cartão por toque duplo e conferir os
estados selecionado/desabilitado. Verificar larguras de 360–430 dp, fonte
ampliada e fala sem internet externa com voz local preparada.

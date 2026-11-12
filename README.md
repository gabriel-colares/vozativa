# VozAtiva

**Sua voz em um toque.**

Aplicativo de comunicação por cartões: a pessoa escolhe uma mensagem na tela e
o dispositivo a pronuncia em português brasileiro. Desenvolvido para a oficina
de React Native da SEMINFO 2026, é uma demonstração educacional de comunicação
alternativa e ampliada (CAA), não uma solução clínica completa.

## Funcionalidades

- 14 cartões com texto e emoji, organizados em três categorias.
- Filtro por categoria ou exibição de todas as mensagens.
- Síntese de voz em português brasileiro com `expo-speech`.
- Exibição da última mensagem selecionada.
- Botões **Repetir** e **Cancelar áudio** fixos no rodapé, fora da rolagem.
- Interrupção da fala anterior ao selecionar outra mensagem.

| Categoria | Mensagens |
| --- | --- |
| Conversas | Olá!, Obrigado!, Sim, Não, Por favor, Até logo! |
| Necessidades | Quero água, Estou com fome, Preciso de ajuda, Quero ir ao banheiro |
| Sentimentos | Estou feliz, Estou triste, Estou cansado, Estou com medo |

As conversas aparecem primeiro. A ordem é fixa, sem histórico de uso ou
personalização. A categoria selecionada e a última mensagem ficam apenas na
memória e são descartadas ao reiniciar o aplicativo.

## Tecnologias

O projeto usa **JavaScript com JSX**, sem TypeScript.

| Tecnologia | Versão declarada |
| --- | --- |
| Expo | ~58.0.23 |
| React Native | 0.88.1 |
| React | 19.3.0 |
| expo-speech | ~58.0.3 |
| react-native-safe-area-context | ~5.11.1 |

As dependências estão em `package.json`, e as versões resolvidas ficam em
`pnpm-lock.yaml`. A interface utiliza componentes nativos, sem biblioteca de
UI ou navegação entre telas.

## Executar o projeto

### Pré-requisitos

- Node.js compatível com o Expo SDK 58.
- pnpm instalado.
- Celular Android com Expo Go compatível com o SDK 58 ou emulador Android
  configurado.
- Mecanismo de síntese de voz com uma voz em português (Brasil) disponível.

Na pasta do projeto, execute:

```bash
pnpm install --frozen-lockfile
pnpm start
```

Abra o projeto pelo QR Code no Expo Go. Para usar um emulador Android, inicie-o
e pressione `a` no terminal do Expo, ou execute:

```bash
pnpm android
```

Se houver problemas de cache após trocar de versão do código, encerre o
servidor e reinicie com:

```bash
pnpm expo start --clear
```

O foco do projeto é **Android em orientação retrato**. Os scripts `pnpm ios` e
`pnpm web` existem, mas essas plataformas não foram homologadas.

## Como usar

1. Ao abrir o aplicativo, o filtro **Todas** mostra os 14 cartões.
2. Use os filtros horizontais para escolher uma categoria.
3. Toque em um cartão para solicitar a leitura da mensagem. O texto escolhido
   aparece em **Última mensagem**, ao final do conteúdo.
4. Toque em **Repetir** para ouvir novamente a última mensagem. Esse botão fica
   desabilitado enquanto nenhuma mensagem tiver sido escolhida.
5. Toque em **Cancelar áudio** para interromper a fala ou um pedido pendente.

Trocar de categoria não apaga a última mensagem. Os controles de áudio
permanecem visíveis enquanto os cartões são rolados.

## Voz e funcionamento offline

A fala usa o mecanismo de síntese de voz do dispositivo. O aplicativo consulta
as vozes disponíveis e avisa quando não encontra uma voz em português
brasileiro ou quando ocorre uma falha. A comunicação visual continua disponível.

Para preparar uma demonstração sem internet externa:

1. Instale previamente as ferramentas, as dependências e o Expo Go.
2. Nas configurações de síntese de voz do Android, selecione português (Brasil)
   e baixe os dados de voz para uso offline. Os menus variam por fabricante.
3. Abra o projeto no aparelho e teste a fala antes da oficina.
4. Inicie o servidor em modo offline:

   ```bash
   pnpm expo start --offline
   ```

Esse modo não instala pacotes nem baixa vozes. No fluxo de desenvolvimento,
o Expo Go ainda precisa acessar o servidor Metro por rede local ou conexão
USB/ADB configurada. Uma voz listada pelo sistema não garante que seus dados
estejam disponíveis offline: isso precisa ser testado no aparelho.

O projeto não implementa backend, contas, gravação de áudio, uso do microfone
ou serviço próprio de voz em nuvem. A disponibilidade da fala sem internet
depende do mecanismo de voz e dos dados instalados no dispositivo.

## Estrutura do projeto

```text
vozativa/
├── assets/                         # Ícones e imagens do aplicativo
├── src/
│   ├── App.js                      # Tela principal, estados e lógica de voz
│   ├── frases.js                   # Mensagens e ordem das categorias
│   ├── estilos.js                  # Estilos e cores por categoria
│   └── componentes/
│       ├── Cabecalho.js             # Marca, slogan e barra de status
│       ├── CartaoFrase.js           # Botão de uma mensagem
│       ├── ControlesAudio.js        # Repetir e cancelar no rodapé
│       ├── FiltrosCategorias.js     # Seleção horizontal de categorias
│       └── UltimaMensagem.js        # Texto da última mensagem escolhida
├── app.json                        # Configuração do Expo
├── index.js                        # Registro do componente principal
├── package.json                    # Dependências e scripts
└── pnpm-lock.yaml                  # Versões resolvidas das dependências
```

Os componentes recebem dados e funções por propriedades. `src/App.js`
centraliza os estados de categoria e última mensagem, além das operações de
fala. Uma referência numérica invalida pedidos antigos de voz durante
operações assíncronas, evitando que uma solicitação ultrapassada volte a falar.

Para editar as mensagens, altere `src/frases.js`, mantendo identificadores
únicos e categorias compatíveis com os filtros. Ajustes visuais ficam em
`src/estilos.js`.

## Acessibilidade

A implementação inclui:

- Papéis e rótulos acessíveis nos botões e cabeçalhos.
- Indicação semântica da categoria selecionada e do estado de Repetir.
- Emojis como apoio visual, sem foco independente.
- Alvos de toque com altura mínima de 48 dp e cartões com mínimo de 124 dp.
- Textos sem limite explícito de linhas.
- Áreas seguras no cabeçalho e no rodapé para barras e recortes do aparelho.

Esses recursos não equivalem a uma validação de acessibilidade. O uso com
TalkBack, fontes ampliadas e diferentes tamanhos de tela ainda precisa ser
verificado em dispositivos reais.

## Uso na oficina

O projeto permite trabalhar componentes, propriedades, eventos, listas,
estados, estilos e integração com recursos do dispositivo em uma oficina de
quatro horas.

| Duração | Atividade |
| --- | --- |
| 30 min | Introdução a React Native, Expo, CAA e acessibilidade |
| 50 min | Construção da interface com componentes nativos |
| 45 min | Mensagens em arrays, propriedades e renderização com `map` |
| 45 min | Integração de voz e eventos de toque |
| 40 min | Categorias, `useState`, `filter` e última mensagem |
| 25 min | Verificações de acessibilidade e uso no Android |
| 5 min | Revisão e demonstração final |

Prepare aparelhos, dependências e vozes antes da atividade. Inclua os rótulos
acessíveis durante a construção dos componentes, não apenas no encerramento.

## Estado das verificações

O projeto não possui suíte de testes automatizados nem scripts de lint ou
checagem de tipos configurados. Ainda não há validação concluída de pronúncia,
concorrência de áudio, TalkBack, fonte ampliada ou funcionamento offline no
Android.

Checklist para validação manual:

- [ ] Conferir os 14 cartões e a filtragem das três categorias.
- [ ] Ouvir as mensagens com uma voz em português brasileiro.
- [ ] Selecionar cartões rapidamente e verificar a substituição da fala.
- [ ] Repetir a última mensagem e cancelar a fala, inclusive durante pedidos pendentes.
- [ ] Confirmar que trocar de categoria preserva a última mensagem.
- [ ] Percorrer filtros, cartões e controles com TalkBack.
- [ ] Verificar fontes ampliadas e larguras de tela entre 360 e 430 dp.
- [ ] Confirmar que os controles fixos não cobrem os cartões.
- [ ] Testar a fala sem internet externa, com a voz local previamente instalada.

# Manual de marca · Dra. Lorraine Souza

**Versão 1.0 · 2026** — fonte: hand-off do Claude Design (`Brandbook.dc.html`, `Home Nova.dc.html`).
Este documento é a referência de aplicação da identidade **dentro deste repositório**: o que
está implementado, onde mora cada decisão e o que não pode ser quebrado.

> Uma marca serena, clínica e precisa. Ela nasce de um letterpress em papel:
> sutil, monocromática, sem efeito.

Índice: [01 Marca](#01-marca) · [02 Cores](#02-cores) · [03 Tipografia](#03-tipografia) ·
[04 Componentes](#04-componentes) · [05 Fotografia](#05-fotografia) · [06 Voz](#06-tom-de-voz) ·
[07 Aplicações](#07-aplicações) · [08 Para o dev](#08-para-o-dev) · [Pendências](#pendências-conhecidas)

---

## 01 Marca

O **monograma LS** é o ativo central. O sobrenome tipografado só aparece no lockup completo.

### No código

Tudo vem de [`components/Logo/Logo.js`](../components/Logo/Logo.js). Nunca desenhe a marca à
mão nem use `<img>` apontando para os SVGs em componentes React — o componente existe para
garantir tom, proporção e acessibilidade.

```jsx
import { Logo, Monogram } from "@components/Logo";

<Logo lockup="horizontal" tone="copper" />   // header, rodapé
<Logo lockup="vertical" tone="copper" />     // aplicação principal, materiais
<Logo lockup="monogram" tone="rose" />       // selo, mobile, fundo escuro
<Monogram decorative className="h-14 opacity-50" />  // ornamento de seção
```

**Props**

| Prop | Valores | Nota |
| --- | --- | --- |
| `lockup` | `horizontal` (padrão), `vertical`, `monogram` | |
| `tone` | `copper` (padrão), `ink`, `rose`, `paper` | `rose`/`paper` só sobre fundo escuro |
| `markClassName` | classe de altura do monograma | é assim que se controla o tamanho |
| `ariaLabel` | string | o lockup é `role="img"`; o monograma interno é decorativo |

### Tamanhos mínimos

| Aplicação | Altura mínima |
| --- | --- |
| Lockup vertical | 72px |
| Lockup horizontal | 40px |
| Monograma isolado | 24px |
| Descritor em serifa | 12px — abaixo disso, usar Inter |

O descritor **DERMATOLOGIA** é sempre tipografado em Inter 500 · 10px · `tracking-label`
(0,24em), em **cobre escuro**. Nunca em cobre puro, nunca em serifa em tela: abaixo de 12px a
serifa fina desaparece. Isso já está embutido no componente.

No header, o lockup completo aparece a partir de `sm`; abaixo disso mostramos o monograma
isolado, que continua legível.

### Área de respiro

A margem mínima ao redor da marca equivale à **metade da altura da haste do L**. Nada entra
nessa zona: nem texto, nem foto, nem borda.

### Usos proibidos

- Não distorcer — proporção sempre travada.
- Não rotacionar — a marca é sempre horizontal.
- Sem sombra, sem 3D, sem efeito de camada.
- Não recolorir — só cobre, tinta, rosa ou papel (é por isso que `tone` é enumerado).
- Não aplicar sobre foto agitada — use área lisa ou tarja.

### Arquivos

| Arquivo | Uso |
| --- | --- |
| `public/ls-monogram.svg` | cobre — padrão sobre papel |
| `public/ls-monogram-dark.svg` | cobre escuro |
| `public/ls-monogram-rose.svg` | rosa pálido — fundo escuro |
| `public/ls-monogram-cream.svg` | papel — fundo escuro sólido |
| `public/ls-monogram-ink.svg` | tinta — monocromia, impresso |
| `public/favicon.svg` | monograma em cobre sobre papel, respiro de 14% |
| `public/safari-pinned-tab.svg` | silhueta monocromática |

Os ícones raster (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
`apple-touch-icon.png`, `android-chrome-*.png`, `mstile-150x150.png`) são gerados a partir do
monograma. Nos tiles de 16–48px o mark usa **cobre escuro** e respiro menor: no cobre puro e
com margem de 14% a serifa fina some. Para regerar, veja
[`scripts/generate-favicons.js`](../scripts/generate-favicons.js).

`public/logo-lss.svg` e `public/logo-lss-light.svg` (a marca "L·S·S" anterior) foram removidos.

---

## 02 Cores

O terracota anterior (**#9A4639**) saiu do sistema. O cobre do monograma passa a ser o único
acento, com uma variação escura para texto.

| Token Tailwind | Hex | Uso |
| --- | --- | --- |
| `copper` | `#B48967` | Marca, fios, números, ícones |
| `copper-dark` | `#8C6248` | Links, eyebrows, ênfase em texto |
| `rose` | `#E7D3C4` | Marca em fundo escuro, tarjas |
| `ink` | `#1C1917` | Títulos, botão primário, superfície escura |
| `paper` | `#FAF6F0` | Fundo padrão do site |
| `sand` | `#F1ECE4` | Seções alternadas, cards |
| `line` | `#E7E2D9` | Fios de 1px, divisores |
| `stone` | `#57534E` | Texto secundário, labels |
| `slate` | `#3C3833` | Corpo sobre Areia |

### Contraste verificado

| Par | Razão | Uso liberado |
| --- | --- | --- |
| Tinta sobre Papel | 16,4:1 | tudo |
| Pedra sobre Papel | 7,1:1 | corpo |
| Cobre escuro sobre Papel | 4,9:1 | links, labels |
| Cobre sobre Papel | 2,9:1 | **só gráfico ou ≥32px** |
| Cobre sobre Tinta | 5,7:1 | texto em fundo escuro |

> **Regra prática:** cobre puro nunca carrega texto pequeno sobre papel. Para texto, use
> `copper-dark`. `copper` é para fios, números grandes, setas e ícones.

É por isso que os ranks de aprovação em `components/Results/Results.js` usam `text-copper`
(são 44–64px) enquanto todo eyebrow do site usa `text-copper-dark`.

### Proporção de uso

70% Papel · 18% Areia · 8% Tinta · 4% Cobre. Na prática: a página respira em papel, alterna
seções em areia, e o escuro aparece **uma vez** — no CTA final.

### Nunca use hex cru

Toda cor da marca tem token. Em código novo, `bg-[#FAF6F0]` é erro de revisão; escreva
`bg-paper`. Para conferir:

```bash
grep -rnE "(text|bg|border|decoration|fill|stroke|ring|accent|divide)-\[#" pages components
```

---

## 03 Tipografia

Duas famílias, carregadas por `next/font/google` em
[`utils/fonts.js`](../utils/fonts.js) e expostas como as CSS variables `--font-body` /
`--font-display` em [`pages/_app.js`](../pages/_app.js).

| Família | Token | Uso |
| --- | --- | --- |
| Cormorant Garamond | `font-display` | Títulos, números grandes, citações |
| Inter | `font-sans` | Corpo, labels, botões, formulários, tabelas |

**Cormorant nunca em texto corrido abaixo de 20px.** Por isso `h1`–`h4` recebem
`font-display font-light` na base ([`styles/core/_typography.scss`](../styles/core/_typography.scss))
e `h5`/`h6` permanecem em Inter.

### Escala

| Nome | Especificação |
| --- | --- |
| Display XL | Cormorant 300 · 80/82 · -0,02em |
| Display L | Cormorant 300 · 56/59 |
| Display M | Cormorant 300 · 40/44 |
| Título | Cormorant 400 · 28/34 |
| Lead | Inter 400 · 18/30 |
| Corpo | Inter 400 · 16/26 |
| Label | Inter 500 · 12 · 0,24em caixa alta |
| Índice | Mono · 13 · 0,15em |

Utilitários de tracking disponíveis: `tracking-label` (0,24em, labels),
`tracking-index` (0,15em, numerais 01–05), `tracking-lockup` (0,12em, nome da marca).

### Ênfase

Uma única ênfase por título, **em itálico**. O cobre escuro marca a palavra que importa.

```jsx
<h2 className="font-display font-light">
    Dois caminhos, uma <span className="italic">mesma origem</span>.
</h2>
```

Não faça: serifa em caixa alta, peso alto, ou cobre puro em texto. Caixa alta só em labels de 12px.

### Duas armadilhas já pagas

1. **`next/font` não funciona em `pages/_document.js`.** As variáveis precisam ser declaradas
   a partir do `_app.js`. Se forem declaradas no `_document`, as classes aparecem no HTML mas
   as variáveis ficam vazias.
2. **O fallback dentro do `var()` é obrigatório.** `font-family: var(--font-body), Inter` com a
   variável ausente é uma declaração **inválida** — o navegador descarta a propriedade inteira
   e a página inteira cai no serif padrão. Por isso os stacks em `tailwind.config.js` são
   `var(--font-body, Inter)`.

---

## 04 Componentes

Cantos retos, fios de 1px, nenhum sombreamento decorativo. **O raio zero é assinatura da
marca** — `rounded-none` em botões, cards, campos, imagens e selos. `rounded` sem sufixo
também resolve para 0px.

| Componente | Regra |
| --- | --- |
| Botão primário | Tinta → cobre escuro no hover. Padding 18/36. Sem raio. |
| Botão secundário | Contorno de tinta, preenche no hover. **Nunca dois primários lado a lado.** |
| Link de texto | Sublinhado a 6px de offset, fio de cobre. Ação terciária ao lado do botão. |
| Linha de serviço | Hover: fundo Areia, título em cobre escuro. A seta é sempre cobre. |
| Campo | Foco: borda cobre, sem glow. |
| Selo | Caixa alta, nunca arredondado. |
| Header | Lockup horizontal a 38px + fio divisor + CTA "Agendar". |
| Divisor | Fio de 1px na cor `line`. Nunca sombra. |

O CTA no header é parte da identidade nova: a ação primária da marca fica sempre visível.

### Revelação progressiva

A página não despeja texto de uma vez. Blocos longos ficam fechados por padrão em
[`components/Disclosure`](../components/Disclosure/Disclosure.js), e a pessoa escolhe o que
abrir. `components/FAQ` é uma casca fina sobre ele.

```jsx
import { Disclosure, DisclosureList } from "@components/Disclosure";

<DisclosureList>
    <Disclosure title="Cosmiatria">{descricao}</Disclosure>
    <Disclosure title="Dermatologia clínica">{descricao}</Disclosure>
</DisclosureList>
```

Quando usar:

- **Sim** — parágrafos longos, FAQ, detalhamento de serviço, trajetória. Sempre deixe a
  primeira ideia visível e esconda o aprofundamento (é o padrão de "Sobre mim" na home).
- **Não** — listas de itens curtos, escaneáveis (uma linha cada). Fechar essas piora a
  leitura em vez de melhorar. Grades de benefício e listas de inclusões ficam abertas.

Construído sobre `<details>`/`<summary>`: funciona sem JS, é navegável por teclado e não
depende de estado em React. Nada de raio, nada de sombra — fio de 1px e "+" em cobre que
gira 45° ao abrir.

### Navegação em mobile

Abaixo de `lg` a navegação vira um painel, em
[`components/Nav/Nav.js`](../components/Nav/Nav.js). Regras que não podem se perder:

- **O CTA nunca some.** Na barra ele só cabe a partir de `lg`; abaixo disso desce para o fim
  do painel, como botão primário de largura total. A ação primária da marca precisa estar
  sempre a um toque de distância.
- **Painel, não overlay.** Papel sólido, ancorado abaixo do header, itens separados por fio de
  1px, cantos retos. Sem sombra, sem cortina escura.
- **Alvo de toque de 44px** no botão de menu e nos itens do painel.
- **Ícone em SVG inline.** O botão de menu não usa `@iconify/react`: é o controle primário de
  navegação no mobile e não pode depender de um fetch em runtime para aparecer.
- **Fecha sozinho** ao navegar (`routeChangeComplete`, `hashChangeComplete`) e no `Esc`.
- Abaixo de `sm` o header mostra só o monograma; o lockup completo volta a partir de `sm`.

Campos de formulário usam `font-size: 16px` no mobile — abaixo disso o iOS dá zoom no foco.

### Agendamento: duas modalidades

`/consulta/agendar` abre com a escolha de modalidade, nunca com o formulário. A página de
Consulta **não** enumera as duas opções de antemão — quem clica em "Agendar" é que decide.

| Modalidade | Como funciona | Onde vive |
| --- | --- | --- |
| Videoconsulta | Fluxo de 6 passos, pagamento online. É a única com preço publicado (R$ 350). | `StepAboutYou` → `StepSchedule` |
| Presencial · Campinas, SP | Sem agendamento online: procedimentos listados e CTA para o WhatsApp. | `StepPresencial` |

- O **preço só aparece na videoconsulta**. R$ 350 é o valor do atendimento remoto; publicá-lo
  em página que cobre as duas modalidades induz a erro.
- O WhatsApp da agenda presencial é `WHATSAPP_PRESENCIAL_URL`, em
  [`pages/consulta/agendar/index.js`](../pages/consulta/agendar/index.js). Um único lugar —
  não espalhe o número pelo código.
- Procedimentos presenciais (toxina botulínica, bioestimulador, preenchimento, peelings,
  microagulhamento) **não** são "o que a consulta não cobre": são o que a modalidade
  presencial oferece. Qualquer lista de limitações precisa apontar para o presencial, e não
  soar como recusa.

---

## 05 Fotografia

Luz natural, pele real, fundo de papel. A imagem confirma o cuidado, não vende beleza.

| Parâmetro | Alvo |
| --- | --- |
| Temperatura | quente, 5200–5600K |
| Contraste | baixo, pretos abertos |
| Saturação | natural ou −5% |
| Recorte | 3:4 retrato · 4:5 social |
| Raio | 0 · sempre reto |
| Respiro | ≥ 15% de área lisa para texto |

Nada de vinheta, pele alaranjada ou desfoque de beleza. O acervo precisa de texturas de apoio
(detalhes de pele, consultório, materiais) — elas substituem ilustrações e ícones.

### Imagem clínica

Regra própria, acima da estética:

- Consentimento escrito e específico para cada canal de uso.
- Sem identificação facial, salvo autorização expressa.
- Antes/depois com mesma luz, distância e enquadramento, nunca retocado.
- Fundo neutro, sem adorno e sem marca sobreposta na lesão.
- Nada que sugira resultado garantido (CFM 1.974/2011).

---

## 06 Tom de voz

Primeira pessoa, sem jargão e sem promessa. **Uma médica falando, não uma clínica.**

- **Clara** — termo técnico só quando necessário, e explicado na mesma frase.
- **Próxima** — escreve "eu" e "você". Nunca "a paciente" ou "nossos serviços".
- **Honesta** — diz o que o tratamento faz e o que não faz. Nenhum superlativo.
- **Serena** — sem urgência artificial, sem "últimas vagas", sem exclamação.

| Em vez de | Escreva |
| --- | --- |
| "Transforme sua pele com o melhor tratamento dermatológico do mercado!" | Vamos entender a sua pele antes de propor qualquer tratamento. |
| "Agende já! Vagas limitadas para a mentoria." | Acompanho poucos médicos por vez, para que a mentoria seja de fato individual. |
| "Nossa equipe oferece atendimento humanizado e personalizado." | A consulta dura uma hora porque escutar leva tempo. |

**Sempre:** Dra. Lorraine Souza · Dermatologia · CRM e RQE visíveis em qualquer material clínico.

**Nunca:** emoji, exclamação dupla, "milagre", "definitivo", promessa de resultado, travessão
(—) ou preço em destaque.

**Assinatura:** "Dermatologia com ciência, escuta e cuidado." Usar como fecho, não como slogan
repetido.

---

## 07 Aplicações

Mesmo sistema fora do site: monograma, cobre, fio de 1px e muito papel.

- **Instagram** — post 4:5; ritmo da grade com no máximo uma peça escura ou de cor cheia a cada três.
- **Receituário e cartão** — lockup + CRM/RQE, contato e endereço em Inter.
- **Assinatura de e-mail** — lockup horizontal, uma linha de credenciais, sem imagem pesada.

---

## 08 Para o dev

### Onde mora cada coisa

| Decisão | Arquivo |
| --- | --- |
| Paleta, famílias, escala, tracking, raio | [`tailwind.config.js`](../tailwind.config.js) |
| Carregamento das fontes | [`utils/fonts.js`](../utils/fonts.js) + [`pages/_app.js`](../pages/_app.js) |
| Serifa nos títulos | [`styles/core/_typography.scss`](../styles/core/_typography.scss) |
| Marca | [`components/Logo/Logo.js`](../components/Logo/Logo.js) |
| Header, nav e CTA | [`components/Header/Header.js`](../components/Header/Header.js), [`components/Nav/Nav.js`](../components/Nav/Nav.js) |
| Rodapé | [`components/Footer/Footer.js`](../components/Footer/Footer.js) |
| Ícones de aba e manifesto | [`components/SEO/SEO.js`](../components/SEO/SEO.js), `public/site.webmanifest` |

### Substituições aplicadas nesta migração

```
#9A4639  →  #8C6248   (copper-dark: texto, links, eyebrow)
#9A4639  →  #B48967   (copper: fios, números ≥32px, ícones, setas)
#E4B5AC  →  #E7D3C4   (rose: marca em fundo escuro)
#F3EADB  →  #F1ECE4   (sand: seção alternada)
```

Mantidos, agora como tokens: `paper` `line` `stone` `slate` `ink`.

### Checklist de revisão

- [ ] Nenhum hex cru de marca no `className` — use os tokens.
- [ ] Cobre puro só em elemento gráfico ou texto ≥32px.
- [ ] `rounded-none` (ou nenhum raio) em tudo que é da marca.
- [ ] Títulos em `font-display`; nada de Cormorant abaixo de 20px.
- [ ] Labels em caixa alta com `tracking-label`, em `copper-dark`.
- [ ] Um único botão primário por bloco.
- [ ] Marca via `<Logo>` / `<Monogram>`, com `tone` da paleta permitida.
- [ ] Sem sombra decorativa; separação é sempre fio de 1px em `line`.
- [ ] Texto sem exclamação, emoji, travessão ou promessa de resultado.

---

## Pendências conhecidas

Coisas que a identidade pede e que **não** estão resolvidas no repositório:

1. **Retrato do hero.** `public/lolo-portrait-consulta.jpg` tem fundo vermelho saturado —
   exatamente o terracota que a marca aposenta. O brandbook marca essa imagem como
   "não faça". Substituir na próxima produção, seguindo §05.
2. **Texturas de apoio.** Faltam imagens de detalhe clínico (pele, consultório, materiais).
3. **Legado de tokens.** `tailwind.config.js` ainda expõe as paletas `primary` / `secondary` /
   `black` / `white` / `badge`, consumidas por `styles/core/components/*.scss` e por páginas
   internas. São depreciadas — não usar em código novo.
4. **Raio nas páginas internas.** O sweep de raio zero foi aplicado à home e ao chrome
   compartilhado. Páginas internas ainda têm `rounded-*` pontuais (ex.: marcadores em
   `pages/mentoria/index.js`).

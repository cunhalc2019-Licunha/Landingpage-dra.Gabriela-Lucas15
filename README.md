# Site da Dra. Gabriela Lucas — pronto para o GitHub Pages

Esta pasta é o site completo e independente. Nada aqui depende do resto do projeto.

## Como publicar

1. Crie um repositório no GitHub (por exemplo `gabriela-lucas-site`).
2. Envie **o conteúdo desta pasta** para a raiz do repositório — o `index.html` precisa ficar na raiz, não dentro de `site/`.
3. No repositório, vá em **Settings › Pages**.
4. Em *Source*, escolha **Deploy from a branch**; em *Branch*, selecione `main` e a pasta `/ (root)`. Salve.
5. Em um ou dois minutos o endereço aparece na mesma tela: `https://<seu-usuario>.github.io/<nome-do-repo>/`.

Se preferir manter o site numa subpasta do repositório, escolha `/docs` no passo 4 e renomeie esta pasta para `docs`.

### Pelo terminal

```bash
cd site
git init
git add -A
git commit -m "Site Dra. Gabriela Lucas"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<nome-do-repo>.git
git push -u origin main
```

## O que tem aqui

| Arquivo | Papel |
| --- | --- |
| `index.html` | Página. Carrega o CSS, a biblioteca e os quatro arquivos de tela |
| `styles.css` | Todos os tokens da marca num só arquivo (cores, tipografia, espaçamento, motion) |
| `ds-bundle.js` | Biblioteca de componentes da marca, já compilada |
| `landing.jsx` | Montagem da página e navegação por seção |
| `hero-section.jsx` | Topo com a foto em bloco inteiro e o véu fumê |
| `pelvic-floor-3d.jsx` | Modelo tridimensional do assoalho pélvico |
| `sections.jsx` | Manifesto, anatomia, serviços, jornada, sobre, como funciona, avaliações, contato |
| `*.webp` · `*.jpg` | Logos e fotografias, na raiz |
| `.nojekyll` | Impede o GitHub de processar a pasta como blog. **Não apague** |

## Dois pontos importantes

**Não abra o `index.html` com dois cliques.** Os arquivos `.jsx` são buscados por rede, e o protocolo `file://` bloqueia isso — a página fica branca. No GitHub Pages funciona normalmente. Para testar na sua máquina, rode um servidor local:

```bash
cd site
python3 -m http.server 8000
# abra http://localhost:8000
```

**O JSX é convertido no navegador do visitante.** É o mesmo modo do protótipo: simples de publicar e de editar, ao custo de cerca de meio segundo a mais no primeiro carregamento e de uma dependência de três arquivos em CDN (React e Babel, no `unpkg.com`). Para um site definitivo de captação, o certo é converter esses quatro `.jsx` num único `.js` na hora da publicação, o que elimina o Babel do navegador e derruba o peso. Se você quiser esse passo, me diga.

## Conteúdo que ainda falta

- As três avaliações do Google estão transcritas manualmente. Novas avaliações precisam ser adicionadas em `sections.jsx`, na constante `REVIEWS`.
- Não há menu sanduíche no celular: a navegação quebra em duas linhas.
- As fontes (Josefin Sans, Jost, Cormorant Garamond) vêm do Google Fonts. Se você tiver os arquivos licenciados, dá para hospedar junto e cortar essa dependência.

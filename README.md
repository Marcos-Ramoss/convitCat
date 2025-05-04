# Convite Especial

Um projeto simples em HTML, CSS e JavaScript que apresenta um convite interativo com sistema de escolhas.

## Funcionalidades

- Imagem de perfil em formato circular
- Uma pergunta "Quer jogar e assistir filme comigo?"
- Botão "Aceitar" que mostra uma mensagem positiva com efeito de confete
- Botão "Recusar" que se move quando o cursor passa por cima, tornando impossível clicar nele
- Design responsivo que funciona em qualquer dispositivo (desktop, tablet e celular)
- Página de escolhas com opções de jogos e filmes
- Efeitos de fogos de artifício ao escolher uma opção

## Como usar

1. Baixe ou clone este repositório
2. Substitua o arquivo de imagem em "/img/bb.jpeg" por uma imagem de sua escolha
3. Adicione imagens para as opções de jogos e filmes em "/img/game1.jpg", "/img/movie1.jpg" e "/img/game2.jpg"
4. Abra o arquivo `index.html` em seu navegador

## Estrutura do projeto

- `index.html` - Página inicial com o convite
- `choices.html` - Página de escolha de jogos e filmes
- `style.css` - Estilos da página inicial
- `choices.css` - Estilos da página de escolhas
- `script.js` - Funcionalidades da página inicial
- `choices.js` - Funcionalidades da página de escolhas
- `/img/` - Pasta para armazenar todas as imagens

## Fluxo do aplicativo

1. Usuário visualiza a página inicial com o convite
2. Se o usuário tentar clicar em "Recusar", o botão se movimenta e não pode ser clicado
3. Quando o usuário clica em "Aceitar", é redirecionado para a página de escolhas
4. Na página de escolhas, o usuário pode selecionar entre jogos e filmes
5. Ao selecionar uma opção, aparece uma tela com efeitos de fogos de artifício e a imagem escolhida

## Personalização

Você pode personalizar facilmente:
- As imagens (substituindo os arquivos na pasta "/img/")
- As cores (editando os arquivos style.css e choices.css)
- Os textos e descrições (editando os arquivos HTML)
- As opções de jogos e filmes (editando o arquivo choices.html)

## Compatibilidade

Este projeto é compatível com:
- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis (smartphones e tablets)
- Telas de diferentes tamanhos 
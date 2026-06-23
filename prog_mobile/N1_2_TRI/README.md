# N1 2º TRI de Prog. Mobile | Gerenciamento de Estoque
## Aplicativo mobile feito em React Native/Expo para cadastro, listagem e remoção de itens de estoque.

## Como rodar o app:

Primeiro baixe o app do Expo Go no celular.
Depois rode estes comandos em um terminal aberto na pasta do projeto:

npm install
npx expo start 

Após rodar o 2º, aparecerá um QR Code. Leia o QR Code no app Expo Go e é isso.

1. O que é o useEffect e qual o seu papel no ciclo de vida de um componente?

É um hook que executa efeitos colaterais após a renderização. Ele substitui os métodos de ciclo de vida das classes.

2. Como funciona o array de dependências e o que acontece se o deixarmos vazio []?

O efeito roda quando algum valor do array muda. Quando ele fica vázio, ele roda apenas na 1ª renderização.
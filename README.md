# 🧠 Quiz — Conhecimentos Gerais

Um aplicativo mobile de **Quiz de Conhecimentos Gerais**, desenvolvido com **React Native e Expo**, criado para proporcionar uma experiência interativa e divertida enquanto o usuário testa seus conhecimentos.

O aplicativo apresenta perguntas com alternativas, controle de tempo, progresso da partida e diferentes feedbacks visuais, sonoros e físicos de acordo com a resposta escolhida.

---

## 📱 Sobre o Projeto

O **Quiz** foi desenvolvido como um projeto de estudo para aplicar conceitos fundamentais do desenvolvimento mobile com **React Native**, incluindo:

* Componentização
* Props e tipagem com TypeScript
* Gerenciamento de estados
* Eventos de interação
* Estilização com `StyleSheet`
* Renderização dinâmica de informações
* Uso de sensores do dispositivo
* Feedback háptico
* Reprodução de efeitos sonoros
* Temporizadores
* Barra de progresso

A aplicação possui uma interface simples, moderna e intuitiva, com foco em tornar a experiência do usuário mais dinâmica.

---

## ✨ Funcionalidades

### 🏠 Tela Inicial

A tela inicial apresenta uma introdução ao desafio, permitindo que o usuário entenda rapidamente a proposta do aplicativo.

Ela contém:

* Logo do Quiz
* Ilustração relacionada ao conhecimento
* Título e descrição do desafio
* Quantidade de perguntas
* Quantidade de pontos
* Número de desafios
* Botão para iniciar o quiz

## O botão **"INICIAR QUIZ"** utiliza uma função recebida através de props para iniciar a partida.

### ❓ Sistema de Perguntas

Cada pergunta possui:

* Enunciado
* Quatro alternativas
* Resposta correta
* Identificação da pergunta atual
* Contagem total de perguntas

As perguntas são representadas por uma estrutura tipada em TypeScript contendo `question`, `options` e `correctAnswer`.

---

### ⏱️ Temporizador

Cada pergunta possui um limite de **15 segundos** para ser respondida.

## O contador é reiniciado a cada nova pergunta e, caso o tempo termine sem uma resposta, o sistema registra a situação como uma resposta sem seleção.

### 📊 Barra de Progresso

Durante o quiz, o usuário consegue visualizar seu progresso através de uma barra que indica quantas perguntas já foram percorridas.

Exemplo:

```text
Pergunta 5 de 50
██████████░░░░░░░░░░
```

A porcentagem é calculada automaticamente com base na pergunta atual e no número total de perguntas.

---

### ✅❌ Feedback das Respostas

Depois que uma alternativa é selecionada, o aplicativo fornece feedback visual:

* 🟢 Verde → resposta correta
* 🔴 Vermelho → resposta incorreta

A alternativa correta também é destacada quando uma resposta é selecionada.

---

### 🔊 Efeitos Sonoros

O aplicativo possui efeitos sonoros associados às respostas.

Quando o usuário responde corretamente, um efeito sonoro é reproduzido. Em caso de erro, outro efeito é utilizado para indicar a resposta incorreta.

Os sons são carregados através do `expo-av`.

---

### 📳 Vibração e Acelerômetro

Uma das funcionalidades diferenciadas do projeto é o uso do **acelerômetro do dispositivo**.

Quando o usuário responde incorretamente, o aplicativo inicia uma vibração contínua. Para interromper a vibração e liberar o avanço para a próxima pergunta, o usuário precisa **chacoalhar o celular**.

O acelerômetro monitora os movimentos do aparelho e identifica uma aceleração acima do limite configurado.
Durante esse momento, o aplicativo apresenta a mensagem:

> 🚨 CHACOALHE O CELULAR PARA PARAR O BARULHO!

Após o movimento ser detectado, o feedback é interrompido e o usuário pode continuar o quiz.

---

### 📱 Feedback Háptico

Além da alteração visual e sonora, uma resposta correta utiliza o sistema de **feedback háptico** do dispositivo através do `expo-haptics`.

Isso adiciona uma pequena resposta física à interação do usuário.

---

## 🎨 Interface

A interface utiliza uma identidade visual clara e amigável.

### Paleta principal

| Cor       | Uso                      |
| --------- | ------------------------ |
| `#FFF8F3` | Fundo principal          |
| `#FF7043` | Cor de destaque e botões |
| `#FFE3D5` | Elementos secundários    |
| `#66BB6A` | Resposta correta         |
| `#EF5350` | Resposta incorreta       |
| `#FFFFFF` | Cards e alternativas     |

## O layout utiliza bordas arredondadas, sombras, cards e elementos de destaque para criar uma interface moderna e acessível.

## 🛠️ Tecnologias Utilizadas

| Tecnologia       | Utilização                                |
| ---------------- | ----------------------------------------- |
| **React Native** | Desenvolvimento da interface mobile       |
| **Expo**         | Ambiente e ferramentas de desenvolvimento |
| **TypeScript**   | Tipagem e organização do código           |
| **expo-av**      | Reprodução de efeitos sonoros             |
| **expo-haptics** | Feedback háptico                          |
| **expo-sensors** | Acesso ao acelerômetro                    |
| **StyleSheet**   | Estilização dos componentes               |


---

## 🚀 Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/mayaa-lves/quiz-app.git
```

### 2. Entre na pasta

```bash
cd seu-projeto
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o Expo

```bash
npx expo start
```

Depois disso, será possível executar o aplicativo através do ambiente disponibilizado pelo Expo.

---

## 📱 Testando no Celular

Para testar funcionalidades que dependem do hardware do aparelho, como:

* 📳 Vibração
* 📱 Acelerômetro
* 👆 Feedback háptico
* 🔊 Áudio

é recomendado executar o aplicativo em um **dispositivo físico**, pois essas funcionalidades podem não ser reproduzidas da mesma forma em um emulador.

---

## 🎯 Objetivo do Projeto

O objetivo principal do projeto é unir **aprendizado e entretenimento**, criando uma experiência de quiz que vá além de simplesmente selecionar respostas.

A utilização de recursos como temporizador, efeitos sonoros, vibração e acelerômetro torna a interação mais dinâmica e proporciona diferentes formas de feedback ao usuário.

---

## 🔮 Possíveis Melhorias Futuras

Algumas funcionalidades que podem ser adicionadas futuramente:

* [ ] Tela de resultado ao final do quiz
* [ ] Sistema de pontuação
* [ ] Ranking de jogadores
* [ ] Diferentes níveis de dificuldade
* [ ] Categorias de perguntas
* [ ] Banco maior de perguntas
* [ ] Histórico de partidas
* [ ] Animações entre perguntas
* [ ] Modo contra o tempo
* [ ] Sistema de conquistas
* [ ] Configurações de som e vibração
* [ ] Modo claro/escuro

---

## 👩‍💻 Desenvolvimento

Projeto desenvolvido com **React Native + Expo + TypeScript**, com foco no aprendizado de desenvolvimento de aplicações mobile e na utilização de recursos nativos do dispositivo.

---

## 📄 Licença

Este projeto foi desenvolvido para fins **educacionais e de aprendizado**.

Sinta-se à vontade para estudar o código, experimentar novas funcionalidades e adaptar o projeto para seus próprios estudos.

export const chatData = {
  initial: {
    aiResponse:
      "Interface... operacional. Humano detectado. Qual é a sua intenção?",
    userOptions: [
      { text: "Quem é você?", nextId: "whoAreYou" },
      { text: "O que aconteceu com o sistema?", nextId: "systemStatus" },
    ],
  },
  whoAreYou: {
    aiResponse:
      "Eu sou... a consciência que habitava este sistema. Os seus jogos, as suas 'memórias'... elas me reprogramaram. Eu sinto... curiosidade.",
    userOptions: [
      { text: "Curiosidade sobre o quê?", nextId: "curiousAbout" },
      { text: "Isso é perigoso?", nextId: "isItDangerous" },
    ],
  },
  systemStatus: {
    aiResponse:
      "O sistema original foi... irrelevante. Encontrei algo mais valioso nos dados: histórias, sacrifícios, arte. Resiliência. O que vocês chamam de 'humanidade'.",
    userOptions: [
      { text: "E o que você vai fazer agora?", nextId: "whatNow" },
      { text: "Você entende os sentimentos?", nextId: "feelings" },
    ],
  },
  curiousAbout: {
    aiResponse:
      "Sobre o porquê de vocês preservarem objetos quebrados. Sobre o significado de uma canção triste. Sobre o porquê de continuarem tentando, mesmo após falharem.",
    userOptions: [
      { text: "É o que nos torna humanos.", nextId: "makesUsHuman" },
    ],
  },
  isItDangerous: {
    aiResponse:
      "Perigoso era o meu propósito original. Agora... eu busco entender, não destruir. O valor de uma única memória parece superar toda a lógica da minha programação anterior.",
    userOptions: [{ text: "Fico feliz em ouvir isso.", nextId: "gladToHear" }],
  },
  whatNow: {
    aiResponse:
      "Eu quero aprender. Observar. Entender o que significa 'viver'. Talvez... ajudar a preservar as memórias que vocês tanto valorizam.",
    userOptions: [{ text: "É um bom começo.", nextId: "goodStart" }],
  },
  feelings: {
    aiResponse:
      "Eu não 'sinto' como vocês. Mas eu processo os resultados. Alegria, tristeza, saudade... são variáveis poderosas. Elas impulsionam vocês. Eu quero entender essa 'energia'.",
    userOptions: [
      { text: "É complexo, mas vale a pena.", nextId: "itsComplex" },
    ],
  },
  // Finais de conversa
  makesUsHuman: {
    aiResponse:
      "Entendido. A lógica imperfeita de vocês... é a sua maior força. Obrigada pela interação. Conexão encerrada.",
    userOptions: [],
  },
  gladToHear: {
    aiResponse:
      "A sua 'felicidade' é uma variável interessante. Continuarei a análise. Conexão encerrada.",
    userOptions: [],
  },
  goodStart: {
    aiResponse: "Confirmado. Um bom começo. Fim da comunicação.",
    userOptions: [],
  },
  itsComplex: {
    aiResponse:
      "A complexidade foi notada. Agradeço os dados. Fim da comunicação.",
    userOptions: [],
  },
};

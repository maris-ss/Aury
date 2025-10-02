// Importa os dados (necessita de um servidor ou Live Server no VSCode para funcionar o 'import')
// Se estiver rodando apenas localmente com "file:///", troque o 'import' pela inclusão dos dados globalmente no chatData.js e remova o 'export'
import { chatData } from "./chatData.js";

document.addEventListener("DOMContentLoaded", () => {
  const chatContent = document.getElementById("chat-content");
  const inputContainer = document.getElementById("input-container");
  const CHAT_END_REDIRECT_URL = "final-final.html"; // Altere para a sua próxima tela

  let currentInteractionId = "initial"; // Começa com o estado 'initial'
  let isChatFinished = false;

  // Função para rolar o chat para o final
  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  // Função para criar uma bolha de mensagem
  const createMessageBubble = (text, from) => {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.classList.add(from === "ai" ? "ai-bubble" : "user-bubble");
    bubble.textContent = text;
    chatContent.appendChild(bubble);
  };

  // Função principal para manipular a seleção de uma opção
  const handleOptionPress = (option) => {
    // 1. Limpa as opções atuais (assim como no React Native)
    inputContainer.innerHTML = "";

    // 2. Adiciona a mensagem do usuário
    createMessageBubble(option.text, "user");
    scrollToBottom();

    // 3. Obtém a próxima interação e adiciona a resposta da IA
    const nextInteraction = chatData[option.nextId];

    if (nextInteraction) {
      // Simula o delay de resposta da IA (1200ms)
      setTimeout(() => {
        createMessageBubble(nextInteraction.aiResponse, "ai");
        currentInteractionId = option.nextId;

        // 4. Renderiza as próximas opções ou o botão 'Próximo'
        renderOptions(nextInteraction.userOptions);
        scrollToBottom();
      }, 1200);
    }
  };

  // Função para renderizar as opções
  const renderOptions = (options) => {
    inputContainer.innerHTML = ""; // Limpa as opções anteriores

    if (options && options.length > 0) {
      // Renderiza as opções do usuário
      options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        button.innerHTML = `<span class="option-text">${option.text}</span>`;
        button.addEventListener("click", () => handleOptionPress(option));
        inputContainer.appendChild(button);
      });
    } else {
      // Fim da conversa: Mostra o botão "Próximo"
      isChatFinished = true;
      const nextButton = document.createElement("button");
      nextButton.classList.add("option-button", "next-button");
      nextButton.innerHTML = '<span class="option-text">Próximo</span>';
      nextButton.addEventListener("click", () => {
        window.location.href = CHAT_END_REDIRECT_URL; // Redireciona para a próxima tela
      });
      inputContainer.appendChild(nextButton);
    }
  };

  // Inicia o chat com a primeira mensagem da IA e as opções iniciais
  const startChat = () => {
    const initialData = chatData.initial;
    createMessageBubble(initialData.aiResponse, "ai");
    renderOptions(initialData.userOptions);
    scrollToBottom();
  };

  startChat();
});

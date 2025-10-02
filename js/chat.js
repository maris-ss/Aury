import { chatData } from "./chatData.js";

document.addEventListener("DOMContentLoaded", () => {
  const chatContent = document.getElementById("chat-content");
  const inputContainer = document.getElementById("input-container");
  const CHAT_END_REDIRECT_URL = "final-final.html"; 

  let currentInteractionId = "initial";
  let isChatFinished = false; 

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container");

    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  };

  const createMessageBubble = (text, from) => {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.classList.add(from === "ai" ? "ai-bubble" : "user-bubble");
    bubble.textContent = text;
    chatContent.appendChild(bubble);
  };

  const handleOptionPress = (option) => {
    inputContainer.innerHTML = ""; 

    createMessageBubble(option.text, "user");
    scrollToBottom(); 

    const nextInteraction = chatData[option.nextId];

    if (nextInteraction) {
      setTimeout(() => {
        createMessageBubble(nextInteraction.aiResponse, "ai");
        currentInteractionId = option.nextId; 

        renderOptions(nextInteraction.userOptions);
        scrollToBottom();
      }, 1200);
    }
  };

  const renderOptions = (options) => {
    inputContainer.innerHTML = ""; 

    if (options && options.length > 0) {
      options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        button.innerHTML = `<span class="option-text">${option.text}</span>`;
        button.addEventListener("click", () => handleOptionPress(option));
        inputContainer.appendChild(button);
      });
    } else {
      isChatFinished = true;
      const nextButton = document.createElement("button");
      nextButton.classList.add("option-button", "next-button");
      nextButton.innerHTML = '<span class="option-text">Próximo</span>';
      nextButton.addEventListener("click", () => {
        window.location.href = CHAT_END_REDIRECT_URL; 
      });
      inputContainer.appendChild(nextButton);
    }
  };

  const startChat = () => {
    const initialData = chatData.initial;
    createMessageBubble(initialData.aiResponse, "ai");
    renderOptions(initialData.userOptions);
    scrollToBottom();
  };

  startChat();
});

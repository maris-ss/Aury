document.addEventListener("DOMContentLoaded", () => {
  // 1. Seletores dos elementos:
  const finalizeButton = document.getElementById("finalize-button");
  const cardParabens = document.getElementById("card-parabens");
  const glitchStage1Content = document.getElementById("glitch-stage-1-content");
  const glitchLines = document.getElementById("glitch-lines"); // Agora será encontrado!
  const body = document.body;

  // Verificação atualizada
  if (!finalizeButton || !glitchLines) {
    console.error(
      "Botão ou Linhas de Glitch não encontrados. Verifique o HTML."
    );
    return;
  }

  // Função para iniciar a animação
  const startGlitchAnimation = () => {
    // Desabilita o botão para evitar cliques múltiplos (Boa prática)
    finalizeButton.disabled = true;

    // 🟢 ALTERAÇÃO: Usa .hidden em vez de .remove() para esconder o botão.
    const alignBtn = cardParabens.querySelector(".align-btn");
    if (alignBtn) {
      alignBtn.classList.add("hidden");
    }

    // --- Stage 0 (Parabéns) -> Inicia o glitch visual ---
    glitchLines.classList.add("glitch-active");
    body.classList.add("glitch-shake");

    // ... (restante dos timeouts) ...

    // --- Stage 1 (Mensagens de IA) -> após 3 segundos ---
    setTimeout(() => {
      cardParabens.classList.add("hidden");
      glitchStage1Content.classList.remove("hidden");
    }, 3000);

    // --- Stage 2 (Volta ao Parabéns) -> após 7 segundos ---
    setTimeout(() => {
      glitchStage1Content.classList.add("hidden");
      cardParabens.classList.remove("hidden");
    }, 7000);

    // --- Transição para o Chat -> após 9 segundos ---
    setTimeout(() => {
      // Limpa os efeitos visuais
      glitchLines.classList.remove("glitch-active");
      body.classList.remove("glitch-shake");

      // Redireciona para a tela de chat
      window.location.href = "chat.html";
    }, 9000);
  };

  finalizeButton.addEventListener("click", startGlitchAnimation);
});

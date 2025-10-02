document.addEventListener("DOMContentLoaded", () => {
  const finalizeButton = document.getElementById("finalize-button");
  const cardParabens = document.getElementById("card-parabens");
  const glitchStage1Content = document.getElementById("glitch-stage-1-content");
  const glitchLines = document.getElementById("glitch-lines");
  const body = document.body;

  const glitchAudio = new Audio("./image/glitchaudio.mp3");
  glitchAudio.volume = 1.0; 

  if (!finalizeButton || !glitchLines) {
    console.error(
      "Botão ou Linhas de Glitch não encontrados. Verifique o HTML."
    );
    return;
  }

  const startGlitchAnimation = () => {
    finalizeButton.disabled = true;

    const alignBtn = cardParabens.querySelector(".align-btn");
    if (alignBtn) {
      alignBtn.classList.add("hidden");
    }

    glitchAudio.currentTime = 0; // garante que começa do início
    glitchAudio
      .play()
      .catch((err) => console.warn("Erro ao tocar áudio:", err));

    glitchLines.classList.add("glitch-active");
    body.classList.add("glitch-shake");

    setTimeout(() => {
      cardParabens.classList.add("hidden");
      glitchStage1Content.classList.remove("hidden");
    }, 3000);

    setTimeout(() => {
      glitchStage1Content.classList.add("hidden");
      cardParabens.classList.remove("hidden");
    }, 7000);

    setTimeout(() => {
      glitchLines.classList.remove("glitch-active");
      body.classList.remove("glitch-shake");

      window.location.href = "chat.html";
    }, 9000);
  };

  finalizeButton.addEventListener("click", startGlitchAnimation);
});

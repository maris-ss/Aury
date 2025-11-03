
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("intro-video");
  const mainContent = document.getElementById("main-content");

  // Se não existir mainContent ou vídeo, garante que o conteúdo apareça
  if (!mainContent) return video ? video.remove() : null;

  if (!video) {
    mainContent.classList.remove("hidden");
    return;
  }

  const revealContent = () => {
    // remove o vídeo e mostra conteúdo
    try { video.pause(); } catch(e) {}
    video.classList.add("hidden");
    mainContent.classList.remove("hidden");
  };

  // Quando terminar normalmente
  video.addEventListener("ended", revealContent);
  // Em caso de erro de carregamento
  video.addEventListener("error", revealContent);

  // Tenta tocar programaticamente (trata autoplay bloqueado)
  // Reset time pra garantir que sempre tente do início
  try { video.currentTime = 0; } catch (e) {}

  const p = video.play();
  if (p !== undefined) {
    p.then(() => {
      // autoplay OK, o evento 'ended' cuidará do fim
    }).catch((err) => {
      // autoplay bloqueado -> mostrar conteúdo imediatamente
      console.warn("Autoplay bloqueado ou falha ao tocar vídeo:", err);
      revealContent();
    });
  } else {
    // navegadores antigos: se ficou pausado após 1s, revela
    setTimeout(() => {
      if (video.paused) revealContent();
    }, 1000);
  }

  // Caso o usuário volte para a página (navigation via history), garante mostrar
  window.addEventListener("pageshow", () => {
    if (video.ended || video.paused) revealContent();
  });
});


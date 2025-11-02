document.addEventListener("DOMContentLoaded", () => {
    const EXPIRY_KEY = "game_expiry_time";
    const GAME_OVER_PAGE = "erro.html";

    const timerDisplay = document.getElementById("floating-timer-display");
    const container = document.getElementById("floating-relogio-container");
    const navbar = document.querySelector(".navbar");

    // --- INÍCIO DA LÓGICA DE ALINHAMENTO ATUALIZADA ---

    function alignTimerUnderNavbar() {
        if (!navbar || !container) {
            console.error("Navbar ou container do timer não encontrado para alinhamento.");
            return;
        }

        // Mede as dimensões e a posição da navbar na tela
        const navbarRect = navbar.getBoundingClientRect();
        
        // Calcula a posição 'top':
        // Posição da parte de baixo da navbar + 15px de margem
        const topPosition = navbarRect.bottom + 15;

        // Calcula a posição 'right':
        // (Largura total da janela) - (posição da borda direita da navbar)
        // Isso nos dá exatamente o espaço que a navbar tem à direita.
        const rightPosition = window.innerWidth - navbarRect.right;

        // Aplica AMBAS as posições ao container do timer
        container.style.top = `${topPosition}px`;
        container.style.right = `${rightPosition}px`;
    }

    // Alinha o timer assim que a página carrega
    alignTimerUnderNavbar();

    // Adiciona um "ouvinte" que realinha o timer toda vez que a janela muda de tamanho
    window.addEventListener("resize", alignTimerUnderNavbar);

    // --- FIM DA LÓGICA DE ALINHAMENTO ---


    // --- LÓGICA ORIGINAL DO TIMER (continua igual) ---

    if (!timerDisplay || !container) {
        console.error("Erro: Elementos do timer flutuante não encontrados no DOM.");
        return;
    }

    const expiryTimeString = localStorage.getItem(EXPIRY_KEY);

    if (!expiryTimeString) {
        timerDisplay.textContent = "05:00";
        container.style.display = "none";
        return;
    }

    container.style.display = "block";

    const expiryTime = parseInt(expiryTimeString, 10);
    let intervalId = null;

    function updateTimer() {
        const remainingTimeMs = expiryTime - Date.now();

        if (remainingTimeMs <= 0) {
            clearInterval(intervalId);
            timerDisplay.textContent = "00:00";
            localStorage.removeItem(EXPIRY_KEY);

            setTimeout(() => {
                if (!window.location.pathname.includes(GAME_OVER_PAGE)) {
                    window.location.href = GAME_OVER_PAGE;
                }
            }, 500);
            return;
        }

        const totalSeconds = Math.floor(remainingTimeMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    }

    intervalId = setInterval(updateTimer, 1000);
    updateTimer();
});
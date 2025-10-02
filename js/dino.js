const game = document.querySelector(".game");
const player = document.querySelector(".player");
const scoreEl = document.querySelector(".score");
const retryBtn = document.querySelector(".retry-btn");

// pega popup e botão
const popup = document.getElementById("congrats-popup");
const nextBtn = document.getElementById("next-game-btn");

let jumping = false;
let score = 0;
let gameOver = false;
let gameStarted = false;

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    e.preventDefault();
    if (!gameStarted && !gameOver) {
      gameStarted = true;
      createObstacle();
    }
    if (!jumping && !gameOver) {
      jump();
    }
  }
});

function jump() {
  jumping = true;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
    jumping = false;
  }, 600);
}

function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  obstacle.style.left = game.offsetWidth + "px";
  game.appendChild(obstacle);

  let obsInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(obsInterval);
      return;
    }

    let obsLeft = parseInt(obstacle.style.left);
    obsLeft -= 4;
    obstacle.style.left = obsLeft + "px";

    const playerRect = player.getBoundingClientRect();
    const obsRect = obstacle.getBoundingClientRect();

    // colisão
    if (
      playerRect.right > obsRect.left &&
      playerRect.left < obsRect.right &&
      playerRect.bottom > obsRect.top
    ) {
      gameOver = true;
      retryBtn.style.display = "block";
      clearInterval(obsInterval);
    }

    // passou obstáculo
    if (obsRect.right < playerRect.left && !obstacle.counted) {
      obstacle.counted = true;
      score++;
      scoreEl.textContent = score + "/10";

      // vitória
      if (score >= 10) {
        gameOver = true;

        // mostra popup
        setTimeout(() => {
          popup.classList.add("active");
          popup.setAttribute("aria-hidden", "false");
        }, 400);
      }
    }

    if (obsLeft + 24 < 0) {
      obstacle.remove();
      clearInterval(obsInterval);
    }
  }, 20);

  let delay = 1000 + Math.random() * 500;
  setTimeout(createObstacle, delay);
}

// botão "tentar novamente"
retryBtn.addEventListener("click", () => {
  score = 0;
  gameOver = false;
  gameStarted = true;
  scoreEl.textContent = "0/10";
  scoreEl.classList.remove("final");
  retryBtn.style.display = "none";

  document.querySelectorAll(".obstacle").forEach((o) => o.remove());

  createObstacle();
});

// botão da popup
nextBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  popup.setAttribute("aria-hidden", "true");
  window.location.href = "final.html";
});

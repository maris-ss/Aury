const game = document.querySelector(".game");
const player = document.querySelector(".player");
const scoreEl = document.querySelector(".score");
const retryBtn = document.querySelector(".retry-btn");
const floatingBtn = document.querySelector(".floating-btn");

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

    if (
      playerRect.right > obsRect.left &&
      playerRect.left < obsRect.right &&
      playerRect.bottom > obsRect.top
    ) {
      gameOver = true;
      retryBtn.style.display = "block";
      clearInterval(obsInterval);
    }

    if (obsRect.right < playerRect.left && !obstacle.counted) {
      obstacle.counted = true;
      score++;
      if (score >= 10) {
        scoreEl.textContent = "parabens! você superou os obstáculos!";
        scoreEl.classList.add("final");
        gameOver = true;
        floatingBtn.classList.add("completed");
      } else {
        scoreEl.textContent = score + "/10";
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


floatingBtn.addEventListener("click", () => {
  if (floatingBtn.classList.contains("completed")) {
    window.location.href = "final.html"; 
  }
});

const gameArea = document.querySelector(".game-area");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 } 
);

observer.observe(gameArea);

const SHOW_MILLIS = 600;
const gridEl = document.getElementById("grid");
const restartFloatingBtn = document.getElementById("restart-btn");

let flipped = [];
let lockBoard = false;
let matches = 0;
const totalPairs = 6;

function onCardClick(card) {
  if (lockBoard) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched"))
    return;

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    const [a, b] = flipped;
    const idA = a.getAttribute("data-id");
    const idB = b.getAttribute("data-id");

    if (idA === idB) {
      a.classList.add("matched");
      b.classList.add("matched");
      flipped = [];
      matches++;

      if (matches === totalPairs) {
        setTimeout(() => {
          restartFloatingBtn.classList.add("completed"); // fica roxo
          restartFloatingBtn.setAttribute("aria-hidden", "false");
        }, 200);
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        a.classList.remove("flipped");
        b.classList.remove("flipped");
        flipped = [];
        lockBoard = false;
      }, SHOW_MILLIS);
    }
  }
}

function addCardEvents() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => onCardClick(card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onCardClick(card);
      }
    });
  });
}

restartFloatingBtn.addEventListener("click", () => {
  if (!restartFloatingBtn.classList.contains("completed")) return;
  window.location.href = "hierogrifos.html"; 
});

addCardEvents();

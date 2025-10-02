const gameArea = document.querySelector(".game-area");

document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px) scale(0.8)";
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        gsap.to(".card", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
        });

        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(gameArea);

const SHOW_MILLIS = 600;
const gridEl = document.getElementById("grid");

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
          const popup = document.getElementById("congrats-popup");
          popup.classList.add("active");
          popup.setAttribute("aria-hidden", "false");
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

addCardEvents();

// Botão da popup
document.getElementById("next-game-btn").addEventListener("click", () => {
  const popup = document.getElementById("congrats-popup");
  popup.classList.remove("active");
  popup.setAttribute("aria-hidden", "true");

  // redireciona para o próximo jogo
  window.location.href = "hierogrifos.html";
});

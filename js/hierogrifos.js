const correctAnswer = "o codigo nao tem alma";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const input = document.getElementById("answer");
const popup = document.getElementById("congrats-popup");
const nextBtn = document.getElementById("next-game-btn");

// resposta correta => abre popup
input.addEventListener("input", () => {
  const userText = normalizeText(input.value);
  if (userText === correctAnswer) {
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");

    gsap.fromTo(
      ".popup-content",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }
});

// botão próximo jogo
nextBtn.addEventListener("click", () => {
  popup.classList.remove("active");
  popup.setAttribute("aria-hidden", "true");

  // redireciona para próximo jogo
  window.location.href = "jogodino.html";
});

/* -------------------------
   Animação letras -> símbolos (glitch)
-------------------------- */

const symbols = [
  "./image/sym1.webp",
  "./image/sym2.webp",
  "./image/sym3.webp",
  "./image/sym4.webp",
  "./image/sym5.webp",
  "./image/sym6.webp",
  "./image/sym7.webp",
];

const paragraphs = document.querySelectorAll(".intro-section p");

// quebra textos em spans individuais
paragraphs.forEach((p) => {
  const text = p.textContent;
  p.textContent = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");

    if (char === " ") {
      span.classList.add("space");
      span.textContent = " ";
    } else {
      span.classList.add("letter");
      span.textContent = char;
      span.dataset.original = char;
    }

    p.appendChild(span);
  });
});

const letters = Array.from(document.querySelectorAll(".letter"));

function glitchLetter(letter) {
  const original = letter.dataset.original;
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

  const img = document.createElement("img");
  img.src = randomSymbol;
  img.alt = "símbolo";

  gsap.to(letter, {
    duration: 0.5,
    onStart: () => {
      letter.textContent = "";
      letter.appendChild(img);
    },
    onComplete: () => {
      letter.textContent = original;
    },
  });
}

function glitchEffect() {
  // seleciona 2 ou 3 letras diferentes aleatórias
  const shuffled = letters.sort(() => 0.5 - Math.random());
  const chosen = shuffled.slice(0, 3);

  chosen.forEach((letter, i) => {
    setTimeout(() => glitchLetter(letter), i * 200); // contratempos
  });
}

// dispara o glitch a cada 800ms
setInterval(glitchEffect, 800);

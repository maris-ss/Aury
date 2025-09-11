const correctAnswer = "o codigo nao tem alma";

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

const input = document.getElementById("answer");
const button = document.getElementById("restart-btn");

input.addEventListener("input", () => {
  const userText = normalizeText(input.value);
  if (userText === correctAnswer) {
    button.classList.add("completed"); 
  } else {
    button.classList.remove("completed"); 
  }
});

button.addEventListener("click", () => {
  if (button.classList.contains("completed")) {
    window.location.href = "jogodino.html";
  }
});

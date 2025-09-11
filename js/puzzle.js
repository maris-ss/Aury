const gameSection = document.querySelector(".game-section");

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

observer.observe(gameSection);

const imageFiles = [
  "image/puzze1.png",
  "image/puzze2.png",
  "image/puzze3.png",
  "image/puzze4.png",
  "image/puzze5.png",
  "image/puzze6.png",
  "image/puzze7.png",
  "image/puzze8.png",
  "image/puzze9.png",
  "image/puzze10.png",
  "image/puzze11.png",
  "image/puzze12.png",
];

const puzzleGrid = document.getElementById("puzzle-grid");
const restartBtn = document.getElementById("restart-btn");

let pieces = [];
let draggingElement = null;

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const createPieces = () => {
  pieces = imageFiles.map((src, index) => {
    const piece = document.createElement("div");
    piece.className = "puzzle-piece";
    piece.dataset.correctIndex = index;
    piece.style.backgroundImage = `url(${src})`;
    piece.draggable = true;
    return piece;
  });

  shuffle(pieces);

  pieces.forEach((piece) => {
    puzzleGrid.appendChild(piece);
  });
};

const checkWin = () => {
  const currentPieces = Array.from(puzzleGrid.children);
  const isComplete = currentPieces.every(
    (piece, index) => parseInt(piece.dataset.correctIndex) === index
  );

  if (isComplete) {
    restartBtn.classList.add("completed"); 
  } else {
    restartBtn.classList.remove("completed"); 
  }
};


puzzleGrid.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("puzzle-piece")) {
    draggingElement = e.target;
    e.target.classList.add("dragging");
  }
});

puzzleGrid.addEventListener("dragover", (e) => {
  e.preventDefault(); 
});

puzzleGrid.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("puzzle-piece") && draggingElement) {
    const targetElement = e.target;
    if (draggingElement !== targetElement) {
      const parent = draggingElement.parentNode;
      const temp = document.createElement("div");
      parent.insertBefore(temp, draggingElement);
      parent.insertBefore(draggingElement, targetElement);
      parent.insertBefore(targetElement, temp);
      temp.remove();
      checkWin();
    }
  }

  if (draggingElement) draggingElement.classList.remove("dragging");
  draggingElement = null;
});

restartBtn.addEventListener("click", () => {
  if (!restartBtn.classList.contains("completed")) return; 

  
  window.location.href = "jogomemory.html"; 
});

window.onload = () => {
  createPieces();
};

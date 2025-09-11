document.addEventListener("DOMContentLoaded", () => {
  const backgroundCode = document.querySelector(".background-code");
  const codeLines = [
    '<html lang="en">',
    '<meta charset="UTF-8">',
    "<div>",
    "<span>",
    'console.log("Hello World");',
    "const arr = [];",
    "function init() {",
    "#include <iostream>",
    "public static void main(String[] args) {",
    'print("Python Code");',
    "var x = 10;",
    'let y = "text";',
    "</head>",
    "<body>",
    "</html>",
    "</script>",
    "<style>",
    ".class { color: #fff; }",
    'git commit -m "initial commit"',
    "npm install",
    "pip install requests",
    "SELECT * FROM users;",
    "UPDATE products SET price = 99;",
    '<?php echo "Hello"; ?>',
    "#define MAX_SIZE 100",
    "// C++ comment",
    "/* JS comment */",
    "<span></span>",
    "<a></a>",
    "<p></p>",
    "<h1></h1>",
    "background-color: #0D0D0D;",
    "font-family: 'Fira Code';",
    "position: absolute;",
    "display: flex;",
    "justify-content: center;",
    "align-items: center;",
    "z-index: 10;",
    "transform: translate(-50%, -50%);",
    "width: 100vw;",
    "height: 100vh;",
    "overflow: hidden;",
  ];

  function createCodeLine() {
    const line = document.createElement("span");
    line.classList.add("code-line");

    const rand = Math.random();
    if (rand < 0.33) {
      line.classList.add("back");
    } else if (rand < 0.66) {
      line.classList.add("mid");
    } else {
      line.classList.add("front");
    }

    line.textContent = codeLines[Math.floor(Math.random() * codeLines.length)];
    line.style.left = Math.random() * 100 + "vw";
    line.style.top = Math.random() * 200 - 50 + "vh";

    const zDepth = Math.random() * 300;
    line.style.setProperty("--z-index-depth", `-${zDepth}px`);
    line.style.setProperty("--scale-depth", `${1 - zDepth / 600}`);

    const duration = parseFloat(getComputedStyle(line).animationDuration);
    line.style.animationDelay = `-${Math.random() * duration}s`;

    backgroundCode.appendChild(line);

    line.addEventListener("animationiteration", () => {
      line.style.left = Math.random() * 100 + "vw";
      line.style.top = Math.random() * 200 - 50 + "vh";
      
    });
  }

  for (let i = 0; i < 70; i++) {
    createCodeLine();
  }

  const humanCheckButton = document.querySelector(".human-check-button");
  const popupContent = document.querySelector(".popup-content");
  const popupImage = document.querySelector(".popup-image"); 


const btnAlign = document.querySelector(".btn-align");

humanCheckButton.addEventListener("click", () => {
  humanCheckButton.style.display = "none";

  const loader = document.createElement("div");
  loader.classList.add("loader");
  btnAlign.appendChild(loader);

  setTimeout(() => {
    popupContent.innerHTML = `
      <h1 class="new-title">ACESSO</h1>
      <p class="prompt-text">Você está pronto?</p>
      <button class="choice-button" id="yes-button">> SIM</button>
      <button class="choice-button" id="no-button">> NÃO</button>
    `;

    setupChoiceButtons();
  }, 2000);
});



  function setupChoiceButtons() {
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");

    yesButton.addEventListener("click", () => {
      startGlitchTransition("index.html");
    });

    noButton.addEventListener("click", () => {
      startGlitchTransition("erro.html");
    });
  }

  function startGlitchTransition(targetUrl) {
    document.body.classList.add("transitioning"); 

    const glitchContainer = document.createElement("div");
    glitchContainer.classList.add("transition-glitch-container");

    const numSquares = 100; 
    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement("div");
      square.classList.add("glitch-square");

      // Posição aleatória
      square.style.top = Math.random() * 100 + "vh";
      square.style.left = Math.random() * 100 + "vw";
      square.style.width = Math.random() * 10 + 5 + "vw"; 
      square.style.height = Math.random() * 10 + 5 + "vw"; 

      const randomRotate = Math.random() * 360 - 180;
      const randomHue = Math.random() * 180 - 90; 
      square.style.setProperty("--random-rotate", `${randomRotate}deg`);
      square.style.setProperty("--random-hue", `${randomHue}deg`);

      glitchContainer.appendChild(square);
    }

    document.body.appendChild(glitchContainer);
    glitchContainer.style.display = "block"; 

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1000); 
  }
  
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

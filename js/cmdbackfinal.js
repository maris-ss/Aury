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
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


document.addEventListener("DOMContentLoaded", () => {
  const storeButton = document.querySelector(".human-check-button");

  storeButton.addEventListener("click", () => {
    // Substitua pelo link da sua loja
    const lojaLink = "https://aury-one.vercel.app/loja";
    window.location.href = lojaLink;
  });
});

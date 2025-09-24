function scrollToGrid() {
  const grid = document.getElementById("grid-loja");
  grid.scrollIntoView({ behavior: "smooth" });
}

let carrinho = [];
const telas = document.querySelectorAll(".tela");

function mostrarTela(id) {
  telas.forEach((t) => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

// Produtos com detalhes
const produtos = {
  8: {
    titulo: "Guitarra Fender Stratocaster",
    subtitulo: "Vendido e entregue por Aury",
    valor: 150.0,
    descricao:
      "Essa guitarra era do vocalista Lucas da banda de garagem Ducks&Rats. Essa banda foi a maior do bairro de pinheirinhos em Gôiania. Hoje em dia Lucas não trabalha mais com música e troce para que alguém crie boas memórias com sua guitarra",
    imagem: "./image/produto8.png",
  },
  10: {
    titulo: "Relógio Despertador",
    subtitulo: "Vendido e entregue por Aury",
    valor: 200.0,
    descricao:
      "Esse relógio era do vovô Felipe, um senhor que despertava ás 6 da manhã todos os dias para sua caminhada matinal. Apesar do avanço da tecnologia, vovô Felipe nunca abriu mão do clássico som estridente do despertador.",
    imagem: "./image/produto10.png",
  },
  12: {
    titulo: "Pelúcia Snoopy",
    subtitulo: "Vendido e entregue por Aury",
    valor: 100.0,
    descricao:
      "O Snoop era a pelúcia favorita de Jeni, uma menininha de 9 anos que dormia todo dia abraçada com ele. Hoje Jeni está na faculdade e o Snoop precisa de outro dono para abraçá-lo.",
    imagem: "./image/produto12.png",
  },
};

// Clique no grid para abrir produto
document.querySelectorAll(".clicavel").forEach((item) => {
  item.addEventListener("click", () => {
    abrirTelaProduto(item.dataset.produto);
  });
});

function abrirTelaProduto(id) {
  const p = produtos[id];
  const tela = document.getElementById("tela-produto");
  tela.innerHTML = `
    <div class="produto-detalhe">
      <img src="${p.imagem}" alt="${p.titulo}">
      <div class="produto-info">
        <h2>${p.titulo}</h2>
        <h3>${p.subtitulo}</h3>
        <p>R$ ${p.valor.toFixed(2)}</p>
        <p>${p.descricao}</p>
        <button id="btn-carrinho-${id}" onclick="adicionarCarrinho(${id})">Adicionar ao carrinho</button>
        <button>Visualizar em 3D</button>
        <button onclick="mostrarTela('tela-produtos')">Voltar</button>
        <button onclick="mostrarSacola()">🛍️ Sacola</button>
      </div>
    </div>
  `;
  mostrarTela("tela-produto");
}

function adicionarCarrinho(id) {
  if (!carrinho.includes(id)) {
    carrinho.push(id);
    document.getElementById(`btn-carrinho-${id}`).innerText =
      "Adicionado ao carrinho";
  }
}

// Sacola
function mostrarSacola() {
  const tela = document.getElementById("tela-sacola");
  tela.innerHTML = `
    <div class="sacola-container">
      <h2>Sua sacola</h2>
      ${carrinho
        .map((id) => {
          const p = produtos[id];
          return `
          <div class="sacola-item">
            <input type="checkbox">
            <img src="${p.imagem}" alt="${p.titulo}">
            <div class="sacola-item-info">
              <p>${p.titulo}</p>
              <p>R$ ${p.valor.toFixed(2)}</p>
            </div>
            <button onclick="removerCarrinho(${id})">🗑️</button>
          </div>
        `;
        })
        .join("")}
      <button onclick="mostrarPagamento()">Ir para pagamento</button>
      <button onclick="mostrarTela('tela-produtos')">Voltar</button>
    </div>
  `;
  mostrarTela("tela-sacola");
}

function removerCarrinho(id) {
  carrinho = carrinho.filter((item) => item !== id);
  mostrarSacola();
}

// Pagamento
function mostrarPagamento() {
  const tela = document.getElementById("tela-pagamento");
  let total = carrinho.reduce((sum, id) => sum + produtos[id].valor, 0);
  tela.innerHTML = `
    <div class="pagamento-container">
      <h2>Seus produtos</h2>
      ${carrinho
        .map((id) => {
          const p = produtos[id];
          return `
          <div class="pagamento-card">
            <img src="${p.imagem}" alt="${p.titulo}">
            <div class="pagamento-info">
              <div>
                <h3>${p.titulo}</h3>
                <p>${p.descricao}</p>
              </div>
              <p><strong>R$ ${p.valor.toFixed(2)}</strong></p>
            </div>
          </div>
        `;
        })
        .join("")}
      <div class="total">
        <span>Total:</span>
        <span>R$ ${total.toFixed(2)}</span>
      </div>
      <button onclick="mostrarTela('tela-sacola')">Voltar</button>
    </div>
  `;
  mostrarTela("tela-pagamento");
}

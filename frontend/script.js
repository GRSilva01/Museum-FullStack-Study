// URL da API Flask
const API_URL = "http://127.0.0.1:5000/api/artes";

const galeria = document.getElementById("galeria");
const modal = document.getElementById("modal");
const fechar = document.getElementById("fechar");

// Campos do modal
const modalImg = document.getElementById("modal-img");
const modalTitulo = document.getElementById("modal-titulo");
const modalAutor = document.getElementById("modal-autor");
const modalAno = document.getElementById("modal-ano");
const modalDescricao = document.getElementById("modal-descricao");

// 1. Busca as artes
fetch(API_URL)
  .then(res => res.json())
  .then(artes => {
    artes.forEach(addCard);
  })
  .catch(err => console.error("Erro ao carregar artes:", err));

// 2. Cria um card por arte
function addCard(arte) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${arte.imagem}" alt="${arte.titulo}">
    <h3>${arte.titulo}</h3>
  `;
  card.addEventListener("click", () => openModal(arte));
  galeria.appendChild(card);
}

function openModal(arte) {
  // limpa classe antiga
  modalImg.classList.remove("vertical");

  // seta SRC
  modalImg.src = arte.imagem;

  // callback que decide orientação
  const setOrientation = () => {
    if (modalImg.naturalHeight > modalImg.naturalWidth) {
      modalImg.classList.add("vertical");  // retrato
    }
  };

  // se a imagem ainda estiver carregando
  if (!modalImg.complete) {
    modalImg.onload = setOrientation;
  } else {
    // já veio do cache → calcula já
    setOrientation();
  }

  // preenche os textos
  modalTitulo.textContent    = arte.titulo;
  modalAutor.textContent     = `Autor: ${arte.autor}`;
  modalAno.textContent       = `Ano: ${arte.ano}`;
  modalDescricao.textContent = arte.descricao;

  modal.classList.remove("hidden");
}
// 4. Fecha o modal clicando no X ou fora do conteúdo
fechar.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.add("hidden");
});

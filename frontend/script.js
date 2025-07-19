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
const buscaInput = document.getElementById('busca');

buscaInput.addEventListener('input', filtrarGaleria);

const botaoFiltros = document.getElementById('botaoFiltros');
const painelFiltros = document.getElementById('painelFiltros');
let artes = [];
let autorAtivo = '';
let seculoAtivo = '';
let localAtivo = '';


//filtro mostrar e recolher

botaoFiltros.addEventListener('click', () => {
  const aberto = painelFiltros.classList.contains('aberto');
  painelFiltros.classList.toggle('aberto', !aberto);
  botaoFiltros.classList.toggle('aberto', !aberto);
  botaoFiltros.textContent = !aberto ? 'Filter ⬆️' : 'Filter ⬇️';
});

//busca das artes
fetch(API_URL)
  .then(res => res.json())
  .then(dados => {
    artes = dados;

    const geoMap = {};
    const seculoUnicos = new Set();
    const autoresUnicos = new Set();

    dados.forEach(obra => {
      //Autores
      autoresUnicos.add(obra.autor);

      //Seculos
      const seculo = Math.floor((obra.ano - 1) / 100) +1;
      seculoUnicos.add(seculo);

      //Continentes e paises
      if (!geoMap[obra.continente]) {
        geoMap[obra.continente] = new Set();
      }
      geoMap[obra.continente].add(obra.pais);
    });

    console.log(autoresUnicos);
    const selectAutor = document.getElementById('filtroAutor');
    selectAutor.innerHTML = '';
    const optTodosAutor = document.createElement('option');
    optTodosAutor.value = '';
    optTodosAutor.textContent = 'Todos';
    selectAutor.appendChild(optTodosAutor);

    autoresUnicos.forEach(autor => {
      const opt = document.createElement('option');
      opt.value = autor;
      opt.textContent = autor;
      selectAutor.appendChild(opt);
    });
    selectAutor.addEventListener('change', () => {
      autorAtivo = selectAutor.value;
      filtrarGaleria();
    })

    const seculoArray = Array.from(seculoUnicos).sort((a,b) => a - b);
    const selectSeculo = document.getElementById('filtroSeculo');
    selectSeculo.innerHTML = '';
    const optTodosSeculo = document.createElement('option');
    optTodosSeculo.value = '';
    optTodosSeculo.textContent = 'Todos';
    selectSeculo.appendChild(optTodosSeculo);

    seculoArray.forEach(seculo => {
      const opt = document.createElement('option');
      opt.value = seculo;
      opt.textContent = `${seculo}`;
      selectSeculo.appendChild(opt);
    });
    selectSeculo.addEventListener('change', () => {
      seculoAtivo = selectSeculo.value;
      filtrarGaleria();
    });
    
    for (const cont in geoMap) {
      geoMap[cont] = Array.from(geoMap[cont]).sort();
    }
    console.log('geoMap', geoMap);
    const selectGeo = document.getElementById('filtroLocal');
    selectGeo.innerHTML = '';
    const optTodoslocal = document.createElement('option');
    optTodoslocal.value = '';
    optTodoslocal.textContent = 'Todos';
    selectGeo.appendChild(optTodoslocal);

    for(const continente in geoMap) {
      const optCont = document.createElement('option');
      optCont.value = continente;
      optCont.textContent = continente;
      selectGeo.appendChild(optCont);

      geoMap[continente].forEach(pais => {
        const optPais = document.createElement('option');
        optPais.value = pais;
        optPais.textContent = pais;
        selectGeo.appendChild(optPais);
      });
    }
    selectGeo.addEventListener('change', () => {
      localAtivo = selectGeo.value;
      filtrarGaleria();
    });
    dados.forEach(addCard);
  })
  
  .catch(err => console.error("Erro ao carregar artes:", err));

//funçao para redesenhar com a barra de busca
function filtrarGaleria() {
  const termo = buscaInput.value.toLowerCase().trim();
  const filtradas = artes.filter(obra => {
    const termoOk = termo === '' || obra.titulo.toLowerCase().includes(termo) || obra.autor.toLowerCase().includes(termo);
    const autorOk = autorAtivo === '' || obra.autor === autorAtivo;
    const seculoOk = seculoAtivo === '' || Math.floor((obra.ano - 1) / 100) + 1 === Number(seculoAtivo);
    const localOk = localAtivo === '' || obra.pais === localAtivo || obra.continente === localAtivo;
    return termoOk && autorOk && seculoOk && localOk
  });
  galeria.innerHTML= '';
  filtradas.forEach(addCard);
}


// 2. Cria um card por arte
function addCard(arte) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${arte.imagem}" alt="${arte.titulo}">
    <h3>${arte.titulo}</h3>`;
  card.addEventListener("click", () => openModal(arte));
  galeria.appendChild(card);
}

function openModal(arte) {
  // zera classe anterior
  modalImg.className = "";

  modalImg.src = arte.imagem;

  const setOrientation = () => {
    if (modalImg.naturalHeight > modalImg.naturalWidth) {
      modalImg.classList.add("vertical");  // retrato
    }
  };

  // roda já ou no onload (cache safe)
  if (modalImg.complete) {
    setOrientation();
  } else {
    modalImg.onload = setOrientation;
  }

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


// script para carregar o header


function carregarHeader() {
  const container = document.createElement('div');
  container.id = 'header';
  document.body.prepend(container);

  const path = location.pathname.includes('/subPaginas/')
    ? '../../nav/header.html'
    : './nav/header.html';

  fetch(path)
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      requestAnimationFrame(() => montarBotoesNav());
    })
    .catch(err => console.error("Erro ao carregar Header: ", err));
}

function montarBotoesNav() {
  const nav = document.getElementById('navLinks');
  if (!nav) return;

  const page = location.pathname.split('/').pop();
  const userLogged = localStorage.getItem("usuarioLogado") !== null;

  const make = (texto, destino) => {
    const a = document.createElement('a');
    a.textContent = texto;
    a.href = destino;
    a.className = 'nav-button';
    return a;
  };

  nav.innerHTML = '';

  if (page === 'index.html') {
    if (userLogged) {
      nav.append(make('Perfil', 'subPaginas/perfil/perfil.html'));
    } else {
      nav.append(
        make('Login', 'subPaginas/login/login.html'),
        make('Sign up', 'subPaginas/cadastro/cadastro.html')
      );
    }
  }

  if (page === 'perfil.html') {
    nav.append(make('Voltar', '../../index.html'));
  }

  if (page === 'login.html') {
    nav.append(
      make('Home', '../../index.html'),
      make('Sign up', '../cadastro/cadastro.html')
    );
  }

  if (page === 'cadastro.html') {
    nav.append(make('Home', '../../index.html'));
  }
}

carregarHeader();

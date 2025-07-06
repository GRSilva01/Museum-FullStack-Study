//================ Script para a pagina de cadastro ====================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('registerEmail').value.trim();
        const senha = document.getElementById('registerSenha').value;

        const resposta = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, senha})
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert('Conta criada com sucesso!');
            form.reset();
        } else {
            alert(dados.erro || 'Erro ao cadastrar usuário');
        }
    });
});
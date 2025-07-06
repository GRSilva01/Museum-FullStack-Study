document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('loginEmail')
    const senhaInput = document.getElementById('loginSenha')
    const msg = document.getElementById('authMsg')

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = emailInput.value.trim().toLowerCase();
        const senha = senhaInput.value;

        try {
        const resposta = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

            if (resposta.ok) {
                msg.textContent = 'Login realizado com sucesso!';
                msg.style.color = 'lightgreen';
                localStorage.setItem('userEmail', email)
                localStorage.setItem('userId', dados.userId)
                window.location.href = '../perfil/perfil.html'
            } else {
                msg.textContent = dados.erro || 'Erro no login';
                msg.style.color = 'red';
            }
        } catch (error) {
            msg.textContent = 'Erro na conexão.';
            msg.style.color = 'red';
        }
    });

});
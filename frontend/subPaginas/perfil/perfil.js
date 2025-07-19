document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    const UserId = localStorage.getItem('userId')

    const emailDisplay = document.getElementById('userEmail');
    const logoutBotao = document.getElementById('logoutBotao');

    if (!userEmail || !UserId) {
        window.location.href = '../login/login.html';
        return;
    }

    emailDisplay.textContent = `E-mail: ${userEmail}`;

    logoutBotao.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('usuarioLogado');
        window.location.href = '../../index.html';
    });
});
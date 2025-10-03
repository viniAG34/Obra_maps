document.addEventListener('DOMContentLoaded', () => {

    const config = {
        login: { username: 'teste', password: 'teste123' },
        messages: {
            loginError: 'Usuário ou senha inválidos.',
            buscaError: (obra) => `Obra com o código "${obra}" não encontrada.`,
        }
    };

    const database = [
        { id: 'OBRA001', nome: 'Poste de Iluminação A-01', latitude: -4.9699, longitude: -37.9734 },
        { id: 'OBRA002', nome: 'Bomba d\'água B-15', latitude: -4.9710, longitude: -37.9750 },
        { id: 'OBRA003', nome: 'Câmera de Segurança C-03', latitude: -4.9685, longitude: -37.9712 }
    ];

    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const infoNome = document.getElementById('info-nome');
    const infoCodigo = document.getElementById('info-codigo');
    const infoLatitude = document.getElementById('info-latitude');
    const infoLongitude = document.getElementById('info-longitude');
    const logoutBtn = document.getElementById('logout-btn');
    const actionsButtons = document.getElementById('actions-buttons'); // Referência adicionada aqui


    function confirmaLogin(event) {
        event.preventDefault();
        const { username, password } = config.login;
        if (usernameInput.value.trim() === username && passwordInput.value.trim() === password) {
            localStorage.setItem('isLoggedIn', 'true');
            mostrarPaginaPrincipal();
        } else {
            loginError.textContent = config.messages.loginError;
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    function buscaObra(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim().toUpperCase();
        if (!searchTerm) return;
        const result = database.find(obra => obra.id.toUpperCase() === searchTerm);
        if (result) {
            apresentarResultados(result);
        } else {
            esconderResultados();
            alert(config.messages.buscaError(searchTerm));
        }
    }

    function deslogar() {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    }

    function mostrarPaginaPrincipal() {
        loginScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }

    function apresentarResultados(data) {
        infoNome.textContent = data.nome;
        infoCodigo.textContent = data.id;
        infoLatitude.textContent = data.latitude;
        infoLongitude.textContent = data.longitude;
        actionsButtons.style.display = 'block'; // Linha corrigida aqui
        resultsContainer.classList.remove('hidden');
    }

    function esconderResultados() {
        resultsContainer.classList.add('hidden');
        actionsButtons.style.display = 'none'; // Linha adicionada para consistência
    }

    function esperarEventos() {
        loginForm.addEventListener('submit', confirmaLogin);
        searchForm.addEventListener('submit', buscaObra);
        logoutBtn.addEventListener('click', deslogar);
    }
    
    function init() {
        esperarEventos();
        if (localStorage.getItem('isLoggedIn') === 'true') {
            mostrarPaginaPrincipal();
        }
    }

    init();
    
});
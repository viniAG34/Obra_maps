document.addEventListener('DOMContentLoaded', () => {

    const app = {
        state: { isLoggedIn: false, currentResult: null, isLoading: false },
        config: {
            credentials: { username: 'teste', password: 'teste123' },
            messages: {
                loginError: 'Usuário ou senha inválidos.',
                searchError: (term) => `Obra com o código "${term}" não encontrada.`,
            },
            apiDelay: 500
        },
        dom: {},
        api: {
            database: [
                { id: 'OBRA001', nome: 'Poste de Iluminação A-01', latitude: -4.9699, longitude: -37.9734 },
                { id: 'OBRA002', nome: 'Bomba d\'água B-15', latitude: -4.9710, longitude: -37.9750 },
                { id: 'OBRA003', nome: 'Câmera de Segurança C-03', latitude: -4.9685, longitude: -37.9712 }
            ],
            findObraById(id) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const searchTerm = id.trim().toUpperCase();
                        const result = this.database.find(obra => obra.id.toUpperCase() === searchTerm);
                        resolve(result || null);
                    }, app.config.apiDelay);
                });
            }
        },
        methods: {
            init() {
                const domIds = [
                    'login-screen', 'main-content', 'login-form', 'username', 'password', 'login-error',
                    'search-form', 'search-input', 'results-container', 'info-nome', 'info-codigo', 'info-latitude',
                    'info-longitude', 'search-placeholder', 'info-content', 'actions-buttons', 'logout-btn'
                ];
                
                domIds.forEach(id => { app.dom[id.replace(/-[a-z]/g, m => m[1].toUpperCase())] = document.getElementById(id); });

                this.bindEvents();
                app.state.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                this.updateUI();
            },
            bindEvents() {
                app.dom.loginForm.addEventListener('submit', this.handleLogin.bind(this));
                app.dom.searchForm.addEventListener('submit', this.handleSearch.bind(this));
                app.dom.logoutBtn.addEventListener('click', this.handleLogout.bind(this));
            },
            updateUI() {
                app.dom.loginScreen.classList.toggle('hidden', app.state.isLoggedIn);
                app.dom.mainContent.classList.toggle('hidden', !app.state.isLoggedIn);

                if (app.state.currentResult) {
                    const { nome, id, latitude, longitude } = app.state.currentResult;
                    app.dom.infoNome.textContent = nome;
                    app.dom.infoCodigo.textContent = id;
                    app.dom.infoLatitude.textContent = latitude;
                    app.dom.infoLongitude.textContent = longitude;
                    
                    app.dom.resultsContainer.classList.remove('hidden');
                    app.dom.searchPlaceholder.classList.add('hidden');
                    app.dom.infoContent.classList.remove('hidden');
                    app.dom.actionsButtons.style.display = 'block';
                } else {
                    app.dom.resultsContainer.classList.add('hidden');
                }
            },
            handleLogin(event) {
                event.preventDefault();
                const { username, password } = app.config.credentials;
                if (app.dom.username.value.trim() === username && app.dom.password.value.trim() === password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    app.state.isLoggedIn = true;
                    this.updateUI();
                } else {
                    app.dom.loginError.textContent = app.config.messages.loginError;
                    app.dom.password.value = '';
                    app.dom.password.focus();
                }
            },
            handleLogout() {
                localStorage.removeItem('isLoggedIn');
                app.state.isLoggedIn = false;
                app.state.currentResult = null;
                this.updateUI();
            },
            async handleSearch(event) {
                event.preventDefault();
                const searchTerm = app.dom.searchInput.value;
                if (!searchTerm || app.state.isLoading) return;

                app.state.isLoading = true;
                const result = await app.api.findObraById(searchTerm);
                app.state.currentResult = result;
                app.state.isLoading = false;
                
                if (!result) {
                    alert(app.config.messages.searchError(searchTerm));
                }
                
                this.updateUI();
            }
        }
    };

    app.methods.init();
});
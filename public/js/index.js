import { showMainApp } from './shared/utils.js';
import { setAuthConfig } from './auth/auth.js';
import { setObraData } from './obra/obra.js';


async function loadData() {
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Não foi possível carregar os dados da aplicação:", error);
        return null;
    }
}

async function init() {
    const data = await loadData();

    if (!data) return; 
    setAuthConfig(data.config);
    setObraData(data.database, data.config);

    if (localStorage.getItem('isLoggedIn') === 'true') {
        showMainApp();
    }
}

init();
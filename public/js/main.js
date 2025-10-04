import { showMainApp } from './modules/ui.js';
import { setAuthConfig } from './modules/auth.js';
import { setObraData } from './modules/obra.js';


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
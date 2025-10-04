// ui elements
const loginScreen = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const resultsContainer = document.getElementById('results-container');
const actionsButtons = document.getElementById('actions-buttons');
const infoNome = document.getElementById('info-nome');
const infoCodigo = document.getElementById('info-codigo');
const infoLatitude = document.getElementById('info-latitude');
const infoLongitude = document.getElementById('info-longitude');

export function showMainApp() {
    loginScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
}

export function displayResults(data) {
    infoNome.textContent = data.nome;
    infoCodigo.textContent = data.id;
    infoLatitude.textContent = data.latitude;
    infoLongitude.textContent = data.longitude;
    actionsButtons.style.display = 'block';
    resultsContainer.classList.remove('hidden');
}

export function hideResults() {
    resultsContainer.classList.add('hidden');
    actionsButtons.style.display = 'none';
}
import { displayResults, hideResults } from './ui.js';

// busca
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

let database; 
let config;

export function setObraData(obraDatabase, obraConfig) {
    database = obraDatabase;
    config = obraConfig;
}

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim().toUpperCase();
    if (!searchTerm) return;

    const result = database.find(obra => obra.id.toUpperCase() === searchTerm);

    if (result) {
        displayResults(result);
    } else {
        hideResults();
        const errorMessage = config.messages.searchError.replace('{term}', searchTerm);
        alert(errorMessage);
    }
}
// evento de obra(busca)
searchForm.addEventListener('submit', handleSearch);
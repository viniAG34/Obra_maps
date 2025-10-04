import { showMainApp } from '../shared/utils.js';

// login e logout
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');

let config; 

export function setAuthConfig(authConfig) {
    config = authConfig;
}

function handleLogin(event) {
    event.preventDefault();
    const { username, password } = config.credentials;
    
    if (usernameInput.value.trim() === username && passwordInput.value.trim() === password) {
        localStorage.setItem('isLoggedIn', 'true');
        showMainApp();
    } else {
        loginError.textContent = config.messages.loginError;
        passwordInput.value = '';
        passwordInput.focus();
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    location.reload();
}

// eventos de login 
loginForm.addEventListener('submit', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
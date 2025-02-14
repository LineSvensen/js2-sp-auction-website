import { loginUser } from '../api/api-login.js';

export function initializeLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      const userData = await loginUser(email, password);
      alert(`Welcome, ${userData.name}!`);
      window.location.href = '/pages/profile.html';
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

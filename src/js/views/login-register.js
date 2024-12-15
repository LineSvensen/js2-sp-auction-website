import { loginUser } from '../api/api-login.js';
import { registerUser } from '../api/api-register.js';

export function initializeLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    try {
      const userData = await loginUser(email, password);
      alert(`Welcome, ${userData.name}!`);
      window.location.href = '/pages/profile.html';
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

export function initializeRegisterForm() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) {
    console.warn('Register form not found. Skipping registration logic.');
    return;
  }

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const avatar =
      document.getElementById('register-avatar').value.trim() || null;

    const userData = {
      name,
      email,
      password,
      avatar: avatar ? { url: avatar } : undefined,
    };

    try {
      const result = await registerUser(userData);

      // Save the new user's accessToken and name to localStorage
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('name', result.data.name);

      alert(`Welcome ${result.data.name}! Registration successful.`);
      window.location.href = '/pages/profile.html';
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

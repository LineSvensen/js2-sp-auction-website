import { loginUser } from '../api/api-login.js';
import { registerUser } from '../api/api-register.js';

/**
 * Initializes the login form functionality.
 * Attaches a submit event listener to the login form to handle user login.
 * @param {string} email - The email address entered by the user.
 * @param {string} password - The password entered by the user.
 */

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

/**
 * Initializes the registration form functionality.
 * Attaches a submit event listener to the registration form to handle user registration.
 * @param {string} name - The username entered by the user.
 * @param {string} email - The email address entered by the user.
 * @param {string} password - The password entered by the user.
 * @param {string} [avatar] - The avatar URL entered by the user (optional).
 */

export function initializeRegisterForm() {
  const registerForm = document.getElementById('register-form');
  if (!registerForm) {
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

      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('name', result.data.name);

      alert(`Welcome ${result.data.name}! Registration successful.`);
      window.location.href = '/pages/profile.html';
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });
}

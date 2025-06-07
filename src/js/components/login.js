import { loginUser } from '../api/api-login.js';
import confetti from 'canvas-confetti';

export function initializeLoginForm() {
  const loginForm = document.getElementById('login-form');
  const loginErrorMsg = document.getElementById('login-error-msg');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginErrorMsg.textContent = '';

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const userData = await loginUser(email, password);

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });

      loginErrorMsg.classList.remove('text-red-500');
      loginErrorMsg.classList.add('text-green-600');
      loginErrorMsg.textContent = `Welcome, ${userData.name}!`;

      setTimeout(() => {
        window.location.href = '/pages/profile.html';
      }, 1500);
    } catch (error) {
      loginErrorMsg.classList.remove('text-green-600');
      loginErrorMsg.classList.add('text-red-500');
      loginErrorMsg.textContent = `Error: ${error.message}`;
    }
  });
}

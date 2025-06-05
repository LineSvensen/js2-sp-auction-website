import { loginUser } from '../api/api-login.js';
import { registerUser } from '../api/api-register.js';
import confetti from 'canvas-confetti';

export function initializeLoginForm() {
  const loginForm = document.getElementById('login-form');
  const loginErrorMsg = document.getElementById('login-error-msg');

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginErrorMsg.textContent = '';
    loginErrorMsg.classList.remove('text-red-500', 'text-green-600');

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    try {
      const userData = await loginUser(email, password);

      // ✅ Show loader instead of text
      document.getElementById('loader').style.display = 'flex';

      setTimeout(() => {
        window.location.href = '/pages/profile.html';
      }, 1500);
    } catch (error) {
      loginErrorMsg.classList.add('text-red-500');
      loginErrorMsg.textContent = error.message;
    }
  });
}

export function initializeRegisterForm() {
  const registerForm = document.getElementById('register-form');
  const registerErrorMsg = document.getElementById('register-error-msg');

  if (!registerForm) return;

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    registerErrorMsg.textContent = '';
    registerErrorMsg.classList.remove('text-red-500', 'text-green-600');

    const name = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const avatar = document.getElementById('register-avatar').value.trim();

    const userData = {
      name,
      email,
      password,
      avatar: avatar ? { url: avatar } : undefined,
    };

    try {
      await registerUser(userData);

      // ✅ Confetti here!
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
      });

      // ✅ Success styling
      registerErrorMsg.classList.add('text-green-600');
      registerErrorMsg.textContent =
        '🎉 Registration successful! You can now log in below.';

      // ✅ Autofill login form
      document.getElementById('login-email').value = email;
      document.getElementById('login-password').value = password;
    } catch (error) {
      registerErrorMsg.classList.add('text-red-500');
      registerErrorMsg.textContent = error.message;
    }
  });
}

import { registerUser } from '../api/api-register.js';

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const avatar = document.getElementById('register-avatar').value || null;
  const userData = { name: username, email, password, avatar: avatar ? { url: avatar } : undefined };
  try {
    const result = await registerUser(userData);
    alert(`Welcome ${result.data.name}! Registration successful.`);
    window.location.href = '/pages/profile.html';
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

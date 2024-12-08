import { registerUser } from '../api/api-register.js';

const registerForm = document.getElementById('register-form');
if (registerForm) {
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
} else {
  console.warn('Register form not found. Skipping registration logic.');
}

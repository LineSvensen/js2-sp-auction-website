// import { registerUser } from '../api/api-register.js';
// import confetti from 'canvas-confetti';

// const registerForm = document.getElementById('register-form');
// const registerErrorMsg = document.getElementById('register-error-msg'); // new message area

// if (registerForm) {
//   registerForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     registerErrorMsg.textContent = '';

//     const name = document.getElementById('register-username').value;
//     const email = document.getElementById('register-email').value;
//     const password = document.getElementById('register-password').value;
//     const avatar = document.getElementById('register-avatar').value || null;
//     const userData = {
//       name,
//       email,
//       password,
//       avatar: avatar ? { url: avatar } : undefined,
//     };

//     try {
//       const result = await registerUser(userData);

//       confetti({
//         particleCount: 120,
//         spread: 90,
//         origin: { y: 0.6 },
//       });

//       registerErrorMsg.classList.remove('text-red-500');
//       registerErrorMsg.classList.add('text-green-600');
//       registerErrorMsg.textContent = `🎉 Registration successful! You can now log in below.`;

//       setTimeout(() => {
//         window.location.href = '/pages/profile.html';
//       }, 1500);
//     } catch (error) {
//       registerErrorMsg.classList.remove('text-green-600');
//       registerErrorMsg.classList.add('text-red-500');
//       registerErrorMsg.textContent = `Error: ${error.message}`;
//     }
//   });
// } else {
//   console.warn('Register form not found. Skipping registration logic.');
// }

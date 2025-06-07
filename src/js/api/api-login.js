import { API_KEY } from '../utilities/the-key';

/**
 * Logs in a user using their email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The user's data including accessToken and name if successful.
 * @throws {Error} If the login fails or response is invalid.
 */

export async function loginUser(email, password) {
  const loginUrl = 'https://v2.api.noroff.dev/auth/login';
  const headers = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      Toastify({
        text: 'Could not log in. Please check if username or/and password is correct.',
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#e62e00',
        stopOnFocus: true,
      }).showToast();
      throw new Error(errorData.message || 'Failed to log in.');
    }

    const data = await response.json();

    if (data.data.accessToken && data.data.name) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('name', data.data.name);
    } else {
      Toastify({
        text: 'Something went wrong. Please try again later.',
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#e62e00',
        stopOnFocus: true,
      }).showToast();
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}

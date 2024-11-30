import { API_KEY } from './the-key.js';

export async function loginUser(email, password) {
  const loginUrl = 'https://v2.api.noroff.dev/auth/login';
  const headers = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
  };
  const body = JSON.stringify({
    email: email,
    password: password,
  });
  try {
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in');
    }
    const data = await response.json();
    localStorage.setItem('accessToken', data.data.accessToken);
    localStorage.setItem('username', data.data.name);
    return data.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

import { API_KEY } from "./the-key";

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
      throw new Error(errorData.message || 'Failed to log in');
    }

    const data = await response.json();

    // Store the access token and name properly
    if (data.data.accessToken && data.data.name) {
      localStorage.setItem('accessToken', data.data.accessToken); // Correct key
      localStorage.setItem('name', data.data.name);
    } else {
      console.error('Missing accessToken or name in response:', data.data);
    }

    return data.data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

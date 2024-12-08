export async function registerUser(userData) {
  const API_URL = 'https://v2.api.noroff.dev/auth/register';
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.errors ? errorData.errors[0].message : 'Registration failed'
      );
    }

    const data = await response.json();

    // Store the access token and name properly
    if (data.data.accessToken && data.data.name) {
      localStorage.setItem('accessToken', data.data.accessToken); // Correct key
      localStorage.setItem('name', data.data.name);
    } else {
      console.error('Missing accessToken or name in response:', data.data);
    }

    return data;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error;
  }
}

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
        throw new Error(errorData.errors ? errorData.errors[0].message : 'Registration failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during registration:', error.message);
      throw error;
    }
  }
  
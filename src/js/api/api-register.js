/**
 * Registers a new user.
 * @param {Object} userData - The user data to register with.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password for the account.
 * @returns {Promise<Object>} The response data from the registration process.
 * @throws {Error} If the registration fails, an error with the message is thrown.
 */

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
      const errorMessage =
        errorData.errors?.[0]?.message ||
        errorData.message ||
        'Registration failed. Please check your info.';
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

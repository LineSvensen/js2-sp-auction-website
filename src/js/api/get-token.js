/**
 * Retrieves the access token from localStorage.
 * @returns {string|null} The access token if it exists, or null if not found.
 */
export function getAccessToken() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.error('No access token found in localStorage');
    return null;
  }

  return token;
}

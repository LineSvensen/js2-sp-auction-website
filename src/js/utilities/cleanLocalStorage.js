/**
 * Validates and cleans localStorage by checking the validity of stored accessToken.
 * If the accessToken is missing or invalid, it clears related localStorage entries.
 *
 * @param {string} [accessToken] - The access token stored in localStorage (optional, retrieved internally).
 * @param {string} [name] - The name of the user stored in localStorage (optional, retrieved internally).
 */

export function validateAndCleanLocalStorage() {
  const accessToken = localStorage.getItem('accessToken');
  const name = localStorage.getItem('name');

  if (!accessToken || accessToken === 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
  }
}
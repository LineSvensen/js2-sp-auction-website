/**
 * Retrieves the access token from localStorage.
 * @returns {string|null} The access token if it exists, or null if not found.
 */
export function getAccessToken() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // alert("Something went wrong. Please check if you are logged in or registered. (Missing token)")
    return null;
  }

  return token;
}

/**
 * Retrieves the access token from localStorage.
 * @returns {string|null} The access token if it exists, or null if not found.
 */
export function getAccessToken() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    // Toastify({
    //   text: 'Something went wrong. Please try again later.',
    //   duration: 4000,
    //   close: true,
    //   gravity: 'top',
    //   position: 'right',
    //   backgroundColor: '#e62e00',
    //   stopOnFocus: true,
    // }).showToast();

    return null;
  }

  return token;
}

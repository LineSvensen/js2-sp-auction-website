/**
 * Authenticates the user by checking if the access token is present in localStorage.
 * If the token is not found, it alerts the user and redirects to the login page.
 * @throws {Error} Throws an error if access token is not found.
 */
export function authGuard() {
  const name = localStorage.getItem('name');
  if (!name) {
    alert('You must be logged in to view this page.');
    window.location.replace('/pages/login-register.html');
  }
};

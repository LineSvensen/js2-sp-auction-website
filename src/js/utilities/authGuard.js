/**
 * Authenticates the user by checking if the access token is present in localStorage.

 * @throws {Error} Throws an error if access token is not found.
 */
export function authGuard() {
  const name = localStorage.getItem('name');
  if (!name) {
    window.location.replace('/pages/login-register.html');
  }
}

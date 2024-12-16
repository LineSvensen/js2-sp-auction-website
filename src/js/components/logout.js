/**
 * Initializes the logout functionality for both desktop and mobile buttons.
 * Adds click event listeners to trigger user logout.
 *
 * @param {HTMLElement} [desktopLogoutButton] - The logout button element for desktop view. Optional if not present in the DOM.
 * @param {HTMLElement} [mobileLogoutButton] - The logout button element for mobile view. Optional if not present in the DOM.
 */

export function logoutUser() {

  const desktopLogoutButton = document.getElementById('desktopLogoutButton');
  const mobileLogoutButton = document.getElementById('mobileLogoutButton');

  const handleLogout = () => {

    const accessToken = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name');

    if (!accessToken || !name) {
      alert('No user is logged in.');
      return;
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');

    alert('You have been logged out successfully.');
    window.location.href = '/index.html';
  };

  if (desktopLogoutButton) {
    desktopLogoutButton.addEventListener('click', handleLogout);
  };

  if (mobileLogoutButton) {
    mobileLogoutButton.addEventListener('click', handleLogout);
  };
}
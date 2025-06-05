export function logoutUser() {
  const desktopLogoutButton = document.getElementById('desktopLogoutButton');
  const mobileLogoutButton = document.getElementById('mobileLogoutButton');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');

    window.location.href = '/index.html';
  };

  if (desktopLogoutButton) {
    desktopLogoutButton.addEventListener('click', handleLogout);
  }

  if (mobileLogoutButton) {
    mobileLogoutButton.addEventListener('click', handleLogout);
  }
}

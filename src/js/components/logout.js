export function logoutUser() {
  console.log('Initializing logout functionality...');

  // Select both logout buttons
  const desktopLogoutButton = document.getElementById('desktopLogoutButton');
  const mobileLogoutButton = document.getElementById('mobileLogoutButton');

  // Helper function to handle logout
  const handleLogout = () => {
    console.log('Logout button clicked.');

    const accessToken = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name');

    console.log('Access Token:', accessToken);
    console.log('Name:', name);

    if (!accessToken || !name) {
      console.warn('No user is logged in.');
      alert('No user is logged in.');
      return;
    }

    // Remove user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');

    alert('You have been logged out successfully.');
    window.location.href = '/index.html';
  };

  // Attach event listeners to both buttons
  if (desktopLogoutButton) {
    console.log('Desktop logout button found. Adding event listener.');
    desktopLogoutButton.addEventListener('click', handleLogout);
  } else {
    console.warn('Desktop logout button not found.');
  }

  if (mobileLogoutButton) {
    console.log('Mobile logout button found. Adding event listener.');
    mobileLogoutButton.addEventListener('click', handleLogout);
  } else {
    console.warn('Mobile logout button not found.');
  }
}

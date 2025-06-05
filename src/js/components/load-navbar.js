import { fetchProfile } from '../api/api-profile.js';
import { logoutUser } from './logout.js'; // <-- ADD THIS IMPORT

export async function loadNavbar() {
  const placeholder = document.getElementById('navbar-placeholder');
  if (!placeholder) return;

  try {
    const res = await fetch('../src/js/components/navbar.html');
    const html = await res.text();
    placeholder.innerHTML = html;

    const token = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name');

    const loginBtns = [
      document.getElementById('login-register-btn-desktop'),
      document.getElementById('login-register-btn-mobile'),
    ];
    const logoutBtns = [
      document.getElementById('desktopLogoutButton'),
      document.getElementById('mobileLogoutButton'),
    ];
    const avatarDesktop = document.getElementById('profile-avatar-desktop');
    const avatarMobile = document.getElementById('profile-avatar-icon-mobile');
    const mobileProfileLink = document.getElementById('mobile-profile-link');

    if (token && name) {
      loginBtns.forEach((btn) => btn?.classList.add('hidden'));
      logoutBtns.forEach((btn) => btn?.classList.remove('hidden'));
      mobileProfileLink?.classList.remove('hidden');
      // Detect screen size
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

      if (isDesktop) {
        avatarDesktop?.classList.remove('hidden');
        avatarMobile?.classList.add('hidden');
      } else {
        avatarDesktop?.classList.add('hidden');
        avatarMobile?.classList.remove('hidden');
      }

      try {
        const res = await fetchProfile(name);
        const avatarUrl =
          res?.data?.avatar?.url || '/assets/images/default-avatar.png';
        if (avatarDesktop) avatarDesktop.src = avatarUrl;
        if (avatarMobile) avatarMobile.src = avatarUrl;
      } catch {
        if (avatarMobile)
          avatarMobile.src = '/assets/images/default-avatar.png';
        if (avatarDesktop)
          avatarDesktop.src = '/assets/images/default-avatar.png';
      }
    } else {
      logoutBtns.forEach((btn) => btn?.classList.add('hidden'));
      mobileProfileLink?.classList.add('hidden');
      avatarMobile?.classList.add('hidden');
      avatarDesktop?.classList.add('hidden'); // <-- ✅ this was missing
    }

    const { initBurgerMenu } = await import('./burger-menu.js');
    initBurgerMenu();

    logoutUser(); // <-- ✅ ADD THIS LINE
  } catch (err) {
    console.error('Failed to load navbar:', err);
  }
}

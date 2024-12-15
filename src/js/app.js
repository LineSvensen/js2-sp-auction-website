import { initBurgerMenu } from './components/burger-menu.js';
import { logoutUser } from './components/logout.js';
import {
  initializeLoginForm,
  initializeRegisterForm,
} from './views/login-register.js';
import { renderListings } from './components/listing-card.js';
import { setupSearch } from './components/search.js';
import { validateAndCleanLocalStorage } from './utilities/cleanLocalStorage.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.getElementById('loader');

  try {
    // Show the loader
    loader.style.display = 'flex';

    // Initialize other components
    validateAndCleanLocalStorage();
    initBurgerMenu();
    initializeLoginForm();
    initializeRegisterForm(); // Explicitly initialize the register form logic

    // Render listings (longest loading part)
    await renderListings();

    setupSearch();
    logoutUser();
  } catch (error) {
    console.error('Error during initialization:', error.message);
  } finally {
    // Hide the loader after everything is loaded
    loader.style.display = 'none';
  }
});

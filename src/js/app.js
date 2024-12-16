import { initBurgerMenu } from './components/burger-menu.js';
import { logoutUser } from './components/logout.js';
import {
  initializeLoginForm,
  initializeRegisterForm,
} from './views/login-register.js';
import { renderListings } from './components/listing-card.js';
import { setupSearch } from './components/search.js';
import { validateAndCleanLocalStorage } from './utilities/cleanLocalStorage.js';

/**
 * Event listener for DOMContentLoaded.
 * Initializes the application and handles the loaders visibility.
 */

document.addEventListener('DOMContentLoaded', async () => {
  /**
   * Loader element for displaying loading animation.
   * @type { HTMLElement }
   */
  const loader = document.getElementById('loader');

  try {
    loader.style.display = 'flex';

    /**
     * Validates and cleans the local storage.
     * @function validateAndCleanLocalStorage
     */

    validateAndCleanLocalStorage();

    /**
     * Initializes the burger menu
     * @function initBurgerMenu
     */
    initBurgerMenu();

    /**
     * initializes the login form.
     * @function initializeLoginForm
     */
    initializeLoginForm();

    /**
     * initializes the register form.
     * @function initializeRegisterForm
     */
    initializeRegisterForm();

    /**
     * Renders the listings on the page.
     * @async
     * @function renderListings
     */
    await renderListings();

    /**
     * sets up the search functionality.
     * @function setupSearch
     */
    setupSearch();

    /**
     * logs out the user and clears relevant data.
     * @function logoutUser
     */
    logoutUser();
  } catch (error) {
    /**
     * logs error if any durin initialization 
     * @param {Error} error - the error object
     */
  } finally {
    /**
     * hides loader when initialization is complete
     */
    loader.style.display = 'none';
  }
});

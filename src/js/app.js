// // Import API files
// import apiBid from './api/api-bid.js';
// import apiCreate from './api/api-create.js';
// import apiListing from './api/api-listing.js';
// import apiLogin from './api/api-login.js';
// import apiLogout from './api/api-logout.js';
// import apiProfile from './api/api-profile.js';
// import apiRegister from './api/api-register.js';
// import getToken from './api/get-token.js';

// // Import components
// import avatar from './components/avatar.js';
// import bid from './components/bid.js';

import { initBurgerMenu } from './components/burger-menu.js';
import { initializeLoginForm } from './components/login.js';
import './components/register.js';
import { renderListings } from './components/listing-card.js'; // Import the renderListings function


document.addEventListener('DOMContentLoaded', () => {
  // Initialize the burger menu
  initBurgerMenu();

  // Initialize the login form logic (only if the login form exists)
  initializeLoginForm();

  renderListings();

});

// import { renderListings } from '/src/js/components/listing-card.js';
// renderListings();

// import credits from './components/credits.js';
// import listingCard from './components/listing-card.js';
// import login from './components/login.js';
// import logout from './components/logout.js';
// import register from './components/register.js';
// import search from './components/search.js';

// // Import utilities
// import authGuard from './utilities/authGuard.js';

// // Import views
// import createListing from './views/create-listing.js';
// import listingDetails from './views/listing-details.js';
// import loginRegister from './views/login-register.js';
// import profile from './views/profile.js';

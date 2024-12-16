/**
 * Initializes the burger menu functionality.
 * Handles the opening and closing of the mobile menu using the burger and close buttons.
 * 
 * @param {HTMLElement} [burgerButton] - The button that toggles the mobile menu open.
 * @param {HTMLElement} [mobileMenu] - The mobile menu element to be toggled.
 * @param {HTMLElement} [closeMenu] - The button that closes the mobile menu.
 */

export function initBurgerMenu() {
  const burgerButton = document.getElementById('burger-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');

  if (burgerButton && mobileMenu && closeMenu) {
    burgerButton.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });

    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  } 
};
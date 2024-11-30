export function initBurgerMenu() {
  const burgerButton = document.getElementById('burger-button'); // Hamburger button
  const mobileMenu = document.getElementById('mobile-menu'); // The mobile menu container
  const closeMenu = document.getElementById('close-menu'); // The close button (X)

  if (burgerButton && mobileMenu && closeMenu) {
    // Open menu when hamburger button is clicked
    burgerButton.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden'); // Show menu
      mobileMenu.classList.add('flex'); // Use flex for centering
    });

    // Close menu when "X" button is clicked
    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.add('hidden'); // Hide menu
      mobileMenu.classList.remove('flex');
    });
  } else {
    console.error('Burger button, close menu, or mobile menu not found!');
  }
}

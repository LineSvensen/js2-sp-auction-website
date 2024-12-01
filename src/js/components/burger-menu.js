export function initBurgerMenu() {
  const burgerButton = document.getElementById('burger-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');

  if (burgerButton && mobileMenu && closeMenu) {
    console.log('Burger menu initialized'); // Add this
    burgerButton.addEventListener('click', () => {
      console.log('Burger button clicked'); // Add this
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
    });

    closeMenu.addEventListener('click', () => {
      console.log('Close button clicked'); // Add this
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  } else {
    console.error('Burger button, close menu, or mobile menu not found!');
  }
}

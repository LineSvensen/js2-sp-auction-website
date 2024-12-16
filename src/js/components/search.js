import { searchListings } from '../api/api-listing.js';
import { renderListings } from './listing-card.js';

/**
 * Sets up the search functionality for listings.
 *
 * @param {HTMLInputElement} searchInput - The input field element where the user enters the search query.
 * @param {HTMLButtonElement} searchButton - The button element to trigger the search action.
 * @param {HTMLElement} listingsContainer - The container element where the search results will be rendered.
 */

export async function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const listingsContainer = document.getElementById('listings-container');

  if (!searchInput || !searchButton) return;

  searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
      alert('Please enter a search term.');
      return;
    }

    try {
      listingsContainer.innerHTML = '<p>Searching...</p>';
      const results = await searchListings(query);
      await renderListings(results.data || []);
    } catch (error) {
      listingsContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchButton.click();
  });
}
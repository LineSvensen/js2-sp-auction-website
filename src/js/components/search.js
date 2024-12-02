import { searchListings } from '../api/api-listing.js';
import { renderListings } from './listing-card.js';

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
      listingsContainer.innerHTML = '<p>Searching...</p>'; // Show loading
      const results = await searchListings(query); // Fetch search results
      await renderListings(results.data || []); // Render the results
    } catch (error) {
      listingsContainer.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  });

  // Optional: Trigger search on Enter key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchButton.click();
  });
}
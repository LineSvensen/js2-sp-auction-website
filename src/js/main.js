import { fetchListingsBySearch } from './api/api-listing.js';
import { renderListings } from './components/listing-card.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  // Handle search submission
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return; // Skip if the search input is empty

    try {
      const searchResults = await fetchListingsBySearch(query);
      await renderListings(searchResults.data || []);
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  });
});



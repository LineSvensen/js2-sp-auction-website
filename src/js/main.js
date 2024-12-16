import { fetchListingsBySearch } from './api/api-listing.js';
import { renderListings } from './components/listing-card.js';

/**
 * initializes the search function once the DOM is loaded
 */

document.addEventListener('DOMContentLoaded', () => {
  /**
   * form element used to submit search queries.
   * @type {HTMLElement}
   */
  const searchForm = document.getElementById('search-form');
  /**
   * capture users search input
   * @type {HTMLInputElement}
   */
  const searchInput = document.getElementById('search-input');


/** handles search form submission event.
 * @param {Event} event - submit event triggered on the search form
 */
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    /**
     * users search query string
     * @type {String}
     */
    const query = searchInput.value.trim();
    if (!query) return;

    try {
      /**
       * fetches search result based on the query.
       * @async@function fetchListingsBySearch
       * @param {String} query - the search query input by the user.
       * @returns {Promise<object>} search result data.
       */
      const searchResults = await fetchListingsBySearch(query);

      /**
       * Renders the fetched search results.
       * @async
       * @function renderListings
       * @param {Array<Object>} searchResults.data - the search results to display .
       */

      await renderListings(searchResults.data || []);
    } catch (error) {
      /**
       * alert shows if the search fails
       */
      alert("There was an error with the search. Please try again later.")
    }
  });
});



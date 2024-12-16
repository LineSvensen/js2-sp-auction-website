import { setupMediaInput, collectFormData } from '../components/create-form.js';
import { createListing } from '../api/api-create.js';
import { authGuard } from '../utilities/authGuard.js';

authGuard();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-listing-form');
  const mediaContainer = document.getElementById('media-container');
  const addMediaButton = document.getElementById('add-media');
  const message = document.getElementById('message');

  /**
   * Sets up the media input functionality by adding event listeners for adding and removing media fields.
   * @param {HTMLElement} mediaContainer - The container element where media fields are added.
   * @param {HTMLElement} addMediaButton - The button to add more media fields.
   */

  setupMediaInput(mediaContainer, addMediaButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    /**
     * Collects form data, including media inputs.
     * @param {HTMLElement} mediaContainer - The container element where media inputs are stored.
     * @returns {Object} The request body containing form data.
     */

    const requestBody = collectFormData(mediaContainer);

    try {
      /**
       * Sends the listing data to the server for creation.
       * @param {Object} requestBody - The data object for the new listing.
       * @param {string} accessToken - The access token for authentication.
       * @returns {Object} The created listing data returned from the server.
       */
      const data = await createListing(requestBody, accessToken);
      message.textContent = 'Listing created successfully!';
      message.classList.remove('hidden', 'text-red-500');
      message.classList.add('text-green-500');

      form.reset();
      mediaContainer.innerHTML = '';
      alert('Listing created successfully!');
      window.location.href = '/pages/profile.html';
    } catch (error) {
      message.textContent = error.message;
      message.classList.remove('hidden', 'text-green-500');
      message.classList.add('text-red-500');
    }
  });
});
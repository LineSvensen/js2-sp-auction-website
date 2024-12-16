import { setupMediaInput, collectFormData } from '../components/create-form.js';
import { createListing } from '../api/api-create.js';
import { authGuard } from '../utilities/authGuard.js';
import { getAccessToken } from '../utilities/get-token.js';

authGuard();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-listing-form');
  const mediaContainer = document.getElementById('media-container');
  const addMediaButton = document.getElementById('add-media');
  const message = document.getElementById('message');

  const accessToken = getAccessToken(); // Fix: Retrieve accessToken here

  if (!accessToken) {
    alert('Session expired. Please log in again.');
    window.location.href = '/pages/login-register.html';
    return;
  }

  /**
   * Sets up the media input functionality by adding event listeners for adding and removing media fields.
   */
  setupMediaInput(mediaContainer, addMediaButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const requestBody = collectFormData(mediaContainer);

    try {
      const data = await createListing(requestBody, accessToken); // Pass the accessToken
      message.textContent = 'Listing created successfully!';
      message.classList.remove('hidden', 'text-red-500');
      message.classList.add('text-green-500');
      console.log('Created Listing:', data);

      form.reset();
      mediaContainer.innerHTML = '';
      alert('Listing created successfully!');
      window.location.href = '/pages/profile.html';
    } catch (error) {
      console.error('Error creating listing:', error.message);
      message.textContent = error.message || 'Failed to create listing.';
      message.classList.remove('hidden', 'text-green-500');
      message.classList.add('text-red-500');
    }
  });
});

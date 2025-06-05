import { setupMediaInput, collectFormData } from '../components/create-form.js';
import { createListing } from '../api/api-create.js';
import { getAccessToken } from '../utilities/get-token.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-listing-form');
  const mediaContainer = document.getElementById('media-container');
  const addMediaButton = document.getElementById('add-media');
  const message = document.getElementById('message');
  const accessToken = getAccessToken();
  const unauthMsg = document.getElementById('unauthenticated-message');

  if (!accessToken) {
    form.classList.add('hidden');
    unauthMsg.classList.remove('hidden');
    return;
  }

  unauthMsg.classList.add('hidden');
  form.classList.remove('hidden');

  setupMediaInput(mediaContainer, addMediaButton);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const requestBody = collectFormData(mediaContainer);

    try {
      const data = await createListing(requestBody, accessToken);
      message.textContent = 'Listing created successfully!';
      message.classList.remove('hidden', 'text-red-500');
      message.classList.add('text-green-500');

      form.reset();
      mediaContainer.innerHTML = '';
      setTimeout(() => {
        window.location.href = '/pages/profile.html';
      }, 1500);
    } catch (error) {
      message.textContent = error.message || 'Failed to create listing.';
      message.classList.remove('hidden', 'text-green-500');
      message.classList.add('text-red-500');
    }
  });
});

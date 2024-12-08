import { setupMediaInput, collectFormData } from '../components/create-form.js';
import { createListing } from '../api/api-create.js';

const accessToken = localStorage.getItem('accessToken');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-listing-form');
  const mediaContainer = document.getElementById('media-container');
  const addMediaButton = document.getElementById('add-media');
  const message = document.getElementById('message');

  // Setup dynamic media input logic
  setupMediaInput(mediaContainer, addMediaButton);

  // Handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const requestBody = collectFormData(mediaContainer);

    try {
      const data = await createListing(requestBody, accessToken);
      message.textContent = 'Listing created successfully!';
      message.classList.remove('hidden', 'text-red-500');
      message.classList.add('text-green-500');
      console.log('Created Listing:', data);

      // Optionally clear the form after submission
      form.reset();
      mediaContainer.innerHTML = ''; // Remove existing media inputs
      alert('Listing created successfully!');
      window.location.href = '/pages/profile.html'; // Redirect to profile page
    } catch (error) {
      console.error(error);
      message.textContent = error.message;
      message.classList.remove('hidden', 'text-green-500');
      message.classList.add('text-red-500');
    }
  });
});

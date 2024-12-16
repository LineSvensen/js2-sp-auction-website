import { getAccessToken } from '../utilities/get-token.js';
import { getApiHeaders } from '../utilities/headers.js';
import { fetchActiveCreatedListings } from '../api/api-listing.js';
import { calculateHighestBid } from '../components/bid.js';

const API_BASE_URL = 'https://v2.api.noroff.dev/auction';

getAccessToken();

getApiHeaders();

fetchActiveCreatedListings();

/**
 * Deletes a listing by its ID.
 * @param {string} listingId - The ID of the listing to be deleted.
 * @throws Will throw an error if the delete operation fails.
 */

async function deleteListing(listingId) {
  const url = `${API_BASE_URL}/listings/${listingId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getApiHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to delete listing. Status: ${response.status}`);
  }

  alert('Listing deleted successfully.');
}

/**
 * Updates a listing by its ID with new data.
 * @param {string} listingId - The ID of the listing to be updated.
 * @param {Object} updatedData - The updated listing data.
 * @throws Will throw an error if the update operation fails.
 */

async function updateListing(listingId, updatedData) {
  const url = `${API_BASE_URL}/listings/${listingId}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: getApiHeaders(),
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update listing. Status: ${response.status}`);
  }

  alert('Listing updated successfully.');
}

/**
 * Renders the user's listings in the given container.
 * @param {Array} listings - An array of listing objects.
 */

function editDeletePageListings(listings = null) {
  const container = document.getElementById('user-listings-container');
  container.innerHTML = '';

  if (!listings || listings.length === 0) {
    container.innerHTML = '<p class="text-gray-500">No listings found.</p>';
    return;
  }

  listings.forEach((listing) => {
    const card = document.createElement('div');
    const highestBid = calculateHighestBid(listing.bids);
    card.className = 'border p-4 rounded shadow-lg flex flex-col';
    card.innerHTML = `
      <img
        src="${(listing.media && listing.media[0]?.url) || 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
        alt="${listing.title}"
        class="w-full h-48 object-cover mb-4 rounded-md border-2 border-bgGrey"
      />
      <h3 class="heading-h3-cards truncate">${listing.title}</h3>
      <p class="pt-2 truncate">Created: <span class="font-bold">${new Date(listing.created).toLocaleDateString()}</span></p>
      <p class="pt-2 pb-2 truncate">Updated: <span class="font-bold">${new Date(listing.updated).toLocaleDateString()}</span></p>
      <p class="text-sm mb-2">
            Number of Bids: <span class="font-bold">${listing._count?.bids || 0}</span>
      </p>
      <p class="text-sm mb-2">
            Highest Bid: <span class="font-bold">${highestBid} Credits</span>
      </p>
      <p class="text-sm font text-Black">Ends: <span class="font-bold">${new Date(listing.endsAt).toLocaleDateString()}</span></p>
      <div class="mt-4 flex space-x-2">
        <a
            href="/pages/listing-details.html?id=${listing.id}"
            class="bg-CTABlue hover:bg-CTABlue-hover text-white text-center common-buttons-style"
            >
            View Listing
        </a>
        <button class="bg-CTAGreen hover:bg-CTAGreen-hover common-buttons-style font-medium edit-button" data-id="${listing.id}">Edit listing</button>
        <button class="bg-Red hover:bg-Red-hover common-buttons-style delete-button" data-id="${listing.id}"><i class="fa-solid fa-trash-can text-base"></i></button>
      
      </div>
    `;
    container.appendChild(card);
  });

  setupEditAndDeleteButtons(listings);
}

/**
 * Sets up the event listeners for edit and delete buttons in the listings.
 * @param {Array} listings - An array of listing objects.
 */

function setupEditAndDeleteButtons(listings) {
  const editButtons = document.querySelectorAll('.edit-button');
  const deleteButtons = document.querySelectorAll('.delete-button');

  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const listingId = event.target.dataset.id;
      const listing = listings.find((l) => l.id === listingId);
      openEditModal(listing);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const listingId = event.target.dataset.id;
      if (confirm('Are you sure you want to delete this listing?')) {
        try {
          await deleteListing(listingId);
          loadUserListings();
        } catch (error) {
          alert("Ops. Could not delete listing. Try again later.")
        }
      }
    });
  });
}

/**
 * Opens the modal for editing a listing and populates it with listing data.
 * @param {Object} listing - The listing object to be edited.
 */

function openEditModal(listing) {
  const modal = document.getElementById('edit-modal');

  document.getElementById('edit-title').value = listing.title;
  document.getElementById('edit-description').value = listing.description;

  const mediaContainer = document.getElementById('edit-media-container');
  mediaContainer.innerHTML = '';

  if (listing.media && listing.media.length > 0) {
    listing.media.forEach((mediaItem, index) => {
      const mediaGroup = document.createElement('div');
      mediaGroup.classList.add('flex', 'space-x-2', 'mt-2');
      mediaGroup.innerHTML = `
          <input type="url" value="${mediaItem.url}" placeholder="Image URL" class="block w-full border rounded p-2 media-url" />
          <input type="text" value="${mediaItem.alt || ''}" placeholder="Alt Text" class="block w-full border rounded p-2 media-alt" />
          <button type="button" class="remove-media bg-CTARed hover:bg-CTARed-hover text-white px-3 py-2 rounded">X</button>
        `;
      mediaContainer.appendChild(mediaGroup);

      mediaGroup
        .querySelector('.remove-media')
        .addEventListener('click', () => {
          mediaGroup.remove();
        });
    });
  }

  const addMediaButton = document.getElementById('add-more-media');
  addMediaButton.onclick = () => {
    const mediaGroup = document.createElement('div');
    mediaGroup.classList.add('flex', 'space-x-2', 'mt-2');
    mediaGroup.innerHTML = `
        <input type="url" placeholder="Image URL" class="block w-full border rounded p-2 media-url" />
        <input type="text" placeholder="Alt Text" class="block w-full border rounded p-2 media-alt" />
        <button type="button" class="remove-media bg-CTARed hover:bg-CTARed-hover text-white px-3 py-2 rounded">X</button>
      `;
    mediaContainer.appendChild(mediaGroup);

    mediaGroup.querySelector('.remove-media').addEventListener('click', () => {
      mediaGroup.remove();
    });
  };

  modal.classList.remove('hidden');

  const editForm = document.getElementById('edit-listing-form');
  editForm.onsubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      title: document.getElementById('edit-title').value.trim(),
      description: document.getElementById('edit-description').value.trim(),
      media: Array.from(mediaContainer.querySelectorAll('.flex')).map(
        (group) => ({
          url: group.querySelector('.media-url').value.trim(),
          alt: group.querySelector('.media-alt').value.trim(),
        })
      ),
    };

    try {
      await updateListing(listing.id, updatedData);
      modal.classList.add('hidden');
      loadUserListings();
    } catch (error) {
      alert("Ops! Could not update listing. Try again later.")
    }
  };
}

/**
 * Sets up the close button for the edit modal.
 */

function setupCloseModalButton() {
  const closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', () => {
    const modal = document.getElementById('edit-modal');
    modal.classList.add('hidden');
  });
}

/**
 * Loads the user's active listings and renders them on the page.
 */

async function loadUserListings() {
  try {
    const listings = await fetchActiveCreatedListings();
    editDeletePageListings(listings);
  } catch (error) {
    alert("There was an error with showing your listings. Please try again later.")
    const container = document.getElementById('user-listings-container');
    container.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupCloseModalButton();
  loadUserListings();
});

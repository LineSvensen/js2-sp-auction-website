import { fetchListings } from '../api/api-listing.js';
import { calculateHighestBid } from './bid.js';

/**
 * Renders listings into the provided container.
 * If no listings are provided, it fetches the listings dynamically.
 *
 * @param {Array|null} listings - Optional. An array of listing objects to render. If null, listings are fetched dynamically.
 */

export async function renderListings(listings = null) {
  const listingsContainer = document.getElementById('listings-container');
  if (!listingsContainer) return;

  try {
    if (!listings) {
      const response = await fetchListings();
      listings = response.data || [];
    }

    listingsContainer.innerHTML = '';

    if (!listings.length) {
      listingsContainer.innerHTML =
        '<p class="text-center text-gray-500">No results found.</p>';
      return;
    }

    listings.forEach((listing) => {
      const highestBid = calculateHighestBid(listing.bids);

      const listingCard = `
        <div class="border p-4 rounded shadow-lg flex flex-col text-Black bg-white">
          <img
            src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
            alt="${listing.title}"
            onerror="this.onerror=null; this.src='https://dummyimage.com/500x500/cccccc/ffffff&text=Error+showing+image';"
            class="w-full h-48 object-cover mb-4 rounded-md border-2 border-bgGrey"
          />
          <h3 class="heading-h3-cards pb-2 truncate-title-ellipsis">${listing.title}</h3>
          <p class="text-sm mb-2">
            Number of Bids: <span class="font-bold">${listing._count?.bids || 0}</span>
          </p>
          <p class="text-sm mb-2">
            Highest Bid: <span class="font-bold">${highestBid} Credits</span>
          </p>
          <p class="text-sm mb-4">
            Ends: <span class="font-bold">${new Date(listing.endsAt).toLocaleDateString()}</span>
          </p>
          <a
            href="/pages/listing-details.html?id=${listing.id}"
            class="btn-trust text-white text-center common-buttons-style"
          >
            View Listing
          </a>
        </div>
      `;
      listingsContainer.innerHTML += listingCard;
    });
  } catch (error) {
    listingsContainer.innerHTML = `<p class="text-center text-red-500">Error loading listings: ${error.message}</p>`;
  }
}

renderListings();

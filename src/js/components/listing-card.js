import { fetchListings } from '../api/api-listing.js';
import { calculateHighestBid } from './bid.js'; // Import the function

export async function renderListings(listings = null) {
  const listingsContainer = document.getElementById('listings-container');
  if (!listingsContainer) return;

  console.log('Starting to render listings...');

  try {
    // Fetch listings if none are provided
    if (!listings) {
      const response = await fetchListings(); // Fetch all listings
      console.log('Fetched Listings:', response);

      // Access the correct data array
      listings = response.data || []; // Ensure you access the array within the API response
      console.log('Extracted Listings Array:', listings);
    }

    listingsContainer.innerHTML = ''; // Clear loading text

    // Check if listings array is empty
    if (!listings.length) {
      listingsContainer.innerHTML = '<p class="text-center text-gray-500">No results found.</p>';
      return;
    }

    listings.forEach((listing) => {
      // Calculate the highest bid if bids exist
      const highestBid = calculateHighestBid(listing.bids);

      const listingCard = `
        <div class="border p-4 rounded shadow-lg flex flex-col justify-between">
          <img
            src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
            alt="${listing.title}"
            class="w-full h-48 object-cover rounded mb-4"
          />
          <h3 class="text-lg font-bold">${listing.title}</h3>
          <p class="text-sm mb-2">
            Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span>
          </p>
          <p class="text-sm mb-2">
            Highest Bid: <span class="font-semibold">${highestBid} Credits</span>
          </p>
          <p class="text-sm mb-4">
            Ends: <span class="font-semibold">${new Date(listing.endsAt).toLocaleDateString()}</span>
          </p>
          <a
            href="/pages/listing-details.html?id=${listing.id}"
            class="bg-CTABlue hover:bg-CTABlue-hover text-white text-center font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            View Listing
          </a>
        </div>
      `;
      listingsContainer.innerHTML += listingCard;
    });
  } catch (error) {
    console.error('Error rendering listings:', error.message);
    listingsContainer.innerHTML = `<p class="text-center text-red-500">Error loading listings: ${error.message}</p>`;
  }
}

renderListings(); // Initial render with all listings

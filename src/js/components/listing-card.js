// import { fetchListings } from '../api/api-listing.js';

// export async function renderListings() {
//   const listingsContainer = document.getElementById('listings-container');

//   if (!listingsContainer) {
//     console.error('Listings container not found');
//     return;
//   }

//   console.log('Starting to render listings...');

//   try {
//     const listingsResponse = await fetchListings(); // Fetch the data
//     const listings = listingsResponse.data; // Extract the `data` property (array of listings)

//     console.log('Fetched Listings:', listings);

//     listingsContainer.innerHTML = ''; // Clear loading text

//     // Ensure listings is an array before iterating
//     if (Array.isArray(listings)) {
//       listings.forEach((listing) => {
//         const listingCard = `
//           <div class="border p-4 rounded shadow-lg flex flex-col justify-between">
//             <img
//               src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://via.placeholder.com/300'}"
//               alt="${listing.title}"
//               class="w-full h-48 object-cover rounded mb-4"
//             />
//             <h3 class="text-lg font-bold">${listing.title}</h3>
//             <p class="text-sm mb-2">
//               Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span>
//             </p>
//             <p class="text-sm mb-4">
//               Ends: <span class="font-semibold">${new Date(listing.endsAt).toLocaleDateString()}</span>
//             </p>
//           </div>
//         `;
//         listingsContainer.innerHTML += listingCard;
//       });
//     } else {
//       console.error('Listings is not an array', listings);
//       listingsContainer.innerHTML = `<p class="text-center text-red-500">Error: Listings data is not an array.</p>`;
//     }
//   } catch (error) {
//     console.error('Error rendering listings:', error.message);
//     listingsContainer.innerHTML = `<p class="text-center text-red-500">Error loading listings: ${error.message}</p>`;
//   }
// }

// renderListings();

import { fetchListings } from '../api/api-listing.js';

export async function renderListings() {
  const listingsContainer = document.getElementById('listings-container');
  console.log(document.getElementById('listings-container')); // Should not be null
  console.log('Starting to render listings...');

  try {
    const response = await fetchListings(); // Fetch all listings
    console.log('Fetched Listings:', response);

    // Access the correct data array
    const listings = response.data; // Ensure you access the array within the API response
    console.log('Extracted Listings Array:', listings);

    listingsContainer.innerHTML = ''; // Clear loading text

    listings.forEach((listing) => {
      // Calculate the highest bid if bids exist
      const highestBid =
        listing.bids && listing.bids.length > 0
          ? Math.max(...listing.bids.map((bid) => bid.amount)) // Get the highest bid
          : 'No Bids'; // If no bids, display "No Bids"

      const listingCard = `
        <div class="border p-4 rounded shadow-lg flex flex-col justify-between">
          <img
            src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://via.placeholder.com/300'}"
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

renderListings();

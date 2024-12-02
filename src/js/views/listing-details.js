


// import { fetchListingById, placeBid } from '../api/api-listing.js';

// document.addEventListener('DOMContentLoaded', async () => {
//   const container = document.getElementById('listing-details-container');

//   // Get the listing ID from the query string
//   const params = new URLSearchParams(window.location.search);
//   const listingId = params.get('id');

//   if (!listingId) {
//     container.innerHTML = '<p class="text-red-500">Invalid listing ID.</p>';
//     return;
//   }

//   try {
//     const response = await fetchListingById(listingId);
//     const listing = response.data; // Extract data property
//     console.log('Fetched Listing:', listing);

//     // Check for valid `endsAt` and bids
//     const highestBid = listing.bids && listing.bids.length > 0
//       ? Math.max(...listing.bids.map((bid) => bid.amount))
//       : 0;

//     const endsAt = listing.endsAt
//       ? new Date(listing.endsAt).toLocaleDateString()
//       : 'No end date';

//     container.innerHTML = `
//       <div class="border p-4 rounded shadow-lg">
//         <img
//           src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
//           alt="${listing.title || 'No Title'}"
//           class="w-full h-150 object-cover rounded mb-4"
//           onerror="this.src='/assets/images/no-img-bb.jpg'"
//         />
//         <h1 class="text-2xl font-bold">${listing.title || 'Untitled Listing'}</h1>
//         <p class="mb-4">${listing.description || 'No description available.'}</p>
//         <p class="mb-2">Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span></p>
//         <p class="mb-2">Highest Bid: <span class="font-semibold">${highestBid}</span></p>
//         <p class="mb-4">Ends: <span class="font-semibold">${endsAt}</span></p>
//         <form id="place-bid-form" class="flex items-center">
//           <input
//             type="number"
//             id="bid-amount"
//             class="border border-gray-300 rounded px-2 py-1 mr-2"
//             placeholder="Enter your bid"
//             required
//           />
//           <button
//             type="submit"
//             class="bg-CTAGreen text-white font-medium py-2 px-4 rounded shadow-md hover:bg-CTAGreen-hover transition duration-300"
//           >
//             Place Bid
//           </button>
//         </form>
//       </div>
//     `;

//     // Handle bid submission
//     const bidForm = document.getElementById('place-bid-form');
//     bidForm.addEventListener('submit', async (event) => {
//       event.preventDefault();
//       const bidAmount = parseInt(document.getElementById('bid-amount').value, 10);
//       if (bidAmount <= highestBid) {
//         alert('Your bid must be higher than the current highest bid.');
//         return;
//       }

//       try {
//         await placeBid(listingId, bidAmount);
//         alert('Bid placed successfully!');
//         window.location.reload(); // Reload the page to reflect the new bid
//       } catch (error) {
//         console.error('Error placing bid:', error);
//         alert('Failed to place bid. Please try again.');
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching listing details:', error);
//     container.innerHTML = `<p class="text-red-500">Error loading listing details: ${error.message}</p>`;
//   }
// });

// Swiper.js integration in listing-details.js



import { fetchListingById } from '../api/api-listing.js';
import { setupBidForm } from '../components/bid.js';
import { calculateHighestBid } from '../components/bid.js';



document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('listing-details-container');

  // Get the listing ID from the query string
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get('id');

  if (!listingId) {
    container.innerHTML = '<p class="text-red-500">Invalid listing ID.</p>';
    return;
  }

  try {
    const response = await fetchListingById(listingId);
    const listing = response.data;
    console.log('Fetched Listing:', listing);

    const highestBid = calculateHighestBid(listing.bids);

    const endsAt = listing.endsAt
      ? new Date(listing.endsAt).toLocaleDateString()
      : 'No end date';

    const images = listing.media
      .map(
        (image) => `
        <div class="swiper-slide">
          <img 
            src="${image.url}" 
            alt="${image.alt || 'Listing Image'}" 
            class="w-full h-150 object-cover rounded"
            onerror="this.src='https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'"
          />
        </div>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="border p-4 rounded shadow-lg">
        <div class="swiper mySwiper mb-4">
          <div class="swiper-wrapper">
            ${
              images ||
              '<div class="swiper-slide"><img src="https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added" class="w-full h-48 object-cover rounded" /></div>'
            }
          </div>
          <!-- Navigation buttons -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <!-- Pagination -->
          <div class="swiper-pagination"></div>
        </div>

        <h1 class="text-2xl font-bold">${listing.title || 'Untitled Listing'}</h1>
        <p class="mb-4">${listing.description || 'No description available.'}</p>
        <p class="mb-2">Number of Bids: <span class="font-semibold">${
          listing._count?.bids || 0
        }</span></p>
        <p class="mb-2">Highest Bid: <span class="font-semibold">${highestBid}</span></p>
        <p class="mb-4">Ends: <span class="font-semibold">${endsAt}</span></p>
        <form id="place-bid-form" class="flex items-center">
          <input
            type="number"
            id="bid-amount"
            class="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="Enter your bid"
            required
          />
          <button
            type="submit"
            class="bg-CTAGreen text-white font-medium py-2 px-4 rounded shadow-md hover:bg-CTAGreen-hover transition duration-300"
          >
            Place Bid
          </button>
        </form>
      </div>
    `;

    // Initialize Swiper.js
    new Swiper('.mySwiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true, // Makes the slider loop infinitely
    });

    // Set up bid form logic
    setupBidForm(listingId, highestBid);
  } catch (error) {
    console.error('Error fetching listing details:', error);
    container.innerHTML = `<p class="text-red-500">Error loading listing details: ${error.message}</p>`;
  }
});









// import { fetchListingById } from '../api/api-listing.js';
// import { placeBid } from '../api/api-bid.js';


// document.addEventListener('DOMContentLoaded', async () => {
//   const container = document.getElementById('listing-details-container');

//   // Get the listing ID from the query string
//   const params = new URLSearchParams(window.location.search);
//   const listingId = params.get('id');

//   if (!listingId) {
//     container.innerHTML = '<p class="text-red-500">Invalid listing ID.</p>';
//     return;
//   }

//   try {
//     const response = await fetchListingById(listingId);
//     const listing = response.data;
//     console.log('Fetched Listing:', listing);

//     const highestBid =
//       listing.bids && listing.bids.length > 0
//         ? Math.max(...listing.bids.map((bid) => bid.amount))
//         : 0;

//     const endsAt = listing.endsAt
//       ? new Date(listing.endsAt).toLocaleDateString()
//       : 'No end date';

//     // Swiper.js slider from https://swiperjs.com/
//     const images = listing.media
//       .map(
//         (image) => `
//         <div class="swiper-slide">
//           <img 
//             src="${image.url}" 
//             alt="${image.alt || 'Listing Image'}" 
//             class="w-full h-150 object-cover rounded"
//             onerror="this.src='https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'"
//           />
//         </div>
//       `
//       )
//       .join('');

//     container.innerHTML = `
//       <div class="border p-4 rounded shadow-lg">
//         <div class="swiper mySwiper mb-4">
//           <div class="swiper-wrapper">
//             ${
//               images ||
//               '<div class="swiper-slide"><img src="https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added" class="w-full h-48 object-cover rounded" /></div>'
//             }
//           </div>
//           <!-- Navigation buttons -->
//           <div class="swiper-button-next"></div>
//           <div class="swiper-button-prev"></div>
//           <!-- Pagination -->
//           <div class="swiper-pagination"></div>
//         </div>

//         <h1 class="text-2xl font-bold">${listing.title || 'Untitled Listing'}</h1>
//         <p class="mb-4">${listing.description || 'No description available.'}</p>
//         <p class="mb-2">Number of Bids: <span class="font-semibold">${
//           listing._count?.bids || 0
//         }</span></p>
//         <p class="mb-2">Highest Bid: <span class="font-semibold">${highestBid}</span></p>
//         <p class="mb-4">Ends: <span class="font-semibold">${endsAt}</span></p>
//         <form id="place-bid-form" class="flex items-center">
//           <input
//             type="number"
//             id="bid-amount"
//             class="border border-gray-300 rounded px-2 py-1 mr-2"
//             placeholder="Enter your bid"
//             required
//           />
//           <button
//             type="submit"
//             class="bg-CTAGreen text-white font-medium py-2 px-4 rounded shadow-md hover:bg-CTAGreen-hover transition duration-300"
//           >
//             Place Bid
//           </button>
//         </form>
//       </div>
//     `;

//     // Initialize Swiper.js
//     new Swiper('.mySwiper', {
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       loop: true, // Makes the slider loop infinitely
//     });

//     // Handle bid submission
//     const bidForm = document.getElementById('place-bid-form');
//     bidForm.addEventListener('submit', async (event) => {
//       event.preventDefault();
//       const bidAmount = parseInt(
//         document.getElementById('bid-amount').value,
//         10
//       );
//       if (bidAmount <= highestBid) {
//         alert('Your bid must be higher than the current highest bid.');
//         return;
//       }

//       try {
//         await placeBid(listingId, bidAmount);
//         alert('Bid placed successfully!');
//         window.location.reload(); // Reload the page to reflect the new bid
//       } catch (error) {
//         console.error('Error placing bid:', error);
//         alert('Failed to place bid. Please try again.');
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching listing details:', error);
//     container.innerHTML = `<p class="text-red-500">Error loading listing details: ${error.message}</p>`;
//   }
// });

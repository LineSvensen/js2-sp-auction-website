import { fetchListingById } from '../api/api-listing.js';
import {
  setupBidForm,
  renderBiddersList,
  calculateHighestBid,
} from '../components/bid.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('listing-details-container');

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

    const endsAt = listing.endsAt ? new Date(listing.endsAt) : null;

    const isClosed = endsAt && endsAt < new Date(); // Check if the listing is closed

    // Find the last bidder (winner if the listing is closed)
    let winner = null;
    if (isClosed && listing.bids.length > 0) {
      winner = listing.bids.reduce((latest, bid) => {
        return new Date(bid.created) > new Date(latest.created) ? bid : latest;
      });
    }

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
              ${images || '<div class="swiper-slide"><img src="https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added" class="w-full h-48 object-cover rounded" /></div>'}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
  
          <h1 class="text-2xl font-bold">${listing.title || 'Untitled Listing'}</h1>
          <p class="mb-4">${listing.description || 'No description available.'}</p>
          <p class="mb-2">Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span></p>
          <p class="mb-2">Highest Bid: <span class="font-semibold">${highestBid}</span></p>
          <p class="mb-4">Ends: <span class="font-semibold">${endsAt ? endsAt.toLocaleDateString() : 'No end date'}</span></p>
          ${
            isClosed && winner
              ? `<p class="mb-4 text-green-500 font-bold">Winner: ${winner.bidder.name} 🏆🎉 with a bid of ${winner.amount} credits</p>`
              : ''
          }
          ${
            !isClosed
              ? `<form id="place-bid-form" class="flex items-center">
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
                </form>`
              : ''
          }
        </div>
      `;

    renderBiddersList(listing.bids, container);

    new Swiper('.mySwiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
    });

    if (!isClosed) {
      setupBidForm(listingId, highestBid);
    }
  } catch (error) {
    console.error('Error fetching listing details:', error);
    container.innerHTML = `<p class="text-red-500">Error loading listing details: ${error.message}</p>`;
  }
});

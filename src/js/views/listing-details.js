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
    /**
     * Fetches and renders the listing details.
     * @param {string} listingId - The ID of the listing to fetch and display.
     * @throws Will throw an error if fetching or rendering fails.
     */
    const response = await fetchListingById(listingId);
    const listing = response.data;

    const highestBid = calculateHighestBid(listing.bids);

    const endsAt = listing.endsAt ? new Date(listing.endsAt) : null;

    const isClosed = endsAt && endsAt < new Date();

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
              class="details-img-style"
              style="aspect-ratio: 3 / 2;"
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
              ${images || '<div class="swiper-slide"><img src="https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added" class="details-img-style" /></div>'}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="flex items-center mb-4">
            <img
                src="${listing.seller?.avatar?.url || 'https://dummyimage.com/40x40/cccccc/ffffff&text=No+Avatar'}"
                alt="${listing.seller?.name || 'Unknown Seller'}'s avatar"
                class="w-10 h-10 rounded-full mr-3"
            />
            <p class="text-gray-700 font-medium">
                Created by <span class="font-bold">${listing.seller?.name || 'Unknown Seller'}</span>
            </p>
          </div>
          <p class="text-xs pt-2 pb-2 truncate">Created: ${new Date(listing.created).toLocaleDateString()}</p>
          <h1 class="heading-h1-all-pages text-Black pb-2 truncate-title-cut">${listing.title || 'Untitled Listing'}</h1> 
          <p class="mb-4 text-base text-Black break-text">Description: <span class="font-bold">${listing.description || 'No description available.'}</span></p>
          <p class="mb-2 text-Black text-base">Number of Bids: <span class="font-bold">${listing._count?.bids || 0}</span></p>
          <p class="mb-2 text-Black">Highest Bid: <span class="font-bold">${highestBid}</span></p>
          <p class="mb-4 text-Black">Ends: <span class="font-bold">${endsAt ? endsAt.toLocaleDateString() : 'No end date'}</span></p>
          ${
            isClosed && winner
              ? `<p class="mb-4 text-green-500 font-bold">Winner: ${winner.bidder.name} 🏆🎉 with a bid of ${winner.amount} credits</p>`
              : ''
          }
          ${
            !isClosed
              ? `<form id="place-bid-form" class="items-center">
                  <input
                    type="number"
                    id="bid-amount"
                    class="border border-gray-300 rounded px-2 py-1 mr-2"
                    placeholder="Enter your bid"
                    required
                  />
                  <button
                    type="submit"
                    class="btn-trust common-buttons-style mt-2"
                  >
                    Place Bid
                  </button>
                  <p id="bid-error-msg" class="text-red-500 mt-2 text-sm"></p>
                </form>`
              : ''
          }
        </div>
      `;
    /**
     * Renders the list of bidders for the current listing.
     * @param {Array} listing.bids - The list of bids for the current listing.
     * @param {HTMLElement} container - The container element to display the bidders.
     */
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
    /**
     * Sets up the bid form for the listing.
     * @param {string} listingId - The ID of the listing to place a bid on.
     * @param {number} highestBid - The current highest bid for the listing.
     */
    if (!isClosed) {
      setupBidForm(listingId, highestBid);
    }
  } catch (error) {
    alert(
      'Ops! Something went wrong getting the listing details. Please try again later.'
    );
    container.innerHTML = `<p class="text-red-500">Error loading listing details: ${error.message}</p>`;
  }
});

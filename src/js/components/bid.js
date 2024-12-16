import { placeBid } from '../api/api-bid.js';
import { getAvatarHTML } from './avatar.js';

/**
 * Handles the bid submission form.
 * @param {string} listingId - The ID of the listing to place a bid on.
 * @param {number} highestBid - The current highest bid for the listing.
 */

export function setupBidForm(listingId, highestBid) {
  const bidForm = document.getElementById('place-bid-form');

  bidForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const bidAmount = parseInt(document.getElementById('bid-amount').value, 10);

    if (isNaN(bidAmount)) {
      alert('Please enter a valid bid amount.');
      return;
    }

    if (bidAmount <= highestBid) {
      alert('Your bid must be higher than the current highest bid.');
      return;
    }

    try {
      const result = await placeBid(listingId, bidAmount);
      if (result) {
        alert('Bid placed successfully!');
        window.location.reload();
      }
    } catch (error) {
      alert(error.message || 'Failed to place bid. Please try again.');
    }
  });
}

/**
 * Calculate the highest bid from the list of bids.
 * @param {Array<Object>} bids - Array of bid objects, each containing a bid amount.
 * @param {number} bids[].amount - The amount of a bid.
 * @returns {number} The highest bid amount, or 0 if no bids exist.
 */

export function calculateHighestBid(bids = []) {
  if (!bids || bids.length === 0) {
    return 0;
  }
  return Math.max(...bids.map((bid) => bid.amount));
}

/**
 * Render the bidders list for a listing.
 * @param {Array<Object>} bidders - List of bidder objects.
 * @param {Object} bidders[].bidder - The bidder's information including avatar and name.
 * @param {number} bidders[].amount - The amount of the bid.
 * @param {HTMLElement} container - The container where the list will be rendered.
 */
export function renderBiddersList(bidders, container) {
  const sortedBidders = bidders.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  const biddersList = document.createElement('div');
  biddersList.className = 'bidders-list mt-4';

  if (sortedBidders.length === 0) {
    biddersList.innerHTML =
      '<p class="text-gray-500">Currently no bids placed. Be the first!</p>';
  } else {
    biddersList.innerHTML = `
        <h2 class="text-lg font-bold mb-2 py-4 text-Black">Bids leaderboard 🔥</h2>
        <ul class="border p-4 rounded text-Black">
          ${sortedBidders
            .map(
              (bid) => `
            <li class="flex items-center justify-between py-2 border-b last:border-b-0">
              ${getAvatarHTML(bid.bidder)}
              <span class="font-semibold text-Black">${bid.amount} Credits</span>
            </li>`
            )
            .join('')}
        </ul>
      `;
  }

  if (!localStorage.getItem('accessToken')) {
    const ulElement = biddersList.querySelector('ul');
    if (ulElement) {
      ulElement.style.filter = 'blur(4px)';
    }
    const loginMessage = document.createElement('p');
    loginMessage.className = 'text-center text-red-500';
    loginMessage.textContent = 'Log in to view details of bids.';
    biddersList.appendChild(loginMessage);
  }

  container.appendChild(biddersList);
}
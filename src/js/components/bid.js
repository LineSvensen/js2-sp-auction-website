import { placeBid } from '../api/api-bid.js';
import { getAvatarHTML } from './avatar.js';


/**
 * Handles the bid submission form.
 * @param {string} listingId - The ID of the listing to place a bid on.
 * @param {number} highestBid - The current highest bid for the listing.
 */
export function setupBidForm(listingId, highestBid) {
  const bidForm = document.getElementById('place-bid-form');

  if (!bidForm) {
    console.error('Bid form not found!');
    return;
  }

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
        window.location.reload(); // Reload the page to reflect the new bid
      }
    } catch (error) {
      console.error('Error placing bid:', error.message);
      alert(error.message || 'Failed to place bid. Please try again.');
    }
  });
}

/**
 * Calculate the highest bid from the list of bids.
 * @param {Array} bids - List of bids.
 * @returns {number} The highest bid amount.
 */
export function calculateHighestBid(bids = []) {
  if (!bids || bids.length === 0) {
    return 0; // Default to 0 if no bids
  }
  return Math.max(...bids.map((bid) => bid.amount));
}

/**
 * Render the bidders list for a listing.
 * @param {Array} bidders - List of bidders.
 * @param {HTMLElement} container - The container where the list will be rendered.
 */
export function renderBiddersList(bidders, container) {
  // Sort bidders by newest first
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
        <h2 class="text-lg font-bold mb-2 py-4">Bids leaderboard 🔥</h2>
        <ul class="border p-4 rounded">
          ${sortedBidders
            .map(
              (bid) => `
            <li class="flex items-center justify-between py-2 border-b last:border-b-0">
              ${getAvatarHTML(bid.bidder)}
              <span class="font-semibold">${bid.amount} Credits</span>
            </li>`
            )
            .join('')}
        </ul>
      `;
  }

  // Apply blur only to the <ul> element if user is not logged in
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

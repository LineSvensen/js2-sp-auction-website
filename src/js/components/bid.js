import { placeBid } from '../api/api-bid.js';

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

    if (bidAmount <= highestBid) {
      alert('Your bid must be higher than the current highest bid.');
      return;
    }

    try {
      await placeBid(listingId, bidAmount);
      alert('Bid placed successfully!');
      window.location.reload(); // Reload the page to reflect the new bid
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    }
  });
}


// bid.js
export function calculateHighestBid(bids = []) {
    if (!bids || bids.length === 0) {
      return 0; // Default to 0 if no bids
    }
    return Math.max(...bids.map((bid) => bid.amount));
  }
  
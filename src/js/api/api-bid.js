import { getAccessToken } from './get-token.js';
import { API_KEY } from './the-key.js';

/**
 * Place a bid on a listing by ID.
 * @param {string} id - The listing ID.
 * @param {number} amount - The bid amount.
 * @returns {Object} The response data if the bid is successful.
 * @throws Will throw an error if the request fails.
 */
export async function placeBid(id, amount) {
  const accessToken = getAccessToken();
  if (!accessToken) {
    console.error('Access token is missing. Ensure the user is logged in.');
    alert('You must be logged in to place a bid.');
    return;
  }

  console.log('Access Token:', accessToken);
  console.log('Listing ID:', id);
  console.log('Payload being sent:', { amount });

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${id}/bids`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({ amount }), // Ensure amount is correctly formatted
      }
    );

    // Log the response to diagnose the issue
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Bid Error Details:', errorDetails);
      throw new Error(
        `HTTP Error: ${response.status} - ${errorDetails.message || 'Unknown error'}`
      );
    }

    const data = await response.json();
    console.log('Bid placed successfully:', data);
    return data;
  } catch (error) {
    console.error('Error placing bid:', error.message);
    throw error;
  }
}

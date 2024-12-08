import { getAccessToken } from './get-token.js';
import { API_KEY } from './the-key.js';

/**
 * Fetch the user's profile to get their current credit balance.
 * @returns {Object} The user's profile data.
 */
async function fetchUserProfile() {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error('Access token is missing.');

  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/profiles/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || 'Failed to fetch user profile.');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
}

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
    throw new Error('You must be logged in to place a bid.');
  }

  try {
    // Fetch the user's profile to check their credit balance
    const userProfile = await fetchUserProfile();
    const userCredits = userProfile.data.credits;

    // Check if the user has enough credits
    if (userCredits < amount) {
      throw new Error(
        `You do not have enough credits. Your current credit amount is: ${userCredits}`
      );
    }

    // Proceed with placing the bid if the user has enough credits
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${id}/bids`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({ amount }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Bid Error Details:', errorDetails);
      throw new Error(
        `Failed to place bid: ${errorDetails.message || 'Unknown error'}`
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

import { API_KEY } from '../utilities/the-key.js';

/**
 * Create a new listing.
 * @param {Object} requestBody - The data for the new listing.
 * @param {string} accessToken - The access token for authorization.
 * @returns {Promise<Object>} The created listing data.
 * @throws {Error} If the request fails.
 */

export async function createListing(requestBody, accessToken) {
  const response = await fetch('https://v2.api.noroff.dev/auction/listings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': API_KEY,
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Failed to create listing');
  }

  return response.json();
}

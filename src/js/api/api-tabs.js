import { getAccessToken } from '../utilities/get-token.js';
import { getHeaders } from '../utilities/headers.js';

const API_BASE_URL = 'https://v2.api.noroff.dev/auction';

getAccessToken();

getHeaders();

/**
 * Fetches active created listings for the logged-in user.
 * Filters listings to include only those with an end date in the future.
 * @returns {Promise<Object[]>} A list of active created listings.
 * @throws {Error} If the user is not logged in or the fetch fails.
 */

export async function fetchActiveCreatedListings() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/listings?_active=true&_bids=true`;

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok)
    throw new Error(
      `Failed to fetch active created listings. Status: ${response.status}`
    );

  const data = await response.json();

  const activeListings = data.data.filter(
    (listing) => new Date(listing.endsAt) > new Date()
  );

  return activeListings;
}

/**
 * Fetches ended created listings for the logged-in user.
 * Filters listings to include only those with an end date in the past.
 * @returns {Promise<Object[]>} A list of ended created listings.
 * @throws {Error} If the user is not logged in or the fetch fails.
 */

export async function fetchEndedCreatedListings() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/listings?_active=false&_bids=true`;

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok)
    throw new Error(
      `Failed to fetch ended created listings. Status: ${response.status}`
    );

  const data = await response.json();

  const endedListings = data.data.filter(
    (listing) => new Date(listing.endsAt) < new Date()
  );

  return endedListings;
}

/**
 * Fetches active bids placed by the logged-in user.
 * Matches the user's bid listings with full active listing data.
 * @returns {Promise<Object[]>} A list of active listings the user has bid on.
 * @throws {Error} If the user is not logged in or the fetch fails.
 */

export async function fetchActiveBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const activeListingsUrl = `${API_BASE_URL}/listings?_active=true&_bids=true`;

  const userBidsUrl = `${API_BASE_URL}/profiles/${name}/bids?_listings=true`;

  try {
    const [activeListingsResponse, userBidsResponse] = await Promise.all([
      fetch(activeListingsUrl, { headers: getHeaders() }),
      fetch(userBidsUrl, { headers: getHeaders() }),
    ]);

    if (!activeListingsResponse.ok || !userBidsResponse.ok) {
      throw new Error('Failed to fetch active listings or your bids.');
    }

    const activeListingsData = await activeListingsResponse.json();
    const userBidsData = await userBidsResponse.json();

    const activeListings = activeListingsData.data;
    const userBidListings = userBidsData.data.map((bid) => bid.listing);

    const mergedListings = activeListings.filter((listing) =>
      userBidListings.some((userListing) => userListing.id === listing.id)
    );

    return mergedListings;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetches won bids for the logged-in user.
 * @returns {Promise<Object[]>} A list of listings the user has won.
 * @throws {Error} If the user is not logged in or the fetch fails.
 */

export async function fetchWonBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/wins?_bids=true`;

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch won listings.');

  const data = await response.json();

  return data.data.filter((listing) => new Date(listing.endsAt) <= new Date());
}

/**
 * Fetches lost bids for the logged-in user.
 * Filters listings to include only those that have ended and were not won.
 * @returns {Promise<Object[]>} A list of listings the user has lost.
 * @throws {Error} If the user is not logged in or the fetch fails.
 */

export async function fetchLostBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/bids?_listings=true&_bids=true`;

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch lost bids.');

  const data = await response.json();

  return data.data
    .map((bid) => bid.listing)
    .filter((listing) => new Date(listing.endsAt) < new Date());
}

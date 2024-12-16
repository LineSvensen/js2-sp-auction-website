import { getAccessToken } from '../utilities/get-token.js';
import { API_KEY } from '../utilities/the-key.js';

/**
 * Fetch all active listings with bids.
 * @returns {Promise<Object>} Fetched and sorted active listings.
 * @throws {Error} If the request fails.
 */

export async function fetchListings() {
  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/listings?_bids=true&_active=true'
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    return { ...data, data: sortedListings };
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch a single listing by its ID.
 * @param {string} id - The ID of the listing to fetch.
 * @returns {Promise<Object>} The fetched listing data.
 * @throws {Error} If the request fails.
 */

export async function fetchListingById(id) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${id}?_bids=true&_seller=true`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch all listings, both active and ended, with bids.
 * @returns {Promise<Object>} Fetched and sorted listings.
 * @throws {Error} If the request fails.
 */

export async function fetchActiveAndClosedListings() {
  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/listings?_bids=true'
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    return { ...data, data: sortedListings };
  } catch (error) {
    throw error;
  }
}

/**
 * Search for listings using a query string.
 * @param {string} query - The search query.
 * @returns {Promise<Object>} The search results.
 * @throws {Error} If the request fails.
 */

export async function searchListings(query) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch active listings by search query.
 * @param {string} query - The search query.
 * @returns {Promise<Object>} The search results for active listings.
 * @throws {Error} If the request fails.
 */

export async function fetchListingsBySearch(query) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_bids=true&_active=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch active listings created by the logged-in user.
 * @returns {Promise<Object[]>} List of active listings.
 * @throws {Error} If the request fails.
 */

export async function fetchActiveCreatedListings() {
  const username = localStorage.getItem('name');
  if (!username) {
    throw new Error('Username not found. Please log in.');
  }

  const url = `https://v2.api.noroff.dev/auction/profiles/${username}/listings?_active=true&_bids=true`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch listings. Status: ${response.status}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch ended (inactive) created listings for the logged-in user.
 * @returns {Promise<Object[]>} List of ended created listings.
 * @throws {Error} If the request fails.
 */

export async function fetchEndedCreatedListings() {
  const name = localStorage.getItem('name');
  if (!name) {
    throw new Error('User is not logged in.');
  }

  const response = await fetch(
    `https://v2.api.noroff.dev/auction/profiles/${name}/listings?_active=false`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch ended created listings.');
  }

  const data = await response.json();
  return data;
}
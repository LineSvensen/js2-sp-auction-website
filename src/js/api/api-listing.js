import { getAccessToken } from '../utilities/get-token.js';
import { API_KEY } from '../utilities/the-key.js';

export async function fetchListings() {
  console.log('Fetching active listings sorted by newest...');
  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/listings?_bids=true&_active=true'
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    // Sort listings by creation date in descending order (newest first)
    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    console.log('Fetched and Sorted Active Listings:', sortedListings);
    return { ...data, data: sortedListings }; // Return the sorted listings
  } catch (error) {
    console.error('Error fetching listings:', error.message);
    throw error;
  }
}

export async function fetchListingById(id) {
  console.log(`Fetching listing with ID: ${id}`);
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${id}?_bids=true&_seller=true`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched Listing Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching listing by ID:', error.message);
    throw error;
  }
}

export async function fetchActiveAndClosedListings() {
  console.log('Fetching all listings (active and ended)...');
  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/listings?_bids=true'
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    // Sort listings by creation date in descending order (newest first)
    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    console.log('Fetched and Sorted All Listings:', sortedListings);
    return { ...data, data: sortedListings }; // Return the sorted listings
  } catch (error) {
    console.error('Error fetching all listings:', error.message);
    throw error;
  }
}

export async function searchListings(query) {
  console.log(`Searching listings with query: "${query}"`);
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Search Results:', data);
    return data;
  } catch (error) {
    console.error('Error searching listings:', error.message);
    throw error;
  }
}

export async function fetchListingsBySearch(query) {
  console.log(`Searching listings with query: ${query}`);
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_bids=true&_active=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Search Results:', data);
    return data; // Return the fetched search results
  } catch (error) {
    console.error('Error searching listings:', error.message);
    throw error;
  }
}


export async function fetchActiveCreatedListings() {
  const username = localStorage.getItem('name');
  if (!username) {
    throw new Error('Username not found. Please log in.');
  }

  const url = `https://v2.api.noroff.dev/auction/profiles/${username}/listings?_active=true&_bids=true`;
  console.log('Fetching Active Created Listings from:', url);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'X-Noroff-API-Key': API_KEY,
      },
    });

    console.log('Response Status:', response.status);

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Server Response:', errorDetails);
      throw new Error(`Failed to fetch listings. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Listings:', data);

    return data.data; // Return the listings array
  } catch (error) {
    console.error('Error fetching user listings:', error.message);
    throw error;
  }
}

/**
 * Fetch ended (inactive) created listings for the logged-in user.
 * @returns {Promise<Object[]>} List of ended created listings.
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
  console.log('Fetched Ended Created Listings:', data);
  return data; // Return the fetched listings
}

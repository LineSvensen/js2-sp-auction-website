import { API_KEY } from '../utilities/the-key.js';
import { getAccessToken } from '../utilities/get-token.js';
import { getHeaders } from '../utilities/headers.js';
import { fetchListingById } from './api-listing.js';

const API_BASE_URL = 'https://v2.api.noroff.dev/auction';

getAccessToken();

getHeaders();

export async function fetchActiveCreatedListings() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/listings?_active=true&_bids=true`;
  console.log(`Fetching Active Created Listings from: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok)
    throw new Error(
      `Failed to fetch active created listings. Status: ${response.status}`
    );

  const data = await response.json();
  console.log('Active Created Listings Data:', data);

  // Filter for listings where endsAt is in the future
  const activeListings = data.data.filter(
    (listing) => new Date(listing.endsAt) > new Date()
  );

  console.log('Filtered Active Listings:', activeListings);
  return activeListings;
}

export async function fetchEndedCreatedListings() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/listings?_active=false&_bids=true`;
  console.log(`Fetching Ended Created Listings from: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok)
    throw new Error(
      `Failed to fetch ended created listings. Status: ${response.status}`
    );

  const data = await response.json();
  console.log('Ended Created Listings Data:', data);

  // Filter for listings where endsAt is in the past
  const endedListings = data.data.filter(
    (listing) => new Date(listing.endsAt) < new Date()
  );

  console.log('Filtered Ended Listings:', endedListings);
  return endedListings;
}

export async function fetchActiveBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  // Fetch all active listings (from the homepage API)
  const activeListingsUrl = `${API_BASE_URL}/listings?_active=true&_bids=true`;
  // Fetch your placed bids
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

    // Match user's bid listings with full active listing data
    const mergedListings = activeListings.filter((listing) =>
      userBidListings.some((userListing) => userListing.id === listing.id)
    );

    console.log('Active Bids with Full Listing Data:', mergedListings);
    return mergedListings;
  } catch (error) {
    console.error('Error fetching active bids:', error.message);
    throw error;
  }
}

export async function fetchWonBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/wins?_bids=true`;
  console.log(`Fetching Won Listings: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch won listings.');

  const data = await response.json();
  console.log('Fetched Won Listings:', data);

  // Only include listings that have ended
  return data.data.filter((listing) => new Date(listing.endsAt) <= new Date());
}

export async function fetchLostBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/bids?_listings=true&_bids=true`;
  console.log(`Fetching Lost Bids: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch lost bids.');

  const data = await response.json();
  console.log('Fetched Lost Bids:', data);

  // Filter lost bids (listings that have ended but were not won)
  return data.data
    .map((bid) => bid.listing)
    .filter((listing) => new Date(listing.endsAt) < new Date());
}

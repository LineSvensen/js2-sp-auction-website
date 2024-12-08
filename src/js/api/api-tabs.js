import { API_KEY } from './the-key.js';
import { getAccessToken } from '../api/get-token.js';
import { getHeaders } from './headers.js';

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

  const url = `${API_BASE_URL}/profiles/${name}/bids?_listings=true`;
  console.log(`Fetching Active Bids: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch active bids.');

  const data = await response.json();
  console.log('Active Bids:', data);

  // Filter for active listings (not ended yet)
  return data.data
    .map((bid) => bid.listing)
    .filter((listing) => new Date(listing.endsAt) > new Date());
}

export async function fetchWonBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const url = `${API_BASE_URL}/profiles/${name}/wins`;
  console.log(`Fetching Won Bids: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok) throw new Error('Failed to fetch won listings.');

  const data = await response.json();
  console.log('Won Bids:', data);

  // Only include listings that have ended
  return data.data.filter((listing) => new Date(listing.endsAt) <= new Date());
}

export async function fetchLostBids() {
  const name = localStorage.getItem('name');
  if (!name) throw new Error('User name is missing.');

  const activeBids = await fetchActiveBids(); // Listings still in progress
  const wonListings = await fetchWonBids(); // Listings the user has won

  const activeIds = new Set(activeBids.map((listing) => listing.id));
  const wonIds = new Set(wonListings.map((listing) => listing.id));

  const url = `${API_BASE_URL}/profiles/${name}/bids?_listings=true`;
  console.log(`Fetching All Bids from: ${url}`);

  const response = await fetch(url, { headers: getHeaders() });
  if (!response.ok)
    throw new Error(`Failed to fetch bids. Status: ${response.status}`);

  const data = await response.json();
  console.log('All Bids Data:', data);

  // Filter for lost bids
  const lostListings = data.data
    .map((bid) => bid.listing)
    .filter(
      (listing) =>
        listing &&
        new Date(listing.endsAt) < new Date() && // Listing has ended
        !wonIds.has(listing.id) && // Not won
        !activeIds.has(listing.id) // Not active
    );

  console.log('Filtered Lost Listings:', lostListings);
  return lostListings;
}

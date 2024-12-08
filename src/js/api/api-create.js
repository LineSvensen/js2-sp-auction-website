import { API_KEY } from './the-key.js';

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


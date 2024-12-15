import { getAccessToken } from '../utilities/get-token.js';
import { API_KEY } from '../utilities/the-key.js';

export async function fetchProfile(name) {
  const accessToken = getAccessToken();
  if (!accessToken) throw new Error('Access token is missing.');

  const response = await fetch(
    `https://v2.api.noroff.dev/auction/profiles/${name}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': API_KEY,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch profile. Status: ${response.status}`);
  }

  return response.json();
}

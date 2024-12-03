import { getAccessToken } from '../api/get-token.js';
import { API_KEY } from '../api//the-key.js';

// Fetch the avatar
export async function fetchAvatar(name) {
  const accessToken = getAccessToken();
  if (!accessToken || !name) {
    console.error('Missing access token or name.');
    return null;
  }

  try {
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
      throw new Error(`Failed to fetch avatar. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Profile Data:', data);
    return data.avatar?.url || null; // Return avatar URL or null
  } catch (error) {
    console.error('Error fetching avatar:', error.message);
    return null;
  }
}

// Update the avatar
export async function updateAvatar(name, newAvatarUrl) {
  const accessToken = getAccessToken();
  if (!accessToken || !name) {
    console.error('Missing access token or name.');
    return;
  }

  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/profiles/${name}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Noroff-API-Key': API_KEY,
        },
        body: JSON.stringify({ avatar: { url: newAvatarUrl } }),  
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating avatar:', errorData);
      throw new Error('Failed to update avatar.');
    }

    const data = await response.json();
    console.log('Updated Avatar Response:', data);
    return data;
  } catch (error) {
    console.error('Error updating avatar:', error.message);
    throw error;
  }
}

import { getAccessToken } from '../utilities/get-token.js';
import { API_KEY } from '../utilities/the-key.js';

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

/**
 * Generate HTML for an avatar with a fallback if the avatar URL is missing.
 * @param {Object} bidder - The bidder object containing avatar and name.
 * @returns {string} HTML for the avatar element.
 */
export function getAvatarHTML(bidder) {
  const avatarUrl =
    bidder?.avatar?.url ||
    'https://dummyimage.com/50x50/cccccc/ffffff&text=No+Avatar';
  const name = bidder?.name || 'Anonymous';

  return `
      <div class="flex items-center">
        <img 
          src="${avatarUrl}" 
          alt="${name}" 
          class="bidders-small-avatar"
        />
        <span>${name}</span>
      </div>
    `;
}

export async function updateBio(name, bio) {
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
        body: JSON.stringify({ bio }), // Send bio directly as a string
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating bio:', errorData);
      throw new Error('Failed to update bio.');
    }

    const data = await response.json();
    console.log('Updated bio Response:', data);
    return data;
  } catch (error) {
    console.error('Error updating bio:', error.message);
    throw error;
  }
}

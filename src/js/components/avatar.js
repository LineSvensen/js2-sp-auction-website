import { getAccessToken } from '../utilities/get-token.js';
import { API_KEY } from '../utilities/the-key.js';

/**
 * Fetches the avatar URL for the given user.
 * @param {string} name - The username of the profile to fetch the avatar for.
 * @returns {Promise<string|null>} The avatar URL or null if not found.
 * @throws {Error} If the fetch fails.
 */

export async function fetchAvatar(name) {
  const accessToken = getAccessToken();

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
    return data.avatar?.url || null;
  } catch (error) {
    return null;
  }
}

/**
 * Updates the avatar URL for the given user.
 * @param {string} name - The username of the profile to update the avatar for.
 * @param {string} newAvatarUrl - The new avatar URL to set.
 * @returns {Promise<Object>} The updated profile data.
 * @throws {Error} If the update fails.
 */

export async function updateAvatar(name, newAvatarUrl) {
  const accessToken = getAccessToken();
  if (!accessToken || !name) {
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
      throw new Error('Failed to update avatar.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Generates HTML for an avatar with a fallback if the avatar URL is missing.
 * @param {Object} bidder - The bidder object containing avatar and name.
 * @param {Object} bidder.avatar - The avatar object containing the URL.
 * @param {string} bidder.avatar.url - The URL of the avatar image.
 * @param {string} bidder.name - The name of the bidder.
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

/**
 * Updates the bio for the given user.
 * @param {string} name - The username of the profile to update the bio for.
 * @param {string} bio - The new bio text to set.
 * @returns {Promise<Object>} The updated profile data.
 * @throws {Error} If the update fails.
 */

export async function updateBio(name, bio) {
  const accessToken = getAccessToken();
  if (!accessToken || !name) {
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
        body: JSON.stringify({ bio }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error('Failed to update bio.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
import { API_KEY } from './the-key.js';
import { getAccessToken } from './get-token.js';

/**
 * Generates headers required for authenticated API requests.
 * The headers include the access token and API key for authorization.
 *
 * @throws {Error} Throws an error if the access token or API key is missing.
 * @returns {Object} An object containing the headers for the API request.
 */

export function getHeaders() {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Access token is missing. User is not authenticated.');
  }

  if (!API_KEY) {
    throw new Error('API_KEY is missing. Ensure it is defined in the-key.js.');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'X-Noroff-API-Key': API_KEY,
  };
}

/**
 * Generates API headers with authentication.
 * This is a simplified version of getHeaders and assumes the access token is available.
 *
 * @returns {Object} An object containing the headers for the API request.
 */

export function getApiHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
    'X-Noroff-API-Key': API_KEY,
  };
}

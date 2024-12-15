import { API_KEY } from './the-key.js';
import { getAccessToken } from './get-token.js';

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

export function getApiHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
    'X-Noroff-API-Key': API_KEY,
  };
}

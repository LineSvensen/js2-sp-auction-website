import { API_KEY } from './the-key.js';
import { getAccessToken } from '../api/get-token.js';

// Helper for headers
export function getHeaders() {
  const accessToken = getAccessToken();
  if (!accessToken)
    throw new Error(
      'User is not authenticated. No token found in localStorage.'
    );
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'X-Noroff-API-Key': API_KEY, // Ensure API_KEY is defined
  };
}

export const headersJasonAndKey = {
  'Content-Type': 'application/json',
  'X-Noroff-API-Key': API_KEY,
};

// Headers with only Content-Type
export const headersOnlyJason = {
  'Content-Type': 'application/json',
};

export function headersTokenAndKey() {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage
  if (!accessToken) {
    throw new Error('Access token is missing. User is not logged in.');
  }

  return {
    Authorization: `Bearer ${accessToken}`,
    'X-Noroff-API-Key': API_KEY,
  };
}
//import { headersOnlyJason, headersNoToken } from './headers.js';

//import { headersOnlyJason } from './headers.js';

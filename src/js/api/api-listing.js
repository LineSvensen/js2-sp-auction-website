// export async function fetchListings() {
//   console.log('fetching listings....');
//     try {
//       const response = await fetch("https://v2.api.noroff.dev/auction/listings");
//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log('Fetched Data:', data);
//       return data; // Returns the parsed JSON
//     } catch (error) {
//       console.error("Error fetching listings:", error.message);
//       throw error; // Re-throw the error for external handling
//     }
//   }

//   export async function fetchListingById(id) {
//     console.log(`Fetching listing with ID: ${id}`);
//     try {
//       const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${id}?_bids=true`);
//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }
//       const data = await response.json();
//       console.log('Fetched Listing Data:', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching listing by ID:', error.message);
//       throw error;
//     }
//   }

import { getAccessToken } from './get-token.js';
import { API_KEY } from './the-key.js';

export async function fetchListings() {
  console.log('Fetching active listings sorted by newest...');
  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/listings?_bids=true&_active=true'
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    // Sort listings by creation date in descending order (newest first)
    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    console.log('Fetched and Sorted Active Listings:', sortedListings);
    return { ...data, data: sortedListings }; // Return the sorted listings
  } catch (error) {
    console.error('Error fetching listings:', error.message);
    throw error;
  }
}


export async function fetchListingById(id) {
  console.log(`Fetching listing with ID: ${id}`);
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/${id}?_bids=true&_seller=true`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched Listing Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching listing by ID:', error.message);
    throw error;
  }
}


export async function fetchActiveAndClosedListings() {
  console.log('Fetching all listings (active and ended)...');
  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auction/listings?_bids=true'
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    // Sort listings by creation date in descending order (newest first)
    const sortedListings = data.data.sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );

    console.log('Fetched and Sorted All Listings:', sortedListings);
    return { ...data, data: sortedListings }; // Return the sorted listings
  } catch (error) {
    console.error('Error fetching all listings:', error.message);
    throw error;
  }
}

export async function searchListings(query) {
  console.log(`Searching listings with query: "${query}"`);
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Search Results:', data);
    return data;
  } catch (error) {
    console.error('Error searching listings:', error.message);
    throw error;
  }
}


export async function fetchListingsBySearch(query) {
  console.log(`Searching listings with query: ${query}`);
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings/search?q=${encodeURIComponent(query)}&_bids=true&_active=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Search Results:', data);
    return data; // Return the fetched search results
  } catch (error) {
    console.error('Error searching listings:', error.message);
    throw error;
  }
}




// export async function placeBid(listingId, amount) {
//   const accessToken = getAccessToken(); // Retrieve the token
//   if (!accessToken) {
//     throw new Error('Access token is missing. Ensure the user is logged in.');
//   }

//   try {
//     const response = await fetch(`https://v2.api.noroff.dev/auction/listings/${listingId}/bids`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`,
//         'X-Noroff-API-Key': 'API_KEY'
//       },
//       body: JSON.stringify({ amount }) // Send the bid amount
//     });

//     if (!response.ok) {
//       const errorDetails = await response.json();
//       console.error('Bid Error Details:', errorDetails);
//       throw new Error(`HTTP Error: ${response.status} - ${errorDetails.message}`);
//     }

//     const data = await response.json();
//     console.log('Bid placed successfully:', data);
//     return data;
//   } catch (error) {
//     console.error('Error placing bid:', error.message);
//     throw error;
//   }
// }

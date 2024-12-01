export async function fetchListings() {
  console.log('fetching listings....');
    try {
      const response = await fetch("https://v2.api.noroff.dev/auction/listings");
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched Data:', data);
      return data; // Returns the parsed JSON
    } catch (error) {
      console.error("Error fetching listings:", error.message);
      throw error; // Re-throw the error for external handling
    }
  }
  


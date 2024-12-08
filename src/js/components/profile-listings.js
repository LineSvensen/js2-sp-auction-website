import { calculateHighestBid } from './bid.js';
export function renderProfileListings(listings, container) {
  if (!container) {
    console.error('Container not found for rendering listings.');
    return;
  }

  console.log('Rendering Listings:', listings);
  container.innerHTML = ''; // Clear any existing content

  if (!Array.isArray(listings) || listings.length === 0) {
    container.innerHTML =
      '<p class="text-center text-gray-500">No results found.</p>';
    return;
  }

  listings.forEach((listing, index) => {
    console.log(`Rendering listing ${index + 1}:`, listing);
    const highestBid = calculateHighestBid(listing.bids);

    const listingCard = `
            <div class="border p-4 rounded shadow-lg flex flex-col justify-between m-2">
                <img
                    src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
                    alt="${listing.title}"
                    class="w-full h-48 object-cover rounded mb-4"
                />
                <h3 class="text-lg font-bold">${listing.title}</h3>
                <p class="text-sm mb-2">Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span></p>
                <p class="text-sm mb-2">Highest Bid: <span class="font-semibold">${highestBid} Credits</span></p>
                <p class="text-sm mb-4">Ends: <span class="font-semibold">${new Date(listing.endsAt).toLocaleDateString()}</span></p>
                <a
                    href="/pages/listing-details.html?id=${listing.id}"
                    class="bg-CTABlue hover:bg-CTABlue-hover text-white text-center font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                    View Listing
                </a>
            </div>
        `;

    container.innerHTML += listingCard;
  });

  console.log(
    `Finished rendering ${listings.length} listings to the container.`
  );
}

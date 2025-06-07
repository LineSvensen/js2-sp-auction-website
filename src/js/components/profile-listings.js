import { calculateHighestBid } from './bid.js';

/**
 * Renders a list of profile listings into the specified container.
 *
 * @param {Array} listings - An array of listing objects to be rendered.
 * @param {HTMLElement} container - The container element where the listings will be rendered.
 */
export function renderProfileListings(listings, container, showBadges = false) {
  container.innerHTML = '';

  if (!Array.isArray(listings) || listings.length === 0) {
    container.innerHTML =
      '<p class="text-center text-gray-500">No results found.</p>';
    return;
  }

  listings.forEach((listing) => {
    if (!listing) return;

    const now = new Date();
    const endsAt = new Date(listing.endsAt);
    const timeRemaining = endsAt - now;
    const daysRemaining = timeRemaining / (1000 * 60 * 60 * 24);
    const endsSoon = daysRemaining <= 5;
    const isHot = (listing._count?.bids || 0) > 10;
    const highestBid = calculateHighestBid(listing.bids || []);

    const badgeMarkup = showBadges
      ? `
        <div class="absolute top-2 left-2 flex flex-col gap-1 z-10">
          ${endsSoon ? `<span class="bg-white fontcolor text-xs font-bold px-2 py-1 rounded shadow">⌛ Ending Soon</span>` : ''}
          ${isHot ? `<span class="bg-white fontcolor text-xs font-bold px-2 py-1 rounded shadow">🔥 Hot!</span>` : ''}
        </div>
      `
      : '';

    const listingCard = `
      <div class="relative border p-4 rounded fontcolor shadow-lg flex flex-col justify-between m-2 truncate-title-ellipsis bg-white">
        <div class="relative mb-4">
          ${badgeMarkup}
          <img
            src="${listing.media?.[0]?.url || 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
            alt="${listing.title}"
            class="w-full h-48 object-cover rounded-md border-2 border-bgGrey"
          />
        </div>
        <h3 class="heading-h3-cards truncate-title-ellipsis">${listing.title}</h3>
        <p class="text-sm mb-2">Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span></p>
        <p class="text-sm mb-2">Highest Bid: <span class="font-semibold">${highestBid} Credits</span></p>
        <p class="text-sm mb-4">Ends: <span class="font-semibold">${endsAt.toLocaleDateString()}</span></p>
        <a
          href="/pages/listing-details.html?id=${listing.id}"
          class="btn-trust common-buttons-style w-full block"
        >
          View Listing
        </a>
      </div>
    `;

    container.innerHTML += listingCard;
  });
}

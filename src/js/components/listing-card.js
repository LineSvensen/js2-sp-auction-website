import { fetchListings } from '../api/api-listing.js';
import { calculateHighestBid } from './bid.js';

/**
 * Renders listings into the provided container.
 */
export async function renderListings(listings = null, container = null) {
  const listingsContainer =
    container || document.getElementById('listings-container');
  if (!listingsContainer) return;

  try {
    if (!listings) {
      const response = await fetchListings();
      listings = response.data || [];
    }

    listingsContainer.innerHTML = '';

    if (!listings.length) {
      listingsContainer.innerHTML =
        '<p class="text-center text-gray-500">No results found.</p>';
      return;
    }

    listings.forEach((listing) => {
      const highestBid = calculateHighestBid(listing.bids);
      const timeRemaining = new Date(listing.endsAt) - new Date();
      const daysRemaining = timeRemaining / (1000 * 60 * 60 * 24);
      const endsSoon = daysRemaining <= 5;

      const isHot = (listing._count?.bids || 0) > 10;

      const listingCard = `
        <div class="border p-4 rounded shadow-lg flex flex-col text-Black bg-white">
          <div class="relative mb-4">
            <a href="/pages/listing-details.html?id=${listing.id}">
              <img
                src="${listing.media?.[0]?.url || 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
                alt="${listing.title}"
                onerror="this.onerror=null; this.src='https://dummyimage.com/500x500/cccccc/ffffff&text=Error+showing+image';"
                class="w-full h-48 object-cover rounded-md border-2 border-bgGrey"
              />
            </a>
          </div>
          <h3 class="heading-h3-cards pb-2 truncate-title-ellipsis">${listing.title}</h3>
          <p class="text-sm mb-2">Number of Bids: <span class="font-bold">${listing._count?.bids || 0}</span></p>
          <p class="text-sm mb-2">Highest Bid: <span class="font-bold">${highestBid} Credits</span></p>
          <p class="text-sm mb-4">Ends: <span class="font-bold">${new Date(listing.endsAt).toLocaleDateString()}</span></p>
          <a
            href="/pages/listing-details.html?id=${listing.id}"
            class="btn-trust text-white text-center common-buttons-style"
          >
            View Listing
          </a>
        </div>
      `;

      listingsContainer.innerHTML += listingCard;
    });
  } catch (error) {
    listingsContainer.innerHTML = `<p class="text-center text-red-500">Error loading listings: ${error.message}</p>`;
  }
}

/**
 * Render listings with pagination for the homepage.
 */
export async function renderHomepageListings() {
  const listingContainer = document.getElementById('listings-container');
  const prevBtn = document.getElementById('home-prev-page');
  const nextBtn = document.getElementById('home-next-page');
  const pageIndicator = document.getElementById('home-page-indicator');

  let currentPage = 1;
  const limit = 6;

  async function fetchAndRender() {
    try {
      listingContainer.innerHTML = '<p>Loading...</p>';
      const response = await fetch(
        `https://v2.api.noroff.dev/auction/listings?_active=true&_bids=true&limit=100&page=1`
      );
      const data = await response.json();
      let listings = data.data;

      listings.sort((a, b) => new Date(b.created) - new Date(a.created));

      const paginated = listings.slice(
        (currentPage - 1) * limit,
        currentPage * limit
      );

      renderListings(paginated, listingContainer);

      const totalPages = Math.ceil(listings.length / limit);
      pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = currentPage >= totalPages;
    } catch (err) {
      listingContainer.innerHTML =
        '<p class="text-red-500">Error loading listings</p>';
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndRender();
    }
  });

  nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchAndRender();
  });

  fetchAndRender();
}

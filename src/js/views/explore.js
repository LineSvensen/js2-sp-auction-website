import { renderProfileListings } from '../components/profile-listings.js';

let currentPage = 1;
let currentSort = 'endsAt';
let currentOrder = 'asc';

const listingContainer = document.getElementById('explore-listings');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageIndicator = document.getElementById('page-indicator');
const listingsPerPage = 6; // how many per page
let totalPages = 1; // default fallback

async function fetchExploreListings() {
  try {
    listingContainer.innerHTML = '<p>Loading...</p>';

    const response = await fetch(
      `https://v2.api.noroff.dev/auction/listings?_active=true&_bids=true&limit=100&page=1`
    );
    const data = await response.json();
    let listings = data.data;

    // Sort logic...
    if (currentSort === 'popular') {
      listings.sort((a, b) => (b._count?.bids || 0) - (a._count?.bids || 0));
    } else {
      listings.sort((a, b) =>
        currentOrder === 'asc'
          ? new Date(a.endsAt) - new Date(b.endsAt)
          : new Date(b.endsAt) - new Date(a.endsAt)
      );
    }

    // Pagination math
    totalPages = Math.ceil(listings.length / listingsPerPage);
    const paginated = listings.slice(
      (currentPage - 1) * listingsPerPage,
      currentPage * listingsPerPage
    );

    renderProfileListings(paginated, listingContainer);

    // ✅ Update page indicator like "Page 2 / 17"
    pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  } catch (error) {
    console.error(error);
    listingContainer.innerHTML = `<p class="text-red-500">Error loading listings.</p>`;
  }
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchExploreListings();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchExploreListings();
});

const tabButtons = document.querySelectorAll('.tab');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const sortType = btn.dataset.sort;
    currentSort = sortType === '_count.bids' ? 'popular' : sortType;
    currentOrder = btn.dataset.order;
    currentPage = 1;
    fetchExploreListings();
  });
});

document.addEventListener('DOMContentLoaded', fetchExploreListings);

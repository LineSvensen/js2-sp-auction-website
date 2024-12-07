import {
  fetchActiveCreatedListings,
  fetchEndedCreatedListings,
  fetchActiveBids,
  fetchWonBids,
  fetchLostBids,
} from '../api/api-tabs.js';
import { calculateHighestBid } from './bid.js';

// Render Listings for Specific Container
async function renderListings(listings, container) {
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
        <div class="border p-4 rounded shadow-lg flex flex-col justify-between">
          <img
            src="${listing.media && listing.media[0] ? listing.media[0].url : 'https://dummyimage.com/500x500/cccccc/ffffff&text=No+image+added'}"
            alt="${listing.title}"
            class="w-full h-48 object-cover rounded mb-4"
          />
          <h3 class="text-lg font-bold">${listing.title}</h3>
          <p class="text-sm mb-2">
            Number of Bids: <span class="font-semibold">${listing._count?.bids || 0}</span>
          </p>
          <p class="text-sm mb-2">
            Highest Bid: <span class="font-semibold">${highestBid} Credits</span>
          </p>
          <p class="text-sm mb-4">
            Ends: <span class="font-semibold">${new Date(listing.endsAt).toLocaleDateString()}</span>
          </p>
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

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const subTabs = document.querySelectorAll('.sub-tab');
  const containers = {};

  console.log('Tabs and Sub-tabs Initialized.');

  let activeMainTab = null;
  let activeSubTab = null;

  const loadTabContent = async (subTab) => {
    const contentId = subTab.dataset.subTab;
    if (!contentId) {
      console.error('Invalid sub-tab: Missing data-sub-tab attribute.');
      return;
    }

    if (activeSubTab === subTab) {
      console.log(`Sub-Tab ${contentId} is already active.`);
      return; // Prevent redundant loading
    }

    // Reset active sub-tab and content
    if (activeSubTab) {
      const prevContentId = activeSubTab.dataset.subTab;
      const prevContainer = containers[prevContentId];
      if (prevContainer) {
        prevContainer.innerHTML = ''; // Clear previous container
      }
    }

    activeSubTab = subTab; // Update active sub-tab
    subTabs.forEach((st) => st.classList.remove('active'));
    subTab.classList.add('active');

    const container =
      containers[contentId] || document.getElementById(`${contentId}-content`);
    containers[contentId] = container; // Cache container for future use

    if (!container) {
      console.error(`Container not found for sub-tab: ${contentId}`);
      return;
    }

    container.innerHTML = '<p>Loading...</p>';

    try {
      console.log(`Loading data for sub-tab: ${contentId}`);
      let data;

      switch (contentId) {
        case 'active-created':
          data = await fetchActiveCreatedListings();
          break;
        case 'ended-created':
          data = await fetchEndedCreatedListings();
          break;
        case 'active-bids':
          data = await fetchActiveBids();
          break;
        case 'won-bids':
          data = await fetchWonBids();
          break;
        case 'lost-bids':
          data = await fetchLostBids();
          break;
        default:
          throw new Error(`Unknown contentId: ${contentId}`);
      }

      console.log(`Data Fetched for ${contentId}:`, data);

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500">No results found for ${contentId}.</p>`;
      } else {
        renderListings(data, container);
      }
    } catch (error) {
      console.error(`Error loading content for ${contentId}:`, error);
      container.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  };

  // Main Tab Switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      console.log(`Main Tab Clicked: ${tab.dataset.tab}`);

      if (activeMainTab === tab) {
        console.log(`Main Tab ${tab.dataset.tab} is already active.`);
        return;
      }

      tabs.forEach((t) => t.classList.remove('active'));
      document
        .querySelectorAll('.tab-panel')
        .forEach((panel) => panel.classList.add('hidden'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.remove('hidden');

      activeMainTab = tab; // Update active main tab
      activeSubTab = null; // Reset active sub-tab
    });
  });

  // Sub-Tab Switching
  subTabs.forEach((subTab) => {
    subTab.addEventListener('click', () => {
      console.log(`Sub-Tab Clicked: ${subTab.dataset.subTab}`);
      loadTabContent(subTab);
    });
  });

  console.log('Tabs and Sub-tabs Event Listeners Set.');
});

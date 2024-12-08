import {
  fetchActiveCreatedListings,
  fetchEndedCreatedListings,
  fetchActiveBids,
  fetchWonBids,
  fetchLostBids,
} from '../api/api-tabs.js';

import { renderProfileListings } from '../components/profile-listings.js';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const subTabs = document.querySelectorAll('.sub-tab');
  const containers = {};

  console.log('Tabs and Sub-tabs Initialized.');

  let activeMainTab = null;
  let activeSubTab = null;

  // Function to load tab content dynamically
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
        container.innerHTML = `<p class="text-center text-gray-500 mb-8 mt-4">No results found :-/</p>`;
      } else {
        renderProfileListings(data, container);
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

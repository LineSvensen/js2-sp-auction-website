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

  let activeMainTab = null;
  let activeSubTab = null;

  /**
   * Loads content for a specific sub-tab.
   *
   * @param {HTMLElement} subTab - The sub-tab element being clicked.
   */

  const loadTabContent = async (subTab) => {
    const contentId = subTab.dataset.subTab;

    if (activeSubTab) {
      const prevContentId = activeSubTab.dataset.subTab;
      const prevContainer = containers[prevContentId];
      if (prevContainer) {
        prevContainer.innerHTML = '';
      }
    }

    activeSubTab = subTab;
    subTabs.forEach((st) => st.classList.remove('active'));
    subTab.classList.add('active');

    const container =
      containers[contentId] || document.getElementById(`${contentId}-content`);
    containers[contentId] = container;

    container.innerHTML = '<p>Loading...</p>';

    try {
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

      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 mb-8 mt-4">No results found :-/</p>`;
      } else {
        renderProfileListings(data, container);
      }
    } catch (error) {
      container.innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
  };
  /**
   * Adds event listeners to main tab elements.
   *
   * @param {NodeListOf<HTMLElement>} tabs - The main tab elements to set up event listeners for.
   */
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      document
        .querySelectorAll('.tab-panel')
        .forEach((panel) => panel.classList.add('hidden'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.remove('hidden');

      activeMainTab = tab;
      activeSubTab = null;

      // 💡 Automatically trigger sub-tab based on selected tab
      if (tab.dataset.tab === 'placed-bids') {
        document.querySelector('[data-sub-tab="active-bids"]')?.click();
      } else if (tab.dataset.tab === 'created-listings') {
        document.querySelector('[data-sub-tab="active-created"]')?.click();
      }
    });
  });

  /**
   * Adds event listeners to sub-tab elements.
   *
   * @param {NodeListOf<HTMLElement>} subTabs - The sub-tab elements to set up event listeners for.
   */
  subTabs.forEach((subTab) => {
    subTab.addEventListener('click', () => {
      loadTabContent(subTab);
    });
  });
  const defaultActiveTab = document.querySelector(
    '[data-sub-tab="active-created"]'
  );
  if (defaultActiveTab) {
    defaultActiveTab.click();
  }
});

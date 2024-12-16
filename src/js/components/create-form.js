/**
 * Sets up the media input section in the form.
 * Adds functionality to dynamically add and remove media input fields.
 *
 * @param {HTMLElement} mediaContainer - The container where media input fields are appended.
 * @param {HTMLElement} addMediaButton - The button that triggers adding new media input fields.
 */

export function setupMediaInput(mediaContainer, addMediaButton) {
  addMediaButton.addEventListener('click', () => {
    const mediaGroup = document.createElement('div');
    mediaGroup.classList.add('flex', 'space-x-2', 'mt-2');
    mediaGroup.innerHTML = `
          <input type="url" placeholder="Image URL" class="block w-full border border-gray-300 rounded p-2" />
          <input type="text" placeholder="Alt Text" class="block w-full border border-gray-300 rounded p-2" />
          <button type="button" class="remove-media bg-CTARed hover:bg-CTARed-hover text-white px-3 py-2 rounded">X</button>
        `;

    mediaContainer.appendChild(mediaGroup);

    mediaGroup.querySelector('.remove-media').addEventListener('click', () => {
      mediaGroup.remove();
    });
  });
}

/**
 * Collects form data from the inputs and formats it into an object.
 *
 * @param {HTMLElement} mediaContainer - The container holding all media input fields.
 * @returns {Object} - The collected form data including title, description, tags, media, and endsAt.
 */

export function collectFormData(mediaContainer) {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const tags = document
    .getElementById('tags')
    .value.split(',')
    .map((tag) => tag.trim());
  const endsAt = document.getElementById('endsAt').value;

  const mediaInputs = Array.from(mediaContainer.querySelectorAll('.flex'));
  const media = mediaInputs.map((inputGroup) => {
    const url = inputGroup.querySelector('input[type="url"]').value.trim();
    const alt = inputGroup.querySelector('input[type="text"]').value.trim();
    return { url, alt };
  });

  return { title, description, tags, media, endsAt };
}
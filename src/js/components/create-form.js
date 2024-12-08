export function setupMediaInput(mediaContainer, addMediaButton) {
  // Add Media Input
  addMediaButton.addEventListener('click', () => {
    const mediaGroup = document.createElement('div');
    mediaGroup.classList.add('flex', 'space-x-2', 'mt-2');
    mediaGroup.innerHTML = `
          <input type="url" placeholder="Image URL" class="block w-full border border-gray-300 rounded p-2" />
          <input type="text" placeholder="Alt Text" class="block w-full border border-gray-300 rounded p-2" />
          <button type="button" class="remove-media bg-red-500 text-white px-3 py-2 rounded">Remove</button>
        `;

    mediaContainer.appendChild(mediaGroup);

    // Remove Media Input
    mediaGroup.querySelector('.remove-media').addEventListener('click', () => {
      mediaGroup.remove();
    });
  });
}

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

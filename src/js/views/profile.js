import { fetchAvatar, updateAvatar } from '../components/avatar.js';
import { fetchProfile } from '../api/api-profile.js';

document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.getElementById('profile-container');
  const name = localStorage.getItem('name');

  if (!name) {
    alert('You must be logged in to access your profile.');
    window.location.href = '/pages/login-register.html';
    return;
  }

  try {
    profileContainer.innerHTML = `<p>Loading profile...</p>`;

    // Fetch and display avatar
    const avatarUrl = await fetchAvatar(name);
    const defaultAvatar =
      'https://dummyimage.com/100x100/cccccc/ffffff&text=No+Avatar';
    const profileData = await fetchProfile(name);

    profileContainer.innerHTML = `
      <div class="border p-4 rounded shadow-lg">
        <h1 class="text-2xl font-bold">Welcome, ${name}!</h1>
        <img id="profile-avatar" class="w-4 h-4 object-cover rounded-full" src="${profileData.data.avatar.url || ''}" alt="${profileData.data.avatar.alt || 'no image'}">
        <form id="update-avatar-form">
          <input 
            type="url" 
            id="new-avatar-url" 
            class="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="New Avatar URL"
          />
          <button 
            type="submit"
            class="bg-CTAGreen text-white font-medium py-1 px-4 rounded shadow-md"
          >
            Update Avatar
          </button>
        </form>
      </div>
    `;

    // Handle avatar updates
    const updateAvatarForm = document.getElementById('update-avatar-form');
    updateAvatarForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const newAvatarUrl = document
        .getElementById('new-avatar-url')
        .value.trim();

      if (!newAvatarUrl) {
        alert('Please enter a valid avatar URL.');
        return;
      }

      try {
        await updateAvatar(name, newAvatarUrl);
        alert('Avatar updated successfully!');
        document.getElementById('profile-avatar').src = newAvatarUrl;
      } catch (error) {
        console.error('Error updating avatar:', error.message);
        alert('Failed to update avatar. Please try again.');
      }
    });
  } catch (error) {
    console.error('Error loading profile:', error.message);
    profileContainer.innerHTML = `<p class="text-red-500">Error loading profile: ${error.message}</p>`;
  }
});

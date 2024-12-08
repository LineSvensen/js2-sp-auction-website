import { fetchAvatar, updateAvatar, updateBio } from '../components/avatar.js';
import { fetchProfile } from '../api/api-profile.js';
import { authGuard } from '../utilities/authGuard.js';

document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.getElementById('profile-container');

  authGuard();

  try {
    profileContainer.innerHTML = `<p>Loading profile...</p>`;
    const name = localStorage.getItem('name');
    // Fetch and display avatar and profile
    const profileData = await fetchProfile(name);
    const avatarUrl =
      profileData.data.avatar?.url ||
      'https://dummyimage.com/100x100/cccccc/ffffff&text=No+Avatar';
    const bio = profileData.data.bio || 'No bio provided';
    const credits = profileData.data.credits || 0;
    const wins = profileData.data._count?.wins || 0;
    const listings = profileData.data._count?.listings || 0;

    // Build the profile UI
    profileContainer.innerHTML = `
      <div class="p-4">
        <h1 id="profile-welcome" class="text-2xl font-bold py-4">Welcome, ${name}!</h1>
        <div class="flex flex-row">
          <img id="profile-avatar" title="Avatar" class="small-avatar" src="${avatarUrl}" alt="Avatar">
          <button type="button" title="Edit avatar" id="show-update-avatar-form" class="bg-CTAGreen hover:bg-CTAGreen-hover text-white font-medium h-8 py-1 px-2 ml-2 rounded shadow-md rounded-full">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <form id="update-avatar-form" style="display: none; margin-top: 10px;">
          <input 
            type="url" 
            id="new-avatar-url" 
            class="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="New Avatar URL"
          />
          <button 
            type="submit"
            class="bg-CTAGreen hover:bg-CTAGreen-hover text-white font-medium py-1 px-4 rounded shadow-md"
          >
            Update Avatar
          </button>
        </form>
        <div class="flex flex-direction: row;">
            <p id="profile-bio" class="py-4 text-xl"><b>Bio:</b> ${bio}</p>
            <button type="button" title="Edit bio" id="show-update-bio-form" class="bg-CTAGreen hover:bg-CTAGreen-hover text-white font-medium h-8 py-1 px-2 ml-2 rounded shadow-md rounded-full">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>    
        <form id="update-bio-form" style="display: none; margin-top: 10px;">
          <input 
            type="text" 
            id="new-bio-text" 
            class="border border-gray-300 rounded px-2 py-1 mr-2"
            placeholder="New bio text"
          />
          <button 
            type="submit"
            class="bg-CTAGreen hover:bg-CTAGreen-hover text-white font-medium py-1 px-4 rounded shadow-md"
          >
            Update Bio
          </button>
        </form>
        <p><b>Username:</b> ${name}</p>
        <p><b>Your total credits:</b> ${credits}</p>
        <p><b>Your wins:</b> ${wins}</p>
        <p><b>Your created listings:</b> ${listings}</p>  
      </div>
    `;

    // Avatar Update Form Logic
    const showUpdateAvatarFormButton = document.getElementById(
      'show-update-avatar-form'
    );
    const updateAvatarForm = document.getElementById('update-avatar-form');

    showUpdateAvatarFormButton.addEventListener('click', () => {
      updateAvatarForm.style.display =
        updateAvatarForm.style.display === 'none' ? 'block' : 'none';
    });

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
        updateAvatarForm.style.display = 'none';
      } catch (error) {
        console.error('Error updating avatar:', error.message);
        alert('Failed to update avatar. Please try again.');
      }
    });

    // Bio Update Form Logic
    const showUpdateBioFormButton = document.getElementById(
      'show-update-bio-form'
    );
    const updateBioForm = document.getElementById('update-bio-form');
    const profileBio = document.getElementById('profile-bio');

    showUpdateBioFormButton.addEventListener('click', () => {
      updateBioForm.style.display =
        updateBioForm.style.display === 'none' ? 'block' : 'none';
    });

    updateBioForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const newBioText = document.getElementById('new-bio-text').value.trim();

      if (!newBioText) {
        alert('Please enter bio text.');
        return;
      }

      try {
        await updateBio(name, newBioText);
        alert('Bio updated successfully!');
        profileBio.textContent = newBioText; // Update the bio text
        updateBioForm.style.display = 'none'; // Hide the form
      } catch (error) {
        console.error('Error updating bio:', error.message);
        alert('Failed to update bio. Please try again.');
      }
    });
  } catch (error) {
    console.error('Error loading profile:', error.message);
    profileContainer.innerHTML = `<p class="text-red-500">Error loading profile: ${error.message}</p>`;
  }
});

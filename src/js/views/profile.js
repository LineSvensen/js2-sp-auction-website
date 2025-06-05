import { updateAvatar, updateBio } from '../components/avatar.js';
import { fetchProfile } from '../api/api-profile.js';
import { authGuard } from '../utilities/authGuard.js';

document.addEventListener('DOMContentLoaded', async () => {
  const profileContainer = document.getElementById('profile-container');

  authGuard();

  try {
    profileContainer.innerHTML = `<p>Loading profile...</p>`;
    const name = localStorage.getItem('name');
    const profileData = await fetchProfile(name);
    const avatarUrl =
      profileData.data.avatar?.url ||
      'https://dummyimage.com/100x100/cccccc/ffffff&text=No+Avatar';
    const bio = profileData.data.bio || 'No bio provided';
    const credits = profileData.data.credits || 0;
    const wins = profileData.data._count?.wins || 0;
    const listings = profileData.data._count?.listings || 0;

    profileContainer.innerHTML = `
      <div class="p-4 flex flex-col items-start">
        <h1 id="profile-welcome" class="heading-h1-all-pages pb-8">Welcome, ${name}!</h1>
        <div class="flex flex-row">
          <img
            id="profile-avatar"
            src="${avatarUrl}"
            alt="Avatar"
            class="small-avatar"
            onerror="this.src='https://dummyimage.com/100x100/cccccc/ffffff&text=Image+Not+Found'"
          />
          <button type="button" title="Edit avatar" id="show-update-avatar-form" class="bg-CTAGreen hover:bg-CTAGreen-hover text-white font-medium h-8 py-1 px-2 ml-2 rounded-lg shadow-md ">
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
          <p id="avatar-feedback" class="text-sm mt-2 text-red-500 break-words max-w-full"></p>
        </form>

        <div class="flex flex-direction: row;">
          <p id="profile-bio" class="py-4 text-lg text-center">Bio: <b>${bio}</b></p>
          <button type="button" title="Edit bio" id="show-update-bio-form" class="bg-CTAGreen hover:bg-CTAGreen-hover text-white font-medium h-8 py-1 px-2 ml-2 rounded-lg shadow-md">
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
          <p id="bio-feedback" class="text-sm mt-2 text-red-500"></p>
        </form>

        <p class="p-1">Username: <b>${name}</b></p>
        <p class="p-1">Your total credits: <b>${credits}</b></p>
        <p class="p-1">Your wins: <b>${wins}</b></p>
        <p class="p-1">Your created listings: <b>${listings}</b></p>  
      </div>
    `;

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
      const avatarFeedback = document.getElementById('avatar-feedback');
      avatarFeedback.textContent = ''; // clear previous

      if (!newAvatarUrl) {
        avatarFeedback.textContent = 'Please enter a valid avatar URL.';
        return;
      }

      try {
        await updateAvatar(name, newAvatarUrl);
        document.getElementById('profile-avatar').src = newAvatarUrl;
        avatarFeedback.classList.remove('text-red-500');
        avatarFeedback.classList.add('text-green-600');
        avatarFeedback.textContent = 'Avatar updated successfully!';
        updateAvatarForm.style.display = 'none';
      } catch (error) {
        avatarFeedback.classList.add('text-red-500');
        avatarFeedback.textContent =
          'Failed to update avatar. Please try again.';
      }
    });

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
      const bioFeedback = document.getElementById('bio-feedback');
      bioFeedback.textContent = ''; // clear previous

      if (!newBioText) {
        bioFeedback.textContent = 'Please enter bio text.';
        return;
      }

      try {
        await updateBio(name, newBioText);
        profileBio.innerHTML = `Bio: <b>${newBioText}</b>`;
        bioFeedback.classList.remove('text-red-500');
        bioFeedback.classList.add('text-green-600');
        bioFeedback.textContent = 'Bio updated successfully!';
        updateBioForm.style.display = 'none';
      } catch (error) {
        bioFeedback.classList.add('text-red-500');
        bioFeedback.textContent = 'Failed to update bio. Please try again.';
      }
    });
  } catch (error) {
    profileContainer.innerHTML = `<p class="text-red-500">Error loading profile: ${error.message}</p>`;
  }
});

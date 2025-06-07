# Auction Website - BidBuddy

![Demo](./assets/images/bbgifreadme.gif)

## Description 🖊️

Welcome to this repo! This is **BidBuddy**; a dynamic and user-friendly auction platform where users can **list**, **bid**, and **manage listings** seamlessly. Whether you're buying vintage treasures or selling valuable collectibles, BidBuddy ensures a smooth and engaging experience. As for now, users have to register with a @stud.noroff.no mail and will be given 1000 "credits" they can use to bid with. So no real payments... Yet ;) **View and test out the website for yourself on https://js2-sp-auction-website.vercel.app/**

This project uses **HTML**, **CSS (Tailwind)**, and **JavaScript** with modular code architecture and API interactions.

---

## Improvements and updates 🆕

June 2025: New hero banner based on screen size/if logged in. Explore page added with filtered "hot" listings and "Ending soon". Annoying alerts removed. Logged in button in nav fixed (now not showing in nav if not logged in). Pagination added. Small css improvements.

## Table of Contents 📋

1. [Features](#features)
2. [Folder Structure](#folder-structure)
3. [Technologies Used](#technologies-used)
4. [Setup & Installation](#setup--installation)
5. [Usage](#usage)
6. [API Integration](#api-integration)
7. [Credits](#credits)

---

## Features 🌟

- **User Authentication**: Register and log in securely.
- **Create Listings**: Add products with title, description, multiple images and ending-dates.
- **Bid on Listings**: View detailed information about listings, place bid and track/see whos bidding on active listings.
- **Manage Profile**: Update avatar, bio, see your created listings (active and ended) and the listings you have bid on (active, won, lost). Your listings shows up under tabs.
- **Dynamic Search**: Search for listings.
- **Responsive Design**: Fully functional on all devices over 360px. Hero banner changes based on size and if logged in.
- **Edit/Delete Listings**: Edit your listings (title, description, images) and/or delete.
- **Filtered listings on explore page**: View "hot" and "ending soon" listings on explore page.
- **Pagination**: Pagination on homepage and explore page.

---

## Technologies Used 🪄

- **Frontend**: HTML, Tailwind CSS, JavaScript (ES6+)
- **API**: Noroff API for managing auction data
- **Bundler**: Vite.js
- **Version Control**: Git and GitHub

---

## Setup & Installation 🔌

#### Clone the Repository

```bash
git clone https://github.com/yourusername/auction-website.git

cd auction-website

npm install

npm run dev

npm run build

Access the website at: http://localhost:3000

```

## Folder Structure 📂

Below is an overview of the project directory:

```plaintext
📦 Project Root
├── assets
│   ├── images/          # Static images and icons
│   ├── dist/            # Compiled CSS and JavaScript
│
├── pages/               # HTML pages
│   ├── create-listing.html
│   ├── edit-delete.html
│   ├── listing-details.html
│   ├── login-register.html
├── ├── explore.html
│   ├── profile.html
│   └── index.html       # Homepage
│
├── src/
│   ├── css/             # Tailwind CSS files
│   ├── js/
│   │   ├── api/         # API interaction modules
│   │   ├── components/  # UI components
│   │   ├── views/       # Page-specific JavaScript logic
│   │   └── utilities/   # Helper functions
│
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration for bundling
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## Usage 💡

### User Log in:

- Navigate to Login/Register.
- Fill in your @stud.noroff.no email and password.

### User Registration:

- Navigate to Login/Register.
- Fill in your credentials and optionally upload an avatar URL.

### Creating Listings:

- Go to Create Listing.
- Add title, description, media URLs, Alt text and set an end date for the listing.

### Bidding:

- See a detailed view of the listing by for example clicking "View listing"-button on a listing on the homepage. On the listing detail page you can place a bid.
- Place bids higher than the current highest bid. You can see what the highest bid is.
- List of bidders will show up below.

### Profile Management:

- Access your Profile to update avatar, bio, and view all your listings, bids and credits.

### Edit/Delete Listings:

- On profile page, press Edit/delete-button to navigate to Edit-delete page where you can update or remove your posts. When clicking Edit-button, a pop up form will show with the listings pre-filled title, description and images. Delete button will ask you "are you sure" before it will be deleted and removed.

---

## API Integration 🤖

- The website communicates with the Noroff Auction API for:

- Authentication: User login and registration.

- CRUD Operations: Create, edit, delete, and fetch listings.

- Bidding: Place and track user bids.

- Profile Management: Manage user data such as bio and avatar.

- API Base URL: https://v2.api.noroff.dev/auction

## Credits 👍

#### Author: Line Svensen

#### Tools: Tailwind CSS, Vite, FontAwesome

#### API: Noroff Auction API

---

## License ©️

This project is licensed under the MIT License.

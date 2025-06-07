import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        createListing: path.resolve(__dirname, 'pages/create-listing.html'),
        listingDetails: path.resolve(__dirname, 'pages/listing-details.html'),
        loginRegister: path.resolve(__dirname, 'pages/login-register.html'),
        profile: path.resolve(__dirname, 'pages/profile.html'),
        editDelete: path.resolve(__dirname, 'pages/edit-delete.html'),
        explore: path.resolve(__dirname, 'pages/explore.html'),
        navbar: path.resolve(__dirname, 'pages/navbar.html'),
      },
    },
  },
});

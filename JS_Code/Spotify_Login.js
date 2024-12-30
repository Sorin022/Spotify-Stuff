const clientId = 'cc1a06dbd5944825803ef395fadc5bbd';
const redirectUri = 'https://open.spotify.com/'; // Adjust this to your app's redirect URI
const scopes = 'user-library-modify';

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Redirect the user to Spotify login
const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes)}&response_type=token`;

console.log("Log in at this URL: ", loginUrl);
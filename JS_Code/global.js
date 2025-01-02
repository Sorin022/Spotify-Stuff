const clientId = 'cc1a06dbd5944825803ef395fadc5bbd';
const redirectUri = 'https://sorin022.github.io/Spotify-Stuff/'; // Your app’s public URL
const scopes = 'user-library-modify playlist-read-private';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&response_type=token&scope=${encodeURIComponent(scopes)}`;
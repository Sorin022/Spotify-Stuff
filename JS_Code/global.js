let clientId = 'cc1a06dbd5944825803ef395fadc5bbd'; //needed for the developer account
let redirectUri = 'https://sorin022.github.io/Spotify-Stuff/'; // public url
let scopes = 'user-library-modify playlist-read-private'; //needed to tell what spotify api's are going to be used
let authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&response_type=token&scope=${encodeURIComponent(scopes)}`; //redirect url for the loging and such
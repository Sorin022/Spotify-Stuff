const clientId = 'cc1a06dbd5944825803ef395fadc5bbd'; //needed for the developer account
const redirectUri = 'https://sorin022.github.io/Spotify-Stuff/'; // public url
const scopes = 'user-library-modify playlist-read-private'; //needed to tell what spotify api's are going to be used
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&response_type=token&scope=${encodeURIComponent(scopes)}`; //redirect url for the loging and such
const access_token = null; //access token of the user
const songs_to_add = null; //the list of songs to add
let xml_file = null;
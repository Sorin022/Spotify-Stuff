// Function to handle login
function customer_login() {
    window.location.href = authUrl; // Redirect the user to Spotify login
}

// Function to extract the access token from URL after redirect
const getTokenFromUrl = () => {
    let hash = window.location.hash;
    let params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
};

// Run this function when the page loads to check for a token
window.onload = function () {
    access_token = getTokenFromUrl(); // Get the token after redirection

    if (access_token) {
        console.log("Access Token:", access_token); // Check if token exists
        //fetchSpotifyData();
    } else {
        console.log("No access token found. Please log in.");
    }
};

// Function to make API request
function fetchSpotifyData() {
    fetch('https://api.spotify.com/v1/me/tracks', { 
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: ['4A65rF6f8pCaAvYqgcfaWN'] }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Song added successfully!');
        } else {
            console.error('Failed to add song:', response.statusText);
        }
    })
    .catch(console.error);
}
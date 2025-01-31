function customer_login() {
    window.location.href = authUrl; // Redirects user to Spotify login
}

function getTokenFromUrl() {
    let hash = window.location.hash; //the url
    let params = new URLSearchParams(hash.substring(1)); //looking for the hash
    return params.get('access_token'); //returns the spotify token
}

// Check for the token when the page loads
window.onload = function () {
    access_token = getTokenFromUrl(); // Get the token after redirect

    if (access_token) {
        console.log("Access Token:", access_token); // Successfully retrieved token
        fetchSpotifyData(); // Call function to use the token
    } else {
        console.log("No access token found. Please log in.");
    }
};

// Function to make API request
function fetchSpotifyData() {
    fetch('https://api.spotify.com/v1/me/tracks', { 
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${access_token}`, // Use correct variable
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
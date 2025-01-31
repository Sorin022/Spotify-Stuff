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
    } else {
        console.log("No access token found. Please log in."); //Did not get token
    }
};
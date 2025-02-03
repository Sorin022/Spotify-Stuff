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
    } else {
        console.log("No access token found. Please log in."); //Output if the token was not found
    }
};
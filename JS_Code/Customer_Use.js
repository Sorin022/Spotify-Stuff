// Function to handle login
function customer_login(current_location) {
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        current_location
    )}&response_type=token&scope=${encodeURIComponent(scopes)}`; // Redirect the user to Spotify login
}

// Function to extract the access token from URL after redirect
const getTokenFromUrl = () => {
    let hash = window.location.hash;
    let params = new URLSearchParams(hash.substring(1));
    return params.get('access_token');
};

// Run this function when the page loads to check for a token
window.onload = function () {
    const token = getTokenFromUrl();
    if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("token_expiry", Date.now() + 3600 * 1000); // Store expiry time (1 hour)

        window.history.replaceState({}, document.title, window.location.pathname); // Clean URL

        XML_SpotifySong(); // Run the function to process XML songs
    } else {
        console.log("No access token found. Please log in.");
    }
};
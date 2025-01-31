let check = 0;

function customer_login() {
    window.location.href = authUrl; // Redirects user to Spotify login
}

function getTokenFromUrl() {
    let hash = window.location.hash; //the url
    let params = new URLSearchParams(hash.substring(1)); //looking for the hash
    return params.get('access_token'); //returns the spotify token
}

// Check for the token when the page loads
//* this needs to be something better to let the timing work out better
window.onload = function () {
    XML_SpotifySong();

    if(check == 0){ // only does it on the second load
        check = 1;
    }else{ //resets it
        check = 0;
        access_token = getTokenFromUrl(); // Get the token after redirect
        console.log("Access Token:", access_token); // Successfully retrieved token
    }
};
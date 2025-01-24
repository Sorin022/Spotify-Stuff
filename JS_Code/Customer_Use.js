function customer_login() {
    window.location.href = authUrl; // Redirect the user

    const getTokenFromUrl = () => { // function for getting the token from the spotify login
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        return params.get('access_token');
    };
    
    const accessToken = getTokenFromUrl(); //getting the token and setting the global
    console.log("Access Token: ", accessToken); //output for error checking

    fetch('https://api.spotify.com/v1/me/tracks', {  //puts a song in your liked playlist for the proof of concepts
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: ['4A65rF6f8pCaAvYqgcfaWN'] }),
    })
    .then((response) => {
        if (response.ok) {
        console.log('Song added successfully!');
        } else {
        console.error('Failed to add song:', response.statusText);
        }
    })
    .catch(console.error);
}
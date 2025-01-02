function customer_login() {
    window.location.href = authUrl; // Redirect the user

    const getTokenFromUrl = () => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        return params.get('access_token');
    };
    
    const accessToken = getTokenFromUrl();
    console.log("Access Token: ", accessToken);

    fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'PUT',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: ['3n3Ppam7vgaVa1iaRUc9Lp'] }),
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
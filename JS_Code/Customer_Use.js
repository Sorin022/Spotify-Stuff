function customer_login() {
    window.location.href = authUrl; // Redirect the user

    const getTokenFromUrl = () => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        return params.get('access_token');
    };
    
    const accessToken = getTokenFromUrl();
    console.log("Access Token: ", accessToken);
}
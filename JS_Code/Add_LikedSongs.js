const addTracksToLikedSongs = async (tracks) => {
    const accessToken = 'your_access_token'; // Replace with the token you retrieved earlier
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me/tracks', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: tracks }), // Send track IDs in the body
      });
  
      if (response.ok) {
        console.log('Tracks added to Liked Songs successfully!');
      } else {
        const error = await response.json();
        console.error('Error adding tracks:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  // Example track IDs
  const trackIds = ['3n3Ppam7vgaVa1iaRUc9Lp', '7ouMYWpwJ422jRcDASZB7P'];
  addTracksToLikedSongs(trackIds);
  
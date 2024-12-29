const fetchPlaylistTracks = async (playlistId) => {
    const accessToken = 'your_access_token'; // Replace with the token you retrieved earlier
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const trackIds = data.items.map((item) => item.track.id);
        console.log('Fetched track IDs:', trackIds);
        return trackIds;
      } else {
        const error = await response.json();
        console.error('Error fetching tracks:', error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  
  // Fetch tracks and add them to Liked Songs
  const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; // Replace with your playlist ID
  fetchPlaylistTracks(playlistId).then((trackIds) => {
    if (trackIds) {
      addTracksToLikedSongs(trackIds);
    }
  });
  
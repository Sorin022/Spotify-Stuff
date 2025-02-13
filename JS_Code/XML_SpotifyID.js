async function XML_SpotifySong() {
    const xml = sessionStorage.getItem("xml_file");

    if (!xml) {
        console.error("No XML data found in sessionStorage.");
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");

    const keys = xmlDoc.getElementsByTagName("key");
    let tracksDict = null;

    for (let key of keys) {
        if (key.textContent === "Tracks") {
            tracksDict = key.nextElementSibling;
            break;
        }
    }

    if (!tracksDict || tracksDict.tagName !== "dict") {
        console.error("Tracks dictionary not found.");
        return;
    }

    let songList = [];

    const trackEntries = tracksDict.children;
    for (let i = 0; i < trackEntries.length; i++) {
        if (trackEntries[i].tagName === "key") {
            const trackDict = trackEntries[i].nextElementSibling;
            if (trackDict && trackDict.tagName === "dict") {
                let name = "Unknown",
                    artist = "Unknown",
                    album = "Unknown";

                for (let j = 0; j < trackDict.children.length; j++) {
                    const keyElement = trackDict.children[j];
                    const valueElement = keyElement.nextElementSibling;

                    if (keyElement.tagName === "key" && valueElement) {
                        switch (keyElement.textContent) {
                            case "Name":
                                name = valueElement.textContent;
                                break;
                            case "Artist":
                                artist = valueElement.textContent;
                                break;
                            case "Album":
                                album = valueElement.textContent;
                                break;
                        }
                    }
                }

                if (name !== "Unknown" && artist !== "Unknown" && album !== "Unknown") {
                    songList.push({ name, artist, album });
                }
            }
        }
    }

    console.log("Extracted Songs:", songList);
    await createPlaylistAndAddSongs(songList);
}

async function createPlaylistAndAddSongs(songList) {
    let access_token = sessionStorage.getItem("token");

    try {
        // 1. Get User ID
        let userResponse = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        let userData = await userResponse.json();
        let userId = userData.id;
        console.log("User ID:", userId);

        // 2. Create Playlist
        let playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Imported Songs",
                description: "A playlist for imported songs",
                public: false, // Set to true if you want it public
            }),
        });

        let playlistData = await playlistResponse.json();
        let playlistId = playlistData.id;
        console.log("Playlist Created:", playlistData.name);

        // 3. Search for Tracks and Add to Playlist
        let trackUris = [];

        for (let song of songList) {
            let query = `track:${song.name} album:${song.album} artist:${song.artist}`;
            let encodedQuery = encodeURIComponent(query);

            let searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            let searchData = await searchResponse.json();

            if (searchData.tracks.items.length > 0) {
                let trackId = searchData.tracks.items[0].id;
                trackUris.push(`spotify:track:${trackId}`);
                console.log(`Found: ${song.name} - ${song.artist}`);
            } else {
                console.log(`Not Found: ${song.name} - ${song.artist}`);
            }
        }

        // 4. Add All Found Tracks to Playlist
        if (trackUris.length > 0) {
            let addTrackResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uris: trackUris, // List of track URIs
                }),
            });

            if (addTrackResponse.ok) {
                console.log("Songs added to playlist successfully!");
            } else {
                console.error("Failed to add songs:", addTrackResponse.statusText);
            }
        } else {
            console.log("No valid songs found to add.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

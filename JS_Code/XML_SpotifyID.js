//can not find the song since the name is just Flashing Lights and not Flashing Lights (feat. XXXXXXXX)

async function XML_SpotifySong() {
    const xml = sessionStorage.getItem("xml_file"); //variable for the xml data pulling from session storage
    const adding_song_html = document.getElementById("add_songs_table"); //table to add the artist, songs, and ablums too
    const logging_list = document.getElementById("logging_list"); //for the logging html 

    if (!xml) {
        //error messager if there is no xml data
        logging_list.innerHTML = logging_list.innerHTML + "<li>ERROR: No XML data found in sessionStorage.</li>"
        return;
    }

    //creates a parser for the xml file this parser will find the albumn, artist name, and song
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml"); //changing the xml file from session storage to a more maluable version

    const keys = xmlDoc.getElementsByTagName("key");
    let tracksDict = null;

    for (let key of keys) {
        if (key.textContent === "Tracks") {
            tracksDict = key.nextElementSibling;
            break;
        }
    }

    if (!tracksDict || tracksDict.tagName !== "dict") {
        logging_list.innerHTML = logging_list.innerHTML + "<li>ERROR: Tracks dictionary not found</li>"
        return;
    }

    //list of all the songs when they are found and such
    let songList = [];

    const trackEntries = tracksDict.children;
    for (let i = 0; i < trackEntries.length; i++) {
        if (trackEntries[i].tagName === "key") {
            const trackDict = trackEntries[i].nextElementSibling;
            if (trackDict && trackDict.tagName === "dict") {
                //default values for the name artist and album to check with
                let name = "Unknown",
                    artist = "Unknown",
                    album = "Unknown";

                for (let j = 0; j < trackDict.children.length; j++) {
                    const keyElement = trackDict.children[j];
                    const valueElement = keyElement.nextElementSibling;

                    if (keyElement.tagName === "key" && valueElement) {
                        switch (keyElement.textContent) {
                            case "Name": //song name 
                                name = valueElement.textContent;
                                break;
                            case "Artist": //artist on the song in the xml file
                                artist = valueElement.textContent;
                                break;
                            case "Album": //album of the song with that artist
                                album = valueElement.textContent;
                                break;
                        }
                    }
                }

                //if any of the value have not been changed from the default then do not added
                //also cancels out the double ups
                if (name !== "Unknown" && artist !== "Unknown" && album !== "Unknown") { 
                    songList.push({ name, artist, album });

                    adding_song_html.innerHTML = adding_song_html.innerHTML + "<tr><td>" + name + "</td>" + "<td>" + artist + "</td>" + "<td>" + album + "</td>"
                }
            }
        }
    }

    //console.log("Extracted Songs:", songList);
    await createPlaylistAndAddSongs(songList);
}

async function createPlaylistAndAddSongs(songList) {
    const logging_list = document.getElementById("logging_list"); //for the logging html
    let accessToken = sessionStorage.getItem("token");

    //this does work uses the access token and is happy
    // 1. Get User ID
    let userResponse = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    let userData = await userResponse.json();
    let userId = userData.id;

    //why does it break when it comes to this access token
    //seems to be that this is a post and not a get
    // 2. Create Playlist
    let playlistResponse = await fetch(`https://api.spotify.com/v1/users/` + userId + `/playlists`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
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
    logging_list.innerHTML = logging_list.innerHTML + "<li>" + "Playlist Created:" + playlistData.name + "</li>";

    // 3. Search for Tracks and Add to Playlist
    let trackUris = [];

    for (let song of songList) {
        let query = `track:${song.name} album:${song.album} artist:${song.artist}`;
        let encodedQuery = encodeURIComponent(query);

        let searchResponse = await fetch(`https://api.spotify.com/v1/search?q=` + encodedQuery + `&type=track&limit=1`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        let searchData = await searchResponse.json();

        if (searchData.tracks.items.length > 0) {
            let trackId = searchData.tracks.items[0].id;
            trackUris.push(`spotify:track:${trackId}`);
            logging_list.innerHTML = logging_list.innerHTML + "<li>" + `Found: ${song.name} - ${song.artist}` + "</li>";
        } else {
            logging_list.innerHTML = logging_list.innerHTML + "<li>" + `Not Found: ${song.name} - ${song.artist}` + "</li>";
        }
    }

    // 4. Add All Found Tracks to Playlist
    if (trackUris.length > 0) {
        let addTrackResponse = await fetch(`https://api.spotify.com/v1/playlists/` +  playlistId + `/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: trackUris, // List of track URIs
            }),
        });

        if (addTrackResponse.ok) {
            logging_list.innerHTML = logging_list.innerHTML + "<li>Songs added to playlist successfully!</li>";
        } else {
            logging_list.innerHTML = logging_list.innerHTML + "<li>Failed to add songs:" + addTrackResponse.statusText + "</li>";
        }
    } else {
        console.log("No valid songs found to add.");
    }

}

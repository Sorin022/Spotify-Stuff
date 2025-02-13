function XML_SpotifySong() {
    const xml = sessionStorage.getItem("xml_file");
    console.log(xml);

    if (!xml) {
        console.error("No XML data found in sessionStorage.");
        return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "application/xml");

    // Find all <key> elements and locate the one with text "Tracks"
    const keys = xmlDoc.getElementsByTagName("key");
    let tracksDict = null;

    for (let key of keys) {
        if (key.textContent === "Tracks") {
            // The <dict> element follows the <key>
            tracksDict = key.nextElementSibling;
            break;
        }
    }

    if (!tracksDict || tracksDict.tagName !== "dict") {
        console.error("Tracks dictionary not found.");
        return;
    }

    // Iterate through <dict> children (which should be key-value pairs)
    const trackEntries = tracksDict.children;
    for (let i = 0; i < trackEntries.length; i++) {
        if (trackEntries[i].tagName === "key") {
            const trackDict = trackEntries[i].nextElementSibling;
            if (trackDict && trackDict.tagName === "dict") {
                let name = "Unknown",
                    artist = "Unknown",
                    album = "Unknown";

                // Process each key-value pair inside the track <dict>
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

                console.log(`Name: ${name}`);
                console.log(`Artist: ${artist}`);
                console.log(`Album: ${album}`);
            }
        }
    }
}

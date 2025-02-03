function XML_SpotifySong() { //where the data will be processed into objects
    const xml = sessionStorage.getItem("xml_file");

    console.log(xml);

    //all by chatgbt a special xml parser
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(xml_file, "application/xml");

    // Get all <dict> elements inside <Tracks>
    const trackDicts = xmlDoc.querySelector("key:contains('Tracks') + dict").children;

    for (let i = 0; i < trackDicts.length; i++) {
        const track = trackDicts[i].querySelector("dict");
        if (track) {
            const name = track.querySelector("key:contains('Name') + string")?.textContent || "Unknown";
            const artist = track.querySelector("key:contains('Artist') + string")?.textContent || "Unknown";
            const album = track.querySelector("key:contains('Album') + string")?.textContent || "Unknown";

            console.log(`Name: ${name}`);
            console.log(`Artist: ${artist}`);
            console.log(`Album: ${album}`);
        }
    }
}
function XML_SpotifySong() { //where the data will be processed into objects
    //regular expression generated from chatgbt
    const match = xml_file.match(/<key>Name<\/key>\s*<string>(?<name>.*?)<\/string>.*?<key>Artist<\/key>\s*<string>(?<artist>.*?)<\/string>.*?<key>Album<\/key>\s*<string>(?<album>.*?)<\/string>/s);
    
    if (match) {
        console.log("Name:", match.groups.name);
        console.log("Artist:", match.groups.artist);
        console.log("Album:", match.groups.album);
    }
}
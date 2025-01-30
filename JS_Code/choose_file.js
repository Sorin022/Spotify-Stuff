function choose_file(){
    let test = null;
    const fileInput = document.getElementById('fileInput');
    const fileContent = document.getElementById('fileContent');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/xml') {
            const reader = new FileReader();
            reader.onload = function(e) {
                xml_file = e.target.result;
                fileContent.textContent = xml_file;
                console.log("File content assigned:", xml_file);
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid .xml file.');
        }
    });
}
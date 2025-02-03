function choose_file(){
    const fileInput = document.getElementById('fileInput');
    const fileContent = document.getElementById('fileContent');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'text/xml') { //checks the input to see if the file is actually xml or not
            const reader = new FileReader(); //makes the new file reader
            reader.onload = function(e) {
                sessionStorage.setItem("xml_file", e.target.result); //session storage to use
                fileContent.textContent = e.target.result; //used for the file output
                console.log("File content assigned:", e.target.result); //debugging to make sure
            };
            reader.readAsText(file); //actually sets the file
        } else {
            alert('Please upload a valid .xml file.'); //error if the choosen file is not xml
        }
    });
}
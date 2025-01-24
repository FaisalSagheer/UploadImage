document.addEventListener('DOMContentLoaded', () => {
    // Get the image URL from localStorage
    const url = localStorage.getItem('Recent-Photo');

    // Display the existing image if it exists
    let img = document.getElementById('displayImg');
    if (!img) {
        // Create the image element dynamically if it doesn't exist
        img = document.createElement('img');
        img.id = 'displayImg';
        img.className = 'size-86 shadow-xl rounded-md mt-4';
        document.body.appendChild(img); // Append the image to the body or a specific container
    }

    if (url) {
        img.src = url; // Set the image source from localStorage
    }

    // Handle file input change
    const fileInput = document.getElementById('photos');
    if(fileInput){
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newUrl = e.target.result; // Get the data URL of the uploaded image
                img.src = newUrl; // Update the image source
                localStorage.setItem('Recent-Photo', newUrl); // Save the new image to localStorage
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });
}

});

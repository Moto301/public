document.getElementById('rmaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    // Convert formData to a JSON object
    const jsonData = Object.fromEntries(formData.entries());

    // Post data to Netlify Function (to be implemented)
    fetch('/.netlify/functions/processRMA', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle response
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

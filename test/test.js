const API_BASE_URL = 'https://node-express-902v.onrender.com/trip';
const responseDiv = document.getElementById('response');

// Helper function to display response
function displayResponse(data) {
    responseDiv.textContent = JSON.stringify(data, null, 2);
}


// Get All Trips
document.getElementById('getAllTrips').addEventListener('click', async () => {
    try {
        const response = await fetch(API_BASE_URL, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFqLk0iLCJpYXQiOjE3NTk1NzA2MjgsImV4cCI6MTc2MjE2MjYyOCwiaXNzIjoiQ1MtTVNVIn0.bWPD2IC1C0fsjR_7vr0bfqfUMLt6XFOK2mTjMBHUfCU`,
          },
        });
        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        displayResponse({ error: error.message });
    }
});

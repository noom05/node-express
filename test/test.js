const API_BASE_URL = 'http://localhost:3000/users'; // ใช้ http ถ้า backend ไม่ได้ทำ https
const responseDiv = document.getElementById('response');

function displayResponse(data) {
  responseDiv.textContent = JSON.stringify(data, null, 2);
}

document.getElementById('getAllUsers').addEventListener('click', async () => {
  try {
    console.log('fetching', API_BASE_URL);
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // ✅ parse JSON โดยตรง
    console.log('parsed data:', data);
    displayResponse(data);
  } catch (err) {
    console.error('fetch error', err);
    displayResponse({ error: err.message });
  }
});

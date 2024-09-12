document.addEventListener('DOMContentLoaded', function() {
    const detailsDiv = document.getElementById('fundraiser-details'); // 用于展示详情的div

    const params = new URLSearchParams(window.location.search);
    const fundraiserId = params.get('id');

    if (!fundraiserId) {
        detailsDiv.innerHTML = '<p style="color: red;">Fundraiser ID is missing in the URL.</p>';
        return;
    }

    fetch(`http://localhost:3000/api/fundraisers/${fundraiserId}`)
    .then(response => response.json())
    .then(data => {
        detailsDiv.innerHTML = `<h1>${data.CAPTION}</h1><p>Organizer: ${data.ORGANIZER}</p><p>Category: ${data.CATEGORY_NAME}</p><p>Target Fund: ${data.TARGET_fund}</p><p>Current Fund: ${data.CURRENT_fund}</p><button onclick="alert('This feature is under construction')">Donate</button>`;
    })
    .catch(error => {
        console.error('Error:', error);
        detailsDiv.innerHTML = '<p style="color: red;">Error loading fundraiser details.</p>';
    });
});
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/api/fundraisers/active')
    .then(response => response.json())
    .then(data => {
      const fundraisersContainer = document.getElementById('active-fundraisers');
      data.forEach(fundraiser => {
        const fundraiserElement = document.createElement('div');
        fundraiserElement.className = 'fundraiser';
        fundraiserElement.innerHTML = `
          <div class="col">
            <div class="card mb-3">
              <div class="card-header">
              <div class="mt-2">
                <img src="./images/树.jpg" class="rounded-circle" width="30" height="30" alt="">
                <span class="ms-2">${fundraiser.ORGANIZER}</span>
              </div>
                <h2>${fundraiser.CAPTION}</h2>
              </div>
              <div class="card-body">
                <p>Organizer: ${fundraiser.ORGANIZER}</p>
                <p>Target Fund: ${fundraiser.TARGET_fund}</p>
                <p>Current Fund: ${fundraiser.CURRENT_fund}</p>
                <p>City: ${fundraiser.CITY}</p>
                <p>Event:${fundraiser.EVENT}</P>
                <p>Status: ${fundraiser.IS_ACTIVE ? 'Active' : 'Suspended'}</p>
                <p>Category: ${fundraiser.CATEGORY_ID}</p> 
              </div>
              <div class="card-footer"  >
                <a href="details.html?id=${fundraiser.FUNDRAISE_ID}">View Details</a>
              </div>
            </div>
          </div>
          `;
        fundraisersContainer.appendChild(fundraiserElement);
      });
    })
    .catch(error => console.error('Error:', error));
});
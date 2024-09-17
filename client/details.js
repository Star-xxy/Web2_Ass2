document.addEventListener('DOMContentLoaded', function () {
    const detailsDiv = document.getElementById('fundraiser-details'); // div for displaying details

    const params = new URLSearchParams(window.location.search);
    const fundraiserId = params.get('id');

    if (!fundraiserId) {
        detailsDiv.innerHTML = '<p style="color: red;">Fundraiser ID is missing in the URL.</p>';
        return;
    }

    fetch(`http://localhost:3000/api/fundraisers/${fundraiserId}`)
        .then(response => response.json())
        .then(data => {
            detailsDiv.innerHTML = `
        <div class="container">
          <div class="row row-cols-4">
            <div class="col-10 ">
              <h1>${data.CAPTION}</h1>
            </div>
            <div class="col-8"></div>
              <div class="col-2">
              <img src="./images/树.jpg" class="rounded-circle" width="30" height="30" alt="">
              <span class="ms-2">${data.ORGANIZER}</span>
              </div>          
            </div>
          </div>
        <hr>
        <div class="row row-cols-4">
          <div class="col-8">
          <p>${data.EVENT}</P>
            <hr>
            <div class="text-center">
              <button class="btn btn-primary"  onclick="alert('This feature is under construction')">Donate</button>
            </div>
          </div>
          <div class="col-4">
            <div class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">About</div>
              <div class="card-body">
                <h5 class="card-title">Organizer: ${data.ORGANIZER}</h5>
                <p>Category: ${data.CATEGORY_NAME}</p>
                <p>Target Fund: ${data.TARGET_fund}</p>
                <p>Current Fund: ${data.CURRENT_fund}</p>
                <p>City: ${data.CITY}</p>
              </div>
            </div>
          </div>
        </div>
    
      </div>
        `;
        })
        .catch(error => {
            console.error('Error:', error);
            detailsDiv.innerHTML = '<p style="color: red;">Error loading fundraiser details.</p>';
        });
});
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/api/fundraisers/active')
    .then(response => response.json())
    .then(data => {
      const fundraisersContainer = document.getElementById('active-fundraisers');
      let currentRow = document.createElement('tr'); // Createcurrent row

      data.forEach((fundraiser, index) => {
        const fundraiserElement = document.createElement('td');
        fundraiserElement.style.width = "33.33%";
        fundraiserElement.innerHTML = `
          <div>
              <img src="./images/树.jpg"  style="height: 30px;width: 30px;">
              <span>${fundraiser.ORGANIZER}</span>
          </div>
          <h2>${fundraiser.CAPTION}</h2>
          <div>
              <p>Organizer: ${fundraiser.ORGANIZER}</p>
              <p>Target Fund: ${fundraiser.TARGET_fund}</p>
              <p>Current Fund: ${fundraiser.CURRENT_fund}</p>
              <p>City: ${fundraiser.CITY}</p>
              <p>Event: ${fundraiser.EVENT}</p>
              <p>Status: ${fundraiser.IS_ACTIVE ? 'Active' : 'Suspended'}</p>
              <p>Category: ${fundraiser.CATEGORY_ID}</p>
          </div>
          <div style="text-align: right;">
              <a href="details.html?id=${fundraiser.FUNDRAISE_ID}">View Details</a>
          </div>
        `;

        currentRow.appendChild(fundraiserElement);

      //End the current row every three columns and create a new row
        if ((index + 1) % 3 === 0) {
          fundraisersContainer.appendChild(currentRow);
          currentRow = document.createElement('tr'); // Create new row
        }
      });

      //If the last row is less than three columns, it should also be added to the container
      if (currentRow.children.length > 0) {
        fundraisersContainer.appendChild(currentRow);
      }
    })
    .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/api/fundraisers/active') // 修改为你的API端点
      .then(response => response.json())
      .then(data => {
        const fundraisersContainer = document.getElementById('active-fundraisers');
        data.forEach(fundraiser => {
          const fundraiserElement = document.createElement('div');
          fundraiserElement.className = 'fundraiser';
          fundraiserElement.innerHTML = `
            <h2>${fundraiser.CAPTION}</h2>
            <p>Organizer: ${fundraiser.ORGANIZER}</p>
            <p>Target Fund: ${fundraiser.TARGET_fund}</p>
            <p>Current Fund: ${fundraiser.CURRENT_fund}</p>
            <p>City: ${fundraiser.CITY}</p>
            <p>Event:${fundraiser.EVENT}</P>
            <p>Status: ${fundraiser.IS_ACTIVE ? 'Active' : 'Suspended'}</p>
            <p>Category: ${fundraiser.CATEGORY_ID}</p> 
            <a href="details.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
          `;
          fundraisersContainer.appendChild(fundraiserElement);
        });
      })
      .catch(error => console.error('Error:', error));
  });
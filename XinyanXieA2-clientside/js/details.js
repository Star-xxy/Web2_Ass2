document.addEventListener('DOMContentLoaded', function () {
  const detailsDiv = document.getElementById('fundraiser-details'); // Showing the details's div

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
        <table style="width:100%;" >
          <tr >
            <td colspan=3 >
              <h1>${data.CAPTION}</h1>
            </td>
             <td></td>        
            </tr>
            <tr>
            <td colspan=3></td>
            <td >
            <img src="./images/树.jpg"  width="30" height="30" alt="">
            <span >${data.ORGANIZER}</span>
            </td> 
          </tr>
          <hr>
          <tr style="vertical-align: top;text-align: left;" >
            <td colspan=3  >
              <p>${data.EVENT}</P>
              <hr>
              <div >
                <button  onclick="alert('This feature is under construction')">Donate</button>
              </div>
            </td>
            <td  >
              <table border>
              <thead>
                <tr>
                  <th>About:</th>
                </tr>
              </thead>
                <tbody>
                <tr>
                <td>Organizer: ${data.ORGANIZER}</td>
                </tr>
                <tr>
                    <td>Category: ${data.CATEGORY_NAME}</td>
                </tr>
                <tr>
                    <td>Target Fund: ${data.TARGET_fund}</td>
                </tr>
                <tr>
                    <td>Current Fund: ${data.CURRENT_fund}</td>
                </tr>
                <tr>
                    <td>City: ${data.CITY}</td>
                </tr>
                </tbody>
                
              </table>
            </td>
          </tr>
      </table>
        `;
    })
    .catch(error => {
      console.error('Error:', error);
      detailsDiv.innerHTML = '<p style="color: red;">Error loading fundraiser details.</p>';
    });
});
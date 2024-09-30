document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const resultsDiv = document.getElementById('search-results');

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault(); //Block default form submission behavior
        const formData = new FormData(searchForm);
        const searchParams = new URLSearchParams();

        //Traverse form data and construct query parameters
        for (const pair of formData.entries()) {
            if (pair[1].trim() !== '') {
                searchParams.append(pair[0], pair[1]);
            }
        }

        //Check if there are any query criteria
        if (searchParams.toString().trim() === '') {
            alert('Please select at least one search criterion.');
            return;
        }
        //Initiate a search request
        fetch(`http://localhost:3000/api/fundraisers/search?${searchParams}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = ''; //Clear previous search results
                if (data.length === 0) {
                    resultsDiv.innerHTML = '<p style="color: red;font-weight:bold" >No fundraisers are found.</p>';
                } else {
                    let currentRow = document.createElement('tr');
                    //Display search results
                    data.forEach((fundraiser,index) => {
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
                            resultsDiv.appendChild(currentRow);
                            currentRow = document.createElement('tr'); //Create a new row
                        }
                    });
                    //If the last row is less than three columns, it should also be added to the container
                    if (currentRow.children.length > 0) {
                        resultsDiv.appendChild(currentRow);
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    });

    fetchAndDisplayFundraisers('http://localhost:3000/api/fundraisers/active');

});

//Function: Dynamically add/remove search boxes based on the selected status of the checkbox
function toggleSearchFields() {
    const container = document.getElementById('search-fields-container');
    const cityCheckbox = document.getElementById('city-checkbox');
    const organizerCheckbox = document.getElementById('organizer-checkbox');
    const categoryCheckbox = document.getElementById('category-checkbox');

    //Clear previous content
    container.innerHTML = '';

    //If the City checkbox is selected, add a City search box
    if (cityCheckbox.checked) {
        const cityField = document.createElement('div');
        cityField.innerHTML = `
          <div >
            <label for="city">City:</label>
            <input type="text" id="city" name="city" placeholder="Enter City">
          </div>
        `;
        container.appendChild(cityField);
    }

    //If the Organizer checkbox is selected, add an Organizer search box
    if (organizerCheckbox.checked) {
        const organizerField = document.createElement('div');
        organizerField.innerHTML = `
          <div >
            <label for="organizer">Organizer:</label>
            <input type="text" id="organizer" name="organizer" placeholder="Enter Organizer">
          </div>
        `;
        container.appendChild(organizerField);
    }

    //If the Category checkbox is selected, add a Category checkbox
    if (categoryCheckbox.checked) {
        const categoryField = document.createElement('div');
        categoryField.innerHTML = `
          <div >
            <label for="category-select">Category</label>
            <select name="categoryId" id="category-select">
              <option value="">----</option>
            </select>
          </div>
        `;
        container.appendChild(categoryField);
        populateDropdown('category-select', 'http://localhost:3000/api/categories');
    }
    if (container.innerHTML != '') {
        const butField = document.createElement('div');
        butField.innerHTML = `
        <button  type="submit">Search</button>
        `
        container.appendChild(butField);
    }
}

//Clear the checkbox and clear the dynamically added input box
function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    //Empty container
    const container = document.getElementById('search-fields-container');
    container.innerHTML = '';
     //Reset the form (ensuring that the verification logic does not trigger the submit event)）
     const searchForm = document.getElementById('search-form');
     searchForm.reset(); // Reset the form
    fetchAndDisplayFundraisers('http://localhost:3000/api/fundraisers/active');

}

// Function: Retrieve data from API endpoints and fill in dropdown boxes
function populateDropdown(dropdownId, apiUrl) {
    const dropdown = document.getElementById(dropdownId);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dropdown.innerHTML = '<option value="">----</option>'; //Clear dropdown menu

            //Add Category Options
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.CATEGORY_ID;
                option.textContent = item.CATEGORY_ID + ':' + item.NAME;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

//Function: Retrieve fundraising activities from the API and display them
function fetchAndDisplayFundraisers(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const fundraisersContainer = document.getElementById('search-results');
            fundraisersContainer.innerHTML = '';  //Clear previous content
            let currentRow = document.createElement('tr'); //Create current row
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
                    currentRow = document.createElement('tr'); //Create a new row
                }
            });

            //If the last row is less than three columns, it should also be added to the container
            if (currentRow.children.length > 0) {
                fundraisersContainer.appendChild(currentRow);
            }
        })
        .catch(error => console.error('Error fetching fundraisers:', error));
}


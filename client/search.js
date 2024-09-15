document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form'); // 假设你有一个ID为'search-form'的表单
    const resultsDiv = document.getElementById('search-results'); // 用于显示结果的div

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();//Prevents default form submission behavior
        const formData = new FormData(searchForm);
        const searchParams = new URLSearchParams();

        //Iterate over the form data and construct the query parameters
        for (const pair of formData.entries()) {
            if (pair[1].trim() !== '') {
                searchParams.append(pair[0], pair[1]);
            }
        }

        //Check whether search conditions exist
        if(searchParams.toString().trim() === '') {
            alert('Please select at least one search criterion.');
            return;
        }

        // Initiate a search request
        fetch(`http://localhost:3000/api/fundraisers/search?${searchParams}`)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = ''; // Clear previous search results
            if (data.length === 0) {
                resultsDiv.innerHTML = '<p style="color: red;">No fundraisers are found.</p>';
            } else {
                //show the rusult of searching
                data.forEach(fundraiser => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                     <div class="col">
                            <div class="card mb-3">
                            <div class="card-header">
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
                    resultsDiv.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error:', error));
    });

   fetchAndDisplayFundraisers('http://localhost:3000/api/fundraisers/active');
    });

    // Function: Dynamically add/remove search boxes according to check box status
function toggleSearchFields() {
    const container = document.getElementById('search-fields-container');
    const cityCheckbox = document.getElementById('city-checkbox');
    const organizerCheckbox = document.getElementById('organizer-checkbox');
    const categoryCheckbox = document.getElementById('category-checkbox');

    // Clear the previous content
    container.innerHTML = '';

    // If the City check box is selected, add the City search box
    if (cityCheckbox.checked) {
        const cityField = document.createElement('div');
        cityField.classList.add('mr-3');
        cityField.innerHTML = `
          <div class="search-field p-2 ">
            <label for="city">City:</label>
            <input type="text" id="city" name="city" placeholder="Enter City">
          </div>
        `;
        container.appendChild(cityField);
    }

    // If the Organizer check box is selected, add the Organizer search box
    if (organizerCheckbox.checked) {
        const organizerField = document.createElement('div');
        organizerField.classList.add('mr-3');
        organizerField.innerHTML = `
          <div class="search-field p-2">
            <label for="organizer">Organizer:</label>
            <input type="text" id="organizer" name="organizer" placeholder="Enter Organizer">
          </div>
        `;
        container.appendChild(organizerField);
    }

    // If the Category check box is selected, add a Category selection box
    if (categoryCheckbox.checked) {
        const categoryField = document.createElement('div');
        categoryField.classList.add('mr-3');
        categoryField.innerHTML = `
          <div class="search-field p-2">
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
        <button  class="btn btn-primary btn-sm mt-1" type="submit">Search</button>
        `
        container.appendChild(butField);
    }
}

// Clear the check boxes and clear the dynamically added input boxes
function clearCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Empty the container
    const container = document.getElementById('search-fields-container');
    container.innerHTML = '';
    fetchAndDisplayFundraisers('http://localhost:3000/api/fundraisers/active');

}

// Function: Get the data from the API endpoint and fill the drop-down box
function populateDropdown(dropdownId, apiUrl) {
    const dropdown = document.getElementById(dropdownId);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dropdown.innerHTML = '<option value="">----</option>'; // Clear the drop-down box

            // Add category options
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.CATEGORY_ID;
                option.textContent = item.CATEGORY_ID + ':' + item.NAME;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function: Get the fundraising campaign from the API and display it
function fetchAndDisplayFundraisers(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const fundraisersContainer = document.getElementById('search-results');
            fundraisersContainer.innerHTML = '';  // Clear the previous content

            data.forEach(fundraiser => {
                const fundraiserElement = document.createElement('div');
                fundraiserElement.className = 'fundraiser';
                fundraiserElement.innerHTML = `
                <div class="col">
                    <div class="card mb-3">
                    <div class="card-header">
                        <h2>${fundraiser.CAPTION}</h2>
                    </div>
                    <div class="card-body">
                        <p>Organizer: ${fundraiser.ORGANIZER}</p>
                        <p>Target Fund: ${fundraiser.TARGET_fund}</p>
                        <p>Current Fund: ${fundraiser.CURRENT_fund}</p>
                        <p>City: ${fundraiser.CITY}</p>
                        <p>Event: ${fundraiser.EVENT}</p>
                        <p>Status: ${fundraiser.IS_ACTIVE ? 'Active' : 'Suspended'}</p>
                        <p>Category: ${fundraiser.CATEGORY_ID}</p>
                    </div>
                    <div class="card-footer">
                        <a href="details.html?id=${fundraiser.FUNDRAISE_ID}">View Details</a>
                    </div>
                    </div>
                </div>
                `;
                fundraisersContainer.appendChild(fundraiserElement);
            });
        })
        .catch(error => console.error('Error fetching fundraisers:', error));
}



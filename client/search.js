document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form'); // 假设你有一个ID为'search-form'的表单
    const resultsDiv = document.getElementById('search-results'); // 用于显示结果的div
    const clearButton = document.getElementById('clear-button'); // 清空按钮

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(searchForm);
        const searchParams = new URLSearchParams();

        for (const pair of formData.entries()) {
            if (pair[1].trim() !== '') {
                searchParams.append(pair[0], pair[1]);
            }
        }

        if(searchParams.toString().trim() === '') {
            alert('Please select at least one search criterion.');
            return;
        }

        fetch(`http://localhost:3000/api/fundraisers/search?${searchParams}`)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = ''; // 清空之前的搜索结果
            if (data.length === 0) {
                resultsDiv.innerHTML = '<p style="color: red;">No fundraisers are found.</p>';
            } else {
                data.forEach(fundraiser => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h2><a href="fundraiser.html?id=${fundraiser.FUNDRAISE_ID}">${fundraiser.CAPTION}</a></h2><p>Organizer: ${fundraiser.ORGANIZER}</p>`;
                    resultsDiv.appendChild(div);
                });
            }
        })
        .catch(error => console.error('Error:', error));
    });

    clearButton.addEventListener('click', function() {
        document.querySelectorAll('#search-form input[type="text"], #search-form select').forEach(input => input.value = '');
    });
});
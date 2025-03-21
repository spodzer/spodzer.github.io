// define the base url for the github api
const API_URL = 'https://api.github.com/users';

// default username to be displayed when the page loads
const DEFAULT_USER = 'spodzer'; 

// function to fetch repositories for a given username
async function fetchRepos(username = DEFAULT_USER) {
    // get the gallery element to display repositories
    const gallery = document.getElementById('gallery');
    
    // show a loading message while fetching data
    gallery.innerHTML = '<p>Loading...</p>';

    try {
        // fetch the repositories for the specified user
        const response = await fetch(`${API_URL}/${username}/repos?per_page=20`);
        
        // throw an error if the response is not ok (e.g., user not found)
        if (!response.ok) {
            throw new Error('User not found or unable to fetch data.');
        }

        // parse the json response
        const repos = await response.json();

        // clear the loading message
        gallery.innerHTML = '';

        // iterate through each repository and create a card for it
        for (const repo of repos) {
            // create a card element
            const card = document.createElement('div');
            card.className = 'card';

            // populate the card with repository details
            card.innerHTML = `
                <h2>${repo.name}</h2>
                <p>${repo.description || 'No description available.'}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
                <p><strong>Languages:</strong> Loading...</p>
                <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> View Repository</a>
            `;

            // fetch the languages for the current repository
            fetchLanguages(repo.languages_url, card);

            // append the card to the gallery
            gallery.appendChild(card);
        }
    } catch (error) {
        // display an error message if something goes wrong
        gallery.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// function to fetch languages used in a repository
async function fetchLanguages(url, card) {
    try {
        // fetch the languages from the provided url
        const response = await fetch(url);
        const languages = await response.json();

        // join the language keys into a readable list or show a fallback message
        const languagesList = Object.keys(languages).join(', ') || 'No languages available';

        // update the card with the list of languages
        card.querySelector('p:nth-of-type(5)').textContent = `Languages: ${languagesList}`;
    } catch {
        // handle errors and show a fallback message
        card.querySelector('p:nth-of-type(5)').textContent = 'Languages: Error loading languages';
    }
}

// event listener to load default user repositories when the page loads
document.addEventListener('DOMContentLoaded', () => fetchRepos());

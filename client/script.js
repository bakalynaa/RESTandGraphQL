const graphqlMovieList = document.getElementById('graphql-movies');
const restMovieList = document.getElementById('rest-movies');
const movieForm = document.getElementById('movie-form');


async function fetchGraphQLMovies() {
    try {

        const selectedFields = Array.from(document.querySelectorAll('#graphql-fields-form input[name="fields"]:checked'))
            .map(checkbox => checkbox.value);

        if (selectedFields.length === 0) {
            alert('Please select at least one field.');
            return;
        }

        const query = `
            {
                movies {
                    ${selectedFields.join('\n')}
                }
            }
        `;

        const response = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
            // body: JSON.stringify({
            //     query: `
            //         {
            //             movies {
            //                 id
            //                 title
            //                 overview
            //                 release_date
            //                 vote_average
            //             }
            //         }
            //     `
            // })
        });

        const contentLength = response.headers.get('Content-Length');
        const sizeKB = contentLength ? (contentLength / 1024).toFixed(2) : 'unknown';
        const graphqlSizeDisplay = document.getElementById('graphql-size');
        graphqlSizeDisplay.textContent = `Response size: ${sizeKB} KB`;

        const result = await response.json();
        const movies = result.data.movies;
        graphqlMovieList.innerHTML = '';
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movie.id}, ${movie.title}, ${movie.release_date}, rated ${movie.vote_average}`;
            graphqlMovieList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching movies (GraphQL):', error);
    }
}

// REST: Fetch movies
async function fetchRESTMovies() {
    try {
        const response = await fetch('http://localhost:8000/api/movies');

        const contentLength = response.headers.get('Content-Length');
        const sizeKB = contentLength ? (contentLength / 1024).toFixed(2) : 'unknown';
        const graphqlSizeDisplay = document.getElementById('rest-size');
        graphqlSizeDisplay.textContent = `Response size: ${sizeKB} KB`;

        const movies = await response.json();
        restMovieList.innerHTML = '';
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movie._id}, ${movie.title}, ${movie.release_date}, rated ${movie.vote_average}`;
            restMovieList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching movies (REST):', error);
    }
}


movieForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;

    try {
        await fetch('http://localhost:8000/api/movies', { // Updated URL here
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, year })
        });
        movieForm.reset();
        fetchRESTMovies();
    } catch (error) {
        console.error('Error adding movie (REST):', error);
    }
});


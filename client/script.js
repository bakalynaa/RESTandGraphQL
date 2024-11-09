const graphqlMovieList = document.getElementById('graphql-movies');
const restMovieList = document.getElementById('rest-movies');
const movieForm = document.getElementById('movie-form');

// GraphQL: Fetch movies
async function fetchGraphQLMovies() {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    {
                        movies {
                            title
                            overview
                            release_date
                            vote_average
                        }
                    }
                `
            })
        });
        const result = await response.json();
        const movies = result.data.movies;
        graphqlMovieList.innerHTML = '';
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movie.title} (${movie.release_date}), rated ${movie.vote_average}`;
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
        const movies = await response.json();
        restMovieList.innerHTML = '';
        movies.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = `${movie.title} (${movie.year}), directed by ${movie.director}`;
            restMovieList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching movies (REST):', error);
    }
}

// REST: Add a new movie
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
        fetchRESTMovies(); // Update REST list after adding
    } catch (error) {
        console.error('Error adding movie (REST):', error);
    }
});


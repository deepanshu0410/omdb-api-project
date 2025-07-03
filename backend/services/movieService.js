const axios = require('axios');
require('dotenv').config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

// In-memory storage for favorites (in production, use a database)
let favorites = [];

// Validate API key is present
if (!OMDB_API_KEY) {
    throw new Error('OMDB_API_KEY environment variable is required');
}

async function searchMovies({ title, year, genre }) {
    if (!title || typeof title !== 'string' || title.trim() === '') {
        throw new Error('Title is required and must be a non-empty string');
    }
    
    if (year && (isNaN(year) || year < 1900 || year > 2030)) {
        throw new Error('Year must be a valid number between 1900 and 2030');
    }
    
    const params = {
        apikey: OMDB_API_KEY,
        s: title.trim(),
        type: 'movie', // Only search for movies
    };
    
    if (year) params.y = year;
    
    try {
        const response = await axios.get(OMDB_BASE_URL, { params });
        if (response.data.Response === 'False') {
            throw new Error(response.data.Error || 'No movies found');
        }
        
        // Filter by genre if specified
        if (genre && response.data.Search) {
            const filteredMovies = response.data.Search.filter(movie => {
                // For search results, we need to get full details to check genre
                // This is a limitation of OMDb API - search doesn't include genre
                return true; // We'll filter on the frontend after getting details
            });
            response.data.Search = filteredMovies;
            response.data.totalResults = filteredMovies.length;
        }
        
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
        throw error;
    }
}

async function getMovieDetails(id) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('Valid IMDb ID is required');
    }
    
    const params = {
        apikey: OMDB_API_KEY,
        i: id.trim(),
        plot: 'full',
    };
    
    try {
        const response = await axios.get(OMDB_BASE_URL, { params });
        if (response.data.Response === 'False') {
            throw new Error(response.data.Error || 'Movie not found');
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`API request failed: ${error.response.status}`);
        }
        throw error;
    }
}

async function getPopularMovies() {
    const popularMovies = [
        'The Shawshank Redemption',
        'The Godfather',
        'The Dark Knight',
        'Pulp Fiction',
        'Fight Club',
        'Forrest Gump',
        'Inception',
        'The Matrix',
        'Goodfellas',
        'The Silence of the Lambs',
    ];
    
    const moviePromises = popularMovies.map(async (title) => {
        try {
            const params = {
                apikey: OMDB_API_KEY,
                t: title,
                plot: 'short',
            };
            const response = await axios.get(OMDB_BASE_URL, { params });
            return response.data.Response === 'True' ? response.data : null;
        } catch (error) {
            console.error(`Error fetching ${title}:`, error.message);
            return null;
        }
    });
    
    try {
        const movies = await Promise.all(moviePromises);
        const validMovies = movies.filter((movie) => movie !== null);
        return { Search: validMovies, totalResults: validMovies.length };
    } catch (error) {
        throw new Error('Failed to fetch popular movies');
    }
}

// Favorites functionality
function addToFavorites(movie) {
    if (!movie || !movie.imdbID) {
        throw new Error('Invalid movie data');
    }
    
    const existingIndex = favorites.findIndex(fav => fav.imdbID === movie.imdbID);
    if (existingIndex !== -1) {
        throw new Error('Movie is already in favorites');
    }
    
    favorites.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type,
        addedAt: new Date().toISOString()
    });
    
    return favorites;
}

function removeFromFavorites(imdbID) {
    if (!imdbID) {
        throw new Error('IMDb ID is required');
    }
    
    const initialLength = favorites.length;
    favorites = favorites.filter(fav => fav.imdbID !== imdbID);
    
    if (favorites.length === initialLength) {
        throw new Error('Movie not found in favorites');
    }
    
    return favorites;
}

function getFavorites() {
    return favorites;
}

function isInFavorites(imdbID) {
    return favorites.some(fav => fav.imdbID === imdbID);
}

module.exports = {
    searchMovies,
    getMovieDetails,
    getPopularMovies,
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    isInFavorites,
}; 
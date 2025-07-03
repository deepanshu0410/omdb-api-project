const express = require('express');
const router = express.Router();
const movieService = require('../services/movieService');

// Search movies by title
router.get('/search', async (req, res) => {
    try {
        const { title, year, genre } = req.query;
        
        // Validate required parameters
        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'Title parameter is required' });
        }
        
        const data = await movieService.searchMovies({ title, year, genre });
        res.json(data);
    } catch (error) {
        console.error('Search error:', error.message);
        if (error.message.includes('Title is required') || error.message.includes('Year must be')) {
            res.status(400).json({ error: error.message });
        } else if (error.message.includes('No movies found')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Get movie details by IMDB ID
router.get('/movie/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate IMDb ID format (basic check)
        if (!id || !id.startsWith('tt')) {
            return res.status(400).json({ error: 'Invalid IMDb ID format' });
        }
        
        const data = await movieService.getMovieDetails(id);
        res.json(data);
    } catch (error) {
        console.error('Movie details error:', error.message);
        if (error.message.includes('Valid IMDb ID is required')) {
            res.status(400).json({ error: error.message });
        } else if (error.message.includes('Movie not found')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Get popular movies
router.get('/popular', async (req, res) => {
    try {
        const data = await movieService.getPopularMovies();
        res.json(data);
    } catch (error) {
        console.error('Popular movies error:', error.message);
        res.status(500).json({ error: 'Failed to load popular movies' });
    }
});

// Favorites routes
// Get all favorites
router.get('/favorites', (req, res) => {
    try {
        const favorites = movieService.getFavorites();
        res.json({ favorites, totalResults: favorites.length });
    } catch (error) {
        console.error('Get favorites error:', error.message);
        res.status(500).json({ error: 'Failed to get favorites' });
    }
});

// Check if movie is in favorites
router.get('/favorites/:imdbID', (req, res) => {
    try {
        const { imdbID } = req.params;
        if (!imdbID || !imdbID.startsWith('tt')) {
            return res.status(400).json({ error: 'Invalid IMDb ID format' });
        }
        
        const isFavorite = movieService.isInFavorites(imdbID);
        res.json({ isFavorite });
    } catch (error) {
        console.error('Check favorite error:', error.message);
        res.status(500).json({ error: 'Failed to check favorite status' });
    }
});

// Add movie to favorites
router.post('/favorites', (req, res) => {
    try {
        const movie = req.body;
        if (!movie || !movie.imdbID) {
            return res.status(400).json({ error: 'Movie data with IMDb ID is required' });
        }
        
        const updatedFavorites = movieService.addToFavorites(movie);
        res.status(201).json({ 
            message: 'Movie added to favorites',
            favorites: updatedFavorites,
            totalResults: updatedFavorites.length
        });
    } catch (error) {
        console.error('Add to favorites error:', error.message);
        if (error.message.includes('already in favorites')) {
            res.status(409).json({ error: error.message });
        } else if (error.message.includes('Invalid movie data')) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to add to favorites' });
        }
    }
});

// Remove movie from favorites
router.delete('/favorites/:imdbID', (req, res) => {
    try {
        const { imdbID } = req.params;
        if (!imdbID || !imdbID.startsWith('tt')) {
            return res.status(400).json({ error: 'Invalid IMDb ID format' });
        }
        
        const updatedFavorites = movieService.removeFromFavorites(imdbID);
        res.json({ 
            message: 'Movie removed from favorites',
            favorites: updatedFavorites,
            totalResults: updatedFavorites.length
        });
    } catch (error) {
        console.error('Remove from favorites error:', error.message);
        if (error.message.includes('not found in favorites')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to remove from favorites' });
        }
    }
});

module.exports = router; 
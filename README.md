# Movie Database App (OMDb API)

A simple Node.js web application that utilizes the Open Movie Database (OMDb) API to display movie information. Search for movies, filter by year, save favorites, and view detailed information including box office, ratings, and plot.

## Technologies Used
- Node.js
- Express.js
- Axios
- OMDb API
- HTML/CSS (no frameworks)

## Prerequisites
- Node.js (v14 or higher recommended)
- npm
- OMDb API Key

## Getting Started

### 1. Clone the Repository
git clone <your-repo-url>
cd clear_demand


### 2. Install Dependencies
npm install


### 3. Configure Environment Variables
Create a `.env` file in the root directory by copying the example:

cp env.example .env


Then edit the `.env` file and add your OMDb API key:

OMDB_API_KEY=your_actual_api_key_here


### 4. Run the Application

npm start

The app will be available at [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Search & Movies
- `GET /api/search?title=...&year=...&genre=...` - Search movies
- `GET /api/movie/:id` - Get movie details by IMDb ID
- `GET /api/popular` - Get popular movies

### Favorites
- `GET /api/favorites` - Get all favorites
- `GET /api/favorites/:imdbID` - Check if movie is in favorites
- `POST /api/favorites` - Add movie to favorites
- `DELETE /api/favorites/:imdbID` - Remove movie from favorites

## Project Structure
clear_demand/
  |-- backend/
  |   |-- routes/
  |   |   |-- movieRoutes.js
  |   |-- services/
  |   |   |-- movieService.js
  |   |-- server.js
  |-- frontend/
  |   |-- index.html
  |-- package.json
  |-- .env (not committed)

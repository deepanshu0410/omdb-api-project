# Movie Database App (OMDb API)

A simple Node.js web application that utilizes the Open Movie Database (OMDb) API to display movie information. Search for movies, filter by year, save favorites, and view detailed information including box office, ratings, and plot.

## Features
- **Search movies** by title, year, and genre
- **Year filters** to refine movie listings
- **Genre filters** to filter by movie genre
- **Favorites system** - save and manage your favorite movies
- View detailed movie information (box office, ratings, plot, etc.)
- Display popular movies on homepage
- Simple, user-friendly HTML interface
- Graceful error handling

## Technologies Used
- Node.js
- Express.js
- Axios
- OMDb API
- HTML/CSS (no frameworks)

## Prerequisites
- Node.js (v14 or higher recommended)
- npm
- OMDb API Key ([Get a free key here](http://www.omdbapi.com/apikey.aspx))

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd clear_demand
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory by copying the example:

```bash
cp env.example .env
```

Then edit the `.env` file and add your OMDb API key:
```
OMDB_API_KEY=your_actual_api_key_here
```

**Get your free OMDb API key:** [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)

**Important:** Do not share your API key publicly or commit the `.env` file to version control.

### 4. Run the Application
```bash
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000)

**Note:** The server runs from the `backend` directory, so make sure you're in the root directory when running the command.

## Usage

### Search Functionality
- Use the search form to find movies by title, year, and genre
- Enter a movie title (required)
- Optionally specify a year (1900-2030)
- Optionally select a genre to filter results
- Click "Search" to find matching movies

### Favorites System
- Click the heart icon (❤️) on any movie card to add/remove from favorites
- View all your favorites by clicking "❤️ My Favorites" button
- Favorites are stored server-side and persist during your session
- Get visual feedback with heart icons (filled = favorite, empty = not favorite)

### Navigation
- Click on any movie card to view detailed information
- Use the back button to return to search results
- Click "Show Popular Movies" to see a curated list of popular films

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

## API Key Security
- The OMDb API key is stored in a `.env` file and **never hard-coded** in the source code.
- The backend server handles all API requests to OMDb, so your key is not exposed to the frontend.

## Data Sources & Assumptions
- All movie data is fetched from the [OMDb API](http://www.omdbapi.com/).
- If box office or other data is not available, 'N/A' is displayed.
- Popular movies are shown using a predefined list, as OMDb does not provide a popularity endpoint.
- Favorites are stored in-memory (resets on server restart). For production, use a database.

## Project Structure
```
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
```

## License
MIT

---

**Enjoy exploring movies!** 
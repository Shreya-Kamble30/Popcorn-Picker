import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async (id) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=87fbc1e5`);
      if (response.data.Response === "True") {
        setMovieDetails(response.data);
      }
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };

  const fetchMovies = async (query) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=87fbc1e5`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div className="container pt-20 overflow-hidden mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4 relative">
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies..."
              className="border border-gray-300 p-2 rounded w-full pr-10 pl-10"
          />
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#333333]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
          >
              <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
              />
          </svg>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          <div key={movie.imdbID} className="border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg" style={{ backgroundColor: '#F8F9FA' }}>
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto rounded" />
            <h3 className="font-semibold mt-2">{movie.Title} ({movie.Year})</h3>
            <button 
              onClick={() => fetchMovieDetails(movie.imdbID)} 
              className="mt-2 p-2"
              aria-label="About Me"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-[#333333]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z" />
              </svg>
            </button>
            <button 
              onClick={() => toggleFavorite(movie)} 
              className="mt-2 p-2"
              aria-label="Toggle Favorite"
            >
              {favorites.some(fav => fav.imdbID === movie.imdbID) ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-[#E94560]" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-[#333333]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Popcorn Image Centered */}
      {movies.length === 0 && !loading && (
        <div className="flex justify-center items-center mt-2">
          <img src="src/Components/logo.avif" alt="Popcorn Tub" className="w-96 h-auto" />
        </div>
      )}

      {/* Movie Details Modal */}
      {movieDetails.Title && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-11/12 md:w-1/2">
            <h2 className="text-xl font-bold">{movieDetails.Title}</h2>
            <p className="mt-2">{movieDetails.Plot}</p>
            <p className="mt-2"><strong>Cast:</strong> {movieDetails.Actors}</p>
            <p className="mt-2"><strong>Genre:</strong> {movieDetails.Genre}</p>
            <button 
              onClick={() => setMovieDetails({})} 
              className="mt-4 bg-[#E94560] text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;

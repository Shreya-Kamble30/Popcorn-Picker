
import React from 'react';

const Favorite = () => {
  const [favorites, setFavorites] = React.useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  
  const toggleFavorite = (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto pt-20 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.length > 0 ? (
          favorites.map(movie => (
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
          ))
        ) : (
          <p>No favorites added.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;

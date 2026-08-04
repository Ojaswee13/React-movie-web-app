import { useState } from "react";
import MovieCard from "../Components/MovieCard";
import { useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies } from "../services/api";
import { searchMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setErrors("Failed to load movies...SORRY GUYS");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const seacrhResult = await searchMovies(searchQuery);
      setMovies(seacrhResult);
      setErrors(null);
    } catch (err) {
      console.log(err);
      setErrors("Failed to search movies....");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="Home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for Movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
                <MovieCard movie={movie} key={movie.id} />
              ),
          )}
        </div>
      )}
    </div>
  );
}
export default Home;
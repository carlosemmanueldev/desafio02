import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const popular = import.meta.env.VITE_API;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      setMovies(result);
    });
  };

  return (
    <div className="MoviesPage">
      {movies.map((item) => (
        <div className="movieContainer" key={item.id}>
          <h2>{item.title}</h2>
          {item.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={`${item.title} Poster`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;

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
  const apiKey = "07cb34c8bbdd22eabcc7ab0db4591eeb";
  const popular = "https://api.themoviedb.org/3/movie/popular";

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
              src={`https://api.themoviedb.org/3/movie/${item.poster_path}`}
              alt={`${item.title} Poster`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;

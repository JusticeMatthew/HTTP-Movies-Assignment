import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import MovieCard from './MovieCard';

const initialValues = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

export default function UpdateMovie({ setMovielist }) {
  const [movie, setMovie] = useState(initialValues);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    /*eslint-disable-next-line*/
  }, []);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2>Update Movie Info</h2>
      <form onSubmit={submitHandler}>
        <input
          label='title'
          type='text'
          name='title'
          placeholder='Title'
          onChange={handleChange}
          value={movie.title}
        />
        <br />
        <input
          type='text'
          name='director'
          placeholder='Director'
          onChange={handleChange}
          value={movie.director}
        />
        <br />
        <input
          type='number'
          name='metascore'
          placeholder='Metascore'
          onChange={handleChange}
          value={movie.metascore}
        />
        <br />
        <button>Save</button>
        <MovieCard movie={movie} />
      </form>
    </>
  );
}

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
  title: '',
  director: '',
  metascore: '',
  stars: [],
};

export default function AddMovie() {
  const [movie, setMovie] = useState(initialValues);

  const { push } = useHistory();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2>Add New Movie</h2>
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
        <button>Add</button>
      </form>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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

  const handleStarsChange = (e) => {
    let starsArr = e.target.value.split(',');
    setMovie({
      ...movie,
      stars: starsArr,
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
    <FormContainer>
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
        <input
          type='text'
          name='stars'
          placeholder='Stars (Separate with a comma)'
          onChange={handleStarsChange}
          value={movie.stars}
        />
        <br />
        <button>Add</button>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    min-width: 300px;
  }
`;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import MovieList from '../components/MovieList';

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    alignItems: 'center',
  }
});

const MoviePick = () => {
const classes = useStyles();

return (
    <Container className={classes.root}>
      <MovieList />
    </Container>
  );
}

export default MoviePick;
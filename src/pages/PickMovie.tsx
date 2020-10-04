import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import MovieForm from '../components/MovieForm';

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
      <MovieForm />
    </Container>
  );
}

export default MoviePick;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, TextField, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
//import { MovieAction, loadMovieAction } from '../actions/movieActions';
import { IAppState } from '../store/store';
import axios from 'axios';


const MovieForm = () => {
  return (
    <>
    <h1>Hello World</h1>
    <Paper elevation={3}>
      <Box p={10}>
        <Card>
          <div>Hello World. </div>
          <button onClick={() => console.log(axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`))}>Click me</button>
        </Card>
      </Box>
    </Paper>
    </>
  )
}


export default MovieForm
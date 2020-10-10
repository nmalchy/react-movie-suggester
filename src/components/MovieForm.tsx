import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import GenreSelect from './GenreSelect';
import axios from 'axios';


const MovieForm = () => {
  return (
    <>
    <h1>Movie Suggester</h1>
    <Paper elevation={3}>
      <Box p={10}>
        <Card>
          <GenreSelect></GenreSelect>
        </Card>
      </Box>
    </Paper>
    </>
  )
}


export default MovieForm
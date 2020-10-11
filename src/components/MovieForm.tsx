import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

const MovieForm = () => {
  
  const MOVIE_POSTER_API_URL = "https://image.tmdb.org/t/p/w92/";

  const classes = useStyles();
  const [genreChoice, setGenreChoice] = useState(0);
  const [genreList, setGenreList] = useState([]);
  const [movieApiUrl, setMovieApiUrl] = useState('');
  const [movieList, setMovieList] = useState([]);


  const getGenres = async () => {
    await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`)
          .then(response => setGenreList(response.data.genres))
          .catch((error) => console.log('getGenres HTTP GET Request Error response: ', error))
  }

  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenreChoice(event.target.value as number);
  };

  const handleGetMoviesClick = async () => {
    await axios.get(movieApiUrl)
          .then(response => {
            console.log(response.data.results)
            setMovieList(response.data.results)
          })
          .catch((error) => console.log('handleGetMoviesClick HTTP GET Request Error response: ', error))
  };

  useEffect((): void => {
    getGenres()
  }, [])

  useEffect((): void => {
    setMovieApiUrl(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreChoice}`);
    console.log('New Movie url: ', movieApiUrl);
  }, [genreChoice, movieApiUrl])

  return (
    <>
    <h1>Movie Suggester</h1>
    <Paper elevation={3}>
      <Box p={10}>
        <Card>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="genre-select-label">Genres</InputLabel>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                value={genreChoice}
                onChange={handleGenreChange}
                label="Genres"
              >
                {(genreList || []).map((genre: {name: string, id: number}) => {
                  return <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Button onClick={handleGetMoviesClick}>Find me a movie!</Button>
          { movieList.length > 0 &&
            <Grid 
              container 
              spacing={2}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Movies
                </Typography>
                <List>
                  {movieList.map((movie) =>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={MOVIE_POSTER_API_URL + movie['backdrop_path']} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={movie['title']}
                        secondary={movie['overview']}
                      />
                    </ListItem>,
                  )}
                </List>
              </Grid>
            </Grid>
          }
        </Card>
      </Box>
    </Paper>
    </>
  )
}


export default MovieForm
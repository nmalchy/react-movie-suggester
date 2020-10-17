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
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ViewListIcon from '@material-ui/icons/ViewList';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
    paginator: {
      justifyContent: "center",
      padding: "10px"
    }
  }),
);

const Item = (props: any) => {
    return (
        <Paper>
            <h2>{props.movie.title}</h2>
            <p>{props.movie.overview}</p>
            <img alt={'poster for' + props.movie.title} src={"https://image.tmdb.org/t/p/w500/" + props.movie.backdrop_path} />
        </Paper>
    )
}

const MovieForm = () => {
  const carouselBool = false;
  const MOVIE_POSTER_API_URL = "https://image.tmdb.org/t/p/w92/";
  const classes = useStyles();
  const [genreChoice, setGenreChoice] = useState<number | undefined>(undefined);
  const [genreList, setGenreList] = useState<Array<any>>([]);
  const [movieApiUrl, setMovieApiUrl] = useState<string>('');
  const [movieList, setMovieList] = useState<Array<string>>([]);
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(movieList.length / itemsPerPage));
  const [alignment, setAlignment] = React.useState<string | null>('carousel');

  const handleAlignment = (_event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  const getGenres = async (): Promise<void> => {
    await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`)
          .then(response => setGenreList(response.data.genres))
          .catch((error) => console.log('getGenres HTTP GET Request Error response:', error))
  }

  const handlePageChange = (_event: any, value: React.SetStateAction<number>) => {
    setPage(value)
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${value}&with_genres=${genreChoice}`)
          .then(response => {
            console.log('Initial response; ', response)
            console.log(response.data.results)
            setMovieList(response.data.results)
            setNumberOfPages(response.data.total_pages)
          })
          .catch((error) => console.log('getMovies HTTP GET Request Error response:', error))
  };

  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenreChoice(event.target.value as unknown as number);
  };

  const getMovies = async (): Promise<void> => {
    await axios.get(movieApiUrl)
          .then(response => {
            console.log('Initial response; ', response)
            console.log(response.data.results)
            setMovieList(response.data.results)
            setNumberOfPages(response.data.total_pages)
          })
          .catch((error) => console.log('getMovies HTTP GET Request Error response:', error))
  };

  useEffect((): void => {
    getGenres()
  }, [])

  useEffect((): void => {
    setMovieApiUrl(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreChoice}`);
  }, [genreChoice])

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
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="carousel" aria-label="left aligned">
              <ViewCarouselIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="centered">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button onClick={getMovies}>Find me a movie!</Button>
          {alignment === 'list' &&
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
                  {movieList.map((movie: any) =>
                    <ListItem key={movie['id']}>
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
                <Box>
                <Pagination
                  count={numberOfPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  classes={{ ul: classes.paginator }}
                />
                </Box>
              </Grid>
            </Grid> 
          }
          <Box p={10}>
            { alignment === 'carousel' &&
            <Carousel
              autoPlay={false}
              next={ (next: any, active: any) => console.log(`we left ${active}, and are now at ${next}`) } 
              prev={ (prev: any, active: any) => console.log(`we left ${active}, and are now at ${prev}`) }
            >
              {
                movieList.map( (movie, i) => <Item key={i} movie={movie} /> )
              }
            </Carousel>
            }
          </Box>
        </Card>
      </Box>
    </Paper>
    </>
  )
}


export default MovieForm
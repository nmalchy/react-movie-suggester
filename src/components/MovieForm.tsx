import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Pagination from '@material-ui/lab/Pagination';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ViewListIcon from '@material-ui/icons/ViewList';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

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

const CarouselItem = (props: any) => {

  const [openMovieDbData, setOpenMovieDbData] = useState<Array<any>>([]);
  const [openMovieDbRatings, setOpenMovieDbRatings] = useState([]);

  useEffect((): any => {
    axios.get(`http://www.omdbapi.com/?t=${props.movie.title}&y=${props.movie.release_date && props.movie.release_date.substr(0, 4)}&apikey=${process.env.REACT_APP_OPEN_MOVIE_API_KEY}`)
    .then(response => {
      setOpenMovieDbData(response.data);
      setOpenMovieDbRatings(response.data.Ratings);
    })
    .catch((error) => console.log('Open Movie DB HTTP GET Request Error response:', error))
  }, [])

  return (
    <Paper style={{padding: "30px"}} elevation={50}>
      <h2>{props.movie.title}</h2>
      <p>{props.movie.overview}</p>
      <div>Release Date: {props.movie.release_date ? props.movie.release_date.substr(0, 4) : 'N/A'} </div>
      <div>{openMovieDbRatings ? openMovieDbRatings.map((rating: any) => <div>{rating.Source}: {rating.Value}</div>) : 'No Reviews'}</div>
      <div>Runtime: {openMovieDbData['Runtime'] ? openMovieDbData['Runtime'] : 'N/A'}</div>
      <div>Rated: {openMovieDbData['Rated'] ? openMovieDbData['Rated'] : 'N/A'}</div>
      <img alt={'Poster for ' + props.movie.title} src={"https://image.tmdb.org/t/p/w500/" + props.movie.backdrop_path} />
      <br />
    </Paper>
  )
}

const ListingItem = (props: any) => {

  const MOVIE_POSTER_API_URL = "https://image.tmdb.org/t/p/w92/";
  const [openMovieDbData, setOpenMovieDbData] = useState<Array<any>>([]);
  //const [openMovieDbRatings, setOpenMovieDbRatings] = useState([]);

  useEffect((): any => {
    axios.get(`http://www.omdbapi.com/?t=${props.movie.title}&y=${props.movie.release_date && props.movie.release_date.substr(0, 4)}&apikey=${process.env.REACT_APP_OPEN_MOVIE_API_KEY}`)
    .then(response => {
      setOpenMovieDbData(response.data);
      //setOpenMovieDbRatings(response.data.Ratings);
    })
    .catch((error) => console.log('Open Movie DB HTTP GET Request Error response:', error))
  }, [])

  return (
    <ListItem key={props.movie.id}>
      {props.movie.backdrop_path ?
        <ListItemAvatar>
          <Avatar src={MOVIE_POSTER_API_URL + props.movie.backdrop_path} />
        </ListItemAvatar> :
        <ListItemIcon>
          <Avatar>
            <LocalMoviesIcon />
          </Avatar>
        </ListItemIcon>
      }
      <ListItemText
        primary={props.movie.title}
        secondary={
                    <>
                    {props.movie.overview} Released in{' '}
                    {props.movie.release_date
                        ? props.movie.release_date.substr(0, 4)
                        : 'N/A'}{' '}
                    {openMovieDbData['Ratings']
                        ? openMovieDbData['Ratings'].map((rating: any) => (
                                <div>
                                    {rating.Source}: {rating.Value}
                                </div>
                            ))
                        : 'No Reviews'}
                    Rated:{' '}
                    {openMovieDbData['Rated'] ? openMovieDbData['Rated'] : 'N/A'}
                    </>
                  }
      />
    </ListItem>
  )
}

const MovieForm = () => {

  const itemsPerPage = 10;
  const classes = useStyles();
  const [genreChoice, setGenreChoice] = useState<number | undefined>(undefined);
  const [genreList, setGenreList] = useState<Array<any>>([]);
  const [movieApiUrl, setMovieApiUrl] = useState<string>('');
  const [movieList, setMovieList] = useState<Array<string>>([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(movieList.length / itemsPerPage));
  const [view, setView] = React.useState<string | null>('carousel');
  const [carouselEdgeCaseBoolean, setCarouselEdgeCaseBoolean] = useState(true)
  const right = useKeyPress('r');
  const [carouselIndex, setCarouselIndex] = useState(0);
  // Hook
  function useKeyPress(targetKey: string) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);

    // If pressed key is our target key then set to true
    function downHandler(key: any ) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    // If released key is our target key then set to false
    const upHandler = (key: any) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    // Add event listeners
    useEffect(() => {
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
  }
  const handleView = (_event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    setView(newView);
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
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleView}
              aria-label="text view"
            >
              <ToggleButton value="carousel" aria-label="left aligned">
                <ViewCarouselIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="centered">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Button variant="contained" color="primary" onClick={getMovies}>Show me the movies!</Button>
          {(view === 'list' && movieList.length > 0) &&
            <Grid 
              container 
              spacing={2}
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} md={8}>
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
                <List>
                  {
                    movieList.map((movie: any) => <ListingItem movie={movie} />)
                  }
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
          <Box p={5}>
            {(view === 'carousel' && movieList.length > 0) &&
              <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                timeout={0}
                index={carouselIndex}
                animation={'fade'}
                next={(next: any) => {
                  (next === 2 && page === 1) && setCarouselEdgeCaseBoolean(true);
                  (next === 0 && carouselEdgeCaseBoolean) && handlePageChange('click', page + 1);
                }}
                prev={(prev: any) => {
                  (prev === movieList.length - 1 && page === 1) && setCarouselEdgeCaseBoolean(false);
                  (prev === movieList.length - 1 && page !== 1) && handlePageChange('click', page - 1);
                }}
              >
              {
                movieList.map((movie, i) => <CarouselItem key={i} movie={movie} />)
              }
              </Carousel>
            }
          </Box>
    </>
  )
}


export default MovieForm
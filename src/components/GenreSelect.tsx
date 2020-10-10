import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { movieAction } from '../actions/movieActions';
import { IAppState } from '../store/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const GenreSelect = () => {

  const dispatch = useDispatch()
  const classes = useStyles();
  const [genreChoice, setGenreChoice] = useState(0)

  const getGenres = () => {
    console.log('actions dispatched')
    dispatch(movieAction())
  }

  const handleGenreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGenreChoice(event.target.value as number);
  };

  useEffect(() => {
    getGenres()
  }, [])

  const genres = useSelector((state: IAppState) => state.movieState.genres);

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="genre-select-label">Genres</InputLabel>
        <Select
        labelId="genre-select-label"
        id="genre-select"
        value={genreChoice}
        onChange={handleGenreChange}
        label="Genres"
        >
          {(genres || []).map((genre: {name: string, id: number}) => {
            return <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </>
  )
}

export default GenreSelect
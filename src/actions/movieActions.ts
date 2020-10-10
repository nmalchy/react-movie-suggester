import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IMovieState } from '../reducers/movieReducer';
import axios from 'axios';

export enum MovieActionTypes {
    ANY = 'ANY',
    GENRE = 'GENRE',
}

export interface IMovieGenreAction {
    type: MovieActionTypes.GENRE;
    genres: any;
}

export type MovieActions = IMovieGenreAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const movieAction: ActionCreator<ThunkAction<Promise<any>, IMovieState, void, IMovieGenreAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log('movieActions called')
      let res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`)
      console.log(res.data.genres)
      dispatch({
        genres: res.data.genres,
        type: MovieActionTypes.GENRE
      })
    } catch (err) {
      console.log(err);
    }
  } 
};

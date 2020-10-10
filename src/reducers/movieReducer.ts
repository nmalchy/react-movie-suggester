import { Reducer } from 'redux';
import { MovieActionTypes, MovieActions } from '../actions/movieActions';

export interface IMovieState {
    //property: any;
    genres: any;
}

const initialMovieState: IMovieState = {
    //property: null,
    genres: null,
};

export const movieReducer: Reducer<IMovieState, MovieActions> = (
    state = initialMovieState,
    action
    ) => {
      switch (action.type) {
        case MovieActionTypes.GENRE: {
          console.log('MovieActionTypes.GENRE called')
          return {
            genres: action.genres,
          };
        }
        default:
          console.log('Default action called')
          return state;
      }
  };

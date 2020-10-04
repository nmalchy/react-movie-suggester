import { Reducer } from 'redux';
import { MovieActionTypes, MovieActions } from '../actions/movieActions';

export interface IMovieState {
    property: any;
}

const initialMovieState: IMovieState = {
    property: null
};

export const movieReducer: Reducer<IMovieState, MovieActions> = (
    state = initialMovieState,
    action
  ) => {
    switch (action.type) {
      case MovieActionTypes.ANY: {
        return {
          ...state,
          property: action.property
        };
      }
      default:
        return state;
    }
  };
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IMovieState } from '../reducers/movieReducer';
import axios from 'axios';

export enum MovieActionTypes {
    ANY = 'ANY',
}

export interface IMovieAnyAction {
    type: MovieActionTypes.ANY;
    property: any;
}

export type MovieActions = IMovieAnyAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const movieAction: ActionCreator<ThunkAction<Promise<any>, IMovieState, null, IMovieAnyAction>> = () => {
    return async (dispatch: Dispatch) => {
        try {
          // Your logic here
          dispatch({
          property: null,
          type: MovieActionTypes.ANY
          })
        } catch (err) {
          console.error(err);
        }
    };
};
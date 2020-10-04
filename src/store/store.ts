import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { IMovieState, movieReducer } from '../reducers/movieReducer';

// Create an interface for the application state
export interface IAppState {
  movieState: IMovieState
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  movieState: movieReducer
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}
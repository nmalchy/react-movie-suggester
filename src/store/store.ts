import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
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

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, enhancer);
  return store;
}
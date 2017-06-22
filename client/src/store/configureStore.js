import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import atlasReducers from '../reducers/reducers'

export default function configureStore() {
  const store = createStore(
    atlasReducers,
    applyMiddleware(thunkMiddleware),
  );
  return store;
}
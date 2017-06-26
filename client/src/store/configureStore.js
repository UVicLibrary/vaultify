import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { batchedSubscribe } from 'redux-batched-subscribe';
import throttle from 'lodash.throttle';
import atlasReducers from '../reducers/reducers'

export default function configureStore() {
  const enhancers = compose(
    applyMiddleware(thunkMiddleware),
    batchedSubscribe(throttle(notify => notify(), 5000))
  )

  const store = createStore(
    atlasReducers,
    enhancers,
  );
  return store;
}
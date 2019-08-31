import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import photoReducer from './photoReducer';

export default (history) => combineReducers({
  photoReducer: photoReducer,
  router: connectRouter(history)
})

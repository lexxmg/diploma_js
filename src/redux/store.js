
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { photos } from './photos';

const reducers = combineReducers({
  photos: photos
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

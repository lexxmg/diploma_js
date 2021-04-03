
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import photos from './photos';
import fullPhoto from './fullPhoto';
import auth from './auth';

const reducers = combineReducers({
  photos: photos,
  fullPhoto: fullPhoto,
  auth: auth
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;


import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import photos from './photos';
import fullPhoto from './fullPhoto';

const reducers = combineReducers({
  photos: photos,
  fullPhoto: fullPhoto
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

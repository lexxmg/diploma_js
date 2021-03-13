
import { createStore, combineReducers } from 'redux';
import { images } from './images';

const reducers = combineReducers({
  images: images
});

const store = createStore(reducers);

export default store;

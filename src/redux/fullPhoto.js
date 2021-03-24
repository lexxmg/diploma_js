
import { unsplashApi } from '../api/api';

const SET_PHOTO = 'SET_PHOTO',
      SET_LOAD_FULL_PHOTO = 'SET_LOAD_FULL_PHOTO';

export const setPhoto = (photo) => {
  return {
    type: SET_PHOTO,
    photo
  }
}

export const setLoadFullPhoto = (load) => {
  return {
    type: SET_LOAD_FULL_PHOTO,
    load
  }
}

export const getFullPhoto = (photoId) => {
  return dispatch => {
    dispatch( setPhoto(null) );
    dispatch( setLoadFullPhoto(true) );

    unsplashApi.getFullPhoto(photoId).then(res => {
      dispatch( setPhoto(res) );
      dispatch( setLoadFullPhoto(false) );
      console.log(res);
    });
  }
}

const initialState = {
  photo: null,
  loading: false
}

const fullPhoto = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTO:
      return { ...state, photo: {...action.photo} };
    case SET_LOAD_FULL_PHOTO:
      return { ...state, loading: action.load };
    default:
      return state;
  }
}

export default fullPhoto;


import { unsplashApi } from '../api/api';

const SET_PHOTO_DATA = 'SET_PHOTO_DATA',
      SET_PHOTO_DATA_NULL = 'SET_PHOTO_DATA_NULL',
      SET_LOAD_FULL_PHOTO = 'SET_LOAD_FULL_PHOTO';

export const setPhotoData = (data) => {
  return {
    type: SET_PHOTO_DATA,
    photo: data.urls.full,
    altDescription: data.alt_description,
    likes: data.likes,
    firstName: data.user.first_name
  }
}

export const setPhotoDataNull = () => {
  return {
    type: SET_PHOTO_DATA_NULL
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
    dispatch( setPhotoDataNull() );
    dispatch( setLoadFullPhoto(true) );

    unsplashApi.getFullPhoto(photoId).then(data => {
      dispatch( setPhotoData(data) );
      dispatch( setLoadFullPhoto(false) );
      console.log(data);
    });
  }
}

const initialState = {
  photo: null,
  likes: 0,
  firstName: null,
  alt_description: 'photo',
  loading: false
}

const fullPhoto = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTO_DATA:
      return { ...state, photo: action.photo, likes: action.likes,
        firstName: action.firstName, altDescription: action.altDescription
       };
    case SET_PHOTO_DATA_NULL:
      return { ...state, photo: null, likes: 0,
        firstName: null, altDescription: 'photo'
      };
    case SET_LOAD_FULL_PHOTO:
      return { ...state, loading: action.load };
    default:
      return state;
  }
}

export default fullPhoto;

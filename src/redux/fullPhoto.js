
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
    name: data.user.name,
    html: data.user.links.html,
    profileImageLarge: data.user.profile_image.large,
    updatedAt: data.updated_at.split('T').[0],
    likedByUser: data.liked_by_user
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
  html: '#',
  likes: 0,
  updatedAt: null,
  profileImageLarge: null,
  name: null,
  altDescription: 'photo',
  likedByUser: false,
  loading: false
}

const fullPhoto = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTO_DATA:
      return { ...state, photo: action.photo, likes: action.likes,
        name: action.name, altDescription: action.altDescription,
        html: action.html, profileImageLarge: action.profileImageLarge,
        updatedAt: action.updatedAt, likedByUser: action.likedByUser
       };
    case SET_PHOTO_DATA_NULL:
      return { ...state, photo: null, likes: 0,
        name: null, altDescription: 'photo',
        html: '#', profileImageLarge: null,
        updatedAt: null, likedByUser: false
      };
    case SET_LOAD_FULL_PHOTO:
      return { ...state, loading: action.load };
    default:
      return state;
  }
}

export default fullPhoto;

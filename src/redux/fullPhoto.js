
import { unsplashApi } from '../api/api';

const SET_PHOTO_DATA = 'SET_PHOTO_DATA',
      SET_PHOTO_LIKE = 'SET_PHOTO_LIKE',
      SET_LIKE_BY_USER = 'SET_LIKE_BY_USER',
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
    likedByUser: data.liked_by_user,
    id: data.id
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

const setPhotoLike = (like) => {
  return {
    type: SET_PHOTO_LIKE,
    like
  }
}

export const setLikedByUser = (likedByUser) => {
  return {
    type: SET_LIKE_BY_USER,
    likedByUser
  }
}

export const getFullPhoto = (photoId) => {
  return dispatch => {
    dispatch( setPhotoDataNull() );
    dispatch( setLoadFullPhoto(true) );

    unsplashApi.getFullPhoto(photoId).then(res => {
      if (res.type === 'success') {
        console.log(res.response);
        dispatch( setPhotoData(res.response) );
        dispatch( setLoadFullPhoto(false) );
      } else {
        alert('some error');
        dispatch( setLoadFullPhoto(false) );
      }
    });
  }
}

export const photoLike = (photoId) => {
  return dispatch => {
    dispatch( setLoadFullPhoto(true) );

    unsplashApi.photoLike(photoId).then(res => {
      if (res.errors) {
        dispatch( setLoadFullPhoto(false) );

        if ( res.errors[0] === 'OAuth error: The access token is invalid' ) {
          alert('необходимо авторизоваться');
        } else {
          alert('some error');
        }
      } else {
        dispatch( setLoadFullPhoto(false) );
        dispatch( setLikedByUser(true) );
        dispatch( setPhotoLike(res.photo.likes) );
      }
    })
  }
}

export const photoUnLike = (photoId) => {
  return dispatch => {
    dispatch( setLoadFullPhoto(true) );

    unsplashApi.photoUnLike(photoId).then(res => {
      if (res.errors) {
        dispatch( setLoadFullPhoto(false) );

        if ( res.errors[0] === 'OAuth error: The access token is invalid' ) {
          alert('необходимо авторизоваться');
        } else {
          alert('some error');
        }
      } else {
        dispatch( setLoadFullPhoto(false) );
        dispatch( setLikedByUser(false) );
        dispatch( setPhotoLike(res.photo.likes) );
      }
    })
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
  loading: false,
  id: null
}

const fullPhoto = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTO_DATA:
      return { ...state, photo: action.photo, likes: action.likes,
        name: action.name, altDescription: action.altDescription,
        html: action.html, profileImageLarge: action.profileImageLarge,
        updatedAt: action.updatedAt, likedByUser: action.likedByUser,
        id: action.id
       };
    case SET_PHOTO_DATA_NULL:
      return { ...state, photo: null, likes: 0,
        name: null, altDescription: 'photo',
        html: '#', profileImageLarge: null,
        updatedAt: null, likedByUser: false,
        id: null
      };
    case SET_PHOTO_LIKE:
      return {...state, likes: action.like};
    case SET_LIKE_BY_USER:
      return {...state, likedByUser: action.likedByUser}
    case SET_LOAD_FULL_PHOTO:
      return { ...state, loading: action.load };
    default:
      return state;
  }
}

export default fullPhoto;

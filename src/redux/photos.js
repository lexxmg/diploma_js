
import { unsplashApi } from '../api/api';

const SET_PHOTOS = 'SET_PHOTOS',
      SET_FULL_PHOTO = 'SET_FULL_PHOTO',
      SET_LOADING = 'SET_LOADING',
      SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const setPhotos = (photos) => {
  return {
    type: SET_PHOTOS,
    photos
  }
}

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    page
  }
}

export const setLoading = (load) => {
  return {
    type: SET_LOADING,
    load
  }
}

export const setFullPhoto = (photoId) => {
  return {
    type: SET_FULL_PHOTO,
    photoId
  }
}

export const getPhotos = (page, perPage) => {
  return dispatch => {
    dispatch( setLoading(true) );

     return unsplashApi.getPhotos(page, perPage).then(photos => {
      //console.log(photos);
      dispatch( setPhotos(photos) );
      dispatch( setLoading(false) );
    })
  }
}


const initialState = {
  photos: [],
  fullPhoto: null,
  currentPage: 1,
  loading: false
}

export const photos = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, photos: [...state.photos, ...action.photos] };
    case SET_FULL_PHOTO:
      return { ...state, fullPhoto: state.photos.find(obj => {
        return obj.id === action.photoId;
      }) }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case SET_LOADING:
      return { ...state, loading: action.load };
    default:
      return state;
  }
}

export default photos;

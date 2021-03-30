
import { unsplashApi } from '../api/api';

const SET_PHOTOS = 'SET_PHOTOS',
      SET_PHOTOS_LIKE = 'SET_PHOTOS_LIKE',
      SET_LOADING = 'SET_LOADING',
      SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const setPhotos = (photos) => {
  return {
    type: SET_PHOTOS,
    photos
  }
}
export const setPhotosLike = (photoId, like) => {
  return {
    type: SET_PHOTOS_LIKE,
    photoId,
    like
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

export const getPhotos = (page, perPage) => {
  return dispatch => {
    dispatch( setLoading(true) );

    return unsplashApi.getPhotos(page, perPage).then(res => {
      console.log(res);
      if (res.type === 'success') {
        dispatch( setPhotos(res.response.results) );
        dispatch( setLoading(false) );
      } else {
        alert('some error');
        dispatch( setLoading(false) );
      }
    })
  }
}


const initialState = {
  photos: [],
  currentPage: 1,
  loading: false
}

export const photos = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, photos: [...state.photos, ...action.photos] };
    case SET_PHOTOS_LIKE:
      return {...state, photos: state.photos.map(obj => {
          if (obj.id === action.photoId) {
            return {...obj, likes: action.like}
          } else {
            return obj;
          }
        })
      };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case SET_LOADING:
      return { ...state, loading: action.load };
    default:
      return state;
  }
}

export default photos;

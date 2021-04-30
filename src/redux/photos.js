
import { unsplashApi } from '../api/api';

const SET_PHOTOS = 'SET_PHOTOS',
      SET_PHOTOS_LIKE = 'SET_PHOTOS_LIKE',
      SET_LOADING = 'SET_LOADING',
      SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
      SET_CURRENT_POSITION = 'SET_CURRENT_POSITION';

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

export const setCurrentPosition = (position) => {
  return {
    type: SET_CURRENT_POSITION,
    position
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
        console.log('some error');
        dispatch( setLoading(false) );
      }
    }).catch(err => {
      alert(err.message + ' повторите попытку позже');
      dispatch( setLoading(false) );
    });
  }
}

export const getNextPhotos = () => {
  return (dispatch, getState) => {
    let currentPage = getState().photos.currentPage + 1;
    dispatch( setCurrentPage(currentPage) );
    currentPage = getState().photos.currentPage;

    dispatch( setLoading(true) );

    return unsplashApi.getPhotos(currentPage, 10).then(res => {
      console.log(res);
      if (res.type === 'success') {
        dispatch( setPhotos(res.response.results) );
        dispatch( setLoading(false) );
      } else {
        console.log('some error');
        dispatch( setLoading(false) );
      }
    }).catch(err => {
      alert(err.message + ' повторите попытку позже');
      dispatch( setLoading(false) );
    });
  }
}

export const getFullPageCount = (count) => {
  return dispatch => {
    dispatch( setLoading(true) );

    (async function() {
      for (let i = 1; i <= count; i++) {
        try {
          await unsplashApi.getPhotos(i, 10).then(res => {
            if (res.type === 'success') {
              dispatch( setPhotos(res.response.results) );
              //dispatch( setLoading(false) );
            } else {
              console.log('some error');
              dispatch( setLoading(false) );
            }
          })
          dispatch( setCurrentPage(i) );
        } catch(err) {
            alert(err.message + ' повторите попытку позже');
            dispatch( setLoading(false) );
        }
      }
      const currentPosition = window.scroll(0, window.localStorage.getItem('currentPosition'));

      if (currentPosition) {
        dispatch( setCurrentPosition(currentPosition) );
        window.localStorage.removeItem('currentPosition');
      }
      dispatch( setLoading(false) );

      window.localStorage.removeItem('pageCount');
    })();
  }
}

const endPhoto = [
  {end: 'end', key: 0},
  {end: 'end', key: 1},
  {end: 'end', key: 2}
]

const initialState = {
  photos: [],
  currentPage: 1,
  currentPosition: 0,
  loading: false,
  endPhoto: endPhoto
}

export const photos = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      const filterPhoto = state.photos.filter(photo => {
        return !('end' in photo);
      });
      return {
        ...state,
        photos: [
                  ...filterPhoto,
                  ...action.photos,
                  ...state.endPhoto
                ]
      };
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
    case SET_CURRENT_POSITION:
      return { ...state, currentPosition: action.position };
    default:
      return state;
  }
}

export default photos;

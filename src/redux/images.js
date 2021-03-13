
const SET_IMAGES = 'SET_IMAGES';

export const setImages = (images) => {
  return {
    type: SET_IMAGES,
    images
  }
}

const initialState = {
  images: null
}

export const images = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return { ...state, images: [...action.images] };
    default:
      return state;
  }
}

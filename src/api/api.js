
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ'
  //...other fetch options
});

window.unsplash = unsplash;

export const unsplashApi = {
  getPhotos(page, perPage) {
    return unsplash.photos.list({ page, perPage }).then(res => {
      //console.log(res);
      return res.response.results
    })
  },
  getFullPhoto(photoId) {
    return unsplash.photos.get({ photoId: photoId }).then(result => {
      if (result.type === 'success') {
        return result.response;
      }
    });
  },
  auth(token) {
    window.location.href = `https://unsplash.com/oauth/authorize?
      client_id=_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ&redirect_uri=http://localhost:3000&
      response_type=code&scope=public+read_user+read_photos+write_likes`;
  }
}


import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ'
  //...other fetch options
});

export const unsplashApi = {
  getPhotos(page, perPage) {
    return unsplash.photos.list({ page, perPage }).then(res => {
      console.log(res);
      return res.response.results
    })
  }
}

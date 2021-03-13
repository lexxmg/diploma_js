
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ'
  //...other fetch options
});

export const unsplashApi = {
  getUserPhotos() {
    return unsplash.users.getPhotos({ username: 'foo' }).then(result => {
      if (result.errors) {
        // handle error here
        console.log('error occurred: ', result.errors[0]);
      } else {
        const feed = result.response;

        // extract total and results array from response
        const { total, results } = feed;

        // handle success here
        console.log(`received ${results.length} photos out of ${total}`);
        console.log('first photo: ', results[0]);
      }
    });
  },
  getPhotos(page, perPage) {
    return unsplash.photos.list({ page, perPage }).then(res => {
      console.log(res);
      return res.response.results
    })
  }
}

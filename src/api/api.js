
import { createApi } from 'unsplash-js';

const CLIENT_ID = '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ',
      CLIENT_SECRET = '_Cp8wCr4mkPd0YqSQiDJAPLUtwi_wORX_gixD3WRCUU',
      REDIRECR_URL = 'http://localhost:3000/auth';

const authUrl = `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECR_URL}&response_type=code&scope=public+write_likes`;

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
  auth() {
    const code = window.location.search.split('code=')[1];

    if (!code) {
      window.location.href = authUrl;
    } else {
      console.log(code);
      fetch('https://unsplash.com/oauth/token', {
        method: 'POST',
        headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECR_URL,
          code: code,
          grant_type: 'authorization_code'
        })
      }).then(response => response.json()).then(data => console.log(data))
    }
  }
}

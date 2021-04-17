
import { createApi } from 'unsplash-js';

const CLIENT_ID = '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ',
      CLIENT_SECRET = '_Cp8wCr4mkPd0YqSQiDJAPLUtwi_wORX_gixD3WRCUU',
      REDIRECR_URL = 'http://localhost:3000';



const authUrl = `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECR_URL}&response_type=code&scope=public+write_likes`;

const unsplash = createApi({
  accessKey: localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') : '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ'
  //...other fetch options
});

window.unsplash = unsplash;

export const unsplashApi = {
  getPhotos(page, perPage) {
    return unsplash.photos.list({ page, perPage });
  },
  getFullPhoto(photoId) {
    return unsplash.photos.get({ photoId: photoId });
  },
  photoUnLike(photoId) {
    return fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => res.json()).then(data => data);
  },
  photoLike(photoId) {
    return fetch(`https://api.unsplash.com/photos/${photoId}/like`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => res.json()).then(data => data);
  },
  getAuthUser() {
    return fetch(`https://api.unsplash.com/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => res.json()).then(data => data);
  },
  auth() {
    const code = window.location.search.split('code=')[1];

    if (!code) {
      window.location.href = authUrl;
    } else {
      return fetch('https://unsplash.com/oauth/token', {
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
      }).then(response => response.json()).then(data => {
        //console.log(data);
        localStorage.setItem('token', data.access_token);
        window.location.href = REDIRECR_URL;
        return;
      })
    }
  }
}

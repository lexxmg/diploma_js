
import * as axios from 'axios';
import url from 'url';

const CLIENT_ID = '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ',
      CLIENT_SECRET = '_Cp8wCr4mkPd0YqSQiDJAPLUtwi_wORX_gixD3WRCUU',
      REDIRECR_URL = 'http://localhost:3000';

const code = url.parse(document.URL, 'query=string');
console.log(code.query.code);

let authorization = `Client-ID ${CLIENT_ID}`;

let instance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: authorization,
    //Authorization: 'Bearer Zyo5KkG1hhX1XIN734FsVa5IN7lCDoa4P1ZfCixl7wI'
  }
});

export const authUrl = `https://unsplash.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECR_URL}&response_type=code&scope=public+write_likes`;

export const api = {
  auth() {
    axios.post('https://unsplash.com/oauth/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECR_URL,
      code: code.query.code,
      grant_type: 'authorization_code'
    }).then(res => {
      console.log(res.data);
      authorization = `Bearer ${res.data.access_token}`;

      instance = axios.create({
        baseURL: 'https://api.unsplash.com/',
        headers: {
          Authorization: authorization
        }
      });
    })
  },
  getPhotos(page, perPage) {
    return instance.get(`photos?page=${page}&per_page=${perPage}`)
      .then(res => res.data)
  },
  like(id){
    return instance.post(`photos/${id}/like`).then(res => console.log(res));
  },
  unLike(id){
    return instance.delete(`photos/${id}/like`).then(res => console.log(res));
  }
}

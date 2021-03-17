
import * as axios from 'axios';
import url from 'url';

const code = url.parse(document.URL, 'query=string');
console.log(code.query.code);

let authorization = 'Client-ID _i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ';

let instance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: authorization,
    //Authorization: 'Bearer Zyo5KkG1hhX1XIN734FsVa5IN7lCDoa4P1ZfCixl7wI'
  }
});

export const authUrl = 'https://unsplash.com/oauth/authorize?client_id=_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ&redirect_uri=http://localhost:3000&response_type=code&scope=public+write_likes';

export const api = {
  auth() {
    axios.post('https://unsplash.com/oauth/token', {
      client_id: '_i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ',
      client_secret: '_Cp8wCr4mkPd0YqSQiDJAPLUtwi_wORX_gixD3WRCUU',
      redirect_uri: 'http://localhost:3000',
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

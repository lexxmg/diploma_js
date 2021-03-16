
import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {'Authorization': 'Client-ID _i66pu-AAF7Fk6drWH2jys78579pswAF2DW8Q__DSeQ'}
});

export const api = {
  auth() {
    return instance.get('oauth').then(res => console.log(res))
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

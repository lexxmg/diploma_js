
import './App.css';
import { useEffect, useState } from 'react';
import { api, authUrl } from './api/api';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

function App() {
  const [ currentPages, setCurrentPages ] = useState(1);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    api.getPhotos(currentPages, 2).then(photos => {
      setImages([...images, ...photos]);
      // console.log(photos);
      // console.log(photos[0].urls.small);
    })
  }, [currentPages]);

  return (
    <div className="App fixed-container">
      <div className="App__inner">

      <a href={authUrl}>Запрос авторизации</a>

      <button className="App__btn" onClick={() => api.auth()}>Получить токен</button>
      <button onClick={() => {
        setCurrentPages(currentPages + 1);
      }}>ещё</button>

      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
      >
          <Masonry  gutter="10px">
            {
              images.map(obj => {
                return (
                  <div className="" key={obj.id}>
                    <img className="App__img" src={obj.urls.small} alt={obj.alt_description} />
                    <span style={{marginRight: '20px'}}>{obj.id}</span>

                    <button className="App__btn" onClick={() => api.like(obj.id)}>like</button>
                    <button className="App__btn" onClick={() => api.unLike(obj.id)}>unLike</button>

                    <span style={{marginLeft: '20px'}}>{obj.likes}</span>
                  </div>
                )
              })
            }
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default App;

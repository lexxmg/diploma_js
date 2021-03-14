
import './App.css';
import { useEffect, useState } from 'react';
import { unsplashApi } from './api/api';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

function App() {
  const [ images, setImages ] = useState(null);

  useEffect(() => {
    unsplashApi.getPhotos(2, 9).then(photos => {
      setImages(photos);
      console.log(photos);
      console.log(photos[0].urls.small);
    })
  }, []);

  return (
    <div className="App fixed-container">
      <div className="App__inner">
      { images &&
      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
      >
          <Masonry>
            {
              images.map(obj => {
                return (
                  <img className="App__img" key={obj.id} src={obj.urls.small} alt={obj.alt_description} />
                )
              })
            }
          </Masonry>
        </ResponsiveMasonry>
      }
      </div>
    </div>
  );
}

export default App;

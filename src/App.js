
import './App.css';
import { useEffect } from 'react';
import { unsplashApi } from './api/api';

function App() {
  useEffect(() => {
    unsplashApi.getPhotos(1, 3).then(photos => {
      console.log(photos);
    })
  }, []);

  return (
    <div className="App">

    </div>
  );
}

export default App;

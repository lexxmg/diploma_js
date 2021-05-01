
import './App.css';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { isAutoriazed } from './redux/auth';
import PhotoCardContainer from './components/PhotoCard/PhotoCardContainer';
import PhotoFullContainer from './components/PhotoFull/PhotoFullContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Preloader from './components/Common/Preloader/Preloader';
//import Auth from './components/Auth/Auth/Auth';


function App({ isAutoriazed }) {
  const code = window.location.search.split('code=')[1];
  console.log(code);

  useEffect(() => {
    isAutoriazed();
  }, [isAutoriazed]);

  return (
    <div className="App">
      <Route exact path="/" render={() => {
        return (
          <div>
            <HeaderContainer />

            {code ? <Preloader /> : <PhotoCardContainer />}
          </div>
        )
      }}>
      </Route>

      <Route path="/full/:id?" render={() => {
        return (
            <div>
              <PhotoFullContainer />
            </div>
          )
        }}>
      </Route>

    </div>
  );
}

export default connect(null, {isAutoriazed})(App);

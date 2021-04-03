
import './App.css';
import { Route } from 'react-router-dom';
import PhotoCardContainer from './components/PhotoCard/PhotoCardContainer';
import PhotoFullContainer from './components/PhotoFull/PhotoFullContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Auth from './components/Auth/Auth/Auth';


function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => {
        return (
          <div>
            <HeaderContainer />

            <PhotoCardContainer />
          </div>
        )
      }}>
      </Route>

      <Route path="/auth" component={Auth}></Route>

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

export default App;

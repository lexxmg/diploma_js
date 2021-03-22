
import './App.css';
import { Route, Link } from 'react-router-dom';
import PhotoCardContainer from './components/PhotoCard/PhotoCardContainer';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={PhotoCardContainer}></Route>

      <Route path="/full">
        <Link to="/"><h1>full</h1></Link>
      </Route>

    </div>
  );
}

export default App;

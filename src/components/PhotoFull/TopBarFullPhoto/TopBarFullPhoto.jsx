
import './top-bar-full-photo.css';
import { Link } from 'react-router-dom';

const TopBarFullPhoto = (props) => {
  return (
    <div className="top-bar-full-photo">
      <Link to="/"><h1>назад</h1></Link>
    </div>
  )
}

export default TopBarFullPhoto;

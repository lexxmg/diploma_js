
import './top-bar-full-photo.css';
import { Link } from 'react-router-dom';

const TopBarFullPhoto = (props) => {
  const { likes, firstName } = props;
  //const { first_name } = props.fullPhoto.user;

  return (
    <div className="top-bar-full-photo">
      <Link to="/"><h1>назад</h1></Link>
      <span>{likes}</span>
      <span>{firstName}</span>
    </div>
  )
}

export default TopBarFullPhoto;

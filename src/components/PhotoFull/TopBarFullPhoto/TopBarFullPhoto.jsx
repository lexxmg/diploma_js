
import './top-bar-full-photo.css';
import noFoto from '../../../assets/images/nofoto.jpg';
import { Link } from 'react-router-dom';

const TopBarFullPhoto = (props) => {
  const { likes, name, html, profileImageLarge,
    updated_at
  } = props;
  console.log(props);

  return (
    <div className="top-bar-full-photo">
      <Link to="/"><h1>назад</h1></Link>
      <img className="top-bar-full-photo__img"
        src={profileImageLarge || noFoto} alt={name || "noFoto"}
      />
      <span>{likes}</span>
      <a href={html} target="_blanc"><span>{name}</span></a>
      <time>{updated_at}</time>
    </div>
  )
}

export default TopBarFullPhoto;

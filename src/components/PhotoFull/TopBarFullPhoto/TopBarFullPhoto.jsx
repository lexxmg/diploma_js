
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

      <img className="top-bar-full-photo__img"
        src={profileImageLarge || noFoto} alt={name || "noFoto"}
      />
      <span>{likes}</span>
      <a href={html} target="_blanc"><span>{name}</span></a>
      <time>{updated_at}</time>

      <div className="top-bar-full-photo__close-container top-bar-full-photo-close-container">
        <Link to="/" aria-label="закрыть">
          <div className="top-bar-full-photo-close-container__close"></div>
        </Link>
      </div>
    </div>
  )
}

export default TopBarFullPhoto;

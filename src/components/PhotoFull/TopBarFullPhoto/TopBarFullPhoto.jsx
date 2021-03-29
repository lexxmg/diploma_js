
import './top-bar-full-photo.css';
import '../../../assets/fonts-icon/fontello-cae0aaa7/css/fontello.css';
import noFoto from '../../../assets/images/nofoto.jpg';
import { Link } from 'react-router-dom';

const TopBarFullPhoto = (props) => {
  const { likes, name, html, profileImageLarge,
    updatedAt, likedByUser
  } = props;

  console.log(props);

  const likeUp = () => alert('likeUp');
  const likeDown = () => alert('likeDown');

  return (
    <div className="top-bar-full-photo">

      <div className="top-bar-full-photo__user-container top-bar-full-photo-user-container">
        <a className="top-bar-full-photo-user-container__link" href={html} target="_blanc">
          <img className="top-bar-full-photo-user-container__img"
            src={profileImageLarge || noFoto} alt={name || "noFoto"}
          />
        </a>

        <a className="top-bar-full-photo-user-container__link-user"
          href={html} target="_blanc">{name}
        </a>
      </div>


      <time>{updatedAt}</time>

      <div className="top-bar-full-photo__like-container like">
        <button aria-label="лайк"
          onClick={ likedByUser ? likeDown : likeUp }
          className={
            'like__btn ' + (likedByUser ? 'icon-thumbs-down' : 'icon-thumbs-up')
          }>
        </button>

        <span className="like__count">{likes}</span>
      </div>

      <div className="top-bar-full-photo__close-container top-bar-full-photo-close-container">
        <Link to="/" aria-label="закрыть">
          <div className="top-bar-full-photo-close-container__close"></div>
        </Link>
      </div>
    </div>
  )
}

export default TopBarFullPhoto;


import React from 'react';
import './top-bar-full-photo.css';
import '../../../assets/fonts-icon/fontello-cae0aaa7/css/fontello.css';
import noFoto from '../../../assets/images/nofoto.jpg';
import { Link, Redirect } from 'react-router-dom';
import AlertContainer from '../../Alert/AlertContainer';

const TopBarFullPhoto = (props) => {
  const { likes, name, html, profileImageLarge,
    updatedAt, likedByUser, id, photoLike, photoUnLike, loading, isAuth
  } = props;

  //console.log(props);

  const [ showAlert, setShowAlert ] = React.useState(false);
  const [ redirectToAuth, setRedirectToAuth ] = React.useState(false);

  const likeUp = () => {
    photoLike(id);

    if (!isAuth) {
      setShowAlert(true);
    }
  }

  const likeDown = () => {
    photoUnLike(id);

    if (!isAuth) {
      setShowAlert(true);
    }
  }

  return (
    <div className="top-bar-full-photo">

      { redirectToAuth && <Redirect to="/auth" /> }

      {
        showAlert &&
          <AlertContainer
            setShowAlert={setShowAlert}
            setRedirectToAuth={setRedirectToAuth}
          />
      }

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
          disabled={loading}
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

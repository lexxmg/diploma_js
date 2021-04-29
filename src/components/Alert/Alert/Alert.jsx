
import './alert.css';

const Alert = (props) => {
  const locationArr = window.location.toString().split('/');
  const currentFullPhotoId = locationArr[locationArr.length -1];

  const redirectToAuth = () => {
    window.localStorage.setItem('currentFullPhotoId', currentFullPhotoId);
    window.localStorage.setItem('pageCount', props.currentPage);
    window.localStorage.setItem('currentPosition', props.currentPosition);
    //props.setRedirectToAuth(true);
    props.login();
  }

  return (
    <div className="alert">
      <div className="alert__content">
        <span className="alert__text">Для данного действия, необходимо авторизоваться, аторизоваться сейчас?</span>

        <div className="alert__btn-container">
          <button className="alert__btn" onClick={ redirectToAuth }>да</button>

          <button className="alert__btn" onClick={ () => { props.setShowAlert(false) } }>нет</button>
        </div>
      </div>
    </div>
  )
}

export default Alert;


import './alert.css';

const Alert = (props) => {
  return (
    <div className="alert">
      <div className="alert__content">
        <span className="alert__text">Для данного действия, необходимо авторизоваться, аторизоваться сейчас?</span>

        <div className="alert__btn-container">
          <button className="alert__btn" onClick={ () => {props.setRedirectToAuth(true)} }>да</button>

          <button className="alert__btn" onClick={ () => {props.setShowAlert(false)} }>нет</button>
        </div>
      </div>
    </div>
  )
}

export default Alert;

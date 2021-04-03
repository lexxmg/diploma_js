
import './header.css';
import { Link } from 'react-router-dom';
import noFoto from '../../../assets/images/nofoto.jpg';

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__user-container header-user">
        <img src={props.authUser ? props.authUser.profile_image.medium : noFoto} alt="" className="header-user__img" />

        <span className="header-user__name">{props.authUser && props.authUser.username}</span>
      </div>


      {
        props.isAuth
        ? <button
            className="header__btn"
            onClick={props.logout}
            >logout
          </button>

        : <Link to="/auth">auth</Link>
      }
    </div>
  )
}

export default Header;

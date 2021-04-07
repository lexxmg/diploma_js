
import './header.css';
import { Link } from 'react-router-dom';
import noFoto from '../../../assets/images/nofoto.jpg';
//import { unsplashApi } from '../../../api/api';
import { useEffect } from 'react';

const Header = (props) => {
  useEffect(() => {
    //unsplashApi.getAuthUser().then(data => console.log(data))
  }, []);

  return (
    <div className="header">
      <div className="header__user-container header-user">
        <img src={noFoto} alt="" className="header-user__img" />

        <span className="header-user__name">user name</span>
      </div>

      <Link to="/auth">auth</Link>
    </div>
  )
}

export default Header;

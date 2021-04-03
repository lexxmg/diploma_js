
import './auth.css';
import { Redirect, withRouter } from 'react-router-dom';
//import { unsplashApi } from '../../../api/api';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../redux/auth.js'

const Auth = ({ isAuth, login }) => {
  useEffect(() => {
    //console.log(props);
    //unsplashApi.auth();
    login();
  }, [login]);

  return (
    <div className="auth-container">
      { isAuth && <Redirect to="/" />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, {login})(withRouter(Auth));

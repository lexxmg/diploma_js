
import './auth.css';
import { Redirect, withRouter } from 'react-router-dom';
//import { unsplashApi } from '../../../api/api';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { login } from '../../../redux/auth.js'

const Auth = ({ isAuth, login }) => {
  const currentFullPhotoId = window.localStorage.getItem('currentFullPhotoId');

  useEffect(() => {
    //console.log(props);
    //unsplashApi.auth();
    login();
  }, [login]);

  return (
    <div className="auth-container">
      <div className="auth-container__plaseholder"></div>
      { isAuth && <Redirect to={currentFullPhotoId ? "/full/" + currentFullPhotoId : "/"} />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default compose(
  connect(mapStateToProps, {login}),
  withRouter
)(Auth);

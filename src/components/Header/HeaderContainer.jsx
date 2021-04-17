
import React from 'react';
import { connect } from 'react-redux';
import { logout, login } from '../../redux/auth';
import Header from './Header/Header';

const HeaderContainer = (props) => {
  React.useEffect(() => {
    const currentFullPhotoId = window.localStorage.getItem('currentFullPhotoId');
    const code = window.location.search.split('code=')[1];

    if (code) {
      props.login();
    } else if (currentFullPhotoId && props.isAuth) {
      console.log(currentFullPhotoId);
    }
  });

  return (
    <Header {...props} />
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    authUser: state.auth.authUser
  }
}

export default connect(mapStateToProps, {logout, login})(HeaderContainer);

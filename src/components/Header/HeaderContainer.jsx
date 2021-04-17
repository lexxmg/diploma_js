
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, login } from '../../redux/auth';
import Header from './Header/Header';

const HeaderContainer = (props) => {
  const [isCurrentFullPhotoId, setIsCurrentFullPhotoId] = React.useState(false);
  const currentFullPhotoId = window.localStorage.getItem('currentFullPhotoId');

  React.useEffect(() => {
    const code = window.location.search.split('code=')[1];

    if (code) {
      props.login();
    } else if (currentFullPhotoId && props.isAuth) {
      //console.log(currentFullPhotoId);
      setIsCurrentFullPhotoId(true);
    }
  }, [currentFullPhotoId, props]);

  return (
    <>
      {
        isCurrentFullPhotoId
          ? <Redirect to={currentFullPhotoId ? "/full/" + currentFullPhotoId : "/"} />
          : <Header {...props} />
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    authUser: state.auth.authUser
  }
}

export default connect(mapStateToProps, {logout, login})(HeaderContainer);

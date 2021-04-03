
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { logout, isAutoriazed } from '../../redux/auth';
import Header from './Header/Header'

const HeaderContainer = (props) => {
  useEffect(() => {
    props.isAutoriazed();
  }, [props]);

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

export default connect(mapStateToProps, {logout, isAutoriazed})(HeaderContainer);

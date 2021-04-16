
import { connect } from 'react-redux';
import { logout, login } from '../../redux/auth';
import Header from './Header/Header';

const HeaderContainer = (props) => {
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

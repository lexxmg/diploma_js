
import { connect } from 'react-redux';
import { login } from '../../redux/auth';
import Alert from './Alert/Alert';

const AlertContainer = (props) => {
  return (
    <>
      <Alert
        setShowAlert={props.setShowAlert}
        setRedirectToAuth={props.setRedirectToAuth}
        currentPage={props.currentPage}
        currentPosition={props.currentPosition}
        login={props.login}
      />
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    currentPage: state.photos.currentPage,
    currentPosition: state.photos.currentPosition
  }
}

export default connect(mapStateToProps, { login })(AlertContainer);


import { connect } from 'react-redux';
import { login } from '../../redux/auth';
import Alert from './Alert/Alert';

const AlertContainer = (props) => {
  return (
    <>
      <Alert setShowAlert={props.setShowAlert} setRedirectToAuth={props.setRedirectToAuth}/>
    </>
  )
}
const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps, { login })(AlertContainer);

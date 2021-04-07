
import './auth.css';
import { Redirect, withRouter } from 'react-router-dom';
import { unsplashApi } from '../../../api/api';
import { useEffect } from 'react';

const Auth = (props) => {
  useEffect(() => {
    console.log(props);
    unsplashApi.auth();
  }, [props]);

  return (
    <div className="auth-container">
      { false && <Redirect to="/" />}
    </div>
  )
}

export default withRouter(Auth);

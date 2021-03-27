
import './photo-full-container.css'
import { connect } from 'react-redux';
import PhotoFull from './PhotoFull/PhotoFull';
//import Preloader from '../Common/Preloader/Preloader.jsx';
//import TopBarFullPhoto from './TopBarFullPhoto/TopBarFullPhoto';
import { getFullPhoto } from '../../redux/fullPhoto';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const PhotoFullContainer = (props) => {
  useEffect(() => {
    props.getFullPhoto(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="photo-full-container">
      <PhotoFull {...props}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fullPhoto: state.fullPhoto.photo,
    likes: state.fullPhoto.likes,
    firstName: state.fullPhoto.firstName,
    loading: state.fullPhoto.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFullPhoto: (photoId) => {
      dispatch( getFullPhoto(photoId) );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoFullContainer));

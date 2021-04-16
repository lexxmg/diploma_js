
import './photo-full-container.css'
import { connect } from 'react-redux';
import PhotoFull from './PhotoFull/PhotoFull';
//import Preloader from '../Common/Preloader/Preloader.jsx';
//import TopBarFullPhoto from './TopBarFullPhoto/TopBarFullPhoto';
import { getFullPhoto, photoLike, photoUnLike } from '../../redux/fullPhoto';
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const PhotoFullContainer = (props) => {
  useEffect(() => {
    props.getFullPhoto(props.match.params.id);
    window.localStorage.removeItem('currentFullPhotoId');
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
    updatedAt: state.fullPhoto.updatedAt,
    html: state.fullPhoto.html,
    profileImageLarge: state.fullPhoto.profileImageLarge,
    altDescription: state.fullPhoto.altDescription,
    likes: state.fullPhoto.likes,
    name: state.fullPhoto.name,
    loading: state.fullPhoto.loading,
    likedByUser: state.fullPhoto.likedByUser,
    id: state.fullPhoto.id,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFullPhoto: (photoId) => {
      dispatch( getFullPhoto(photoId) );
    },
    photoLike: (photoId) => {
      dispatch( photoLike(photoId) );
    },
    photoUnLike: (photoId) => {
      dispatch( photoUnLike(photoId) );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoFullContainer));

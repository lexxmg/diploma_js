
import './photo-full-container.css'
import { connect } from 'react-redux';
import PhotoFull from './PhotoFull/PhotoFull';
import Preloader from '../Common/Preloader/Preloader.jsx';
import { setFullPhoto } from '../../redux/photos';
import { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

const PhotoFullContainer = (props) => {
  useEffect(() => {
    props.getFullPhoto(props.match.params.id);
    return () => {
      props.getFullPhoto(null)
    }
  }, [ props.match.params.id ]);


  return (
    <div className="photo-full-container">
      <Link to="/"><h1>назад</h1></Link>

      <PhotoFull {...props} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fullPhoto: state.photos.fullPhoto
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFullPhoto: (photoId) => {
      dispatch( setFullPhoto(photoId) );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PhotoFullContainer));

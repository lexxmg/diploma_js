
import './photo-full-container.css'
import { connect } from 'react-redux';
import PhotoFull from './PhotoFull/PhotoFull';
import Preloader from '../Common/Preloader/Preloader.jsx';
import { getFullPhoto } from '../../redux/fullPhoto';
import { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

const PhotoFullContainer = (props) => {
  useEffect(() => {
    props.getFullPhoto(props.match.params.id);
  }, []);

  return (
    <div className="photo-full-container">
      {props.loading && <Preloader />}

      <Link to="/"><h1>назад</h1></Link>

      <PhotoFull fullPhoto={props.fullPhoto}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fullPhoto: state.fullPhoto.photo,
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

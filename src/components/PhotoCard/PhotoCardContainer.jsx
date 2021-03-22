
import './photo-card-container.css';
import { connect } from 'react-redux';
import { getPhotos, setCurrentPage, addingPhoto } from '../../redux/photos';
import { useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PhotoCatd from './PhotoCard/PhotoCard';

const PhotoCardContainer = (props) => {
  //const [ photos, setPhotos ] = useState([]);

  useEffect(() => {
    props.detPhoto(props.currentPage, 3);
    //props.setCurrentPage(props.currentPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="photo-card-container fixed-container">
      <button
        className="photo-card-container"
        onClick={props.addingPhoto}
      >next</button>

      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
      >
         <Masonry gutter="10px">
            {
              props.photos.map(obj => {
                return <PhotoCatd key={obj.id} photo={obj} />
              })
            }
         </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    photos: state.photos.photos,
    currentPage: state.photos.currentPage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    detPhoto: (page, perPage) => {
      dispatch( getPhotos(page, perPage) );
    },
    setCurrentPage: (page) => {
      dispatch( setCurrentPage(page) );
    },
    addingPhoto: () => {
      dispatch( addingPhoto() );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCardContainer);

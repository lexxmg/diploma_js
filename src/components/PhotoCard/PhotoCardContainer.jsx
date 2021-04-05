
import './photo-card-container.css';
import { connect } from 'react-redux';
import { getPhotos, setCurrentPage } from '../../redux/photos';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PhotoCatd from './PhotoCard/PhotoCard';
import Preloader from '../Common/Preloader/Preloader.jsx';

const PhotoCardContainer = (props) => {
  const observer = new IntersectionObserver(observerHandle, { threshold: 1 });

  useEffect(() => {
    if (props.photos.length === 0 && !props.loading) {
      addPhoto();
    }
  });

  function observerHandle(entries, observer) {
    const photoEnd = document.querySelectorAll('.div-end');

    entries.forEach((item, i) => {
      if (item.intersectionRatio <= 0) return;
      //console.log(item);
      console.log('load next');
      addPhoto();

      for (let i = 0; i < photoEnd.length; i++) {
        observer.unobserve(photoEnd[i]);
      }
    });
  }

  useEffect(() => {
    const photoEnd = document.querySelectorAll('.div-end');
      if (photoEnd) {

        photoEnd.forEach((item, i) => {
          observer.observe(photoEnd[i]);
        });

        return () => {
          photoEnd.forEach((item, i) => {
            observer.unobserve(photoEnd[i]);
          });
        }
      }
  });

  function addPhoto() {
    props.getPhoto(props.currentPage, 10)
      .then(() => {
        props.setCurrentPage(props.currentPage + 1);
        //setLoad(true);
      });
  }

  return (
    <div className="photo-card-container fixed-container">
      <button
        className="photo-card-container"
        onClick={addPhoto}
      >next
      </button>

      {props.loading && <Preloader />}

      <ResponsiveMasonry
        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
      >
         <Masonry gutter="10px">
            {
              props.photos.map(obj => {
                if (obj.end === 'end') {
                  return <div key={obj.key}className="div-end"></div>
                }
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
    currentPage: state.photos.currentPage,
    loading: state.photos.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoto: (page, perPage) => {
      return dispatch( getPhotos(page, perPage) );
    },
    setCurrentPage: (page) => {
      dispatch( setCurrentPage(page) );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCardContainer);


import './photo-card-container.css';
import { connect } from 'react-redux';
import { getPhotos, setCurrentPage } from '../../redux/photos';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PhotoCatd from './PhotoCard/PhotoCard';
import Preloader from '../Common/Preloader/Preloader.jsx';

const PhotoCardContainer = (props) => {
  const [ load, setLoad ] = useState(true);
  const [ scrollBarWidth, setScrollBarWidth ] = useState(0);

  useEffect(() => {
    const photoEnd = document.querySelector('.div-end');
    if (photoEnd) {
      //console.log(photoEnd);

      const observer = new IntersectionObserver(entries => {
        entries.forEach((item, i) => {
          if (item.intersectionRatio <= 0) return;
          console.log(item);
          console.log('load next');

          addPhoto();
          //observer.disconnect();
          // if (item.isIntersecting) {
          //   console.log('load next');
          //   entries.target.classList.add('div-end');
          //   observer.observe(entries.target);
          //
          //   //observer.unobserve(document.querySelectorAll('.div-end')[i]);
          // } else {
          //   entries.target.classList.remove('div-end');
          // }
        });
      }, { threshold: 1 });

      observer.observe(document.querySelectorAll('.div-end')[0]);
      observer.observe(document.querySelectorAll('.div-end')[1]);
      observer.observe(document.querySelectorAll('.div-end')[2]);
      //
      return () => {
        observer.unobserve(document.querySelectorAll('.div-end')[0]);
        observer.unobserve(document.querySelectorAll('.div-end')[1]);
        observer.unobserve(document.querySelectorAll('.div-end')[2]);
      }
    }
  });

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    setScrollBarWidth(document.documentElement.clientWidth - clientWidth);
    document.documentElement.style.overflow = '';
    console.log(scrollBarWidth);
  }, [scrollBarWidth]);

  const addPhoto = () => {
    props.getPhoto(props.currentPage, 10)
      .then(() => {
        props.setCurrentPage(props.currentPage + 1);
        setLoad(true);
      });
  }

  const scrollEnd = () => {
    const position = (
      document.body.clientHeight - document.documentElement.clientHeight - window.pageYOffset
    );

    //console.log(position);

    if (position <= 300 && position > 0 && load ) {
      addPhoto();
      setLoad(false);
    }
  }

  useEffect(() => {
    if (props.loading) {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.paddingRight = scrollBarWidth + 'px';
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
    }

    if (props.photos.length === 0 && !props.loading) {
      addPhoto();
    }

    document.addEventListener('scroll', scrollEnd);

    return () => {
      document.removeEventListener('scroll', scrollEnd);
    }
  });

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

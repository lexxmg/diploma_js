
import './photo-card-container.css';
import { connect } from 'react-redux';
import { getPhotos, setCurrentPage, setCurrentPosition } from '../../redux/photos';
import { isAutoriazed } from '../../redux/auth';
import { Component } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import PhotoCatd from './PhotoCard/PhotoCard';
import Preloader from '../Common/Preloader/Preloader.jsx';

class PhotoCardContainer extends Component {
  addPhoto() {
    this.props.getPhoto(this.props.currentPage, 10)
      .then(() => {
        this.props.setCurrentPage(this.props.currentPage + 1);
        //setLoad(true);
      });
  }

  observerPhotoEnd() {
    const photoEnd = document.querySelectorAll('.div-end');

    if (photoEnd) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((item, i) => {
          if (item.intersectionRatio <= 0) return;
          //console.log(item);
          //console.log('load next');
          this.addPhoto();
          //console.log(photoEnd);
          // for (let i = 0; i < 3; i++) {
          //   observer.unobserve(photoEnd[i]);
          // }
          observer.disconnect();
        });
      }, { threshold: 0.1 });

      photoEnd.forEach((item, i) => {
        observer.observe(photoEnd[i]);
      });
    }
  }

  componentDidMount() {
    const code = window.location.search.split('code=')[1];
    window.scroll(0, this.props.currentPosition);

    if (this.props.photos.length === 0 && !code) {
      this.addPhoto();
    }

    this.observerPhotoEnd();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPage !== prevProps.currentPage) {
      this.observerPhotoEnd();
    }
  }

  componentWillUnmount() {
    const currentPosition = window.pageYOffset;
    this.props.setCurrentPosition(currentPosition);
  }

  render() {
    return (
      <div className="photo-card-container fixed-container">
        <button
          className="photo-card-container"
          onClick={() => { this.addPhoto() } }
        >next
        </button>

        {this.props.loading && <Preloader />}

        <ResponsiveMasonry
          columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
        >
           <Masonry gutter="10px">
              {
                this.props.photos.map(obj => {
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
}


const mapStateToProps = (state) => {
  return {
    photos: state.photos.photos,
    currentPage: state.photos.currentPage,
    loading: state.photos.loading,
    currentPosition: state.photos.currentPosition,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPhoto: (page, perPage) => {
      return dispatch( getPhotos(page, perPage) );
    },
    setCurrentPage: (page) => {
      dispatch( setCurrentPage(page) );
    },
    setCurrentPosition: (position) => {
      dispatch( setCurrentPosition(position) );
    },
    isAutoriazed: () => {
      dispatch( isAutoriazed() );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCardContainer);


import './photo-full.css';
import TopBarFullPhoto from '../TopBarFullPhoto/TopBarFullPhoto'

const PhotoFull = (props) => {
  console.log(props);
  return (
    <div className="photo-full">
      <TopBarFullPhoto />

      <div className="photo-full__container">
        <div className="photo-full__img-container">
          {
            props.fullPhoto && Object.keys(props.fullPhoto).length !== 0 &&
              <img className="photo-full__img"
                src={props.fullPhoto.urls.full}
                alt={props.fullPhoto.alt_description}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default PhotoFull;

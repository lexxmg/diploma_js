
import './photo-full.css';

const PhotoFull = (props) => {
  return (
    <div>
      <div className="photo-full__img-container">
        {
          props.fullPhoto &&
            <img
              src={props.fullPhoto.urls.full}
              alt={props.fullPhoto.alt_description}
            />
        }
      </div>
    </div>
  )
}

export default PhotoFull;

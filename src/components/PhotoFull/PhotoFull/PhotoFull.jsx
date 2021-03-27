
import './photo-full.css';
import TopBarFullPhoto from '../TopBarFullPhoto/TopBarFullPhoto'

const PhotoFull = (props) => {
  const { fullPhoto, altDescription } = props;
  return (
    <div className="photo-full">
      <TopBarFullPhoto {...props}/>

      <div className="photo-full__container">
        <div className="photo-full__img-container">
          {
            fullPhoto &&
              <img className="photo-full__img"
                src={fullPhoto}
                alt={altDescription}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default PhotoFull;

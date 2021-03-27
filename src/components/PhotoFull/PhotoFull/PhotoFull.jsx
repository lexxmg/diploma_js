
import './photo-full.css';
import TopBarFullPhoto from '../TopBarFullPhoto/TopBarFullPhoto'

const PhotoFull = (props) => {
  console.log(props.fullPhoto);
  return (
    <div className="photo-full">
      <TopBarFullPhoto {...props}/>

      <div className="photo-full__container">
        <div className="photo-full__img-container">
          {
            props.fullPhoto &&
              <img className="photo-full__img"
                src={props.fullPhoto}
                alt={'props.fullPhoto.alt_description'}
              />
          }
        </div>
      </div>
    </div>
  )
}

export default PhotoFull;


import './photo-full.css';

const PhotoFull = (props) => {
  console.log(props);
  return (
    <div>
    { props.fullPhoto && Object.keys(props.fullPhoto).length !== 0 && <img src={props.fullPhoto.urls.full} alt=""/> }
    </div>
  )
}

export default PhotoFull;

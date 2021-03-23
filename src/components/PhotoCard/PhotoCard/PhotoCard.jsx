
import './photo-card.css';
import { useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const PhotoCatd = (props) => {
  const [ descriptionShow, setDescriptionShow ] = useState(false);

  //console.log(props.photo);

  return (
    <NavLink to={"/full/" + props.photo.id}>
      <div className={cn('photo-card', {darkened: descriptionShow})}
        onMouseOver={() => setDescriptionShow(true)}
        onMouseOut={() => setDescriptionShow(false)}
      >

        <img
          className="photo-card__img"
          src={props.photo.urls.small}
          alt={props.photo.photoalt_description}
        />

        {descriptionShow && <PhotoDescriptions {...props} />}
      </div>
    </NavLink>
  )
}

function PhotoDescriptions(props) {
  return (
    <div className="photo-card__descriptions photo-card-descriptions">
      <p className="photo-card-descriptions__likes">{props.photo.likes}</p>
      <p className="photo-card-descriptions__data">{props.photo.created_at.split('T')[0]}</p>
    </div>
  )
}

export default PhotoCatd;

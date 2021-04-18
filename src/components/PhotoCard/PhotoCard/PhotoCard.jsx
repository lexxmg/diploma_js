
import './photo-card.css';
import { useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

const PhotoCatd = (props) => {
  const [ descriptionShow, setDescriptionShow ] = useState(false);

  //console.log(props.photo);

  return (
    <div className={cn('photo-card', {darkened: descriptionShow})}
      onMouseOver={() => setDescriptionShow(true)}
      onMouseOut={() => setDescriptionShow(false)}
    >

      <img
        className="photo-card__img"
        src={props.photo.urls.small}
        alt={props.photo.alt_description}
      />

      {descriptionShow && <PhotoDescriptions {...props} />}
    </div>
  )
}

function PhotoDescriptions(props) {
  return (
    <div className="photo-card__descriptions photo-card-descriptions">
      <NavLink to={"/full/" + props.photo.id}>+</NavLink>

      <div className="photo-card-descriptions__container">
        <span className="photo-card-descriptions__like-icon icon-thumbs-up"></span>
        <span className="photo-card-descriptions__likes">{props.photo.likes}</span>
      </div>

      <p className="photo-card-descriptions__data">{props.photo.created_at.split('T')[0]}</p>

      <a href={props.photo.links.html}
        className="photo-card-descriptions__link"
        target="_blanc"
      >
        {props.photo.user.name}
      </a>
    </div>
  )
}

export default PhotoCatd;

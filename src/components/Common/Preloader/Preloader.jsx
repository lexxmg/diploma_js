
import './preloader.css';
import preloader from '../../../assets/images/preloader_2.gif';

const Preloader = (props) => {
  return (
    <div className="preloader">
      <div className="preloader__inner">
        <div className="preloader__imgt-container">
          <img src={preloader} alt="preloader" className="preloader__img"/>
        </div>

        <span className="preloader__text">Загрузка...</span>
      </div>
    </div>
  )
}

export default Preloader;

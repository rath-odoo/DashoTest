import classes from './ImageBigView.module.css';
import { BsXLg } from "react-icons/bs";

const ImageBigView = (props) => {
  const closeImageHandler = () => {
    props.onPress();
  };

  return (
    <div className={classes.imageBigViewParent}>
      <div className={classes.buttonDiv}>
        <button 
          type="button" 
          onClick={closeImageHandler} 
          className={classes.buttonCloseHandler}
        >
          <BsXLg size={20} />
        </button>
      </div>
      <div className={classes.imageBigView}>
        <img src={props.image} className={classes.imageOnly} alt="Big View" />
      </div>
    </div>
  );
};

export default ImageBigView;

import classes from './BookShortView.module.css';
//import NCERT11thPhysics from './NCERT11thPhysics.jpg';

const BookShortView =(props)=>{

return <div className={classes.bookShortView}>


 <img src={props.coverPage} alt='image'  className={classes.bookCoverPage} />



</div>
}

export default BookShortView;

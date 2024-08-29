import classes from './BookShortView.module.css';
//import NCERT11thPhysics from './NCERT11thPhysics.jpg';
import { useHistory } from "react-router-dom";



const BookShortView =(props)=>{

  let history = useHistory();



   const readBookHandler=()=>{

     history.push('/books/read');

   }





return <div className={classes.bookShortView}>


    <img src={props.coverPage} alt='image'  className={classes.bookCoverPage} />
    <button type="button" onClick={readBookHandler}>  
           Read this book
    </button>


</div>
}

export default BookShortView;





import classes from './RecoBooks.module.css';
import Book1 from './Book1.jpg';


const RecoBooks=()=>{


return(

<div className={classes.recoBooks}>

   <div className={classes.bookSec}> 
	<img className={classes.bookImage}src={Book1}/>
	<div className={classes.bookInfo}>
	    <div>Concept of Physics</div>
	    <div> H.C. Verma </div>
	    <div className={classes.readInfo}> 
	        <span> Read</span>
	        <span className={classes.readBlock}>
	            <div className={classes.readBlockProgress}> </div>
	        </span>
	    </div>
	</div>
   </div>



</div>


);
}

export default RecoBooks;

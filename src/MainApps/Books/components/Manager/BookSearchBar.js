import classes from './BookSearchBar.module.css';
import {BsSearch} from 'react-icons/bs';




const BookSearchBar =()=>{




return (

<div className={classes.bookSearchBar}>
<BsSearch className={classes.searchIcon}/>

<i> Search book</i>

</div>
);





}


export default BookSearchBar;




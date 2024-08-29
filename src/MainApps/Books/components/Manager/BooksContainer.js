import classes from './BooksContainer.module.css';

import BookShortView from './BookShortView';

import NCERT11thPhysics from './NCERT11thPhysics.jpg';

import HVerma11thPhysics from './HCVerma11thPhysics.jpg';



const BooksContainer =()=>{







return (

<div className={classes.booksContainer}>


  <BookShortView coverPage={NCERT11thPhysics}/>

  <BookShortView coverPage={HVerma11thPhysics}/>


</div>

);





}


export default BooksContainer;

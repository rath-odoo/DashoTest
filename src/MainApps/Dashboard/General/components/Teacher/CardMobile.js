


import classes from './CardMobile.module.css';

import {BsFillCheckSquareFill,BsThreeDotsVertical,
        BsCameraVideoFill,BsFillBasketFill, BsPersonPlusFill,
        BsUiChecksGrid,BsCurrencyDollar, BsChevronDoubleRight} from 'react-icons/bs';



import {RiVideoAddLine} from 'react-icons/ri';
import {AiOutlineUserAdd, AiOutlineRight} from 'react-icons/ai';
import {HiOutlineUserCircle} from 'react-icons/hi';




const CardMobile=()=>{


return (

<div className={classes.cardMobile}>

    
   <div className={classes.marginDiv}>

     <div className={classes.upperInfoDiv}> 
        <div className={classes.leftUpper}>
          <span className={classes.classname}> <b> Class-11   </b> </span>
          <span className={classes.students}>  <b> 110021 </b> </span>
	</div>
	 
	<div className={classes.rightUpperDiv}> 
	    <BsThreeDotsVertical/>
	</div>
     </div> 

     <div className={classes.courseNameDiv}>

	<b>Fundamental Concepts of Quantum Physics</b>
        <div className={classes.authorDiv}> 
	    <HiOutlineUserCircle/> 
	    <span>Dr. Bibhuprasad Mahakud</span>
	</div>

     </div>



      <div className={classes.lowerDiv}>


	<div className={classes.middleDiv}>

           <button className={classes.buttonStyle1} > <RiVideoAddLine/> </button>
	   <button className={classes.buttonStyle2} > <AiOutlineUserAdd/> </button>

	</div>

       
        <div className={classes.leftDiv}>
            <div className={classes.title}> Progress</div>
            <div className={classes.pbar}>
                <div className={classes.progressvalue}> </div>
            </div>
        </div>







        <div className={classes.rightDiv}>  
            <AiOutlineRight/>
	</div>

      </div>



   </div>
</div>
);


}

export default CardMobile;

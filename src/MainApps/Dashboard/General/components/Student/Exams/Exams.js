import React,{useRef,useEffect} from 'react';
import classes from './Exams.module.css'





const Exams=(props)=>{

const isMounted = useRef(false);
useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
            isMounted.current = false
            props.passMountInfo(false);
    }
   }, [props]);









return (

<div className={classes.exams}>

All your Exams


</div>

);

}

export default Exams;

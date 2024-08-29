import React,{useEffect, useRef} from 'react';
import classes from './Classes.module.css'





const Classes=(props)=>{

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

<div className={classes.classes}>

All your classes


</div>

);

}

export default Classes;

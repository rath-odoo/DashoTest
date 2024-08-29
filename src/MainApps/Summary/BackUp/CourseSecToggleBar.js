import React,{useState} from 'react';
import classes from "./CourseSecToggleBar.module.css";
import CourseSyllabus from './Syllabus/CourseSyllabus';


const CourseSecToggleBar = (props)=>{



const [privateInfo, setPrivateInfo] = useState(true);

const [ubuttonStyle, setUButtonStyle] = useState({

	borderColor:'none',
	backgroundColor: '#e0ebff',
	color: '#5177bd'

});

const [sbuttonStyle, setSButtonStyle] = useState({

        borderStyle:'solid',
	borderColor:'#e0ebff',
	backgroundColor: 'white',
	color:'#5177bd',


});




const privateInfoHandler = ()=>{
setPrivateInfo(true);
setUButtonStyle({backgroundColor:'#e0ebff',color:'#5177bd'});
setSButtonStyle({borderStyle:'solid', borderColor: '#e0ebff',color:'#bfbfbf'});	
}


const publicInfoHandler = () =>{

setPrivateInfo(false);
setUButtonStyle({borderStyle:'solid',borderColor:'#e0ebff',backgroundColor: 'white',color:'#bfbfbf'});
setSButtonStyle({borderStyle:'none', backgroundColor:'#e0ebff',color:'#5177bd'});


}




return (


<div className={classes.courseSecToggleBar}>
 <div className={classes.courseSecToggleBarButtons}>
    <button className={classes.privateInfo} onClick={privateInfoHandler} style={ubuttonStyle}> <b> UPDATES/PROGRESS </b> </button>


    <button className={classes.publicInfo} onClick={publicInfoHandler} style={sbuttonStyle}> <b> SYLLABUS/CONTENT </b></button>	
 </div>


  {!privateInfo && <CourseSyllabus  selectedCourse={props.selectedCourse}/>}

  {privateInfo && <div className={classes.updateDiv}>

  course update

  </div>}









</div>

);


}


export default CourseSecToggleBar;

import React,{useState,useEffect} from 'react';
import classes from './FormInputObjects.module.css';





export const TextInput = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>{props.label}</div>
          <div className={classes.name_inputDiv} >
            <input
              type="text"
              onChange={props.handleChange}
              name={props.name}
              className={classes.input_field}
              placeholder={props.placeholder}
              defaultValue=""
            />
         </div>
    </div>

}





export const OptionField = (props)=>{




 const [addedChapterNos, setAddedChapterNos]=useState([]);

  
  useEffect(()=>{

   let chapNos=[]

   props.addedChapters.map((chapter,index)=>{

    chapNos.push(chapter.chapternum);

    return null;	   

   });

   setAddedChapterNos(addedChapterNos=>chapNos);	  

  return()=>{

  setAddedChapterNos(addedChapterNos=>[]);

  }


  },[props.addedChapters]);	




  //console.log("added chaps: ", addedChapterNos);



return <div className={classes.name_div}>

        <div className={classes.name_txt}>{props.label}</div>
	<div className={classes.name_inputDiv} >

        <select name={props.name}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled>Choose an option</option>

          
           { props.options.map((option,index)=>{

                               
                       let optionAdded = addedChapterNos.includes(option.chapterno);

		       return <option key={index} value={option.chapterno} disabled={optionAdded}> 
			             {option.chapterno} 
		                     { optionAdded && " Exists"} 
			      </option>


 
                }

          )}

        </select>
    </div>
 </div>


}





export const OptionFieldSubmitValue = (props)=>{


return <div className={classes.name_div}>

        <div className={classes.name_txt}>{props.label}</div>
        <div className={classes.name_inputDiv} >

        <select name={props.name}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled>Choose an option</option>


          { props.options.map((option,index)=>{

                return <option key={index} value={option.name}> {option.name}  </option>

                }

          )}

        </select>
    </div>
 </div>


}

























export const OptionFieldSecondaryObjs = (props)=>{



return <div className={classes.name_div}>

        <div className={classes.name_txt}>{props.label}</div>
        <div className={classes.name_inputDiv} >

        <select name={props.name}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled>Choose an option</option>


          { props.options.map((option,index)=>{

                return <option key={index} value={option.id}> {option}  </option>

                }

          )}

        </select>
    </div>
 </div>


}







export const ParagraphField = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>{props.label}</div>
          <div className={classes.name_inputDiv} >
            <textarea
              type="text"
              onChange={props.handleChange}
              name={props.name}
              className={classes.inputText_field}
              placeholder={props.placeholder}
              defaultValue=""
            />
         </div>
    </div>

}



export const DateField = (props) =>{

return( 
	<div className={classes.name_div}>
        <div className={classes.name_txt}>{props.label}</div>
        <div className={classes.name_inputDiv}>
	{/*<div className={classes.dob_innerDiv2}>*/}
          <input
             type="date"
             onChange={props.handleChange}
             name={props.name}
	     className={classes.input_field_date}
             placeholder={props.placeholder}

          />
	{/*</div>*/}
       </div>

     </div>

);


}






export const CheckBoxInput = (props)=>{







  let arrayLength = Number(props.Courses.length);


  const [checkedState, setCheckedState] = useState(
    new Array(arrayLength).fill(false)
);




const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    props.setCheckedCourses(updatedCheckedState);
    setCheckedState(updatedCheckedState);	
}






return <div className={classes.name_div}>
          <div className={classes.name_txt}>{props.label}</div>

 
  {props.Courses.map((course, index)=>{

	return <div className={classes.name_inputDiv_checkBox} key={index}>
                     <div className={classes.courseName}> <i>COURSE CODE: {course.courseGlobalCode}</i></div>
                         <input
                             type="checkbox"
                             onChange={()=>handleOnChange(index)}
                             name={props.name}
                             className={classes.input_field_checkbox}
	                     checked={checkedState[index]}
                             value={checkedState}
                         />
              </div>
      }
   )   
  }

    </div>

}
























import React from 'react';
import classes from './FormInputObjects.module.css';
//import Switch from "react-switch";




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





export const FileInput = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>{props.label}</div>
          <div className={classes.name_inputDiv} >
            <input
              type="file"
              onChange={props.handleChange}
              name={props.name}
              className={classes.input_field}
	    />
         </div>
    </div>

}








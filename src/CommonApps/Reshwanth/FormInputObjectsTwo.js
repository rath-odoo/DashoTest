import classes from './FormInputObjectsTwo.module.css';





export const TextInput = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.parentShapeDiv}>
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
    </div>

}

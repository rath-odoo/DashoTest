

import classes from './OptionField.module.css';

const OptionField=(props)=>{




  return <div className={classes.name_div} style={{width:props.width}}>

        <select name={props.name}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled > 
                {props.defaultValue} 
         </option>
          
          { props.options.map((option,index)=>{

                  return <option key={index} value={option.id} style={{color:"grey"}} >  {option.name}  </option>
 
                }
          )}

        </select>
  </div>



}

export default OptionField;

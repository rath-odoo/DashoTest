import React,{useState} from 'react';
import classes from './FormInputObjects.module.css';
import Switch from "react-switch";

import {BsCheckLg} from 'react-icons/bs'


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





export const TextInput2 = (props)=>{

return <div className={classes.name_div} style={{width:"80%",marginBottom:"15px"}}>
          <div className={classes.name_txt}>{props.label}</div>
          <div className={classes.name_inputDiv} >
            <input
              type="text"
              onChange={props.handleChange}
              name={props.name}
              className={classes.input_field}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
            />
         </div>
    </div>

}


export const TextInput3 = (props)=>{

return <div className={classes.name_div} style={{width:"80%",marginBottom:"15px"}}>
          <div className={classes.name_txt}>{props.label}</div>
          <div className={classes.name_inputDiv} >
            <input
              type="text"
              onChange={props.handleChange}
              name={props.name}
              className={classes.input_field}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
            />

	   {  Object.keys(props.addedUser).length !== 0 &&	
           <i> {props.addedUser.firstname}{props.addedUser.lastname} <BsCheckLg style={{color:"green"}}/></i>
           }
         </div>

         <div className={classes.name_txt_search}>
	
		{

                props.searchUsers.map((user,index)=>{

                 return <button type='button' key={index}  className={classes.searchResultButton}  onClick={()=>props.selectedSpeaker({user})}> 
				<i>{user.firstname} {user.lastname}</i>  <i>{"+ Add"}</i> 
			</button>

		})

		}

	 </div>
    </div>

}













export const NumberInput = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>{props.label}</div>
          <div className={classes.name_inputDiv} >
            <input
              type="number"
              onChange={props.handleChange}
              name={props.name}
              className={classes.input_field}
              placeholder={props.placeholder}
              defaultValue=""
	      min="1" 
	      max="120"
            />
         </div>
    </div>

}





export const OptionField = (props)=>{


return <div className={classes.name_div}>

        <div className={classes.name_txt}>{props.label}</div>
	<div className={classes.name_inputDiv} >

        <select name={props.name}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled>Choose an option</option>

          
          { props.options.map((option,index)=>{

                return <option key={index} value={option}> {option}{"   minutes"}  </option>
 
                }

          )}

        </select>
    </div>
 </div>


}







export const OptionField2 = (props)=>{


return <div className={classes.name_div} style={{width:"80%",marginTop:"0px"}}>

        <div className={classes.name_txt}>{props.label}</div>
        <div className={classes.name_inputDiv} >

        <select name={props.name}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={props.defaultValue}>
          <option value="categoryDefault" disabled>Choose an option</option>


          { props.options.map((option,index)=>{

                return <option key={index} value={option}> {option}  </option>

                }

          )}

        </select>
    </div>
 </div>


}





























export const DayField = (props)=>{

   const [checked,setChecked]=useState(false);

   const handleChange=()=>{
     setChecked(!checked);
     props.setChecked(!checked);	  
   }	


   let hrOptions=["00","01","02","03","04","05","06","07","08","09","10","11","12"]
   let minOptions=["00","10","15","20","25","30","35","40","45","50","55","59"]
   let ampmOptions=["am","pm"]

   let classduration = ["00","10","15","20","25","30","35","40","45","50","55","59"]	





return <div className={classes.name_divDayOptions}>

        <div className={classes.name_txtDayOptions}><i className={classes.dayName}>{props.label}</i></div>
        <div className={classes.name_inputDivDayOptions} >
	

        <select name={props.selectedhour}  onChange={props.handleChange} type="text" className={classes.input_fieldDayOptions} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled >Hour</option>


          { hrOptions.map((option,index)=>{

                return <option key={index} value={option} disabled={!checked}> {option}  </option>

		      
                }

          )}

        </select>




       <select name={props.selectedminute}  onChange={props.handleChange} type="text" className={classes.input_fieldDayOptions} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled > Minute</option>


          { minOptions.map((option,index)=>{

                return <option key={index} value={option} disabled={!checked}>{option}  </option>



                }

          )}

       </select>



       <select name={props.selectedampm}  onChange={props.handleChange} type="text" className={classes.input_fieldDayOptions} defaultValue={"categoryDefault"}>
               <option value="categoryDefault" disabled>am or pm</option>


              { ampmOptions.map((option,index)=>{

                       return <option key={index} value={option} disabled={!checked}> {option}  </option>

                 }

             )}

       </select>


       {
       <select name={props.selectedduration}  onChange={props.handleChange} type="text" className={classes.input_fieldDuration} defaultValue={"categoryDefault"}>
               <option value="categoryDefault" disabled>meeting duration</option>


              { classduration.map((option,index)=>{

                       return <option key={index} value={option} disabled={!checked}> {option}{" minutes"}  </option>

                 }

             )}

       </select>
       }














       <div className={classes.toggleSwitch}>
		{<Switch onChange={handleChange} checked={checked} />}
       </div>

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
	<div className={classes.name_divDateField}>
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





export const DateField2 = (props) =>{

return(
        <div className={classes.name_divDateField} style={{marginTop:"0px",marginBottom:"0px"}}>
        <div className={classes.name_txt}>{props.label}</div>
        <div className={classes.name_inputDiv}>
        {/*<div className={classes.dob_innerDiv2}>*/}
          <input
             type="date"
             onChange={props.handleChange}
             name={props.name}
             className={classes.input_field_date}
             placeholder={props.placeholder}
             defaultValue ={props.defaultValue}
          />
        {/*</div>*/}
       </div>

     </div>

);


}
























export const TimeField = (props) =>{


let hrOptions = ["00","01","02","03","04","05","06","07","08","09","10","11","12"]

let minOptions = ["00","10","15","20","25","30","35","40","45","50","55","59"]	

let ampmOptions = ["am","pm"]	

return(
        <div className={classes.name_divTimeField}>
        <div className={classes.name_txt}>{props.label}</div>
        <div className={classes.name_inputDivTimeField}>
       
        <select name={props.selectedhour}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
               <option value="categoryDefault" disabled>Hour</option>


              { hrOptions.map((option,index)=>{

                       return <option key={index} value={option}> {option}  </option>

                 }

             )}

        </select>



         <select name={props.selectedminute}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
               <option value="categoryDefault" disabled>Minute</option>


              { minOptions.map((option,index)=>{

                       return <option key={index} value={option}> {option}  </option>

                 }

             )}

        </select>


        <select name={props.selectedampm}  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
               <option value="categoryDefault" disabled>A.M / P.M</option>


              { ampmOptions.map((option,index)=>{

                       return <option key={index} value={option}> {option}  </option>

                 }

             )}

        </select>


	</div>

     </div>

);


}










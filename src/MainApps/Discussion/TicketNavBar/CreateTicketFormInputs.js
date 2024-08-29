import classes from './CreateTicketFormInputs.module.css';





export const TicketTitle = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>Title</div>
          <div className={classes.name_inputDiv} >
            <input
              type="text"
              onChange={props.handleChange}
              name="title"
              className={classes.input_field}
              placeholder="Enter a title for the ticket"
              defaultValue=""
            />
         </div>
    </div>




}



export const TicketCategory = (props)=>{





return <div className={classes.name_div}>

        <div className={classes.name_txt}>Category</div>
	<div className={classes.name_inputDiv} >

        <select name="category"  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"categoryDefault"}>
          <option value="categoryDefault" disabled>Choose category</option>

          
          { props.ticketTypes.map((ticketType,index)=>{

                return <option key={index} value={ticketType.id}> {ticketType.name}  </option>
 
                }

          )}

        </select>
    </div>
 </div>


}



export const TicketKeywords = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>Keywords</div>
          <div className={classes.name_inputDiv} >
            <input
              type="text"
              onChange={props.handleChange}
              name="keywords"
              className={classes.input_field}
              placeholder="Enter few key words related to your query"
              defaultValue=""
            />
         </div>
    </div>

}



export const TicketPriority = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>Priority</div>
          <div className={classes.name_inputDiv} >
         
              <select name="priority"  onChange={props.handleChange} type="text" className={classes.input_field} defaultValue={"priorityDefault"}>

                  <option value="priorityDefault" disabled>Choose a priority</option>

                   <option value="Low" >Low</option>
                   <option value="Medium" >Medium</option>
		   <option value="High" >High</option>
		   <option value="Critical" >Critical</option>


  
              </select>

	  </div>
    </div>

}



export const TicketDescription = (props)=>{

return <div className={classes.name_div}>
          <div className={classes.name_txt}>Description</div>
          <div className={classes.name_inputDiv} >
            <textarea
              type="text"
              onChange={props.handleChange}
              name="description"
              className={classes.inputText_field}
              placeholder="Describe your query"
              defaultValue=""
            />
         </div>
    </div>

}














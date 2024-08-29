import classes from "./TicketDescription.module.css";

const TicketDescription = (props) => {

  return (

    <div className={classes.ticketDescription}>


      <div className={classes.descriptionTitle}> <button className={classes.descriptionButton}>   Description </button> </div>


      <div className={classes.descriptionContent}>

        {props.data.content}


      </div>


      <div>
        <hr className={classes.hrLine} />

      </div>




    </div>

  );

}

export default TicketDescription;



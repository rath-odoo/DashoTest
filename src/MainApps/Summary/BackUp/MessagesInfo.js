import classes from './MessagesInfo.module.css';




const MessagesInfo =()=>{

return <div className={classes.messagesInfo}>

  <button className={classes.button1}> <i>23</i> New Chat Messages </button>

  <button className={classes.button2}> <i>5</i> New Email Messages </button>

  <button className={classes.button3}>  <i>2 </i>new tickets, <i>10</i> new comments </button>		


</div>


}

export default MessagesInfo;

import classes3 from './All.module.css';
import AssignmentBox from './AssignmentBox';

function All(props){
  console.log('hello',props.assignmentdata);
    return(
      <div className={classes3.alldiv}>
     
     { 
        props.assignmentdata !==null && 
        props.assignmentdata.map((oneAssignment, index)=>{

          return <AssignmentBox key={index} oneAssignment={oneAssignment}/>
          
          })
          
      }


      </div>
    );
};
export default All;
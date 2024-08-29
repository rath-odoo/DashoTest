import classes from "./AssignmentPaper.module.css";

const AssignmentPaper = (props) => {
  return (
    <div className={classes.AssignmentPaper}>
      <h2>Assignment Paper Title</h2>
      <span>Assignment Paper Code: 01</span>
      <div>
        <p>
          <strong>Instructor</strong>
          <br />
          Name
        </p>
        <button>Create Questions</button>
      </div>
    </div>
  );
};
export default AssignmentPaper;

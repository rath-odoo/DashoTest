// Modal.js
import React from 'react';

const AlertTwoOptions = ({ message, option1, option2, onOption1, onOption2, onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p style={{color:"grey"}}>{message}</p>
        <div>
          <button onClick={() => { onOption1(); onClose(); }} style={{
           borderStyle:"solid",
	   padding:"10px",
	   width:"100px",
	   color:"red",
	   borderColor:"red",
	   backgroundColor:"white",
	   borderRadius:"10px",
	   cursor: "pointer",


	  }}>{option1}</button>
          <button onClick={() => { onOption2(); onClose(); }}  style={{
           borderStyle:"solid",
           padding:"10px",
           width:"100px",
           color:"var(--themeColor)",
           borderColor:"var(--themeColor)",
           backgroundColor:"white",
           borderRadius:"10px",
           cursor: "pointer",
           marginLeft:"20px"

          }}>{option2}</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default AlertTwoOptions;


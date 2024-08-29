
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import classes from "./SingleAssets.module.css";
import { OptionField, TextInput } from "../../CommonApps/FormInputObjects";
import Logo from "../../CommonApps/Logo";

const SingleAssets=({ id, assetName, quantity, status, startDate, onDelete, onEdit , isAdminOrOwner })=> {
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    asset_name: assetName,
    quantity: quantity,
    status: status ,
  });
  const [buttonState, setButtonState] = useState('Save');

  const handleEdit = () => {
    // setEditing(true);
    setShowWarning(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonState('Saving...');
    onEdit(id, editedData)
      .then(() => {
        setButtonState('Saved');
        setTimeout(() => {
          setButtonState('Save');
          setEditing(false);
          setShowWarning(false);
        }, 2000);
      });
  };

   
  const [showWarning, setShowWarning] = useState(false);
  
  const applyLeaveHandler = () => {
    // Here you can trigger the warning block
    setShowWarning(true);
  };


  const closeWarningHandler = () => {
    // Here you can close the warning block
    setShowWarning(false);
  };
 
 
  let statusOptions = [
    {"id":1, name:"available"}, 
    {"id":2, name:"in_use"},
    {"id":3, name:"retired"},
    {"id":4, name:"maintenance"},
]



  return (
    <div className={classes.assettsbtn}>
      {/* {editing ? (
        <>
          <input type="text" name="asset_name" value={editedData.asset_name} onChange={handleChange} />
          <input type="number" name="quantity" value={editedData.quantity} onChange={handleChange} />
          <input type="text" name="status" value={editedData.status} onChange={handleChange} />
          <button onClick={handleSubmit}>Save</button>
        </>
      ) : (
        <> */}


        
          <div className={classes.srNo}>{id}</div>
          <div className={classes.assetsname}>{assetName}</div>
          <div className={classes.quantity}>{quantity}</div>
          <div className={classes.status}>{status}</div>
          <div className={classes.startDate}>{startDate}</div>
          {isAdminOrOwner  && (  
          <div className={classes.quantity} onClick={applyLeaveHandler}>
            <BiEditAlt className={classes.editIcon} />
          </div>
          )}
          {isAdminOrOwner  && (  
          <div className={classes.quantity} onClick={() => onDelete(id)}>
            <BsTrash className={classes.deleteIcon} />
          </div>
          )}

          {showWarning && (
                   <div className={classes.overlay}>
                   <div className={classes.warningBlock}>
                     
                     <div>
                       <div>
                       <button className={classes.closeBtn} onClick={closeWarningHandler}>
                       <svg  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                       </button>
                       </div>
           
                       <div className={classes.logo}   >
                         <Logo /> 
                       </div>
           
                       <div className={classes.heading}>
                         Edit Assets
                       </div>
                     
                       <form type="submit" onSubmit={handleSubmit}>
           
                       <div className={classes.datesContainer}>
           
                       <div className={classes.dateStart}>
 
                       <div className={classes.labelAsset} ><span className={classes.asterisk}>*</span>Name of the Asset :</div>     
                        <input type="text" 
                        className={classes.assetNameInput}
 

                        name="asset_name"
                        value={editedData.asset_name}
                        onChange={handleChange} />
                       
                       </div>
                        
                         <div className={classes.dateEnd}>
                         <div className={classes.labelAsset} ><span className={classes.asterisk}>*</span>Quantity:</div>
                         <input 
                          
                         type="number"
                         name="quantity"
                         value={editedData.quantity}
                         className={classes.assetNameInput}
                         onChange={handleChange} />


                        </div>

                  </div>
           
                  <div className={classes.LeaveReasonConatainer}> 
                  <div className={classes.labelAsset} ><span className={classes.asterisk}>*</span>Status:</div>
                  {/* <input
                  className={classes.assetNameInput}
                   
                  type="text" name="status" value={editedData.status} onChange={handleChange} />  */}

                  <select
                  className={classes.assetNameInput}
                  type="text"
                    name="status"
                    value={editedData.status}
                    onChange={handleChange}
                  >
                    <option value="available">available</option>
                    <option value="in_use">in_use</option>
                    <option value="retired">retired</option>
                    <option value="maintenance">maintenance</option>
                  </select>
           
                  </div>


                 
           
                  <div className={classes.submitContainer}>
                  <button className={classes.submitBtn} type="submit">{buttonState}</button>
                </div>
                    </form>

                    
           
           
                     </div>
                   </div>
                   </div>
          )}


    </div>
  );
}

export default SingleAssets;

 

 

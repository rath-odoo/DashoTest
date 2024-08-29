import classes from "./Assets.module.css";
import {useState, useEffect, useRef} from 'react';
// import axios from "axios";

import SingleAssets from "./SingleAssets";
import Logo from "../../CommonApps/Logo";
import { OptionField, TextInput } from "../../CommonApps/FormInputObjects";
import { createAssetInstitute, deleteAsset, getAssets, updateAsset} from "../../CommonApps/AllAPICalls";

const Assets=(props)=> {


  const isMounted = useRef(false);

    useEffect(() => {
      isMounted.current = true;
      props.passMountInfo(true);
      return () => {
        isMounted.current = false;
        props.passMountInfo(false);
      };
   }, [props]);

   

  const [data, setData] = useState([]);
  // const [refresh, setRefresh] = useState(false);
  const [rerender, setRerender] = useState(false);	

  const [showWarning, setShowWarning] = useState(false);

  const applyLeaveHandler = () => {
    setShowWarning(true);
  };

  const closeWarningHandler = () => {
    setShowWarning(false);
  };
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instituteid = props.selectedInstitute.id;
        const assetsData = await getAssets(instituteid);  
        setData(assetsData);  
      } catch (error) {
        console.error("Error fetching assets data", error);
      }
    };

    fetchData();  
  }, [rerender, props, props.selectedInstitute.id]);

  // const handleRefresh = () => {
  //   setRefresh(!refresh);  
  // };

  const initialFormData = Object.freeze({
    asset_name: "",
    quantity: null ,  
    status: "",
});


const editAssetHandler = async (id, updatedData) => {
  try {
    const userId = props.userData.id;
    const instituteid = props.selectedInstitute.id;
    await updateAsset({ userId, instituteid, id, ...updatedData , props});
    
  } catch (error) {
    console.error("Error editing Asset", error);
  }
};
  
const [formData, updateFormData] = useState(initialFormData)

const [buttonState, setButtonState] = useState('Submit');

const handleChange = (e) => {
  const { name, value } = e.target;
  let selectedStatus = statusOptions.find(option => option.id === parseInt(value));
  if (selectedStatus) {
    updateFormData({
      ...formData,
      [name]: selectedStatus.name,
    });
  } else {
    updateFormData({
      ...formData,
      [name]: name === "quantity" ? parseInt(value) : value,
    });
  }
};


const handleSubmit = (event) => {
  event.preventDefault();
  const { asset_name, quantity, status } = formData;

  setButtonState('Creating...');
  
  const userId = props.userData.id;
  const instituteid = props.selectedInstitute.id;
  createAssetInstitute(formData, userId, instituteid, props)
    .then(() => {
      setButtonState('Created');
      setTimeout(() => {
        setButtonState('Submit');
      }, 2000);   
      setShowWarning(false);
    });
};

 

  const deleteAssetHandler = async (id) => {
    try {
      const userId = props.userData.id;
      const instituteid = props.selectedInstitute.id; 
      await deleteAsset({ userId, instituteid, id , props});
      setShowWarning(false);
   
    } catch (error) {
      console.error("Error deleting Asset", error);
       
    }
  };  
 
  let statusOptions = [
    { "id": "available", name: "Available" },
    { "id": "in_use", name: "In Use" },
    { "id": "retired", name: "Retired" },
    { "id": "maintenance", name: "Under Maintenance" },
  ];
  



  return (
    <div className={classes.mainBox}>

<div className={classes.demoText}>
      {/* <img src={Upcomming} className={classes.upcoming} /> */}
      {showWarning && (
        <div className={classes.overlay}>
        <div className={classes.warningBlock}>
          
          <div>
            <div>
            <button className={classes.closeBtn} onClick={closeWarningHandler}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
            </button>
            </div>

            <div className={classes.logo}   >
              <Logo />
            </div>

            <div className={classes.heading}>
              Create Assets
            </div>
          
            <form onSubmit={handleSubmit}>

            <div className={classes.datesContainer}>

                    <div className={classes.dateStart}>
                    <TextInput 
                          handleChange={handleChange}
                          name="asset_name"
                          label="Name of the Asset"
                          placeholder="e.g. Laptop "
                          requirement="*"
                          /> 
                      </div>

                

            </div>

            <div className={classes.LeaveReasonConatainer}> 

                   <div className={classes.dateEnd}>
                          <TextInput 
                          handleChange={handleChange}
                          label="Quantity"
                          name="quantity"
                          placeholder="e.g. 11"     
                          requirement="*"
                          />
                   </div>


                   <div className={classes.dateEnd}> 
                           <OptionField 
                            handleChange = {handleChange}
                           label = "Status"
                           name = "status"
                           defaultValue = "Select Status "
                           options = {statusOptions}
                           requirement="*"
                           />
                   </div>

            </div>
               
        

             

              
          

            <div className={classes.submitContainer}>
                  <button className={classes.submitBtn} type="submit">{buttonState}</button>
                </div>
         </form>


          </div>
        </div>
        </div>
      )}
  
      <div className={classes.btnContainer}> 

{props.isAdminOrOwner && ( 
        <button className={classes.btnLeave} type="button" onClick={applyLeaveHandler}> + Create Asset </button>
      )}
 

       

        </div>

     

	 </div>


      <div className={classes.assetsList}>
        <div className={classes.assetsListTitle}>Assets List</div>

        <div className={classes.topmenu}>
          <div className={classes.id}>ID</div>
          <div className={classes.name}>Assets Name</div>
          <div className={classes.quantity}>Quantity</div>
          <div className={classes.status}>Status</div>
          <div className={classes.startDate}>Added On</div>
          {props.isAdminOrOwner && ( 
          <div className={classes.quantity}>Edit</div>)}
          {props.isAdminOrOwner && ( 
          <div className={classes.quantity}>Delete</div>)}
        </div>

        <div className={classes.scrollContent}>
        {data.map((asset) => (
            <SingleAssets
              key={asset.id}
              id={asset.id}
              assetName={asset.asset_name}
              quantity={asset.quantity}
              status={asset.status}
              startDate={asset.created_at}
              onDelete={deleteAssetHandler} 
              onEdit={editAssetHandler}
              isAdminOrOwner={props.isAdminOrOwner}

            />
        ))}

          {/* <div className={classes.bottomDetails}>
            <div className={classes.totalnuofassets}>
              Total Number Of Assets :
            </div>

            <div className={classes.nuofAssets}>89</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Assets;

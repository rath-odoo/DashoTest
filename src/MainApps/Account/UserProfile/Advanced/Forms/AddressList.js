import React, { useState, useEffect } from 'react';
import { fetchAddressList, deletAddress, editAddress } from '../../../../../CommonApps/AllAPICalls';
import classes from "./AddressList.module.css";
import { BsTrash, BiEditAlt } from "react-icons/all";
import Logo from '../../../../../CommonApps/Logo';

const AddressList = (props) => {
  const [addresses1, setAddresses] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    careof: '',
    houseno: '',
    streetno: '',
    placename: '', 
    postoffice: '', 
    district: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    addressType: '',
    policestn: '', 
  });
  

  useEffect(() => {
    let isMounted = true;
  
    if (props.userData && props.userData.id) {
      const userId = props.userData.id;
      fetchAddressList(userId)
        .then(data => {
          if (isMounted) {
            setAddresses(data.addresses);
          }
        })
        .catch(error => {
          console.error('Error fetching academic details:', error);
        });
    }
  
    return () => {
      isMounted = false;
    };
  }, [rerender, props]);  

  const applyEditHandler = (addr) => {
    setEditingAddress(addr);

//     if (formData.address_type === "") {
//       alert('please select the Address Type');
//       return null;
// }
 
 
 
 

// if (formData.city === "") {
//       alert('please select the city');
//       return null;
// }



// if (formData.state === "") {
//   alert('please select the State');
//   return null;
// }

// if (formData.pincode === "") {
//   alert('please select the Pin Code');
//   return null;
// }

 
    setFormData({
        careof: addr.careof ,
    houseno: addr.houseno ,
    streetno: addr.streetno ,
    placename: addr.placename , // This field is not showing from the api
    postoffice: addr.postoffice , // This field is not showing from the api 
    district: addr.district ,
    pincode: addr.pincode ,
    city: addr.city ,
    state: addr.state ,
    country: addr.country ,
    policestn: addr.policestn, // This field is not showing from the api 
    addressType: addr.addressType ,
    });
    setShowWarning(true);
    setIsSubmitting(false);
  };
 

  const closeWarningHandler = () => {
    setShowWarning(false);
    setIsSubmitting(false);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const userId = props.userData.id;
      await deletAddress(id, userId, props);
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); 

    try {
        const userId = props.userData.id;
      await editAddress(editingAddress.id, userId, formData ,props);
      setIsSubmitting(true);  
    setIsSubmitted(false); 
      console.log(formData);
      closeWarningHandler();
    } catch (error) {
      console.error('Error editing address:', error);
    }
  };

  return (
    <div>
      <div>
        {addresses1.map(addr => (
          <div className={classes.mainDiv} key={addr.id}>
            <div className={classes.title}>
              {addr.addressType}  <button className={classes.deleteBtn} onClick={() => handleDeleteAddress(addr.id)}><BsTrash className={classes.trashBtn} /></button>
              <button onClick={() => applyEditHandler(addr)} className={classes.editBtn}><BiEditAlt /></button>
            </div>
            <div className={classes.divText}>
              <div className={classes.sameOne}>
                {addr.houseno}, {addr.streetno ? addr.streetno : 'N/A'}
              </div>
              <div className={classes.sameTwo}>
                {addr.city ? addr.city + ', ' : ''}{addr.state ? addr.state + ', ' : ''}{addr.country ? addr.country + ' - ' : ''}{addr.pincode ? addr.pincode : 'N/A'}
              </div>
              <div className={classes.sameThree}>
                {addr.addressType ? addr.addressType : 'N/A'}
              </div>

              <div className={classes.sameThree}>
               careof:{addr.careof ? addr.careof : 'N/A'}
              </div>
            
            </div>
          </div>
        ))}
      </div>

      {showWarning && (
        <div className={classes.overlay}>
          <div className={classes.warningBlock}>
           
           <div>
           <button className={classes.closeBtn} onClick={closeWarningHandler}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
              </button>
            </div>
            <div className={classes.logo}>
              <Logo />
            </div>
            <div className={classes.heading}>
              Edit Address
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>

            <div className={classes.divSix}>
                
            
                <label className={classes.label} htmlFor="addressType">
                    <span className={classes.redStar}>*</span> Address Type:
                </label>
                <select className={classes.borderBox} id="addressType" name="addressType"
                    value={formData.addressType}
                    onChange={handleFormChange}
                >
                    <option className={classes.option} value=""></option>
                    <option value="present">Present</option>
                    <option value="permanent">Permanent</option>
                </select>
                        </div>

                        <div className={classes.divSix}>
                <label className={classes.label} htmlFor="Place Name"><span className={classes.redStar}>*</span>Place Name:</label>
                <input className={classes.borderBox} type="text" id="placename" name="placename" value={formData.placename} onChange={handleFormChange} />
              </div>
              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="Post Office"><span className={classes.redStar}>*</span>Post Office:</label>
                <input className={classes.borderBox} type="text" id="postoffice" name="postoffice" value={formData.postoffice} onChange={handleFormChange} />
              </div>


              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="careof">Care Of:</label>
                <input className={classes.borderBox} type="text" id="careof" name="careof" value={formData.careof} onChange={handleFormChange}  />
              </div>

              <div className={classes.flexDivOne}> 
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="houseno">House Number:</label>
                <input className={classes.borderBox} type="text" id="houseno" name="houseno" value={formData.houseno} onChange={handleFormChange}   />
              </div>
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="streetno">Street Number:</label>
                <input className={classes.borderBox} type="text" id="streetno" name="streetno" value={formData.streetno} onChange={handleFormChange}   />
              </div>
              </div>

              

            <div className={classes.flexDivOne} > 
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="district"><span className={classes.redStar}>*</span>District:</label>
                <input className={classes.borderBox} type="text" id="district" name="district" value={formData.district} onChange={handleFormChange} />
              </div>
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="pincode"><span className={classes.redStar}>*</span>Pincode:</label>
                <input className={classes.borderBox} type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleFormChange} />
              </div>
              </div>

              <div className={classes.flexDivOne} > 
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="city"><span className={classes.redStar}>*</span>City:</label>
                <input className={classes.borderBox} type="text" id="city" name="city" value={formData.city} onChange={handleFormChange} />
              </div>
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="state"><span className={classes.redStar}>*</span>State:</label>
                <input className={classes.borderBox} type="text" id="state" name="state" value={formData.state} onChange={handleFormChange} />
              </div>
              </div>

              <div className={classes.flexDivOne} > 
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="country">Country:</label>
                <input className={classes.borderBox} type="text" id="country" name="country" value={formData.country} onChange={handleFormChange} />
              </div>
              <div className={classes.divTwo}>
                <label className={classes.label} htmlFor="policestn"><span className={classes.redStar}>*</span>Police Station:</label>
                <input className={classes.borderBox} type="text" id="policestn" name="policestn" value={formData.policestn} onChange={handleFormChange} />
              </div>
              </div>

             

                                        <div className={classes.submitContainer}>
              <button 
                  className={classes.submitBtn} 
                  type="submit" 
                  disabled={isSubmitting}  
                >
                  {isSubmitting ? 'Submitting...' : isSubmitted ? 'Submitted' : 'Submit'}
                </button>
            </div>
              
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressList;

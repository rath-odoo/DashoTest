import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './EditParentDetail.module.css';
import Logo from '../../../CommonApps/Logo';
import { getParentDetails, updateParentDetails } from '../../../CommonApps/AllAPICalls';

const EditParentDetails = (props) => {
    const [parentDetails, setParentDetails] = useState([]);
    const [error, setError] = useState(null);
  
 

    useEffect(() => {
        const userId = props.memberDetails.user.id;
        let isMounted = true;  
        getParentDetails(userId, props)
          .then(data => {
            if (isMounted) {  
              setParentDetails(data);
              setFormData(data);  
            }
          })
          .catch(err => setError(err));
    
        return () => {
          isMounted = false;  
        };
    }, [props]);
 


  const [formData, setFormData] = useState({
    father_name: '',
    mother_name: '',
    father_phone: '',
    mother_phone: '',
    father_email: '',
    mother_email: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = props.memberDetails.user.id;
    updateParentDetails(userId, formData , props)
   
      .then(data => {
        console.log('API response:', data); 
        props.onClose();
      })
      .catch(error => {
        console.error('API error:', error); 
      });
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div>
          <div className={classes.btnContainer}>
            <div className={classes.closeBtn} onClick={props.onClose}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
              </svg>
            </div>
          </div>

          <div className={classes.logo}>
            <Logo />
          </div>

          <div className={classes.heading}>
            Edit Parent Details
          </div>

          <form onSubmit={handleSubmit}>
            <div className={classes.datesContainer}>
              <div className={classes.dateStart}>
                <label className={classes.label}>
                  <span className={classes.redStar}>*</span>Father's Name:
                </label>
                <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className={classes.inputStyle} />
              </div>

              <div className={classes.dateStart}>
                <label className={classes.label}>
                  <span className={classes.redStar}>*</span>Mother's Name:
                </label>
                <input type="text" name="mother_name" value={formData.mother_name} onChange={handleChange} className={classes.inputStyle} />
              </div>
            </div>

            <div className={classes.datesContainer}>
              <div className={classes.dateStart}>
                <label className={classes.label}>
                  <span className={classes.redStar}>*</span>Father's Phone:
                </label>
                <input type="number" name="father_phone" value={formData.father_phone} onChange={handleChange} className={classes.inputStyle} />
              </div>

              <div className={classes.dateStart}>
                <label className={classes.label}>
                  <span className={classes.redStar}>*</span>Mother's Phone:
                </label>
                <input type="number" name="mother_phone" value={formData.mother_phone} onChange={handleChange} className={classes.inputStyle} />
              </div>

              <div className={classes.dateStart}>
                <label className={classes.label}>
                  <span className={classes.redStar}>*</span>Father's Email Id:
                </label>
                <input type="text" name="father_email" value={formData.father_email} onChange={handleChange} className={classes.inputStyle} />
              </div>

              <div className={classes.dateStart}>
                <label className={classes.label}>
                  <span className={classes.redStar}>*</span>Mother's Email Id:
                </label>
                <input type="text" name="mother_email" value={formData.mother_email} onChange={handleChange} className={classes.inputStyle} />
              </div>
            </div>

            <div className={classes.submitContainer}>
              <button className={classes.submitBtn} type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditParentDetails;

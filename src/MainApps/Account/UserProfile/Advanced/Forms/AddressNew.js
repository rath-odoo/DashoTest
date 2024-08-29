import React, { useState } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import classes from './AddressNew.module.css'; // Update the path based on your folder structure
import Logo from '../../../../../CommonApps/Logo';
import { TextInput, OptionField } from "./../../../../../CommonApps/FormInputObjects";
import { addAddress } from '../../../../../CommonApps/AllAPICalls';

const AddressNew = (props) => {
    const userId = props.userData.id;
    const [formData, setFormData] = useState({
        userId: userId,
        careof: "",
        houseno: "",
        streetno: "",
        placename: "",
        postoffice: "",
        district: "",
        policestn: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        address_type: ""
    });

    const [loading, setLoading] = useState(false);

    const handleCloseButtonClick = () => {
        props.onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formData.address_type === "") {
            alert('please select the Address Type');
            return null;
    }

    if (formData.placename === "") {
        alert('please select the Place Name');
        return null;
}

if (formData.postoffice === "") {
    alert('please select the Post office');
    return null;
}


     
    if (formData.district === "") {
            alert('please select the district');
            return null;
    }

    if (formData.policestn === "") {
        alert('please enter the Potice Station');
        return null;
}

    if (formData.city === "") {
            alert('please select the city');
            return null;
    }
    
  

if (formData.state === "") {
        alert('please select the State');
        return null;
}

if (formData.pincode === "") {
        alert('please select the Pin Code');
        return null;
}

        setLoading(true);  

        try {
            console.log("Form Data being submitted:", formData);
            await addAddress(formData, userId, props);  
            handleCloseButtonClick();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.warningBlock}>
                <div>
                    <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                    </button>

                    <div className={classes.logo}>
                        <Logo />
                    </div>
                    <div className={classes.heading}>
                        Add Address
                    </div>
                    <form onSubmit={handleSubmit}>

                    <div className={classes.divOne}>
                                <label className={classes.label} htmlFor="address_type">
                                    <span className={classes.redStar}>*</span> Address Type:
                                </label>
                                <select className={classes.borderBox} id="address_type" name="address_type"
                                    value={formData.address_type}
                                    onChange={handleChange}
                                >
                                    <option className={classes.option} value="Please select the Address type">Please select the Address type</option>
                                    <option value="present">Present</option>
                                    <option value="permanent">Permanent</option>
                                </select>
                            </div>


                        <div className={classes.fieldContainer}>
                        <TextInput
                                label="Place Name"
                                value={formData.placename}
                                name="placename"
                                handleChange={handleChange}
                                requirement="*"
                            />
                            <TextInput
                                label="Post Office"
                                value={formData.postoffice}
                                name="postoffice"
                                handleChange={handleChange}
                                requirement="*"
                            />


                            <TextInput
                                label="Care of"
                                value={formData.careof}
                                name="careof"
                                handleChange={handleChange}
                                // requirement="*"
                            />
                            <div className={classes.dateDiv}>
                                <div className={classes.startDate}>
                                    <TextInput
                                        label="House No"
                                        value={formData.houseno}
                                        name="houseno"
                                        handleChange={handleChange}
                                        // requirement="*"
                                    />
                                </div>
                                <div className={classes.endDate}>
                                    <TextInput
                                        label="Street No"
                                        value={formData.streetno}
                                        name="streetno"
                                        handleChange={handleChange}
                                        // requirement="*"
                                    />
                                </div>
                            </div>
                         
                            <div className={classes.dateDiv}>
                                <div className={classes.startDate}>
                                    <TextInput
                                        label="District"
                                        value={formData.district}
                                        name="district"
                                        handleChange={handleChange}
                                        requirement="*"
                                    />
                                </div>
                                <div className={classes.endDate}>
                                    <TextInput
                                        label="Police Stn"
                                        value={formData.policestn}
                                        name="policestn"
                                        handleChange={handleChange}
                                        requirement="*"
                                    />
                                </div>
                            </div>
                            <div className={classes.dateDiv}>
                                <div className={classes.startDate}>
                                    <TextInput
                                        label="City"
                                        value={formData.city}
                                        name="city"
                                        handleChange={handleChange}
                                        requirement="*"
                                    />
                                </div>
                                <div className={classes.endDate}>
                                    <TextInput
                                        label="State"
                                        value={formData.state}
                                        name="state"
                                        handleChange={handleChange}
                                        requirement="*"
                                    />
                                </div>
                            </div>
                            <div className={classes.dateDiv}>
                                <div className={classes.startDate}>
                                    <TextInput
                                        label="Postal Code"
                                        value={formData.pincode}
                                        name="pincode"
                                        handleChange={handleChange}
                                        requirement="*"
                                    />
                                </div>
                                <div className={classes.endDate}>
                                    <TextInput
                                        label="Country"
                                        value={formData.country}
                                        name="country"
                                        handleChange={handleChange}
                                        requirement="*"
                                    />
                                </div>
                            </div>
                           
                        </div>
                        <div className={classes.submitContainer}>
                            <button className={classes.submitBtn} type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddressNew;

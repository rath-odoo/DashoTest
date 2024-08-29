import { useState, useRef, useEffect } from 'react';
import classes from './OneLeavePolicy.module.css';
import { CiMenuKebab } from "react-icons/ci";
import UpdateLeavePolicyForm from './UpdateLeavePolicyForm';
import { deleteLeavePolicy } from '../../../CommonApps/AllAPICalls';
const OneLeavePolicy = (props) => {
    const [isOptions, setOptions] = useState(false);
    const [isShowEditForm, setShowEditForm] = useState(false);
    const changeOptionsHandler = () => {
        setOptions(!isOptions);
    }

    const editHandler = () => {
        setShowEditForm(!isShowEditForm);
        changeOptionsHandler();
    }

    const deleteHandler = async () => {
        let instituteId = props.institute.id;
        let userId = props.userData.id;
        let policyId = props.leavePolicy.id;
        await deleteLeavePolicy({ instituteId, userId, policyId })
        changeOptionsHandler();
        props.render();
        setShowDeleteConfirm(false)
    }
    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOptions(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(true);
    };
    const handleClose = () => {
        setShowDeleteConfirm(false);
    };


    return (<div className={classes.mainContainer}>
        <div className={classes.innerDiv}>
            <div className={classes.nameDiv}>
                {props.leavePolicy.name}
            </div>

            <div className={classes.totalCountDiv}>
                <div className={classes.numberDiv}>
                    {props.leavePolicy.total_leaves}

                </div>
                <div className={classes.iconDiv} onClick={changeOptionsHandler} ref={dropdownRef}>
                    <CiMenuKebab className={classes.menuIcon} />

                </div>
                <div className={`${classes.optionsDiv} ${isOptions ? classes.scale : ''}`} ref={dropdownRef}>
                    <div className={classes.editDiv} onClick={editHandler}>
                        Edit
                    </div>
                    <div className={classes.editDiv} onClick={handleDeleteConfirm}  >
                        Delete
                    </div>
                    {showDeleteConfirm && (
                        <div className={classes.overLay}>
                            <div className={classes.confirmDialog}>
                                <p className={classes.p}>Are you sure you want to Remove this Leave?</p>
                                <div className={classes.div1}>
                                    <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                    <button className={classes.deleteYes} onClick={deleteHandler}>Yes, Remove</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {
                    isShowEditForm &&
                    <UpdateLeavePolicyForm
                        userData={props.userData}
                        institute={props.institute}
                        render={props.render}
                        onPress={() => { setShowEditForm(!isShowEditForm) }}
                        leavePolicy={props.leavePolicy}
                    />
                }
            </div>
        </div>
    </div>);
}

export default OneLeavePolicy;
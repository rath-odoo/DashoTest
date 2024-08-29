import { useState, useEffect, useRef } from 'react';
import classes from './OfficialPersonInstitue.module.css';
import { CiEdit, CiMenuKebab } from 'react-icons/ci';
import { BiTrash } from 'react-icons/bi';
import { deleteinstituteofficial, editinstituteofficial } from '../../CommonApps/AllAPICalls';

const OfficialPersonInstitue = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [formValues, setFormValues] = useState({
        name: props.name,
        designation: props.role,
        contact_email: props.email,
        official_phone: props.phone,
    });

    const deleteofficialhandler = () => {
        const instId = props.selectedInstitute.id;
        const user_Id = props.userId;
        const serialNum = props.person.id;

        deleteinstituteofficial({ instId, user_Id, serialNum })
            .then((res) => {
                if (res.status === 200) {
                    props.getOfficialDetails();
                }
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSaveClick = () => {
        const instId = props.selectedInstitute.id;
        const user_Id = props.userId;
        const serialNum = props.person.id;

        editinstituteofficial({ instId, user_Id, serialNum, formValues })
            .then((res) => {
                if (res.status === 200) {
                    setIsEditing(false);
                    props.getOfficialDetails();
                }
            });
    };

    const editofficialhandler = () => {
        setIsEditing(true);
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={classes.contactDetails}>
            {props.isEditable ? <button className={classes.menuButton} onClick={toggleDropdown}>
                <CiMenuKebab />
            </button> : null}
            <div className={classes.details}>
                <div className={classes.detailItem}>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleInputChange}
                            className={classes.editInput}
                        />
                    ) : (
                        <span className={classes.nameText}>{props.name}</span>
                    )}
                </div>
                <div className={classes.detailItem}>
                    {isEditing ? (
                        <input
                            type="text"
                            name="designation"
                            value={formValues.designation}
                            onChange={handleInputChange}
                            className={classes.editInput}
                        />
                    ) : (
                        <span className={classes.roleText}>{props.role}</span>
                    )}
                </div>
                <div className={classes.emailphone}><div className={classes.detailItem2}>
                    {isEditing ? (
                        <input
                            type="email"
                            name="contact_email"
                            value={formValues.contact_email}
                            onChange={handleInputChange}
                            className={classes.editInput}
                        />
                    ) : (
                        props.email
                    )}
                </div>
                    <div className={classes.detailItem2}>
                        {isEditing ? (
                            <input
                                type="text"
                                name="official_phone"
                                value={formValues.official_phone}
                                onChange={handleInputChange}
                                className={classes.editInput}
                            />
                        ) : (
                            props.phone
                        )}
                    </div></div>
                <div className={classes.detailItem}>
                    {isEditing ? (
                        <button className={classes.actionButton} style={{ color: "white", backgroundColor: "var(--themeColor)", marginTop: '5px' }} onClick={handleSaveClick}>
                            Save
                        </button>
                    ) : (
                        <>
                            {showDropdown && (
                                <div className={classes.dropdownMenu} ref={dropdownRef}>
                                    <button className={classes.actionButton} onClick={editofficialhandler}>
                                        <CiEdit /> Edit
                                    </button>
                                    <button className={classes.actionButton} onClick={deleteofficialhandler}>
                                        <BiTrash /> Delete
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfficialPersonInstitue;

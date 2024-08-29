import { useEffect, useRef, useState } from 'react';
import classes from './TimeTable.module.css';
import { DeleteBatchesTimeTable, getinstitutebatches, getinstitutebatches2, getinstitutebatchestimetable, getinstitutebatchestimetable3, updateBatchTimetable } from '../../CommonApps/AllAPICalls';
import TimeTableForm from './TimeTableForm';
import UpdateTimeTableForm from './UpdateTimeTableForm';
import { BsThreeDotsVertical } from 'react-icons/bs';

const TimeTable = (props) => {
  const [timeTable, setShowTimeTable] = useState(false);
  const [instituteBatches, setInstituteBatches] = useState(null);
  const [instituteBatches2, setInstituteBatches2] = useState(null);
  const [institutetimetable, getinstitutebatchesTimeTable] = useState(null);
  const [menuVisible, setMenuVisible] = useState({});
  const [selectedTimeTableId, setSelectedTimeTableId] = useState(null);
  const [selectedExam, setSelectedExam] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [showupdateTimeTable, setshowupdateTimeTable] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);


  useEffect(() => {
    let instituteId = props.selectedInstitute.id;
    getinstitutebatches({ instituteId, getInstituteBatches: setInstituteBatches });
  }, [props]);

  useEffect(() => {
    let instituteId = props.selectedInstitute.id;
    getinstitutebatches2({ instituteId, getInstituteBatches2: setInstituteBatches2 });
  }, [props]);

  useEffect(() => {
    if (selectedExam) {
      let batchId = selectedExam;
      getinstitutebatchestimetable3({ batchId, getinstitutebatchesTimeTable });
    }
  }, [selectedExam, isUpdate]);

  const handleChange = (event) => {
    setSelectedExam(event.target.value);
  };

  const TimeTableHandler = () => {
    setShowTimeTable(true);
  };

  const timeTableClose = () => {
    setShowTimeTable(false);
  };

  const TimeTableUpdateHandler = (batchId) => {
    setSelectedTimeTableId(batchId);
    setshowupdateTimeTable(true);

  };

  const UpdateTimeTableClose = () => {
    setshowupdateTimeTable(false);
  };

  const openFileInNewTab = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  const deleteTimeTable = (batchId) => {
    const userId = props.userData.id;
    DeleteBatchesTimeTable({ batchId, props, userId })
      .catch(error => console.error('Error deleting timetable:', error));
  };

  const toggleMenu = (index) => {
    setMenuVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderFilePreview = (fileUrl) => {
    if (!fileUrl) return <span>No file available for preview</span>;

    const url = new URL(fileUrl);
    const fileExtension = url.pathname.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return <img className={classes.img} src={fileUrl} alt="TimeTable Preview" />;
    } else if (fileExtension === 'pdf') {
      return <iframe className={classes.pdfEmbed} src={fileUrl} width="100%" height="500px" style={{ border: 'none' }} />;
    } else {
      return <span>File format not supported for preview</span>;
    }
  };

  return (
    <div className={classes.container}>
      {timeTable &&
        <TimeTableForm
          onPress={timeTableClose}
          rerender={props.rerender}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          instituteBatches={instituteBatches}
        />
      }

      {showupdateTimeTable &&
        <UpdateTimeTableForm
          onPress={UpdateTimeTableClose}
          rerender={props.rerender}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          instituteBatches={instituteBatches}
          timeTableId={selectedTimeTableId}
          timeTable={institutetimetable?.slice(0, 1)[0]}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
        />
      }

      <div className={classes.headerTimeTableContainer}>
        <div>
          {props.isAdminOrOwner && (
            <button className={classes.schedule} type="button" onClick={TimeTableHandler}>Add TimeTable</button>
          )}
        </div>
        <div className={classes.dropdownContainer}>
          <select
            id="examSelect"
            value={selectedExam}
            onChange={handleChange}
            className={classes.selectl}
          >
            <option value="">Select Batch</option>
            {instituteBatches !== null && instituteBatches.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h1 className={classes.heading}>TimeTable</h1>

      <div className={classes.batchContainer}>
        {institutetimetable && institutetimetable.slice(0, 1).map((batch, index) => (
          <div key={index} className={classes.batchCard}>
            <div className={classes.headerContainer}>
              <div className={classes.batchContent}>
                <h2 className={classes.batchName}>TimeTable Name: {batch.name}</h2>
              </div>
              {props.isAdminOrOwner && (
                <button className={classes.updateButton} onClick={() => TimeTableUpdateHandler(batch.id)}>Update</button>
              )}
            </div>
            <div className={classes.pdfContainer}>
              {renderFilePreview(batch.file)}
              <div className={classes.overlay2}>
                <div className={classes.menuButton1}>{batch.batchtimetable?.name}</div>
                <button className={classes.viewButton} onClick={() => openFileInNewTab(batch?.file)}>View Timetable</button>
                {props.isAdminOrOwner && (
                  <button className={classes.menuButton} onClick={() => toggleMenu(index)}>⋮</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TimeTable;

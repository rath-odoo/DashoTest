import React, { useState } from 'react';
import classes from './Sms.module.css';
import deleteIcon from "./delete.png";
import eyeIcon from './eye.png';
import filterIcon from './setting.png'; 
import DetailsView from './DetailView';
const Header = ({ onCreateTemplate, totalEntries, onSearchTypeChange, onSearchQueryChange }) => (
  <div className={classes.header}>
    <div className={classes.control}>
      <label>Show Entries: {totalEntries}</label>
    </div>
    <button className={classes.button} onClick={onCreateTemplate}>Create Template</button>
    <div className={classes.filterSection}>
      <input type="text" placeholder="Search Here......." className={classes.search} onChange={onSearchQueryChange} />
    </div>
    <button className={classes.button2}>
      <img src={filterIcon} alt="Filter" className={classes.icon} />
      Filter
    </button>
  </div>
);

const TableHeader = () => (
  <div className={`${classes.tableheader} ${classes.tablerow}`}>
    <div>Title</div>
    <div>Date</div>
    <div>To</div>
    <div>Type</div>
    <div>Status</div>
    <div>Action</div>
  </div>
);

const Row = ({ time, title, to, type, status, onClick, onDelete }) => (
  <>
    <div className={`${classes.tablerow} ${classes.tableborder}`} onClick={onClick}>
      <div>{title}</div>
      <div>{time}</div>
      <div>{to}</div>
      <div>{type}</div>
      <div className={`${classes.status} ${classes[status.toLowerCase()]}`}>{status}</div>
      <div className={classes.actions}>
        {/* <div className={classes.actionItem}>
          <img src={eyeIcon} alt="View" className={classes.icon} />
          <span className={classes.tooltip}>View</span>
        </div> */}
        <div className={classes.actionItem} onClick={onDelete}>
          <img src={deleteIcon} alt="Delete" className={classes.icon} />
          <span className={classes.tooltip}>Delete</span>
        </div>
      </div>
    </div>
  </>
);

const Table = ({ rows, onRowClick, onDeleteRow }) => (
  <div className={classes.tablecontainer}>
    <TableHeader />
    {rows.map((row, index) => (
      <Row
        key={index}
        {...row}
        onClick={() => onRowClick(index)}
        onDelete={(e) => {
          e.stopPropagation();
          onDeleteRow(index);
        }}
      />
    ))}
  </div>
);

const Form = ({ onClose }) => (
  <div className={`${classes.overLay} ${classes.active}`}>
    <div className={classes.formcontainer}> 
      <button className={classes.closeBtn} onClick={onClose}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          className="CreateCourseForm_closeButtonIcon__3mLN8"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
        </svg>
      </button>
      <h2>Send SMS</h2>
      <form className={classes.formL}>
        {/* <div className={classes.formgroup}>
          <label>Add Numbers via</label>
          <div className={classes.tabs}>
            <button type="button">Enter Manually</button> 
            <button type="button">CSV File</button>
            <button type="button">Connect Google Spreadsheet</button>
          </div>
        </div> */}
        {/* <div className={classes.formgroup}>
          <label>Enter Mobile Numbers here</label>
          <textarea placeholder="Enter comma separated mobile numbers with country code excluding the + sign." required />
        </div> */}
        <div className={classes.formgroup}>
          <label>Message</label>
          <div className={classes.tabs}>
            <button type="button">Enter Message Manually</button>
            <button type="button">Use SMS Template</button>
          </div>
          <input type="text" placeholder="DLT Template ID" required />
          <textarea placeholder="Enter Message Here..." required />
        </div>
        {/* <div className={classes.formgroup}>
          <label>From</label>
          <select required>
            <option value="" disabled>Select Sender ID</option>
            <option value="sender1">Sender 1</option>
            <option value="sender2">Sender 2</option>
          </select>
        </div> */}
        <div className={classes.formactions}>
          <button type="submit" className={classes.button}>Review & Send</button>
          <button type="button" className={classes.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
);

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState({ show: false, index: null });
  const [searchType, setSearchType] = useState("template");
  const [searchQuery, setSearchQuery] = useState("");
  const rows = [
    { time: '10-07-24', title: 'Admission Notification', to: '9876543637 &100 more..', type: 'sms', status: 'Sending' },
    { time: '20-06-24', title: 'New Batch', to: '9876543637 &50 more..', type: 'Email', status: 'Delivered' },
    { time: '15-05-24', title: 'Event Reminder', to: '9876543637 &250 more..', type: 'Whatsapp', status: 'Delivered' },
    { time: '18-04-24', title: 'Promotion', to: '9876543637 &150 more..', type: 'sms', status: 'Delivered' },
    { time: '30-03-24', title: 'Follow Up', to: '9876543637 &120 more..', type: 'Email', status: 'Delivered' },
    { time: '10-07-24', title: 'Admission Notification', to: '9876543637 &100 more..', type: 'sms', status: 'Sending' },
    { time: '20-06-24', title: 'New Batch', to: '9876543637 &50 more..', type: 'Email', status: 'Delivered' },
    { time: '15-05-24', title: 'Event Reminder', to: '9876543637 &250 more..', type: 'Whatsapp', status: 'Delivered' },
    { time: '18-04-24', title: 'Promotion', to: '9876543637 &150 more..', type: 'sms', status: 'Delivered' },
    { time: '30-03-24', title: 'Follow Up', to: '9876543637 &120 more..', type: 'Email', status: 'Delivered' },
    { time: '10-07-24', title: 'Admission Notification', to: '9876543637 &100 more..', type: 'sms', status: 'Sending' },
    { time: '20-06-24', title: 'New Batch', to: '9876543637 &50 more..', type: 'Email', status: 'Delivered' },
    { time: '15-05-24', title: 'Event Reminder', to: '9876543637 &250 more..', type: 'Whatsapp', status: 'Delivered' },
    { time: '18-04-24', title: 'Promotion', to: '9876543637 &150 more..', type: 'sms', status: 'Delivered' },
    { time: '30-03-24', title: 'Follow Up', to: '9876543637 &120 more..', type: 'Email', status: 'Delivered' },
    { time: '10-07-24', title: 'Admission Notification', to: '9876543637 &100 more..', type: 'sms', status: 'Sending' },
    { time: '20-06-24', title: 'New Batch', to: '9876543637 &50 more..', type: 'Email', status: 'Delivered' },
    { time: '15-05-24', title: 'Event Reminder', to: '9876543637 &250 more..', type: 'Whatsapp', status: 'Delivered' },
    { time: '18-04-24', title: 'Promotion', to: '9876543637 &150 more..', type: 'sms', status: 'Delivered' },
    { time: '30-03-24', title: 'Follow Up', to: '9876543637 &120 more..', type: 'Email', status: 'Delivered' },
    { time: '10-07-24', title: 'Admission Notification', to: '9876543637 &100 more..', type: 'sms', status: 'Sending' },
    { time: '20-06-24', title: 'New Batch', to: '9876543637 &50 more..', type: 'Email', status: 'Delivered' },
    { time: '15-05-24', title: 'Event Reminder', to: '9876543637 &250 more..', type: 'Whatsapp', status: 'Delivered' },
    { time: '18-04-24', title: 'Promotion', to: '9876543637 &150 more..', type: 'sms', status: 'Delivered' },
    { time: '30-03-24', title: 'Follow Up', to: '9876543637 &120 more..', type: 'Email', status: 'Delivered' },
    { time: '10-07-24', title: 'Admission Notification', to: '9876543637 &100 more..', type: 'sms', status: 'Sending' },
    { time: '20-06-24', title: 'New Batch', to: '9876543637 &50 more..', type: 'Email', status: 'Delivered' },
    { time: '15-05-24', title: 'Event Reminder', to: '9876543637 &250 more..', type: 'Whatsapp', status: 'Delivered' },
    { time: '18-04-24', title: 'Promotion', to: '9876543637 &150 more..', type: 'sms', status: 'Delivered' },
    { time: '30-03-24', title: 'Follow Up', to: '9876543637 &120 more..', type: 'Email', status: 'Delivered' }
  ];

  const filteredRows = rows.filter(row => row.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateTemplate = () => setShowForm(true);
  const handleFormClose = () => setShowForm(false);

  const handleRowClick = (index) => setSelectedRowIndex(index);

  const handleDeleteRow = (index) => {
    setDeleteWarning({ show: true, index });
  };

  const confirmDelete = () => {
    if (deleteWarning.index !== null) { 
      rows.splice(deleteWarning.index, 1);
      setDeleteWarning({ show: false, index: null });
    }
  };

  const cancelDelete = () => setDeleteWarning({ show: false, index: null });

  const handleBack = () => setSelectedRowIndex(null);

  return (
    <div className={classes.container}>
        <div className={classes.heading}>
            
        <h2>
            Bulk SMS
        </h2>

        </div>
      {deleteWarning.show && (
        <div className={classes.overlay}>
          <div className={classes.warning}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this row?</p>
            <button className={classes.confirmButton} onClick={confirmDelete}>Delete</button>
            <button className={classes.cancelButton} onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
      {selectedRowIndex !== null ? (
        <DetailsView row={rows[selectedRowIndex]} onBack={handleBack} />
      ) : (
        <>
          <Header

            onCreateTemplate={handleCreateTemplate}
            totalEntries={filteredRows.length}
            onSearchTypeChange={(e) => setSearchType(e.target.value)}
            onSearchQueryChange={(e) => setSearchQuery(e.target.value)}
          />
          <Table rows={filteredRows} onRowClick={handleRowClick} onDeleteRow={handleDeleteRow} />
          {showForm && <Form onClose={handleFormClose} />}
        </>
      )}
    </div>
  );
};

export default App;

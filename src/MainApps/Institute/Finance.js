import { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import classes from "./FeesTopBar.module.css";
import SingleFeesDetailView from "./SingleFeesDetailView";

import PayementSummery from "./PayementSummery";

import { BsDownload } from "react-icons/bs";

import SchedulePaymentForm from './Forms/SchedulePaymentForm';

import FilterForm from './Forms/FilterForm';

import { getInstituteFeesNPayments, getInstituteUserFeesNPayments } from '../../CommonApps/AllAPICalls';


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const Finance = (props) => {



  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);









  const [showPeopleDetails, setPeople] = useState(false);

  const [scheduledPayments, getScheduledPayments] = useState(null);

  const [rerender, setRerender] = useState(false);

  const initialFormData = Object.freeze({
    startDate: "1980-05-15T17:21:24.064191Z",

    endDate: "2050-05-15T17:21:24.064191Z"

  });


  const [formData, updateFormData] = useState(initialFormData)






  useEffect(() => {

    let institute_id = props.selectedInstitute.id;
    let user_id = props.userData.id;
    (props.isOwner || props.isAdminOrOwner) && getInstituteFeesNPayments({ institute_id, formData, getScheduledPayments });
    (!props.isOwner && !props.isAdminOrOwner) && getInstituteUserFeesNPayments({ institute_id, user_id, formData, getScheduledPayments });


  }, [rerender]);

  console.log("getInstitutePayments: ", scheduledPayments);

  const showPeopleDetailsHandler = () => {
    setPeople(true);
  };



  const [showPaymentScheduleForm, setShowPaymentScheduleForm] = useState(false);

  const [showFilterForm, setShowFilterForm] = useState(false);




  const showPaymentScheduleFormHandler = () => {
    setShowPaymentScheduleForm(true);
  }



  const closePaymentScheduleFormHandler = () => {
    setShowPaymentScheduleForm(false);
    setRerender(rerender => !rerender);
  }


  const showFilterFormHandler = () => {
    setShowFilterForm(true);
  }


  const closeFilterFormHandler = () => {
    setShowFilterForm(false);
  }



  const applyFilter = () => {


    setRerender(rerender => !rerender);
    setShowFilterForm(false);
  }

  const divRef = useRef();

  const handleDownloadPdfOld = async () => {
    const canvas = await html2canvas(divRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('download.pdf');
  };

  const handleDownloadPdf = async () => {
    const canvas = await html2canvas(divRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    const imgWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('download.pdf');
  };









  return (
    <div className={classes.parentClassmain} ref={divRef}>



      {showPaymentScheduleForm &&
        <SchedulePaymentForm onPress={closePaymentScheduleFormHandler}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
        />
      }



      {showFilterForm &&
        <FilterForm onPress={closeFilterFormHandler}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          updateFormData={updateFormData}
          formData={formData}
          applyFilter={applyFilter}
        />
      }










      <Switch>

        <Route exact path="/institute">

          <div className={classes.topNavigationBar}>
            {props.isAdminOrOwner &&
              <button className={classes.schedule} type="button" onClick={showPaymentScheduleFormHandler}> + Schedule A Payment</button>
            }

            <div>
              <button className={classes.showSummary} type="button" onClick={showFilterFormHandler}> Filter </button>
              <button onClick={handleDownloadPdf} type="button" className={classes.downLoadButton}><BsDownload size={20} /></button>
            </div>
            {/*  
      <div className={classes.contactN}>
        <button className={classes.instituteDropDownButton1} onClick={togglePayroll}>
          PayRoll
        </button>
        {showPayroll && (
          <div>
           


          </div>
        )}

        <button className={classes.instituteDropDownButton1} onClick={togglePurchaseAsset}>
          Purchase/Asset
        </button>
        {showPurchaseAsset && (
          <div>
          
          </div>
        )}

        <button className={classes.instituteDropDownButton1} onClick={toggleBillingInvoice}>
          Billing/Invoice
        </button>
        {showBillingInvoice && (
          <div>
          
          </div>
        )}
      </div>
       */}

          </div>



          <div className={classes.parentClass} >
            <div className={classes.b1}>Name & ID</div>
            <div className={classes.b2}>Amount</div>
            <div className={classes.b3}>Type</div>
            <div className={classes.b4}>Due Amount</div>
            {/*
        <div className={classes.b5}>Credited</div>
	  */}
            <div className={classes.b6}>Status</div>
            <div className={classes.b7}>Description</div>
            <div className={classes.b7}>Scheduled Date</div>
            <div className={classes.b8}>Details</div>
          </div>


          <div className={classes.scrollContent}>

            <div className={classes.monthDetailContainer}>
              {/*
        <div className={classes.mainIcon}>
          <BsCalendar2DateFill />
        </div>
        <div className={classes.monthTitle}>April</div>
	 */}
            </div>

            {scheduledPayments !== null && scheduledPayments.results.map((onePayment, index) => {

              return <SingleFeesDetailView key={index}
                onePayment={onePayment}
                userData={props.userData}
                isOwner={props.isOwner}
                isAdminOrOwner={props.isAdminOrOwner}
              />

            })

            }



            <PayementSummery userData={props.userData}
              selectedInstitute={props.selectedInstitute}
              rerender={rerender}
              formData={formData}
              isOwner={props.isOwner}
              isAdminOrOwner={props.isAdminOrOwner}
            />



          </div>

        </Route>

        {/* 
      <Route exact path="/institute">
          <PaymentDetail/>
      </Route>
    */}

      </Switch>


    </div>
  );
}

export default Finance;

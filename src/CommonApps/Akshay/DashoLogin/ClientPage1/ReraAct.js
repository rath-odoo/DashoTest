import { useEffect, useState, useRef } from "react";
import classes from "./ReraAct.module.css";

import SingleReraAct from "./SingleReraAct";

import Act from "./act.png";
import Notice from "./notice.png";
import Rules from "./rules.png";
import Regulation from "./regulation.png";

import SingleNotice from "./SIngleNotice";

const ReraAct = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  let num1 = "1";
  let num2 = "2";
  let num3 = "3";
  let num4 = "4";
  let num5 = "5";
  let num6 = "6";
  let num7 = "7";
  let num8 = "8";
  let num9 = "9";
  let num10 = "10";
  let num11 = "11";
  let num12 = "12";
  let num13 = "13";
  let num14 = "14";
  let num15 = "15";

  let text1 = "Increase of Fees";
  let text2 =
    "Notification of Panchayat Raj & DW Department on Real Estate Project Development in Rural Areas dated 20 May 2016";
  let text3 = "Panchayati Raj & D.W. Department Notification dated 7 June 2018";
  let text4 =
    "Competent Authority for Bhubaneswar area under Odisha Apartment Owners’ Act 1982";
  let text5 = "Odisha Fire Prevention and Fire Safety Rules, 2017";
  let text6 = "Odisha Apartment Ownership (Amendment) Rules, 2021";
  let text7 =
    "Odisha Real Estate Regulatory Authority (Amendment) Regulation, 2021";
  let text8 =
    "Direction to the builders/promoters with regard to opening of bank accounts as per provisions of RERA";
  let text9 =
    "Corrigendum in connection with ORERA notification No. 2653/RERA dated 26.08.2021 on Odisha Real Estate Regulatory Authority (Amendment) Regulations, 2021 published in extraordinary issue of Odisha Gazette dated 02.03.2022.";
  let text10 =
    "Issuance of Completion Certificate or Occupancy Certificate by ULBs/DAs/SPAs/RITs only after registration of real estate projects with ORERA.";
  let text11 =
    "Gazette Notification No. 752-HUD-HU-POLICY-0002-2019/HUD of Housing & Urban Development Department.";
  let text12 = "The Real Estate (Regulation and Development) Act, 2016.";
  let text13 = "Odisha Real Estate (Regulation and Development) Rules, 2017.";
  let text14 = "Odisha Real Estate Regulatory Authority Regulations, 2017.";
  let text15 =
    "The Real Estate (Regulation and Development) Removal of Difficulties Order, 2016.";

  let notice1 = "1";
  let noticeTitle1 =
    "Fresh registration of projects seeking addition/alteration/revision of building plan Order U/s 37 of RE (R&D) Act, 2016";

  let notice2 = "2";
  let noticeTitle2 =
    "Operational Guidelines for Advertisement of RERA Registered Projects	";

  let notice3 = "3";
  let noticeTitle3 =
    "Direction U/S 37 of RE (R&D) Act, 2016 regarding change of Bank Account of registered Real Estate Project	";

  let notice4 = "4";
  let noticeTitle4 =
    "Direction U/S 37 of RE (R&D) Act, 2016 regarding up-dating the status on website by the promoters.	";

  let notice5 = "5";
  let noticeTitle5 =
    "Odisha Real Estate Regulatory Authority (Amendment) Regulation, 2021	";

  let rules1 = "1";
  let rulesTitle1 = "Odisha Real Estate (Regulation & Development) Rules, 2017";

  let rules2 = "2";
  let rulesTitle2 = "Real Estate (Regulation & Development) Act, 2016	";

  let rules3 = "3";
  let rulesTitle3 = "Odisha Real Estate Regulatory Authority Regulations, 2017	";

  let rules4 = "4";
  let rulesTitle4 =
    "Odisha Real Estate Appellate Tribunal (Procedure) Regulations, 2020	";

  let reg1 = "1";
  let regTitle1 = "Odisha Real Estate (Regulation & Development) Rules, 2017";

  let reg2 = "2";
  let regTitle2 = "Odisha Real Estate Regulatory Authority Regulations, 2017	";

  let reg3 = "3";
  let regTitle3 = "Real Estate (Regulation & Development) Act, 2016	";

  return (
    <div className={classes.rulesAndRegulationsParent}>

      <div className={classes.serchContainer}>
        <input
          placeholder="Search Act, Notice, Rules, Regulations"
          type="text"
          className={classes.serchbox}
        />

        <button className={classes.btnContainer}>
          <div className={classes.serchText}>Search</div>
        </button>
      </div>

      <div className={classes.parentDiv}>
        <div className={classes.leftBox}>
          <div className={classes.topHeadingSection}>
            <div className={classes.iconContainer}>
              <img src={Act} className={classes.actIcon} />
            </div>
            <div className={classes.title}>Act</div>
          </div>

          <div className={classes.mainContainer}>
            <SingleReraAct number={num1} text={text1} />
            <SingleReraAct number={num2} text={text2} />
            <SingleReraAct number={num3} text={text3} />
            <SingleReraAct number={num4} text={text4} />
            <SingleReraAct number={num5} text={text5} />
            <SingleReraAct number={num6} text={text6} />
            <SingleReraAct number={num7} text={text7} />
            <SingleReraAct number={num8} text={text8} />
            <SingleReraAct number={num9} text={text9} />
            <SingleReraAct number={num10} text={text10} />
            <SingleReraAct number={num11} text={text11} />
            <SingleReraAct number={num12} text={text12} />
            <SingleReraAct number={num13} text={text13} />
            <SingleReraAct number={num14} text={text14} />
            <SingleReraAct number={num15} text={text15} />
          </div>
        </div>

        <div className={classes.rightBoxContainer}>
          <div className={classes.topBox}>
            <div className={classes.topHeadingSection}>
              <div className={classes.iconContainer}>
                <img src={Notice} className={classes.noticeIcon} />
              </div>
              <div className={classes.title}>Notice</div>
            </div>

            <div className={classes.noticeContainer}>
              <SingleReraAct number={notice1} text={noticeTitle1} />
              <SingleReraAct number={notice2} text={noticeTitle2} />
              <SingleReraAct number={notice3} text={noticeTitle3} />
              <SingleReraAct number={notice4} text={noticeTitle4} />
              <SingleReraAct number={notice5} text={noticeTitle5} />
            </div>
          </div>
          <div className={classes.midBox}>
            <div className={classes.topHeadingSection}>
              <div className={classes.iconContainer}>
                <img src={Rules} className={classes.ruleIcon} />
              </div>
              <div className={classes.title}>Rules</div>
            </div>

            <div className={classes.rulesContainer}>
              <SingleReraAct number={rules1} text={rulesTitle1} />
              <SingleReraAct number={rules2} text={rulesTitle2} />
              <SingleReraAct number={rules3} text={rulesTitle3} />
              <SingleReraAct number={rules4} text={rulesTitle4} />
            </div>
          </div>
          <div className={classes.bottomBox}>
            <div className={classes.topHeadingSection}>
              <div className={classes.iconContainer}>
                <img src={Regulation} className={classes.regIcon} />
              </div>
              <div className={classes.title}>Regulations</div>
            </div>

            <div className={classes.rulesContainer}>
              <SingleReraAct number={reg1} text={regTitle1} />
              <SingleReraAct number={reg2} text={regTitle2} />
              <SingleReraAct number={reg3} text={regTitle3} />
              {/* <SingleReraAct number={num4} text={text4} />
              <SingleReraAct number={num5} text={text5} /> */}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReraAct;

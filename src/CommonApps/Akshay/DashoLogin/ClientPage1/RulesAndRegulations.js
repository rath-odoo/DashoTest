import { useEffect, useState, useRef } from "react";
import classes from "./RulesAndRegulations.module.css";

import SingleReraAct from "./SingleReraAct";

import Act from "./act.png";
import Notice from "./notice.png";
import Rules from "./rules.png";
import Regulation from "./regulation.png";

import SingleNotice from "./SIngleNotice";

import ActSingleBlock from "./ActSingleBlock";
import { act } from "react-dom/test-utils";

import ReraLogo from "./reraLogo.png";

import ConsumerLogo from "./consumer.png";

import EnvLogo from "./environmental.png";

import HumanRight from "./humanRights-.png";

import Labor from "./Labor_Law.png";

import Anti from "./anti-curruption.png";

import Intellectual from "./Intellectual-Property.png";

import Cyber from "./cyber-security.png";

import Education from "./Education.png";

import CivilRIght from "./Civil_rights.png";

let title1 = "1. Odisha Apartment ( Ownership and Management ) Act, 2023";
let title2 = "2. Odisha Apartment ( Ownership and Management ) DRAFT Rules, 2023";
let title3 = "Environmental Protection Act";
let title4 = "Human Rights Act";
let title5 = "Labor Laws or Employment Acts";

let description1 =
  "RERA (Real Estate Regulatory Authority) was introduced in the year 2016. The purpose of the RERA Act, 2016, is to protect the homebuyer and increase the investments in the real estate industry";
let description2 =
  "Focuses on the rights and protection of consumers, regulating the market to prevent unfair trade practices.";
let description3 =
  "Addresses issues related to environmental conservation, pollution control, and sustainable development.";
let description4 =
  "Establishes the legal framework for the protection and promotion of human rights within a particular jurisdiction.";
let description5 =
  "Encompasses various laws governing employment relationships, including regulations related to wages, working hours, and workplace safety.";
let description6 =
  "Aims to prevent and combat corruption within public and private sectors, often establishing anti-corruption bodies and regulations.";
let description7 =
  "Governs the protection of intellectual property, including patents, trademarks, copyrights, and trade secrets.";
let description8 =
  "Addresses issues related to cyber threats, data protection, and the legal framework for cybersecurity measures.";
let description9 =
  "Outlines regulations and standards for the education system, covering aspects such as curriculum, accreditation, and student rights.";
let description10 =
  "Focuses on protecting and guaranteeing civil rights and liberties, preventing discrimination, and promoting equality.";

const RulesAndRegulations = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  const [showReraData, SetReraData] = useState(false);
  const [showConsumerData, SetConsumerData] = useState(false);
  const [showEnvData, SetEnvData] = useState(false);
  const [showHumanData, SetHumanData] = useState(false);
  const [showLaborData, SetLaborData] = useState(false);

  const showReraDataHandler = () => {
    SetReraData(true);
    SetConsumerData(false);
    SetEnvData(false);
    SetHumanData(false);
    SetLaborData(false);
  };

  const showConsumerDataHandler = () => {
    SetConsumerData(true);
    SetReraData(false);
    SetEnvData(false);
    SetHumanData(false);
    SetLaborData(false);
  };

  const showEnvDataHandler = () => {
    SetEnvData(true);
    SetReraData(false);
    SetConsumerData(false);
    SetHumanData(false);
    SetLaborData(false);
  };

  const showHumanDataHandler = () => {
    SetHumanData(true);
    SetReraData(false);
    SetConsumerData(false);
    SetEnvData(false);
    SetLaborData(false);
  };

  const showLaborDataHandler = () => {
    SetLaborData(true);
    SetReraData(false);
    SetConsumerData(false);
    SetEnvData(false);
    SetHumanData(false);
  };

  return (
    <div className={classes.rulesAndRegulationsMain}>



       <div className={classes.inconstructionMessage}>  

          <b>This website will be fully functional in coming days.</b> The platform will guide the Promoters to create an atmosphere of trust among clients, and help Home Buyers understand the responsibilities and safeguard theirs rights

       </div>	  


      <div className={classes.rulesAndRegulationsParent}>
	    
          <ActSingleBlock
            title={title1}
            description={description1}
            image={ReraLogo}
	    link="https://edrspace.sgp1.cdn.digitaloceanspaces.com/OdishaApartmentAct2023.pdf"
          />
        
          <ActSingleBlock
            title={title2}
            description={description2}
            image={ConsumerLogo}
	    link="https://edrspace.sgp1.cdn.digitaloceanspaces.com/OdishaApartmentRules2023.pdf"
          />

       </div>

	  {/*  
        <div className={classes.env} onClick={showEnvDataHandler}>
          <ActSingleBlock
            title={title3}
            description={description3}
            image={EnvLogo}
          />
        </div>

        <div className={classes.human} onClick={showHumanDataHandler}>
          <ActSingleBlock
            title={title4}
            description={description4}
            image={HumanRight}
          />
        </div>

        <div className={classes.labor} onClick={showLaborDataHandler}>
          <ActSingleBlock
            title={title5}
            description={description5}
            image={Labor}
          />
        </div>

        */}


        {/* <ActSingleBlock 
      title={title6} 
      description={description6} 
      image={Anti} />

      <ActSingleBlock
        title={title7}
        description={description7}
        image={Intellectual}
      />

      <ActSingleBlock title={title8} description={description8} image={Cyber} />

      <ActSingleBlock
        title={title9}
        description={description9}
        image={Education}
      />

      <ActSingleBlock
        title={title10}
        description={description10}
        image={CivilRIght}
      /> */}

        {/* <ActSingleBlock />

      <ActSingleBlock />

      <ActSingleBlock />

      <ActSingleBlock />

      <ActSingleBlock />
      <ActSingleBlock />
      <ActSingleBlock />

      <ActSingleBlock />

      <ActSingleBlock /> */}
     

      {/*showReraData && (
        <div className={classes.reraData}>
          <div className={classes.Block1}>
            <div className={classes.Title}>Amendment</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>Rera</div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block2}>
            <div className={classes.Title}>Rules</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block3}>
            <div className={classes.Title}>Regulations</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block4}>
            <div className={classes.Title}>Notification</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>
        </div>
      )*/}

      {/* showConsumerData && (
        <div className={classes.reraData}>
          <div className={classes.Block1}>
            <div className={classes.Title}>Amendment</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>Consumer</div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block2}>
            <div className={classes.Title}>Rules</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block3}>
            <div className={classes.Title}>Regulations</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block4}>
            <div className={classes.Title}>Notification</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>
        </div>
      )*/}

      {/* showEnvData && (
        <div className={classes.reraData}>
          <div className={classes.Block1}>
            <div className={classes.Title}>Amendment</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>Environmental</div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block2}>
            <div className={classes.Title}>Rules</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block3}>
            <div className={classes.Title}>Regulations</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block4}>
            <div className={classes.Title}>Notification</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>
        </div>
      )*/}

      {/* showHumanData && (
        <div className={classes.reraData}>
          <div className={classes.Block1}>
            <div className={classes.Title}>Amendment</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>Human Right</div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block2}>
            <div className={classes.Title}>Rules</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block3}>
            <div className={classes.Title}>Regulations</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block4}>
            <div className={classes.Title}>Notification</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>
        </div>
      )*/}

      {/*showLaborData && (
        <div className={classes.reraData}>
          <div className={classes.Block1}>
            <div className={classes.Title}>Amendment</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>Labor</div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block2}>
            <div className={classes.Title}>Rules</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block3}>
            <div className={classes.Title}>Regulations</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>

          <div className={classes.Block4}>
            <div className={classes.Title}>Notification</div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>01.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>02.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>

            <div className={classes.mainContainer}>
              <div className={classes.nu}>03.</div>
              <div className={classes.details}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
              </div>
            </div>
          </div>
        </div>
      )*/}

      
    </div>
  );
};

export default RulesAndRegulations;

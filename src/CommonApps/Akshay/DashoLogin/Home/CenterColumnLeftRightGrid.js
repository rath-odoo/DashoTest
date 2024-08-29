import classes from "./CenterColumnLeftRightGrid.module.css";
import bookAppointment from "./g_affordable (copy).png";
import centerPic from "./center_img.jpg";
import SecondBlockImage from "./SecondBlockImage2.png";
import LogoWatchDog from "./g_Real_estate.png";
import Enthusiast from "./g_community_development.png";
import Defender from "./shields.png";
import Policy from "./g_policy_Reform_efforts.png";

import Block2Image from "./b58.JPG";

import Transparency from "./g_Transperency_Crusader.png";

import { HiPresentationChartBar } from "react-icons/hi";

function CenterColumnLeftRightGrid() {
  return (
    <div className={classes.centerImageLeftRightGrid}>
      <div className={classes.title}>About</div>
      <div className={classes.subTitle}>My Endeavors</div>

      <div className={classes.details}>
        Welcome to the forefront of change! I am Bimalendu Pradhan, a dedicated
        RERA activist fueled by a relentless passion to stand up for the people
        and combat the pressing real estate issues that deeply affect our
        communities.With unwavering determination, I strive to be a driving
        force in creating a brighter future where housing is recognized as a
        fundamental human right, not a mere privilege reserved for the fortunate
        few. I firmly believe that safe and affordable homes are the cornerstone
        of strong and empowered communities.
      </div>

      <div className={classes.serviceSection}>
        <div className={classes.leftSideContent}>
          <div className={classes.features}>ACTIVITES</div>
          <div className={classes.a1box}>
            {/* <img
              className={classes.serviceImage}
              src={LogoWatchDog}
              alt="logo"
            ></img> */}

            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Real Estate Watchdog
              </div>

              <div className={classes.serviceHeading2}>
                Unveiling corruption and protecting homebuyers' rights - Join
                the fight for transparent real estate practices.
              </div>
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img
              className={classes.serviceImage}
              src={Enthusiast}
              alt="logo"
            ></img> */}

            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Community Development Enthusiast
              </div>

              <div className={classes.serviceHeading2}>
                Building sustainable Residents Welfare Associations -
                Collaborating for a better future.
              </div>
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img
              className={classes.serviceImage}
              src={bookAppointment}
              alt="logo"
            ></img> */}

            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Tenant Rights Defender
              </div>

              <div className={classes.serviceHeading2}>
                Advocating for fair tenant treatment, policies, and enforcement
                in the rental market.
              </div>
            </div>
          </div>

          <div className={classes.a1box}>
            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Transparency Crusader
              </div>

              <div className={classes.serviceHeading2}>
                Shedding light on hidden agendas - Making real estate
                accountable for all.
              </div>
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img
              className={classes.serviceImage}
              src={Defender}
              alt="logo"
            ></img> */}

            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Consumer Rights Defender
              </div>

              <div className={classes.serviceHeading2}>
                Ensuring buyers' interests are safeguarded - Standing up against
                exploitative practices.
              </div>
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img className={classes.serviceImage} src={Policy} alt="logo"></img> */}

            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Policy Reform Efforts
              </div>

              <div className={classes.serviceHeading2}>
                Advocating for legislative changes to address housing
                inequalities.{" "}
              </div>
            </div>
          </div>
        </div>

        <img className={classes.centerImage} src={Block2Image} alt="logo"></img>

        <div className={classes.rightSideContent}>
          <div className={classes.features}>ACHIVEMENTS</div>

          <div className={classes.a1box}>
            <div className={classes.serviceHeading1}>
              Legal Luminary's Impact
            </div>

            <div className={classes.serviceHeading2}>
              Bimalendu Pradhan, a stalwart in real estate governance, has made
              significant strides since 2018. His pursuit of justice in the
              Vipul Greens project set a groundbreaking precedent for
              accountability in the sector.
            </div>
          </div>

          <div className={classes.a1box}>
            <div className={classes.serviceHeading1}>
              Rule 40(2): Judicial Triumph
            </div>

            <div className={classes.serviceHeading2}>
              In 2019, Bimalendu's efforts reached the Odisha High Court,
              resulting in Rule 40(2), streamlining ORERA orders. This legal
              triumph championed Homebuyers' Associations and showcased
              Bimalendu's commitment to effective governance.
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img className={classes.serviceImage} src={Policy} alt="logo"></img> */}

            <div className={classes.serviceHeading1}>
              ORERA: Collaborative Governance Visionary
            </div>

            <div className={classes.serviceHeading2}>
              Bimalendu's visionary leadership led to the creation of ORERA,
              fostering collaboration among stakeholders for effective real
              estate governance. This initiative showcased his commitment to
              inclusive and collaborative approaches in the sector.
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img
              className={classes.serviceImage}
              src={Transparency}
              alt="logo"
            ></img> */}

            <div className={classes.serviceHeading1}>Bold Litigation Move</div>

            <div className={classes.serviceHeading2}>
              The audacious 2020 Public Interest Litigation against the High
              Court and government led to the functionalization of ORERA in
              September 2020. Bimalendu's strategic legal moves continued to
              reshape the real estate landscape in Odisha.
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img
              className={classes.serviceImage}
              src={Defender}
              alt="logo"
            ></img> */}

            <div className={classes.serviceHeading1}>
              Pinnacle: Odisha's Legal Overhaul
            </div>

            <div className={classes.serviceHeading2}>
              In 2023, Bimalendu's pinnacle accomplishment was crafting The
              Odisha Apartment Ownership Act, a transformative legal framework
              for apartment ownership. Enacted into law, it ensures the rights
              of developers and buyers, addressing longstanding real estate
              concerns. This landmark act sets a precedent for progressive and
              comprehensive legislation, influencing nationwide reform.
            </div>
          </div>

          <div className={classes.a1box}>
            {/* <img className={classes.serviceImage} src={Policy} alt="logo"></img> */}

            <div className={classes.detailsServiceContainer}>
              <div className={classes.serviceHeading1}>
                Comprehensive Legislation Architect
              </div>

              <div className={classes.serviceHeading2}>
                Bimalendu's act sparks nationwide buyer-developer rights reform.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterColumnLeftRightGrid;

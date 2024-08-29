import { useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import { FaReact } from "react-icons/fa";
import DropDownOne from "./DropDownOne";
import { BsChevronDown } from "react-icons/bs";
import Logo from "./logo.png";
import BimalenduName from "./BimalenduName.png";
import HeaderAddressBar from "./HeaderAddressBar";
import { useHistory } from "react-router-dom";


const Header = (props) => {

  const history = useHistory();
  const contactPageHandler = () => {
    history.push("/");
  };

  const [showDropDownOne, setShowDropDownOne] = useState(false);
  const showDropDownOneHandler = () => {
    setShowDropDownOne(true);
  };

  let activeColor = "var(--themeColor)";
  let inActiveColor = "var(--themeColor)";

  const [homeButtonStyle, setHomeButtonStyle] = useState({
    color: "var(--themeColor)",
    underlineColor: "var(--themeColor)",
  });
  const [aboutButtonStyle, setAboutButtonStyle] = useState({
    color: inActiveColor,
    underlineColor: "",
  });
  const [newsButtonStyle, setNewsButtonStyle] = useState({
    color: inActiveColor,
    underlineColor: "white",
  });


  const [actsButtonStyle, setActsButtonStyle] = useState({
    color: inActiveColor,
    underlineColor: "white",
  });




  const [contactUsButtonStyle, setContactButtonStyle] = useState({
    color: inActiveColor,
    underlineColor: "white",
  });
  const [homeBuyerButtonStyle, setHomeBuyerButtonStyle] = useState({
    color: inActiveColor,
    underlineColor: "white",
  });

  useEffect(() => {
    props.homeMounted &&
      setHomeButtonStyle({
        color: "var(--themeColor)",
        underlineColor: "var(--themeColor)",
      });
    !props.homeMounted &&
      setHomeButtonStyle({ color: "black", underlineColor: "transparent" });
  }, [props.homeMounted]);

  useEffect(() => {
    props.aboutMounted &&
      setAboutButtonStyle({
        color: "var(--themeColor)",
        underlineColor: "var(--themeColor)",
      });
    !props.aboutMounted &&
      setAboutButtonStyle({ color: "black", underlineColor: "transparent" });
  }, [props.aboutMounted]);

  useEffect(() => {
    props.newsMounted &&
      setNewsButtonStyle({
        color: "var(--themeColor)",
        underlineColor: "var(--themeColor)",
      });
    !props.newsMounted &&
      setNewsButtonStyle({ color: "black", underlineColor: "transparent" });
  }, [props.newsMounted]);

  useEffect(() => {
    props.contactUsMounted &&
      setContactButtonStyle({
        color: "var(--themeColor)",
        underlineColor: "var(--themeColor)",
      });
    !props.contactUsMounted &&
      setContactButtonStyle({ color: "black", underlineColor: "transparent" });
  }, [props.contactUsMounted]);


  useEffect(() => {
    props.actsMounted &&
      setActsButtonStyle({
        color: "var(--themeColor)",
        underlineColor: "var(--themeColor)",
      });
    !props.actsMounted &&
      setActsButtonStyle({ color: "black", underlineColor: "transparent" });
  }, [props.actsMounted]);






  useEffect(() => {
    props.homeBuyerMounted &&
      setHomeBuyerButtonStyle({
        color: "var(--themeColor)",
        underlineColor: "var(--themeColor)",
      });
    !props.homeBuyerMounted &&
      setHomeBuyerButtonStyle({
        color: "black",
        underlineColor: "transparent",
      });
  }, [props.homeBuyerMounted]);



   const joinTopperHandler=()=>{

   console.log("join topper handler");

    //props.actsHandler(); 

    history.push('/joinastopper');

   }


 



  console.log("props.homeMounted", props.homeMounted);

  return (
    <div className={classes.parentFooter}>
      {/*    
        <HeaderAddressBar/>
         */}
      {/* top Navigation bar */}
      <div className={classes.topNavigationBar}>
	{/*
        <button className={classes.nFirstCotainer}  >
          <div className={classes.csslogo}>
            <span>B</span>
            <div className={classes.styleDiv1}> </div>
          </div>

          <div className={classes.Name}>Bimalendu Pradhan</div>
            props.showDropDownHeader &&
        </button>
        */}



        <div className={classes.navigationMenu}>
          <div className={classes.headerButtonDiv} >
            <button
              type="button"
              className={classes.headerButton}
	      onClick={props.homeHandler}
              style={homeButtonStyle}
            >
              <div className={classes.HomeText}>Home</div>
            </button>

            <div
              className={classes.underlineDiv}
              style={{ backgroundColor: homeButtonStyle.underlineColor }}
            >
              {" "}
            </div>
          </div>

          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={props.aboutHandler}
              style={aboutButtonStyle}
            >
              <div className={classes.headerButtonText}>Find Toppers</div>
            </button>
            <div
              className={classes.underlineDiv}
              style={{ backgroundColor: aboutButtonStyle.underlineColor }}
            >
              {" "}
            </div>
          </div>


          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={joinTopperHandler}
              style={actsButtonStyle}
            >
               <div className={classes.headerButtonText}>Join as a topper</div>
            </button>

            <div className={classes.underlineDiv} style={{ backgroundColor: actsButtonStyle.underlineColor }}>
              {" "}
            </div>
          </div>

          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={props.newsHandler}
              style={newsButtonStyle}
            >
              <div className={classes.headerButtonText}>Success story</div>
            </button>
            <div
              className={classes.underlineDiv}
              style={{ backgroundColor: newsButtonStyle.underlineColor }}
            >
              {" "}
            </div>
          </div>


          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={props.contactUsHandler}
              style={contactUsButtonStyle}
            >
               <div className={classes.headerButtonText}>Contact us</div>
            </button>

            <div className={classes.underlineDiv} style={{ backgroundColor: contactUsButtonStyle.underlineColor }}>
              {" "}
            </div>
          </div>
        </div>
         

     


	 

         { props.showDropDownHeader && 
        <div className={classes.navigationMenuMobile}>
          <div className={classes.headerButtonDiv} >
            <button
              type="button"
              className={classes.headerButton}
	      onClick={props.homeHandler}
              style={homeButtonStyle}
            >
              <div className={classes.HomeText}>Home</div>
            </button>

            <div
              className={classes.underlineDiv}
              style={{ backgroundColor: homeButtonStyle.underlineColor }}
            >
              {" "}
            </div>
          </div>

          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={props.aboutHandler}
              style={aboutButtonStyle}
            >
              <div className={classes.headerButtonText}>Find Toppers</div>
            </button>
            <div
              className={classes.underlineDiv}
              style={{ backgroundColor: aboutButtonStyle.underlineColor }}
            >
              {" "}
            </div>
          </div>


          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={joinTopperHandler}
              style={actsButtonStyle}
            >
               <div className={classes.headerButtonText}>Join as a topper</div>
            </button>

            <div className={classes.underlineDiv} style={{ backgroundColor: actsButtonStyle.underlineColor }}>
              {" "}
            </div>
          </div>

          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={props.newsHandler}
              style={newsButtonStyle}
            >
              <div className={classes.headerButtonText}>Success story</div>
            </button>
            <div
              className={classes.underlineDiv}
              style={{ backgroundColor: newsButtonStyle.underlineColor }}
            >
              {" "}
            </div>
          </div>


          <div className={classes.headerButtonDiv}>
            <button
              type="button"
              className={classes.headerButton}
              onClick={props.contactUsHandler}
              style={contactUsButtonStyle}
            >
               <div className={classes.headerButtonText}>Contact us</div>
            </button>

            <div className={classes.underlineDiv} style={{ backgroundColor: contactUsButtonStyle.underlineColor }}>
              {" "}
            </div>
          </div>
        </div>
         
         }
	  












































      </div>
    </div>
  );
};

export default Header;

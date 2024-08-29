import React, { useState, useEffect } from 'react';

import classes from './Links.module.css';
import CourseAddLinkForm from './Forms/CourseAddLinkForm';

import LinkEditForm from './Forms/LinkEditForm';

import { getusefulllinks, deleteausefulllink } from '../../CommonApps/AllAPICalls';

import buttonStyle2 from './../../CommonApps/buttonStyle2.module.css';

import { BsPen, BsTrash } from 'react-icons/bs';

import OneLink from './OneLink';



const Links = (props) => {


  console.log("Links Rendering");

  const [showAddLinkForm, setShowAddLinkForm] = useState(false);

  const [linksData, getLinksData] = useState(null);
  const [pageNo, setPageNo] = useState(1);

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    console.log("new pageNo", pageNo);
    getusefulllinks({ pageNo, getLinksData });

  }, [props.userData, pageNo, rerender]);

  //props.userData, pageNo, rerender

  const addLinkHandler = () => {
    setShowAddLinkForm(true);
  }


  const openLinkInNewTabHandler = ({ link_ }) => {
    let meetingLink = link_;
    window.open(meetingLink, "_blank")
  }


  const closeFormHandler = () => {
    setShowAddLinkForm(false);
    setRerender(rerender => !rerender);
    //props.rerender();
  }


  //console.log("linksData: ", linksData);


  const rerenderHandler = () => {
    setRerender(rerender => !rerender);
    setShowLinkEditForm(false);
  }



  const [showLinkEditForm, setShowLinkEditForm] = useState(false);
  const [linkObjEdit, setLinkObjEdit] = useState(null);



  const showEditFormHandler = (linkObj) => {

    setShowLinkEditForm(showLinkEditForm => true);
    setLinkObjEdit(linkObjEdit => linkObj);

  }


  const closeEditFormHandler = () => {
    setShowLinkEditForm(showLinkEditForm => false);
  }


  const linkDeleteHandler = (linkId) => {
    //console.log("linkId: ", linkId);
    deleteausefulllink({ linkId, setRerender });

  }

  //console.log("linksData: ", linksData);

















  return (
    <div className={classes.links} >

      <div className={classes.toolsDiv}>

        {showAddLinkForm &&
          <CourseAddLinkForm userData={props.userData}
            rerender={rerenderHandler}
            onPress={closeFormHandler}

          />
        }


        {
          showLinkEditForm &&
          <LinkEditForm userData={props.userData}
            rerender={rerenderHandler}
            onPress={closeEditFormHandler}
            linkObj={linkObjEdit}
          />

        }






        <button type="button" className={buttonStyle2.buttonStyle2} onClick={addLinkHandler}> + Add a link </button>

      </div>




      <ol>

        {linksData !== null && linksData.results.map((linkObj, index) => {

          let link_ = linkObj.link;
          let linkId = linkObj.id;



          return <li key={index} className={classes.oneLinkDiv}>

            <div style={{ borderStyle: "none", display: "inline", width: "100%" }}>
              <button type="button" className={classes.linkBoxContainer} onClick={() => openLinkInNewTabHandler({ link_ })}>
                {linkObj.name}
              </button>
              <div style={{ color: 'grey', marginLeft: '30px' }}>  {linkObj.description}</div>

            </div>

            <div className={classes.editdelete}>
              <button type="button" className={classes.editbuttons} onClick={() => showEditFormHandler(linkObj)}> <BsPen /> </button>
              <button type="button" className={classes.editbuttons} onClick={() => linkDeleteHandler(linkId)}> <BsTrash /> </button>
            </div>


          </li>





        })

        }









      </ol>






    </div>
  );

}

export default Links;

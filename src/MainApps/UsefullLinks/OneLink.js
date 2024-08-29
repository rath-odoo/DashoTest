import React,{useState, useEffect} from 'react';

import classes from './Links.module.css';

import {BsPen, BsTrash} from 'react-icons/bs';



const OneLink=(props)=>{


let link_=props.link;
let linkId = props.linkObj.id;


return  (


                         <>
                          <div style={{borderStyle:"none",display:"inline",width:"100%"}}>
                             <button type="button" className={classes.linkBoxContainer} onClick={props.openLinkInNewTabHandler({link_})}>
                                 {props.linkObj.name}
                             </button>
                             <div style={{color: 'grey', marginLeft:'30px'}}>  {props.linkObj.description}</div>

                          </div>

                          <div className={classes.editdelete}>
                            <button type="button" className={classes.editbuttons} onClick={()=>props.showEditFormHandler}> <BsPen/> </button>
                            <button type="button" className={classes.editbuttons} onClick={()=>props.linkDeleteHandler(linkId)}> <BsTrash/> </button>
                          </div>
                         </>











);


}

export default OneLink;

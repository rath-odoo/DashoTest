import React from 'react';
import classes from './CourseSyllabus.module.css';
//import AddChapterButton  from './AddChapterButton';
import DeleteSectionButton from './DeleteSectionButton';
import EditSectionButton from './EditSectionButton';


const SectionIter = (props) =>{


 let chapterId=props.chapter.id;
 let sectionId=props.section.id;	


return <li  className={classes.sectionHead} style={props.sectionEditStyle}>

             { (props.showSectionEdit.chapterId !==props.chapter.id || props.showSectionEdit.sectionId !==props.section.id) && <span>

                         {
                             props.section.topics.map((topic, tindex)=>{

                                return <span key={tindex}>   {topic.name+", "}  </span>                                                                                                                       
                             })

                         }

                         <EditSectionButton editSectionHandler={(event)=>props.editSectionHandler({chapterId, sectionId})}/>
                         <DeleteSectionButton deleteSectionHandler={(event)=>props.deleteSectionHandler({sectionId})}/>

                                              </span>}

                  { props.showSectionEdit.chapterId===props.chapter.id && props.showSectionEdit.sectionId===props.section.id &&

                                                  <textarea
                                                     type="text"
                                                     onChange={props.handleChange}
                                                     name="comment"
                                                     className={classes.sectionTextArea}
                                                     placeholder="Write your comment"
                                                     defaultValue={props.sectionText[props.csname]}
                                                  />

                                               }

                  {  props.showSectionEdit.chapterId===props.chapter.id && props.showSectionEdit.sectionId===props.section.id &&
                                             <button
                                                  className={classes.sectionSaveButton}
                                                  onClick={(event)=>props.SaveSectionHandler({chapterId, sectionId})}
                                              >
                                                    Save
                                             </button>
                  }

                                           </li>
	

}

export default SectionIter;

import classes from './SyllabusTopics.module.css';
import {AiFillCloseCircle} from 'react-icons/ai';
import {getsyllabusfromId} from '../../../../../CommonApps/AllAPICalls';
import React,{useState,useEffect} from 'react';
import SectionIter from './SectionIter';



const SyllabusTopics=(props)=>{

   const [syllabusData, getSyllabusData] = useState({"chapters":[]});
   const [sectionText, setSectionText] = useState({});

   let rerender =1;

    useEffect(()=>{

       let syllabusId= props.syllabusId;    
       getsyllabusfromId({syllabusId,getSyllabusData});
       return ()=>{
              getSyllabusData(syllabusData=>({"chapters":[]}));
        }

    },[ props.syllabusId,rerender]);



    useEffect(()=>{

    let sectionData="";

    syllabusData.chapters.forEach((chapter,cindex)=>{

       chapter.sections.forEach((section,sindex)=>{

                sectionData="";
                section.topics.forEach((topic,tindex)=>{

                    sectionData=sectionData+topic.name;

                });
                let chapterId = chapter.id;
                let sectionId = section.id;
                let secName = 'c'+chapterId+'s'+sectionId;
                sectionText[secName]=sectionData;

          });

       });

    },[syllabusData, sectionText]);









   const handleChange=()=>{



   }




return <div className={classes.syllabusTopics}>

         <div className={classes.closeButtonDiv}>
                 <button onClick={props.onPress}
                         className={classes.closeFormButton}>
                         <AiFillCloseCircle className={classes.closeButtonIcon}/>
                 </button>
       </div>

       <div className={classes.instructionTitle}>
         Select topics that you want to teach in this class from syllabus. You need to set up your syllabus before coming here.
       </div>


        <div className={classes.syllabusTitle}>

         Syllabus
	</div>	

     { syllabusData.length !==null &&<div className={classes.syllabusContent}>

	 

        <ol className={classes.chapterNames}>







         {  
            syllabusData.chapters.map((chapter,index)=>{

		  let chapterId = chapter.id;
                  let sections = chapter.sections;
               

         	  return <li key={index} > <b>{chapter.name}</b>
			    <ol className={classes.sectionlist}>

                              {

				   sections.map((section, sindex)=>{
				       //let sectionId = section.id;
                                       let csname='c'+chapter.id+'s'+section.id;

				       return <SectionIter
				                  key={sindex}
				                  chapter = {chapter}
				                  section = {section}
                                                  csname = {csname}
				                  handleChange = {handleChange}
				                  sectionText ={sectionText}
                                                  sindex={sindex}
					          updateFormDataSingleClass={props.updateFormDataSingleClass}
                                                  formDataSingleClass={props.formDataSingleClass}
					          />  
				     	      
			                   }
				   )

			      }




		            </ol>

		         </li>	    

	       })
	  }
       </ol>
   </div>}






























     





</div>

}


export default SyllabusTopics;

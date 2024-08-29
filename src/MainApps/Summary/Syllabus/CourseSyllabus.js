import React,{useState,useEffect} from 'react';
import classes from './CourseSyllabus.module.css';
import {getsyllabusfromId,
	putsectiondata,createnewsection,
	deletesectiondata} from '../../../CommonApps/AllAPICalls.js';

import AddChapterButton  from './AddChapterButton';
import SectionIter from './SectionIter';
import AddSectionButton from './AddSectionButton';


import ChapterCreationForm from './ChapterCreationForm';





const CourseSyllabus=(props)=>{



    const [syllabusData, getSyllabusData] = useState({"chapters":[]}); 
    const [rerender, setRerender] = useState(false);
 
   let syllabusId = props.selectedCourse[0].syllabus;


    useEffect(()=>{

       getsyllabusfromId({syllabusId,getSyllabusData});

       return ()=>{
           getSyllabusData(syllabusData=>({"chapters":[]}));
       }

    },[ syllabusId,rerender]);


    //console.log("syllabus Data: ", syllabusData);


    /*const [showSyllabus, changeShowSyllabus]=useState(true);

    const showSyllabusHandler = ()=>{
      changeShowSyllabus(true);
    }


    const hideSyllabusHandler = ()=>{
       changeShowSyllabus(false);
    }
    */

    const [showSectionEdit, setShowSectionEdit] = useState({chapterId:0,sectionId:0});

    /*const [sectionEditStyle, setSectionEditStyle] = useState({

	    borderStyle: 'none',
            borderWidth: '1px',
            borderColor: 'lightgrey',
            margin: '10px'

    });*/


   let sectionEditStyle = {
   borderStyle: 'none',
            borderWidth: '1px',
            borderColor: 'lightgrey',
            margin: '10px'

   }








    const editSectionHandler = ({chapterId, sectionId})=>{


       //console.log("edit chapterId, sectionid : ",chapterId,'--',sectionId);

       setShowSectionEdit({chapterId: chapterId,sectionId: sectionId}); 

    }


    const addSectionHandler = ({chapterId })=>{

       //console.log("create new section: ",chapterId );	  
       	   
       let sectionPostData = {"name":"New Section","chapterid":chapterId };

       createnewsection({ sectionPostData });
       setRerender(rerender=>!rerender);

    }


    const deleteSectionHandler =({sectionId})=>{
     //console.log("delete button pressed");
      let sectionid=sectionId;
      deletesectiondata({sectionid});
      setRerender(rerender=>!rerender);
    }






    const [onChangeSectionData, setOnChangeSectionData]=useState([]);

    const handleChange=(event)=>{

    let alltext=event.target.value;
    let topicnamesArray = alltext.split(";");
    let topicArray = []

      for (let i = 0; i < topicnamesArray.length; i++) {
        let topicObj={}
	topicObj['name']=topicnamesArray[i];
	topicArray.push(topicObj)   
      }

    setOnChangeSectionData(onChangeSectionData=>topicArray);	   

    }

    const [sectionText, setSectionText] = useState({});


    
    //const sectionText = useMemo(() => {}, []);

    //const sectionText={};	

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





    const SaveSectionHandler =({chapterId, sectionId})=>{
   
       //console.log("chapterId, sectionId: ",chapterId,"----" ,sectionId);
       
       let sectionid = sectionId;
       let topicData = onChangeSectionData;
       //console.log("topicData: ", topicData)	   
       putsectiondata({sectionid,topicData});
      
       setShowSectionEdit({chapterId:0,sectionId:0});
       setRerender(rerender=>!rerender);

    }


    const [showChapterCreateForm, setShowChapterCreateForm]= useState(false);

    const addChapterHandler =()=>{

     //console.log("New chapter added");
     //let chapterPostData = {"name":"New Section","chapternum": };

     //createnewchapter({chapterPostData});	    
     setShowChapterCreateForm(true);

    }	

    const closeChapterFormHandler=()=>{
     setShowChapterCreateForm(false);

    }





    //console.log("showSectionEdit.chapterId:   ",showSectionEdit.chapterId,'---', showSectionEdit.sectionId);




return (

<div className={classes.courseSyllabus}>

        <i> COURSE SYLLABUS:  </i>

	{ syllabusData.length !==null &&<div className={classes.syllabusContent}>

	 

        <ol className={classes.chapterNames}>

                       <AddChapterButton addChapterHandler={addChapterHandler}/>
		       {showChapterCreateForm && <ChapterCreationForm onPress={closeChapterFormHandler} syllabusData={syllabusData}/>}




         {  
            syllabusData.chapters.map((chapter,index)=>{

		  let chapterId = chapter.id;

         	  return <li key={index} > <b>{chapter.name}</b> 
			    <ol>

                              {chapter.sections.map((section, sindex)=>{
				       //let sectionId = section.id;
                                       let csname='c'+chapter.id+'s'+section.id;

				       return <SectionIter
				            key={sindex}
                                            sectionEditStyle={sectionEditStyle}
				            showSectionEdit={showSectionEdit}
				            chapter = {chapter}
				            section = {section}
				            editSectionHandler={editSectionHandler}
				            deleteSectionHandler={deleteSectionHandler}
				            SaveSectionHandler={SaveSectionHandler}
                                            csname = {csname}
				            handleChange = {handleChange}
				            sectionText ={sectionText}
                                            sindex={sindex}
					   />  
				     	      
			              }
			        )


			      }



		             {<AddSectionButton addSectionHandler={(event)=>addSectionHandler({chapterId})}/>}


		            </ol>

		         </li>	    

	       })
	  }
       </ol>
   </div>}

</div>

);

}

export default CourseSyllabus;



/*

 { !showSyllabus && <button onClick={showSyllabusHandler}> Show <BsChevronDoubleDown className={classes.ExpandSyllIcon}/>  </button> }

        { showSyllabus && <button onClick={hideSyllabusHandler}> Hide <BsChevronDoubleUp className={classes.ExpandSyllIcon}/>  </button>}
*/

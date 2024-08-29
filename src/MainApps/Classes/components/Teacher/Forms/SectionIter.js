import 	{useState} from 'react';
import React from 'react';
import classes from './SectionIter.module.css';







const SectionIter = (props) =>{

   let chapterId=props.chapter.id;
   let sectionId=props.section.id;	


   const selectThisTopicHandler = ({topicId,topicname}) =>{

    //console.log("topicId: ",topicId);
  
    let topicObj = {"id": topicId,"name":topicname};	   

    if(!props.formDataSingleClass.topics.some(obj=>obj.id === topicId )){

     props.updateFormDataSingleClass({
                        ...props.formDataSingleClass,
                        topics: [...props.formDataSingleClass.topics, topicObj],
	                topicIds: [...props.formDataSingleClass.topicIds, topicId], 
               });
     
     {/*	    
     props.updateFormDataSingleClass({
                        ...props.formDataSingleClass,
                        topicIds: [...props.formDataSingleClass.topicIds, topicId]
               });
     */}





       }

     //prevForm.topics.filter(topic => topic !== newTopic)

     if( props.formDataSingleClass.topics.some(obj=>obj.id === topicId ) ){ 
       props.updateFormDataSingleClass({
                        ...props.formDataSingleClass,
                        topics: props.formDataSingleClass.topics.filter(obj => obj.id !== topicId),
	                topicIds: props.formDataSingleClass.topicIds.filter(id => id !== topicId),
               });
 
	     {/*     
        props.updateFormDataSingleClass({
                        ...props.formDataSingleClass,
                        topicIds: props.formDataSingleClass.topics.filter(id => id !== topicId)
               });
            */}



       }


   }

   //console.log("section: ", props.section);



   return <li  className={classes.sectionHead} style={props.sectionEditStyle}>
 		      
                         {
                             props.section.topics.map((topic, tindex)=>{

				let topicId = topic.id;   
				let topicObj = {"id": topicId,"name": topic.name};   
				let topicSelected = props.formDataSingleClass.topics.some(obj=>obj.id === topicId );
				let topicStyle = {color: topicSelected ? "var(--themeColor)" :"var(--greyTextColor)",
					backgroundColor: topicSelected ? "#c8defa" : "var(--bodyBkgColor)"};
                                let topicname = topic.name;

                                return <button type="button" 
				               key={tindex} 
				               className={classes.oneTopicSelect}
				               onClick={()=>selectThisTopicHandler({topicId,topicname})}
				               style={topicStyle}
					       >   
					      {topic.name+" "}  
				       </button>                                                                                                                       
                             })

                         }             
          </li>
	
}

export default SectionIter;

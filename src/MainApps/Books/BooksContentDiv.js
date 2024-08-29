import React,{useState} from 'react';
import classes from './BooksContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
import TopToolBarTeacher from './components/Teacher/TopToolBarV1';
import TopToolBarManager from './components/Manager/TopToolBar';



import BookSearchBar from './components/Teacher/BookSearchBar';
import YourBooksText from './components/Teacher/YourBooksText';
import BooksContainer from './components/Teacher/BooksContainer';




const BooksContentDiv=(props)=>{


 const reRenderHandler=()=>{
      //setRerender(!rerender);
      //props.onPress();
    }


 const showTNoticeBoard =()=>{


 }

    const [toolBox1PageMounted, setToolBox1PageMounted] = useState(false);
    const [toolBox2PageMounted, setToolBox2PageMounted] = useState(false);
    const [toolBox3PageMounted, setToolBox3PageMounted] = useState(false);
    const [toolBox4PageMounted, setToolBox4PageMounted] = useState(false);
    const [toolBox5PageMounted, setToolBox5PageMounted] = useState(false);




     const showToolBox1PageContentHandler=()=>{
     }

     const showToolBox2PageContentHandler=()=>{
     }

     const showToolBox3PageContentHandler=()=>{
     }

     const showToolBox4PageContentHandler=()=>{
     }

     const showToolBox5PageContentHandler=()=>{
     }


















return (

<div className={base.appContentDiv}>


<div className={classes.contentDiv}>


 <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}> Books / Find book </i>   </div>




    <TopToolBarTeacher
                               userData = {props.userData}
                               onPress= {props.rerender}
                               showToolBox1PageContent = {showToolBox1PageContentHandler}
                               showToolBox2PageContent = {showToolBox2PageContentHandler}
                               showToolBox3PageContent = {showToolBox3PageContentHandler}
                               showToolBox4PageContent = {showToolBox4PageContentHandler}
                               showToolBox5PageContent = {showToolBox5PageContentHandler}
                               toolBox1PageMounted = {toolBox1PageMounted}
                               toolBox2PageMounted = {toolBox2PageMounted}
                               toolBox3PageMounted = {toolBox3PageMounted}
                               toolBox4PageMounted = {toolBox4PageMounted}
                               toolBox4PageMounted = {toolBox5PageMounted}
                               selectedCourse = {props.selectedCourse}
                               />














   <BookSearchBar/>	


   <YourBooksText/>	


   <BooksContainer/>














</div>


</div>	

);

}


export default BooksContentDiv;

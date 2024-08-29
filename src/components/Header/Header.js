import classes from './Header.module.css';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';




function Header(props){

return (

   <>
   <header className={classes.header}>

     <HeaderLeft 
	onPress = {props.onPress} 
	selectedCourse={props.selectedCourse} 
	userData={props.userData} 
	dashboardCourses ={props.dashboardCourses}
	summaryMounted={props.summaryMounted}
	syllabusMounted={props.syllabusMounted}
	dashboardMounted={props.dashboardMounted}
        messagesMounted={props.messagesMounted}
        emailMounted={props.emailMounted}
        contactsMounted={props.contactsMounted}
        usefullLinksMounted={props.usefullLinksMounted}
        discussionMounted={props.discussionMounted}
        classMounted={props.classMounted}
        tasksMounted={props.tasksMounted}
        booksMounted={props.booksMounted}
        examMounted={props.examMounted}
        classmatesMounted={props.classmatesMounted}
        teacherMounted={props.teacherMounted}
	generalChatMounted={props.generalChatMounted}
	calenderMounted={props.calenderMounted}
        />


     	
     <HeaderRight
	userData={props.userData}
	dashboardCourses ={props.dashboardCourses}
	rerender={props.rerender}
	/>
      


   </header>
  </>


);
}


export default Header;

















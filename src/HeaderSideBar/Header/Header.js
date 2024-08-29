import classes from './Header.module.css';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import HeaderMiddle from './HeaderMiddle';


const Header=(props)=>{

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
	feedMounted = {props.feedMounted}
	 instituteMounted={props.instituteMounted}
        />

     { props.selectedCourse ===null &&

     <HeaderMiddle homeMounted = {props.homeMounted}
	           instituteMounted={props.instituteMounted}
	           connectMounted ={props.feedMounted}
	           selectedCourse={props.selectedCourse}
	           />

      }

     	
     <HeaderRight
	userData={props.userData}
	dashboardCourses ={props.dashboardCourses}
	rerender={props.rerender}
	selectedCourse={props.selectedCourse}
	/>
      


   </header>
  </>


);
}


export default Header;

















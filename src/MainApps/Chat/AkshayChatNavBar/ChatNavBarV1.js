import React, { useState, useEffect, useRef } from "react";
import classes from "./ChatNavBar.module.css";
import { BsList, BsPersonPlus, BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import UserContainer from "./UserContainer";
import UserContainerInSearch from "./UserContainerInSearch";
import { getchatgroups, getpersonalgeneralchatgroups, getcoursechatgroups } from '../../../CommonApps/AllAPICalls';
import {
  createchatgroup, getfewusers, usersearchgeneral,
  checkifuseradded, personalchatgroupsearch,
  personalchatgroupsearchNoappend, coursechatgroupsearch,
  getpersonalgeneralchatgroupsNoAppend
} from '../../../CommonApps/AllAPICalls';
import ChatNavBarNewChat from './ChatNavBarNewChat';
import ChatNavBarNewGroupChat from './ChatNavBarNewGroupChat';
import OutsideAlerter from "../../../CommonApps/OutsideAlerter";
import { AiOutlineReload } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';




const ChatNavBar = (props) => {

  const [searchString, setSearchString] = useState("");
  const [chatGroups, getChatGroups] = useState([]);
  const [searchedChatGroups, getSearchedChatGroups] = useState([]);

  const [isLoadingPC, setIsLoadingPC] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [pageNoPC, setPageNoPC] = useState(1);
  const [pageNoPCS, setPageNoPCS] = useState(1);

  const [showNewChatDropDown, setNewChatDropDown] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [showNewGroupChat, setShowNewGroupChat] = useState(false);

  const listInnerRef = useRef();
  const prevSearchString = useRef(searchString);
  const prevPageNoPCS = useRef(pageNoPCS);



  useEffect(() => {
    console.log("first useEffect");
    let courseId = props.selectedCourse !== null ? props.selectedCourse[0].id : null;
    courseId === null && searchString === "" && getpersonalgeneralchatgroups({ getChatGroups, pageNoPC });

    //courseId ===null && searchString !=="" && personalchatgroupsearch({searchString, pageNoPCS, getSearchedChatGroups});

    return () => {

      console.log("return first useEffct Triggered")
      setPageNoPC(pageNoPC => 1);
      getChatGroups(chatGroups => []);

    }

  }, [rerender, props.splender]);


  console.log("pageNoPCS: ", pageNoPCS);

  useEffect(() => {

    console.log("second useEffect");
    let courseId = props.selectedCourse !== null ? props.selectedCourse[0].id : null;
    courseId === null && searchString === "" && pageNoPC !== 1 && getpersonalgeneralchatgroups({ getChatGroups, pageNoPC });

  }, [pageNoPC]);




  useEffect(() => {

    let courseId = props.selectedCourse !== null ? props.selectedCourse[0].id : null;
    courseId === null && searchString !== "" && prevSearchString.current === searchString && prevPageNoPCS.current !== pageNoPCS && personalchatgroupsearch({ searchString, pageNoPCS, getSearchedChatGroups });

    courseId === null && searchString !== "" && prevSearchString.current !== searchString && personalchatgroupsearchNoappend({ searchString, pageNoPCS, getSearchedChatGroups });


    prevSearchString.current = searchString;
    prevPageNoPCS.current = pageNoPCS;

    return () => {

      //setPageNoPCS(1);
      //getSearchedChatGroups([]);


    }

  }, [searchString, pageNoPCS]);


  //useEffect(()=>{
  //  console.log()	   
  //  if(searchString==="" &&  prevSearchString.current !== searchString){
  //    setRerender(rerender=>!rerender); 
  //  }
  //   prevSearchString.current = searchString;
  // },[searchString]);





  const showNewGroupChatHandler = () => {
    //setShowNewChat(showNewChat=>false);
    setShowNewGroupChat(showNewGroupChat => true)
    setNewChatDropDown(showNewChatDropDown => false);
    setShowNewChat(showNewChat => false);
    setPageNoPC(pageNoPC => 1);
    getChatGroups(chatGroups => []);
  }


  const backToAllChats = () => {
    setShowNewChat(showNewChat => false);
    setShowNewGroupChat(showNewGroupChat => false);
    setRerender(rerender => !rerender);

  }


  const loadNextPagePCDataHandler = () => {
    let courseId = props.selectedCourse !== null ? props.selectedCourse[0].id : null;

    if (courseId === null && searchString === "" && chatGroups !== null && chatGroups.length > 0 && chatGroups.at(-1).next !== null) {
      setPageNoPC(pageNoPC + 1);
      //getpersonalgeneralchatgroups({getChatGroups, pageNoPC});
    }
  }



  const loadNextPagePCSDataHandler = () => {

    //console.log("next page search");
    if (searchedChatGroups !== null && searchedChatGroups.length > 0 && searchedChatGroups.at(-1).next !== null) {
      console.log("passing all conditions next page");
      setPageNoPCS(pageNoPCS + 1);
    }

  }












  const onScrollHandler = (event) => {

    const chatLog = event.target;
    //console.log("chatLog.scrollTop + chatLog.clientHeight:  ", Math.round(chatLog.scrollTop),'+', chatLog.clientHeight,' = ', Math.round(chatLog.scrollTop)+chatLog.clientHeight);
    //console.log("chatLog.scrollHeight: ", chatLog.scrollHeight);  

    let scrollTopInt = Math.trunc(chatLog.scrollTop);

    if (searchString === "" && scrollTopInt + chatLog.clientHeight === chatLog.scrollHeight) {
      loadNextPagePCDataHandler();
    }

    if (searchString !== "" && scrollTopInt + chatLog.clientHeight === chatLog.scrollHeight) {
      loadNextPagePCSDataHandler();
    }

  }




  const fetchUserGroups = () => {

    setIsLoadingPC(true);






  }











  const switchChatGroupHandler = async (groupId) => {

    console.log("switch Group..", groupId)
    props.switchGroupHandler(groupId);
  }

  const handleChange = (e) => {
    setSearchString(searchString => e.target.value);
    setPageNoPCS(1);
    //getSearchedChatGroups([]);

  }

  const handleClearClick = () => {
    setSearchString(searchString => "");
  }

  const showNewChatDropDownHandler = () => {
    setNewChatDropDown(showNewChatDropDown => true);
  }

  const showNewChatHandler = () => {
    setShowNewGroupChat(showNewGroupChat => false)
    setShowNewChat(showNewChat => true);
    setNewChatDropDown(showNewChatDropDown => false);
    setPageNoPC(pageNoPC => 1);
    getChatGroups(chatGroups => []);
  }


  console.log("chatGroups: ", chatGroups);

  console.log("searchedChatGroups: ", searchedChatGroups);

  return (
    <div className={classes.chatnavbar}>

      {!showNewChat && !showNewGroupChat &&
        <>
          <div className={classes.topBarLeft}>

            <div className={classes.selfUserDetails}>
              <img className={classes.mateIconUserImage} src={props.userData.profile_image} alt='edr Logo' />
              <div className={classes.userName}> {props.userData.firstname} </div>
            </div>


            <div className={classes.btnContainer}>

              {props.selectedCourse === null &&
                <button type="button" className={classes.img1} onClick={showNewChatDropDownHandler}>
                  <BsPersonPlus className={classes.iconSizeTopTool} />
                </button>
              }


              <button type="button" className={classes.img2}>
                <BsList size={25} />
              </button>

              {showNewChatDropDown &&

                <OutsideAlerter setDropDown={setNewChatDropDown}>
                  <div className={classes.newChatButtonOptions} >
                    <button type="button" className={classes.newChatButtons} onClick={showNewChatHandler}> +New User </button>
                    <button type="button" className={classes.newChatButtons} onClick={showNewGroupChatHandler}> +New Group  </button>
                  </div>

                </OutsideAlerter>

              }
            </div>

          </div>


          <div className={classes.searchContainer}>
            <input
              type="text"
              placeholder=" Search ... "
              className={searchString === "" ? classes.SearchInputNoString : classes.SearchInputString}
              onChange={handleChange}
              value={searchString}
            />

            {searchString !== "" &&
              <button onClick={handleClearClick} className={classes.closeSearchButton}>
                <AiOutlineClose />
              </button>
            }

          </div>



          <div className={classes.scroll}
            onScroll={onScrollHandler}
            ref={listInnerRef}
          >



            {searchString === "" && props.selectedCourse === null && chatGroups.length > 0 &&


              chatGroups.map((OnePageChatGroup, index) => {
                return OnePageChatGroup.results.map((group, index) => {
                  if (group.groupType === "oneoone" && group.groupuserObjects.length === 2) {
                    return <UserContainer key={index}
                      userData={props.userData}
                      group={group}
                      switchGroupHandler={switchChatGroupHandler}
                      msgNum="1"
                    />
                  }

                })

              })

            }






            {searchString !== "" && props.selectedCourse === null && searchedChatGroups.length > 0 &&


              searchedChatGroups.map((OnePageChatGroup, index) => {


                return OnePageChatGroup.results.map((group, index) => {

                  if (group.groupType === "oneoone" && group.groupuserObjects.length === 2) {

                    return <UserContainer key={index}
                      userData={props.userData}
                      group={group}
                      switchGroupHandler={switchChatGroupHandler}
                      msgNum="1"
                    />
                  }

                })

              })

            }


            {searchString !== "" && props.selectedCourse === null && searchedChatGroups.length > 0 && searchedChatGroups.at(0).count === 0 &&

              <div className={classes.noContactFound}>No Contacts found!  </div>

            }






          </div>


        </>}



      {showNewChat && <>

        <ChatNavBarNewChat userData={props.userData}
          setShowNewChat={setShowNewChat}
          setRerender={setRerender}
          backToAllChats={backToAllChats}
        />
      </>

      }



      {showNewGroupChat &&
        <ChatNavBarNewGroupChat
          userData={props.userData}
          setShowNewChat={setShowNewChat}
          setRerender={setRerender}
          backToAllChats={backToAllChats}
          selectedCourse={props.selectedCourse}
        />
      }


    </div>
  );
};
export default ChatNavBar;

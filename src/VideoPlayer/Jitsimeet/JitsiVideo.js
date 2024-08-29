import { JaaSMeeting, JitsiMeeting } from '@jitsi/react-sdk';
import React, { useRef, useState,useEffect } from 'react';
import {Route,Switch, useHistory} from 'react-router-dom';
import classes from './JitsiVideo.module.css';



const JitsiVideo=()=>{



    const [meetingPath, setMeetingPath]= useState(null);

    const [linkCorrect, setLinkCorrect]= useState(true);	

    const [meetingRoomName, setMeetingRoomName] = useState(null);


    useEffect(()=>{

     let meetingURL=window.location.href;
     let pattern = '/video/meet.[1-9]+.[1-9]+.[1-9]+.[1-9]+';
     //let pattern2 = '/video/meet.1.1663275331164.27.54381016977858'	    
     let result = meetingURL.match(pattern);


	    
      console.log("result: ", result);
      
      console.log("meetingURL: ", meetingURL);

      if (result) {
         let urlarray=meetingURL.split("/");
	 let lastpart=urlarray[urlarray.length-2];

	 let fullpath= '/video/'+lastpart;    
	 //console.log("lastpart: ", lastpart);
     //  let meeting_Id=urlarray[urlarray.length-2];

     //  setMeetingId(meeting_Id);
         setLinkCorrect(true);
 
        setMeetingPath(fullpath+'/');
        setMeetingRoomName(lastpart);

      }

     return ()=>{

     setMeetingPath(meetingPath=>null);
     setLinkCorrect(false);
     setMeetingRoomName(null);	     
     }


     },[]);


    const apiRef = useRef();
    const [ logItems, updateLog ] = useState([]);
    const [ showNew, toggleShowNew ] = useState(false);
    const [ knockingParticipants, updateKnockingParticipants ] = useState([]);

    const printEventOutput = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog(items => [ ...items, `${feature} off` ])
        } else {
            updateLog(items => [ ...items, `${feature} on` ])
        }
    };

    const handleChatUpdates = payload => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
        updateLog(items => [ ...items, `you have ${payload.unreadCount} unread messages` ])
    };

    const handleKnockingParticipant = payload => {
        updateLog(items => [ ...items, JSON.stringify(payload) ]);
        updateKnockingParticipants(participants => [ ...participants, payload?.participant ])
    };

    const resolveKnockingParticipants = condition => {
        knockingParticipants.forEach(participant => {
            apiRef.current.executeCommand('answerKnockingParticipant', participant?.id, condition(participant));
            updateKnockingParticipants(participants => participants.filter(item => item.id === participant.id));
        });
    };

    const handleJitsiIFrameRef1 = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '95vh';
        iframeRef.style.marginBottom = '20px';
    };

    const handleJitsiIFrameRef2 = iframeRef => {
        iframeRef.style.marginTop = '10px';
        iframeRef.style.border = '10px dashed #df486f';
        iframeRef.style.padding = '5px';
        iframeRef.style.height = '95vh';
    };

    const handleJaaSIFrameRef = iframeRef => {
        iframeRef.style.border = '10px solid #3d3d3d';
        iframeRef.style.background = '#3d3d3d';
        iframeRef.style.height = '400px';
        iframeRef.style.marginBottom = '20px';
    };

    const handleApiReady = apiObj => {
        apiRef.current = apiObj;
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
        apiRef.current.on('audioMuteStatusChanged', payload => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', payload => handleAudioStatusChange(payload, 'video'));
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
        apiRef.current.on('knockingParticipant', handleKnockingParticipant);
    };

    const handleReadyToClose = () => {
        /* eslint-disable-next-line no-alert */
        alert('Ready to close...');
    };

    const generateRoomName = () => `diracAIMeetRoomNo${Math.random() * 100}-${Date.now()}`;

    // Multiple instances demo
    const renderNewInstance = () => {
        if (!showNew) {
            return null;
        }

        return (
            <JitsiMeeting
                roomName = { generateRoomName() }
                getIFrameRef = { handleJitsiIFrameRef2 } />
        );
    };

    const renderButtons = () => (
        <div style = {{ margin: '15px 0' }}>
            <div style = {{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button
                    type = 'text'
                    title = 'Click to execute toggle raise hand command'
                    style = {{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#f8ae1a',
                        color: '#040404',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick = { () => apiRef.current.executeCommand('toggleRaiseHand') }>
                    Raise hand
                </button>
                <button
                    type = 'text'
                    title = 'Click to approve/reject knocking participant'
                    style = {{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#0056E0',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick = { () => resolveKnockingParticipants(({ name }) => !name.includes('test')) }>
                    Resolve lobby
                </button>
                <button
                    type = 'text'
                    title = 'Click to execute subject command'
                    style = {{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#df486f',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick = { () => apiRef.current.executeCommand('subject', 'New Subject')}>
                    Change subject
                </button>
                <button
                    type = 'text'
                    title = 'Click to create a new JitsiMeeting instance'
                    style = {{
                        border: 0,
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: '#3D3D3D',
                        color: 'white',
                        padding: '12px 46px',
                        margin: '2px 2px'
                    }}
                    onClick = { () => toggleShowNew(!showNew) }>
                    Toggle new instance
                </button>
            </div>
        </div>
    );

    const renderLog = () => logItems.map(
        (item, index) => (
            <div
                style = {{
                    fontFamily: 'monospace',
                    padding: '5px'
                }}
                key = { index }>
                {item}
            </div>
        )
    );

    const renderSpinner = () => (
        <div style = {{
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            Loading..
        </div>
    );


    let roomName_="diracAI"
    //generateRoomName()

    console.log("room No: ", generateRoomName());

    console.log("meeting path: ",meetingPath);


    return (

     <>
     <Route  exact path={meetingPath} >







        <div style={{borderStyle:'none',height:'100vh'}}>

	    { linkCorrect && <>
            <JitsiMeeting
                roomName = { meetingRoomName }
                spinner = { renderSpinner }
                config = {{
                    subject: 'lalalala',
                    hideConferenceSubject: false
                }}
                onApiReady = { externalApi => handleApiReady(externalApi) }
                onReadyToClose = { handleReadyToClose }
                getIFrameRef = { handleJitsiIFrameRef1 } />
               </>
             }

	    { !linkCorrect && <div className={classes.wrongLinkMessage}>
                         <h1>Looks like you have entered a wrong link</h1>
			 </div>   


	    }

            {/*
            <JaaSMeeting
                roomName = { generateRoomName() }

                // release = 'release-3110' // Update this with the version of interest.
                useStaging = { true }
                getIFrameRef = { handleJaaSIFrameRef } />
             */}


            {/*renderButtons()*/}
            {/*renderNewInstance()*/}
            {/*renderLog()*/}
           </div>


         </Route>


    </>	    

    );




}

export default JitsiVideo;

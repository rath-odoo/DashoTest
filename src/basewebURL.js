let basewebURL;
let meetingbasewebURL;

if(window.location.host === "localhost:3000") {

    basewebURL = "https://dashoapp.com";
    meetingbasewebURL = "http://localhost:3000";
  }

if(window.location.host === "127.0.0.1:8000") {
    basewebURL = "http://127.0.0.1:8000";
    meetingbasewebURL = basewebURL;
  }


if(window.location.host === "dashoapp.com") {
   basewebURL = "https://dashoapp.com";
   meetingbasewebURL = basewebURL;
 }


if(window.location.host === "stage.dashoapp.com") {
   basewebURL = "https://stage.dashoapp.com";
   meetingbasewebURL = basewebURL;
 }




export default basewebURL;

export { meetingbasewebURL };

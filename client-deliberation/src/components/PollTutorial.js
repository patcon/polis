import React, { useState, useEffect } from "react";
import { Box, Button } from "theme-ui";
import UnderstandAI from "./UnderstandAI";
import IndividualDeliberation from "./IndividualDeliberation";
import ProgressBar from "./Progressbar";
import Tutorials from "./Tutorials";
import ConversationUITutorial from "./ConversationUITutorial";
import ConversationUI from "./ConversationUI";
import Legal from "./Legal";
import Sidebar from "./Sidebar";
import {ResponseObject, Routeprops_tut} from "./PollConsts";
import PolisNet from "../util/net";
import TutorialBackground from "./TutorialBackground";
// import { ToastContainer, toast } from 'react-toastify';
// import { Snackbar } from '@mui/material';


const PollTutorial = ({ response, setshowPoll}) => {
  const [progress, setProgress] = useState(0);
  const [current_state_index, setcurrent_state_index] = useState(0);
  const tutorial_length_of_pages = [3, 7, 11, 17];

  const [current_state_progress, setcurrent_state_progress] = useState(0);
  const [current_state_page, setcurrent_state_page] = useState(0);

  const [current_index_polltutorial, setcurrent_index_polltutorial] = useState(0);
  const [current_tutorial_text, setcurrent_tutorial_text] = useState({});




  useEffect(() => {
    const tut_prog = response.user.tutorialprogress

    PolisNet.polisGet('/api/v3/getTutorialText')
        .then(response => {
          console.log("response", response)
          setcurrent_tutorial_text(response)
        })
        .fail(err => console.error('Error calling API:', err)); 

    const updatedModules = modules.map((module, index) => ({
      ...module,
      currently_displayed: index === tut_prog,
      not_completed: (index > response.user.tutorialprogress) ? true : false
    }));
    setModules(updatedModules);
    
    setProgress(tut_prog *10)
    setcurrent_state_page(0)
    setcurrent_state_page(tut_prog)
    setcurrent_state_progress(tut_prog)
    
  }, []);


  const handleNextClick = () => {
    setcurrent_state_index(current_state_index+1)
    setProgress(progress + 10);
  };

  const handleNextClickTutorial = () => {
    handleTutorialCompletion(response.user.email)
    console.log("user respones", response.user.email)
  };

  const handleModuleClick = (moduleIndex, come_from_next) => {
    if ((current_state_progress >= moduleIndex) !== come_from_next) {
      console.log("curentstateprogress", current_state_progress)
      const updatedModules = modules.map((module, index) => ({
        ...module,
        currently_displayed: index === moduleIndex,
        not_completed: (index > (come_from_next ? current_state_progress + 1 : current_state_progress)) ? true : false
      }));
      setcurrent_state_page(moduleIndex)
      setModules(updatedModules); 
      const newIndex = tutorial_length_of_pages[moduleIndex];
      setcurrent_state_index(newIndex);
      console.log("progress", moduleIndex, "length ",tutorial_length_of_pages.length, "result", (moduleIndex) * (100 / tutorial_length_of_pages.length))
      setProgress((moduleIndex) * 10);
      
    } else {
      toast.warn("You haven't been to this module yet. Please continue.", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    console.log("I came down here", moduleIndex)
  };
  



  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#F4511E',
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out'
  }
  

  let componentToRender;
  let heading;
  // let show_progress = (response.user.tutorialprogress < 4 && !(current_state_index > tutorial_length_of_pages[tutorial_length_of_pages.length -1])) || (!(response.user.tutorialprogress < 4) && current_state_index > tutorial_length_of_pages[tutorial_length_of_pages.length -1])
  const isAtTutorialPageEnd = tutorial_length_of_pages.map(value => value).includes(current_state_index);

  if(current_state_page == 9){
      componentToRender = <ConversationUITutorial {...Routeprops_tut} response={ResponseObject} currentIndex={current_index_polltutorial}/>;

  } else {
    componentToRender = <TutorialBackground {...response.user} currentIndex={current_state_page} tutorial_text={current_tutorial_text}  />;
  }
  const [modules, setModules] = useState([
    { name: 'Competence', progress: 0 , currently_displayed: true, not_completed: false},
    { name: 'Scope of Representation and Allocation of Authority', progress: 10, currently_displayed: false, not_completed: true},
    { name: 'Diligence', progress: 20, currently_displayed: false, not_completed: true },
    { name: 'Confidentiality of Information', progress: 30 , currently_displayed: false, not_completed: true},
    { name: 'Conflict of Interest: Current Clients', progress: 40, currently_displayed: false, not_completed: true },
    { name: 'Conflict of Interest', progress: 50, currently_displayed: false, not_completed: true },
    { name: 'Duty to Former Clients', progress: 60, currently_displayed: false, not_completed: true },
    { name: 'Advisor', progress: 70, currently_displayed: false, not_completed: true },
    { name: 'Meritorious Claims and Contentions ', progress: 80, currently_displayed: false, not_completed: true },
    { name: 'Poll Explenation', progress: 80, currently_displayed: false, not_completed: true },
    ]);

    const handleTutorialCompletion = (userEmail) => {
      setcurrent_state_progress(current_state_progress+1)
      handleModuleClick(current_state_progress+1, true)
      console.log("test123123", response.user.email)
      PolisNet.polisPost('/api/v3/updateTutorialDoneByEmail', { email: response.user.email })
        .then(response => {
          if (response.success) {
            console.log('Tutorial updated successfully!', response.result);
          
          } else {
            console.error('Failed to update tutorial:', response.error);
          }
        })
        .fail(err => console.error('Error calling API:', err)); 
    };

    const handleTutorialCompletion2 = () => {

      setcurrent_state_progress(current_state_progress+1)
      handleModuleClick(current_state_progress+1, true)
      console.log("test123123", response.user.email)
      setshowPoll(true)
      PolisNet.polisPost('/api/v3/updateTutorialDoneByEmail', { email: response.user.email })
        .then(response => {
          
          if (response.success) {
            console.log('Tutorial updated successfully!', response.result);
          
          } else {
            console.error('Failed to update tutorial:', response.error);
          }
        })
        .fail(err => console.error('Error calling API:', err)); 
       
    };



 

 


  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      {/* <ToastContainer /> */}
      <Sidebar modules={modules} onModuleClick={handleModuleClick} />
      {componentToRender}
      <div>

          <>
            {(current_state_page == 9) && <Tutorials email={response.user} current_state_index={current_index_polltutorial} setcurrent_state_index={setcurrent_index_polltutorial} heading={heading}/>}
            <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
  <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
    <ProgressBar progress={progress} fillerStyles={fillerStyles}></ProgressBar>
  </div>
  {(current_state_progress == current_state_page) && 
    <Button onClick={(current_state_page == 9) ? () => handleTutorialCompletion2(): handleTutorialCompletion} 
            sx={{ marginLeft: '30px' }}>
      Next
    </Button>
  }
</div>

        
            </div>
            
          </>
     

      </div>

    </Box>
  );
};

export default PollTutorial;

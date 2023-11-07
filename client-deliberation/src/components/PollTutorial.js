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

const PollTutorial = ({ response, setshowPoll}) => {
  const [progress, setProgress] = useState(0);
  const [current_state_index, setcurrent_state_index] = useState(0);
  const tutorial_length_of_pages = [3, 7, 11, 17];

  useEffect(() => {
    const tut_prog = response.user.tutorialprogress
    const updatedModules = modules.map((module, index) => ({
      ...module,
      not_completed: (index > response.user.tutorialprogress) ? true : false
    }));
    setModules(updatedModules); // Update the modules state
    console.log("hello", modules)
    if (tut_prog > 0 && tut_prog <4) {
      const newIndex = tutorial_length_of_pages[tut_prog - 1];
      setcurrent_state_index(newIndex+1);
      setProgress(progress + tut_prog*25)
    }
    
    
  }, []);


  const handleNextClick = () => {
    setcurrent_state_index(current_state_index+1)
    setProgress(progress + 25);
  };

  const handleModuleClick = (moduleIndex) => {
    if (response.user.tutorialprogress >= moduleIndex) {
      // Set all modules' currently_displayed to false
      const updatedModules = modules.map((module, index) => ({
        ...module,
        currently_displayed: index === moduleIndex,
        not_completed: (index > response.user.tutorialprogress) ? true : false
      }));

      
      
      setModules(updatedModules); // Update the modules state
  
      const newIndex = tutorial_length_of_pages[moduleIndex];
      setcurrent_state_index(newIndex);
      setProgress((moduleIndex + 1) * (100 / tutorial_length_of_pages.length));
      
    } else {
      alert("You havent been to this module yet. Please continue ")
    }
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
  let show_progress = (response.user.tutorialprogress < 4 && !(current_state_index > tutorial_length_of_pages[tutorial_length_of_pages.length -1])) || (!(response.user.tutorialprogress < 4) && current_state_index > tutorial_length_of_pages[tutorial_length_of_pages.length -1])
  const isAtTutorialPageEnd = tutorial_length_of_pages.map(value => value).includes(current_state_index);


  if(response.user.tutorialprogress > 3 || current_state_index > tutorial_length_of_pages[tutorial_length_of_pages.length -1 ]){
    setshowPoll(true)
  } else if (current_state_index <= tutorial_length_of_pages[0]) {
    componentToRender = <IndividualDeliberation {...response.user} currentIndex={current_state_index} />;
    heading = "Individual Deliberation"
  } else if (current_state_index > tutorial_length_of_pages[0] && current_state_index <= tutorial_length_of_pages[1]) {
      componentToRender = <UnderstandAI {...response.users} currentIndex={current_state_index}/>;
      heading = "UnderstandAI"
  } else if (current_state_index > tutorial_length_of_pages[1] && current_state_index <= tutorial_length_of_pages[2]) {
      componentToRender = <Legal currentIndex={current_state_index} />;
      heading = "Legal"
  } else if (current_state_index > tutorial_length_of_pages[2] && current_state_index <= tutorial_length_of_pages[3]) {
      componentToRender = <ConversationUITutorial {...Routeprops_tut} response={ResponseObject} currentIndex={current_state_index}/>;
      heading = "Poll"
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
    ]);
 


  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      <Sidebar modules={modules} onModuleClick={handleModuleClick} />
      {componentToRender}
      <div>
      {show_progress && (
          <>
            {!isAtTutorialPageEnd && <Tutorials email={response.user} current_state_index={current_state_index} setcurrent_state_index={setcurrent_state_index} heading={heading}/>}
            <div>
            {current_state_index <= tutorial_length_of_pages[tutorial_length_of_pages.length - 1] && (
              <ProgressBar progress={progress} fillerStyles={fillerStyles}></ProgressBar>
            )}
            {isAtTutorialPageEnd && <Button onClick={handleNextClick} sx={{ marginLeft: '30px'}}>Next</Button>}
            </div>
            
          </>
        )}

      </div>

    </Box>
  );
};

export default PollTutorial;

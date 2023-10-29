import React, { useState, useEffect } from "react";
import { Box, Button } from "theme-ui";
import UnderstandAI from "./UnderstandAI";
import IndividualDeliberation from "./IndividualDeliberation";
import ProgressBar from "./Progressbar";
import Tutorials from "./Tutorials";
import ConversationUITutorial from "./ConversationUITutorial";
import ConversationUI from "./ConversationUI";
import Legal from "./Legal";
import {ResponseObject, Routeprops_tut} from "./PollConsts";

const PollTutorial = ({ response, setshowPoll}) => {
  const [progress, setProgress] = useState(0);
  const [current_state_index, setcurrent_state_index] = useState(0);
  const tutorial_length_of_pages = [3, 7, 11, 16];

  useEffect(() => {
    const tut_prog = response.user.tutorialprogress
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
 


  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
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

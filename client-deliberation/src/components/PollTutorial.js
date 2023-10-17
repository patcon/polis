import React, { useState, useEffect } from "react";
import { Box, Button } from "theme-ui";
import UnderstandAI from "./UnderstandAI";
import IndividualDeliberation from "./IndividualDeliberation";
import ProgressBar from "./Progressbar";
import Tutorials from "./Tutorials";
import ConversationUI from "./ConversationUI";
import Legal from "./Legal";
import {ResponseObject, Routeprops_tut} from "./PollConsts";

const PollTutorial = ({ response, ...routeProps }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const [current_state_index, setcurrent_state_index] = useState(0);
  const [highest_state_index, sethighest_state_index] = useState(0); //var needed so when you go back the tutorial doesn't start over

  // const [responseObject, setResponseObject] = useState({});
  const tutorial_length_of_pages = [3, 6, 9, 14];

  useEffect(() => {
    if (response.user.tutorialprogress > 0 && response.user.tutorialprogress <4) {
      const newIndex = tutorial_length_of_pages[response.user.tutorialprogress - 1];
      setcurrent_state_index(newIndex+1);
      sethighest_state_index(newIndex+1)
    }
  }, []);


  // const handleNextClick = () => {
  //   setCurrentTutorialIndex(currentTutorialIndex+1)
  //   if (currentIndex < 3) {
  //     setCurrentIndex(currentIndex + 1);
  //     setProgress(progress + 25);
  //   }
  // };
  // const handleBackClick = () => {
  //   setCurrentTutorialIndex(currentTutorialIndex-1)
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //     setProgress(progress - 25);
  //   }
  // };




  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#F4511E',
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out'
  }
  

  let componentToRender;
  let heading;

  if (current_state_index <= tutorial_length_of_pages[0]) {
    componentToRender = <IndividualDeliberation {...response.user} currentIndex={currentIndex} />;
    heading = "Individual Deliberation"
  } else if (current_state_index > tutorial_length_of_pages[0] && currentIndex <= tutorial_length_of_pages[1]) {
      componentToRender = <UnderstandAI {...response.users} />;
      heading = "UnderstandAI"
  } else if (current_state_index > tutorial_length_of_pages[1] && currentIndex <= tutorial_length_of_pages[2]) {
      componentToRender = <Legal />;
      heading = "Legal"
  } else if (current_state_index > tutorial_length_of_pages[2] && currentIndex <= tutorial_length_of_pages[3]) {
      componentToRender = <ConversationUI {...Routeprops_tut} response={ResponseObject} />;
      heading = "Poll"
  }
  const isAtTutorialPageEnd = tutorial_length_of_pages.map(value => value - 1).includes(current_state_index);


  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      {componentToRender}
      <div>
       {response.user.tutorialprogress >= 5 && <ConversationUI {...routeProps} response={response} />} {/* response.user.tutorialprogress >= 5 means he has already gone throught the tutorial. */}
      {/* <button onClick={() => {console.log("props", {...routeProps}, "response obj", response, "currentindex", current_state_index)}}>auth inner</button>  */}
      <button onClick={() => {console.log("props",current_state_index)}}>auth inner</button> 
      {!isAtTutorialPageEnd && <Tutorials email={response.user} current_state_index={current_state_index} setcurrent_state_index={setCurrentIndex} heading={heading}/>}
      {current_state_index <= tutorial_length_of_pages[tutorial_length_of_pages.length - 1] && (
        <ProgressBar progress={progress} fillerStyles={fillerStyles}></ProgressBar>
      )}
      </div>
      
      {/* {shouldRenderTutorial&& <Tutorial setCurrentIndex={setCurrentTutorialIndex} currentIndex={currentTutorialIndex} email={props.response.user} tutorialprogress={props.response.user.tutorialprogress} currentIndexpage={currentIndex} setnextButtonState={setnextButtonState}/>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {currentIndex !== 0 && currentTutorialIndex !== 0 && (
          <Button onClick={handleBackClick} sx={{ marginRight: '10px' }}>Back</Button>
        )}
        <ProgressBar progress={progress} fillerStyles={fillerStyles}></ProgressBar>
        {!shouldRenderTutorial && <Button onClick={handleNextClick} sx={{ marginLeft: '10px' }}>Next</Button>} */}
      {/* </div> */}
    </Box>
  );
};

export default PollTutorial;

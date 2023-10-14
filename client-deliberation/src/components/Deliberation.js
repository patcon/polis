import React, { useState, useEffect } from "react";
import { Box, Button } from "theme-ui";
import UnderstandAI from "./UnderstandAI";
import IndividualDeliberation from "./IndividualDeliberation";
import ProgressBar from "./Progressbar";
import Tutorial from "./Tutorial";
import ConversationUI from "./ConversationUI";
import Legal from "./Legal";

const Deliberation = (props = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(33.3);
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
  const [isConversationExists, setIsConversationExists] = useState(null);
  // const [responseObject, setResponseObject] = useState({});


  const handleNextClick = () => {
    setCurrentTutorialIndex(currentTutorialIndex+1)
    if (currentIndex < 3) {
      setCurrentIndex(currentIndex + 1);
      setProgress(progress + 25);
    }
  };
  const handleBackClick = () => {
    setCurrentTutorialIndex(currentTutorialIndex-1)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(progress - 25);
    }
  };

  const testProps = {
    match: {
      params: {
        conversation_id: '8hjyvcneet', 
      },
    },
    response: {
      nextComment: {
        tid: 1,
        txt: 'This is a test comment.',
        remaining: 5,
      },
      ptpt: {
        pid: 1, 
        subscribed: false,
      },
      user: {
        email: 'janst.geo@gmail.com', 
      },
      conversation: {
        topic: 'Test Conversation',
        description: 'This is a test conversation for development purposes.',
        is_active: true,
        subscribe_type: 1,
        help_type: 1,
        write_type: 1,
        vis_type: 1,
      },
    },
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: '#F4511E',
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out'
  }
  
  const shouldShowNextButton = () => {
    if (props.tutorialprogress > 0) {
      if (currentIndex === 0 && props.tutorialprogress > 0) {
        return true;
      }
      if (currentIndex === 1 && props.tutorialprogress > 1) {
        return true;
      }
      if (currentIndex === 2 && props.tutorialprogress > 2) {
        return true;
      }
 
    }
    return false;
  };
  

  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      {currentIndex === 0 && <IndividualDeliberation {...props} currentIndex={currentIndex} />}
      {currentIndex === 1 && <UnderstandAI {...props} />}
      {currentIndex === 2 &&  <Legal/>}
      {currentIndex === 3 && isConversationExists && <ConversationUI response={testProps} />}
      {!shouldShowNextButton()&& <Tutorial setCurrentIndex={setCurrentTutorialIndex} currentIndex={currentTutorialIndex} email={props} tutorialprogress={props.tutorialprogress} currentIndexpage={currentIndex} />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {currentIndex !== 0 && currentTutorialIndex !== 0 && (
          <Button onClick={handleBackClick} sx={{ marginRight: '10px' }}>Back</Button>
        )}
        <ProgressBar progress={progress} fillerStyles={fillerStyles}></ProgressBar>
        {shouldShowNextButton() && <Button onClick={handleNextClick} sx={{ marginLeft: '10px' }}>Next</Button>}
      </div>
    </Box>
  );
};

export default Deliberation;

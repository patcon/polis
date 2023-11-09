import React, { useState, useEffect, Fragment } from "react";
import Title from "./Title";
import Subtitle from "./Subtitle";
import StatementUIContainer from "./StatementUIContainer";
import StatementUI from "./StatementUI";
import StatementFormTutorial from "./StatementFormTutorial";
import { Flex, Box, Text, Button, Input } from "theme-ui";
import HexLogo from "./hexLogo";
import OpinionContainer from "./OpinionContainer";
import PolisNet from "../util/net";
import VisualisationTutorial from "./VisualisationTutorial";

const ConversationUITutorial = (props) => {
  const conversation_id = props.match.params.conversation_id;
  const [nextComment, setNextComment] = useState(props.response.nextComment);
  const [myPid, setMyPid] = useState(props.response.ptpt?.pid ?? "unknownpid");
  const [isSubscribed, setIsSubscribed] = useState(props.response.ptpt?.subscribed ?? false)
  const [emailInputValue, setEmailInputValue] = useState("")

  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    if (!zoom) {
      setZoom(true); 
      setTimeout(() => {
       
        setZoom(false); 
      }, 500);
    }
  }, [props.currentIndex]);

  const vote = (params) => {
   
  };

  const processPidResponse = (returnedPid) => {
    if (returnedPid !== myPid) {
      setMyPid(returnedPid)
    }
  }

  const doSubscribe = () => {
    PolisNet.polisPost("/api/v3/convSubscriptions", {
      conversation_id: conversation_id,
      type: 1,
      email: props.response.user.email || emailInputValue,
    })
      .then((res) => {
        setIsSubscribed(true)
      })
      .fail((err) => {
        alert("Error subscribing")
      });
  };

  const getSubscribeForm = () => {
    if (props.response.user?.hasOwnProperty("email") ?? false) {
      <form>
        {props.response.user?.email}
        <Button onClick={doSubscribe}>
          Subscribe
        </Button>
      </form>
    }
    return (
      <form>
        <Box sx={{ mb: [2] }}>
          {"Enter your email: "}
          <Input value={emailInputValue} onChange={(event) => {
            setEmailInputValue(event.target.value);
          }} sx={{ display: "inline", width: 250, height: 35 }} />
        </Box>
        <Button type="button" onClick={doSubscribe}>
          Subscribe
        </Button>
      </form>
    )
  }

  const getSubscribeText = () => {
    if (isSubscribed) {
      return (
        <Fragment>
          <Text>If you have something to add, try writing your own statement.</Text>
          <Text>You are subscribed to updates for this conversation.</Text>
        </Fragment>
      )
    } else {
      if (props.response.conversation.subscribe_type == 1) { //can subscribe
        return (
          <Fragment >
            <Text>Get notified when more statements arrive:</Text>
            {getSubscribeForm()}
          </Fragment>
        )
      } else {
        return <Text>If you have something to add, try writing your own statement.</Text>
      }
    }
  }

  const getHasVotedUI = () => {
    return (
      <Fragment>
        <Text>
          You've voted on all the statements.
        </Text>
        {getSubscribeText()}
      </Fragment>
    )
  }

  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px" }}>
      <HexLogo />
      <Title value={props.response.conversation.topic} />
      {props.response.conversation.is_active == false &&
        <Box
          sx={{
            display: "inline-block",
            bg: "#cf152a",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <Text sx={{ color: "white" }}>closed</Text>
        </Box>
      }
      <Subtitle value={props.response.conversation.description} />
      {props.response.conversation.is_active == true &&
        <Box>
          {props.response.conversation.help_type !== 0 &&
            <Text variant="conversationPage" sx={{ mb: [2] }}>
              Welcome to a new kind of conversation - vote on other people's statements.
            </Text>
          }
           
           <div style={{
                     transform: zoom && props.currentIndex === 1 ? 'scale(1.2)' : 'scale(1)',
                     transition: 'transform 0.5s' // add this line for smoother transitions
                    }}>
          <StatementUIContainer >
          
              <StatementUI
                author="Anonymous"
                numStatementsRemaining={nextComment.remaining}
                statement={nextComment.txt}
              />
         
          </StatementUIContainer></div>
          {props.response.conversation.write_type !== 0 &&
            <Fragment>
              {props.response.conversation.help_type !== 0 &&
                <Box>
                  <Text variant="conversationPage" sx={{ mb: [3] }}>
                    Are your perspectives or experiences missing from the conversation? If so, add them in the
                    box below.
                  </Text>
                  <Text variant="conversationPage">What makes a good statement?</Text>
                  <Text variant="conversationPage">
                    <ul>
                      <li>Stand alone idea</li>
                      <li>Raise new perspectives, experiences or issues</li>
                      <li>Clear & concise (limited to 140 characters)</li>
                    </ul>
                  </Text>
                  <Text variant="conversationPage" sx={{ mb: [3] }}>
                    Please remember, statements are displayed randomly and you are not replying directly to
                    other participants' statements.
                  </Text>
                </Box>
              }
               <div style={{
                     transform: zoom && props.currentIndex === 2 ? 'scale(1.2)' : 'scale(1)',
                     transition: 'transform 0.5s' // add this line for smoother transitions
                    }}>

              <StatementFormTutorial/> 
              
              </div>
            </Fragment>
          }
        </Box>
      }
  
      
        <Fragment>
          <Box sx={{ mb: [3] }}>
            <OpinionContainer showHelperText={props.response.conversation.help_type} />
          </Box>
          <Box sx={{ mb: [5] }}>
          <div style={{
                     transform: zoom && props.currentIndex === 3 ? 'scale(1.2)' : 'scale(1)',
                     transition: 'transform 0.5s' // add this line for smoother transitions
                    }}> 
                    <VisualisationTutorial myPid={myPid} conversation_id={conversation_id} currentIndex={props.currentIndex} />
                    </div>
          </Box>
        </Fragment>
       
      
      
      <Flex sx={{ justifyContent: "center" }}>
        {/* TODO: enlarge */}
        <HexLogo />
      </Flex>
    </Box>
  );
};

export default ConversationUITutorial;

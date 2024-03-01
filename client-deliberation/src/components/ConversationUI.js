import React, { useState, useEffect, Fragment } from "react";
import Title from "./Title";
import Subtitle from "./Subtitle";
import StatementUIContainer from "./StatementUIContainer";
import StatementUI from "./StatementUI";
import StatementForm from "./StatementForm";
import { Flex, Box, Text, Button, Input } from "theme-ui";
import HexLogo from "./hexLogo";
import OpinionContainer from "./OpinionContainer";
import PolisNet from "../util/net";
import Visualization from "./Visualization";
import { Widget, addResponseMessage, toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import styled from 'styled-components';

const ConversationUI = (props) => {
  const conversation_id = props.match.params.conversation_id;
  const [nextComment, setNextComment] = useState(props.response.nextComment);
  const [myPid, setMyPid] = useState(props.response.ptpt?.pid ?? "unknownpid");
  const [isSubscribed, setIsSubscribed] = useState(props.response.ptpt?.subscribed ?? false)
  const [emailInputValue, setEmailInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false); // Loading state to control request
  const title = `Summary about ${props.response?.conversation?.topic || 'the topic'}`;
  const description = `You can ask me anything about  ${props.response?.conversation?.topic || 'the description'}`;
  const [extractedTopics, setExtractedTopics] = useState([]);


  useEffect(() => {
    // gptSummaryAPI("Give me a summary about UAMs");
    // console.log("gpt function triggerted")


    /**
     * INDEPENDET VARIABLE 1
     * Provide Citation
     * The context of providing a citation is applicable to supplementing a summaries with additional information.
    */
    // handleCitationSummaryGeneration()

    /**
     * INDEPENDET VARIABLE 2
     * Simple Language
     * The use of simplified language versus standard language in summaries can affect comprehensibility and accessibility for diverse audiences.
    */
    // handleSimpleLanguageSummaryGeneration()


    /**
     * INDEPENDET VARIABLE 3
     * Participant-initiated / automatically-initiated
     * The decision to make summarization participant-initiated versus automatically-initiated can impact user engagement and the relevance of the summaries produced.
    */
    toggleWidget();

    /**
     * INDEPENDET VARIABLE 4
     * Poll Summary
     * The entire poll is summarized, including the comments and the poll results.
    */
    //  handlePollSummaryGeneration()

    /**
     * INDEPENDET VARIABLE 4
     * Discussion Summary
     * The entire discussion is summarized, including the comments.
     */
    handleDiscussionSummaryGeneration()

  }, []); // Dependencies array


  function extractDataFromString(inputString) {
    try {
      let jsonObj = JSON.parse(inputString);
      return (jsonObj)
    } catch (e) {
      console.error("Parsing error:", e);
    }
  }
  const vote = (params) => {
    PolisNet.polisPost(
      "/api/v3/votes",
      $.extend({}, params, {
        pid: "mypid",
        conversation_id: conversation_id,
        agid: 1,
        tid: nextComment.tid,
        weight: 0,
      }),
    )
      .then((res) => {
        if (res.nextComment === undefined && res.currentPid !== undefined) {
          // for correctly showing "you've voted on all statements" message
          setNextComment({ currentPid: res.currentPid })
        } else {
          setNextComment(res.nextComment);
        }
        if (!_.isUndefined(res.currentPid)) {
          processPidResponse(res.currentPid);
        }
      })
      .fail((err) => {
        if (!navigator.cookieEnabled) {
          alert(
            "Sorry, voting requires cookies to be enabled. If you do enable cookies, be sure to reload the page after.",
          );
        } else {
          alert("Apologies, your vote failed to send. Please check your connection and try again.");
        }
      });
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

  const gptSummaryAPI = (questionString) => {
    PolisNet.polisGet("/api/v3/gptSummary", { question: questionString })
      .then(response => {

        if (response && response.message && typeof response.message === 'string') {
          addResponseMessage(response.message);
        } else {
          console.error('Received non-string message content or invalid response structure');
        }

        console.log("GPT response", response)
      })
      .fail(err => console.error('Error calling API:', err));
  }

  const gptSummaryAPI_console = (questionString) => {
    PolisNet.polisGet("/api/v3/gptSummarytree", { question: questionString })
      .then(response => {
        if (response && response.message && typeof response.message === 'string') {
          const topics = response.message.match(/\[([^\]]+)\]/g); // Extract topics between brackets
          if (topics && topics.length > 0) {
            const cleanedTopics = topics.map(topic => topic.slice(1, -1).trim()); // Remove brackets and trim
            setExtractedTopics(cleanedTopics);
          }
        } else {
          console.error('Received non-string message content or invalid response structure');
        }
      })
      .fail(err => console.error('Error calling API:', err));
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
          <Fragment>
            <Text>Get notified when more statements arrive:</Text>
            {getSubscribeForm()}
          </Fragment>
        )
      } else {
        return <Text>If you have something to add, try writing your own statement.</Text>
      }
    }
  }


  const FlexEndContainer = styled.div`
  // display: flex;
  // justify-content: flex-end;
`;

const button = styled.div`
  display: flex;
  justify-content: flex-end;
`;

  const StyledWidget = styled.div`
  .rcw-conversation-container > .rcw-header {
    background-color: #bf5700	 !important;
  }
  .rcw-client .rcw-message-text,
  .quick-button,
  .quick-button:active,
  .rcw-conversation-container .rcw-header,
  .rcw-full-screen .rcw-close-button,
  .rcw-launcher {
      background-color: #bf5700 !important;
      border-color: #bf5700 !important;
     
  }
  // .rcw-widget-container{
  //     position: relative !important;
  // }
  /* Container holding the widget */
.chat-widget-container {
  display: flex;
  justify-content: flex-end; /* Aligns children (the widget) to the right */
  position: relative; /* Relative positioning of the container */
}

.rcw-message-text {
  max-width: none; }

/* Style for the chat widget, if needed to adjust within the flex container */
.rcw-widget-container {
  margin-left: auto;
  margin-right: 0;
}

  // /* Positioning the widget at the bottom right */
  position: fixed; /* or absolute, depending on your layout */
  bottom: 0;
  right: 0;
  // display: flex !important;
  // justify-content: flex-end !important;
  // position: relative !important;
  // float: right !important;
  // margin-left: auto !important;; 
  // margin-right: 0 !important;

  /* Scale up the widget to double its size */
  transform: scale(0.8);
  transform-origin: bottom right; /* Ensure scaling happens relative to the bottom right corner */

  // INDEPENDET VARIABLE 5
  // Only show summarization window/ also include chat
  // This controls whether the chatbar is visible or not
  // .rcw-sender{
  //   display: none;
  // }
  .chat-widget-container {
    max-height: 90vh; /* Adjust based on your need */
    overflow-y: auto; /* Allows scrolling within the widget */
  }
`;


  const handleNewUserMessage = (newMessage) => {
    gptSummaryAPI(newMessage)
  };

  const handleCitationSummaryGeneration = () => {
    const citationSummaryPrompt = "Please summarize" + props.response.conversation.topic + props.response.conversation.description + ". Important: Please provide links scientific resources about the information you will give me. Please highlight the links through markup annotation."
    gptSummaryAPI(citationSummaryPrompt)
  };

  const handleSimpleLanguageSummaryGeneration = () => {
    // with younger age the summarisation is shorter
    const age = "16-year-old"
    const SimpleLanguageSummaryPrompt = "Please summarize" + props.response.conversation.topic + props.response.conversation.description + ". Please explain in simple language, don't use abstract terms adn explain as if I was a " + age + "person."
    gptSummaryAPI(SimpleLanguageSummaryPrompt)
  };

  const handlePollSummaryGeneration = () => {
    fetchComments().then((res) => {
      const mappedData = res.map(item => ({
        txt: item?.txt,
        tid: item?.tid,
      }));


      const mappedDataString = JSON.stringify(mappedData);

      const poll = extractDataFromString(props.response.pca);

      const groupAwareConsensusString = JSON.stringify(poll['group-aware-consensus']);
      const repnessString = JSON.stringify(poll.repness);
      console.log("repnessString", poll)

      const pollSummarization = "The topic is Summary about" + props.response.conversation.topic + ". The graph in the discussion was made by voting on the following statements with true or false" 
      + mappedDataString + "group-aware-consensus" + groupAwareConsensusString + "repness: " + repnessString + 
      "Please try to make sense about what the values say about the comments. Please interpret if the people agree with the statement or not and what the overall mood of the topic is. " + 
      "Please make it into one paragraph and don't directly tell which statements they have."
      gptSummaryAPI(pollSummarization)

    })
  };


  const handleDiscussionSummaryGeneration = () => {
    console.log("I was here 1")
    fetchComments().then((res) => {
      console.log("I was here 2")
      const mappedData = res.map(item => ({
        txt: item?.txt,
        tid: item?.tid,
      }));

      const mappedDataString = JSON.stringify(mappedData);

      console.log("I was here 3")
      const CommentSummaryPrompt = "Please summarize the discussion" + props.response.conversation.topic + "These are the discussion statements" + mappedDataString + props.response.conversation.description + "Determine the primary arguments or viewpoints from the discussion." + "Identify any common themes or points of agreement among the comments." + "This summary will offer a comprehensive overview of the discussion, enabling readers to quickly understand the key topics and the spectrum of views presented." 
      gptSummaryAPI(CommentSummaryPrompt)
      console.log("I was here 4")
      const furtherInformation = "This is the discussion" + props.response.conversation.topic + "These are the discussion statements" + mappedDataString + props.response.conversation.description + "Please identify the three main topics of the discussion. Please provide them in the following schema [topic1] [topic2] [topic3]."
      // console.log("furtherinformation", furtherInformation)
      gptSummaryAPI_console(furtherInformation)
    })
  };

  const handleCommentSummaryGeneration = () => {
    fetchComments().then((res) => {
      const CommentSummaryPrompt = "Please summarize the discussion" + props.response.conversation.topic + "These are the discussion statements" + res + props.response.conversation.description + "Determine the primary arguments or viewpoints from the discussion." + "Identify any common themes or points of agreement among the comments." + "This summary will offer a comprehensive overview of the discussion, enabling readers to quickly understand the key topics and the spectrum of views presented." 
        // gptSummaryAPI(CommentSummaryPrompt)
      const furtherInformation = "This is the discussion" + props.response.conversation.topic + "These are the discussion statements" + res + props.response.conversation.description + "Please identify the three main topics of the discussion. Please provide them in the following schema [topic1] [topic2] [topic3]."
      console.log("furtherinformation", res)
      // gptSummaryAPI_console(furtherInformation)
      // make the further topics clickable
    })
  };

  const log_button_content = (buttonName) => {
    const CommentSummaryPrompt = "Please summarize the discussion" + props.response.conversation.topic + "This is the main topic of discussion: " + buttonName + "Determine the primary arguments or viewpoints from the discussion." + "Identify any common themes or points of agreement among the comments." + "This summary will offer a comprehensive overview of the discussion, enabling readers to quickly understand the key topics and the spectrum of views presented." 
        gptSummaryAPI(CommentSummaryPrompt)
    const furtherInformation = "This is the discussion" + props.response.conversation.topic + "This is the main topic of discussion: " + buttonName + "Please identify the three main topics of the discussion. Please provide them in the following schema [topic1] [topic2] [topic3]."
    // console.log("furtherinformation", furtherInformation)
    gptSummaryAPI_console(furtherInformation)
  };
  

  const fetchComments = () => {
    return PolisNet.polisGet("/api/v3/comments", {
      conversation_id: conversation_id,
      include_social: true,
    })

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
    <FlexEndContainer>
      <div>
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
              <StatementUIContainer>
                {typeof nextComment !== "undefined" && nextComment.hasOwnProperty("tid") ? (
                  <StatementUI
                    author="Anonymous"
                    numStatementsRemaining={nextComment.remaining}
                    statement={nextComment.txt}
                    vote={vote}
                  />
                ) : typeof nextComment !== "undefined" && nextComment.hasOwnProperty("currentPid") ? (
                  getHasVotedUI()
                ) : (
                  <Text>
                    There aren't any statements yet. Get this conversation started by adding a statement.
                  </Text>
                )}
              </StatementUIContainer>
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
                  <StatementForm conversation_id={conversation_id} processPidResponse={processPidResponse} />
                </Fragment>
              }
            </Box>
          }
          {props.response.conversation.vis_type !== 0 && (
            <Fragment>
              <Box sx={{ mb: [3] }}>
                <OpinionContainer showHelperText={props.response.conversation.help_type} />
              </Box>
              <Box sx={{ mb: [5] }}>
                <Visualization myPid={myPid} conversation_id={conversation_id} />
              </Box>
            </Fragment>
          )
          }
          <Flex sx={{ justifyContent: "center" }}>
            {/* TODO: enlarge */}
            <HexLogo />
          </Flex>
        </Box>
        <div>

          <StyledWidget>
          {/* <div>
          {extractedTopics.map((topic, index) => (
            <div key={index}>
              <button>{topic}</button>
            </div>
          ))}
        </div> */}
        <div>
        {extractedTopics.map((topic, index) => {
          const buttonName = `Button ${index + 1}: ${topic}`; // Customize this as needed
          return (
            <button key={index} onClick={() => log_button_content(buttonName)}>
              {buttonName}
            </button>
          );
        })}
      </div>


          
            <Widget
              handleNewUserMessage={handleNewUserMessage}
              title={title}
              subtitle={description}
              senderPlaceHolder="Question about the statement?"
              // resizable={true}
              emojis={true}

            />
          </StyledWidget>
        </div>
      </div>

    </FlexEndContainer>
  );
};

export default ConversationUI;

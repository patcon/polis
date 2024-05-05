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
import { Widget, addResponseMessage, toggleWidget, setQuickButtons} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import styled from 'styled-components';
import TreeSummary from "./TreeSummary";

const ConversationUI = (props) => {
  const conversation_id = props.match.params.conversation_id;
  const [nextComment, setNextComment] = useState(props.response.nextComment);
  const [myPid, setMyPid] = useState(props.response.ptpt?.pid ?? "unknownpid");
  const [isSubscribed, setIsSubscribed] = useState(props.response.ptpt?.subscribed ?? false)
  const [emailInputValue, setEmailInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false); // Loading state to control request
  const title = `Summary about ${props.response?.conversation?.topic || 'the topic'}`;
  const description = `You can ask me anything about  ${props.response?.conversation?.topic || 'the description'}`;
  const [extractedTopics, setExtractedTopics] = useState(['', '', '']);
  const [showTreeSummary, setShowTreeSummary] = useState(false);
  const [topicsHistory, setTopicsHistory] = useState([]);




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

  //   /**
  //    * INDEPENDET VARIABLE 4
  //    * Graph Summary
  //    * The entire Graph is summarized, including the comments and the Graph results.
  // //   */
    // handleGraphsummaryGeneration()

  //   // raw_data_to_console()

  //   /**
  //    * INDEPENDET VARIABLE 4
  //    * Discussion Summary
  //    * The entire discussion is summarized, including the comments.
  //    */
    // handleDiscussionSummaryGeneration()



  //   // Summarize all comments
  //   // handleCommentSummary()

  //   // Summarize group A and B
// INDEPENDET VARIABLE 2
// standard language
    handleCommentSummary()
  //   // groupABSummaryGeneration()
  //   const poll = extractDataFromString(props.response.pca)
  //   const Representativnes = JSON.stringify(poll);   
  //   console.log(props)
  //  console.log("lol", extractDataFromString(Representativnes))

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
        console.log("GPT respons22222e", response)
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
            setTopicsHistory((prevHistory) => [...prevHistory, cleanedTopics]);
            setShowTreeSummary(true); 
          }
        } else {
          console.error('Received non-string message content or invalid response structure');
        }
      })
      .fail(err => console.error('Error calling API:', err));
  };


  const raw_data_to_console = (questionString) => {
    PolisNet.polisGet("/api/v3/rawdata", { question: questionString })
      .then(response => {
        console.log("Raw data response", response, typeof response);
  
        fetchComments().then((comments) => {
          const responsesWithComments = response.map(res => {
            const comment = comments.find(comment => comment.tid === res.tid);
            let userInteraction;
            switch (res.vote) {
              case 1:
                userInteraction = 'Agree';
                break;
              case 0:
                userInteraction = 'Disagree';
                break;
              case -1:
                userInteraction = 'Skip';
                break;
              default:
                userInteraction = 'Unknown';
            }
  
            return {
              tid: res.tid,
              comment: comment ? comment.txt : 'No comment found',
              userInteraction
            };
          });
          const mappedDataString1 = JSON.stringify(responsesWithComments);
          const CommentSummaryPrompt = "Please summarize the discussion" + props.response.conversation.topic + 
          "These are the discussion statements and wheather the users agree, disagree or skip"+
          mappedDataString1 + "Determine the primary arguments or viewpoints from the discussion." + 
           "Identify any common themes or points of agreement among the comments." + 
          "This summary will offer a comprehensive overview of the discussion, enabling readers to quickly understand the key topics and the spectrum of views presented." 
          gptSummaryAPI(CommentSummaryPrompt)
  
          console.log("Responses with comments and user interactions:", mappedDataString1);
        });
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

  // const updateTopicsAndHistory = (newTopics) => {
  //   setTopicsHistory((prevHistory) => [...prevHistory, newTopics]);
  //   setExtractedTopics(newTopics);
  // };
  


  const FlexEndContainer = styled.div`
  // display: flex;
  // justify-content: flex-end;
`;

const button = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column; // Stack them vertically
  align-items: flex-end; // Align to the right
  gap: 20px; // Space between components
`;

const StyledWidgetTree = styled.div`
/* Container holding the widget */
.chat-widget-container {
display: flex;
justify-content: flex-end; /* Aligns children (the widget) to the right */
position: relative; /* Relative positioning of the container */
}

 position: fixed; /* or absolute, depending on your layout */
bottom: 0;
left: 0;


/* Scale up the widget to double its size */
transform: scale(0.8);
transform-origin: bottom left; /* Ensure scaling happens relative to the bottom right corner */


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

 
   position: fixed;
   /**
    * INDEPENDET VARIABLE 4
    * Discussion Summary
    * The entire discussion is summarized, including the comments.
    *   bottom: 0px;
    */ 
  //  bottom: 0px;
  bottom: 0px;
  right: 0;
  width: 700px;
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

  const handleGraphsummaryGeneration = () => {
    fetchComments().then((res) => {  
      const poll = extractDataFromString(props.response.pca);
      const groupAwareConsensus = poll['group-aware-consensus'];
      const allRepnessData = [poll['repness'][0][0]]; 
      for (let i = 0; i < poll['repness'][1].length; i++) {
        allRepnessData.push(poll['repness'][1][i]);
      }
      const mappedData = res.map(item => {
        // Find the repness data matching the current item's tid
        const repnessData = allRepnessData.find(rep => rep.tid === item.tid) || {};
  
        const consensus = groupAwareConsensus[item.tid] || 0;

        return {
          txt: item?.txt,
          tid: item?.tid,
          bestAgree: repnessData['best-agree'],
          nAgree: repnessData['n-agree'],
          nSuccess: repnessData['n-success'],
          nTrials: repnessData['n-trials'],
          pSuccess: repnessData['p-success'],
          pTest: repnessData['p-test'],
          repfulFor: repnessData['repful-for'],
          repness: repnessData.repness,
          repnessTest: repnessData['repness-test'],
          groupAwareConsensus: consensus,
        };
      });
  
  
      const mappedDataString = JSON.stringify(mappedData);
      console.log("mappedDataString sssss", mappedDataString)


      const graphSummarization = "This is the topic of the conversation:" + props.response.conversation.topic + 
      "The graph in the discussion was made by voting on the following statements with agree, disagree or skip on statements."  + mappedDataString +
      + "Every statement has a group aware consensus. This is a measure of the extent to which an opinion group in the conversation agrees (by vote) in response to a particular comment. " +
      + "Furthermore, some statement have a bestAgree value, which describes the highest level of agreement or consensus within a specific dataset or group." +
      + "Some statements have a nAgree value, this is the number of entities or participants who have agreed or provided a positive response in a given context. It quantifies agreement."+
      + "Some statements have a nSuccess value, this counts the number of successful outcomes or instances within a set of trials or attempts."+
      + "Some statements have a nTrials value, This represents the total number of trials, tests, or attempts conducted."+
      + "Some statements have a pSuccess value, this is the probability of success or the success rate. It is calculated based on the ratio of successful outcomes to the total number of trials or attempts."+
      + "Some statements have a repfulFor value, this indicate a measure or a feature that represents how representative or reputable something is"+
      + "Some statements have a repness value, this quantifies how well a sample or a set of data represents a larger population or set of characteristics. "+
      + "Some statements have a repnessTest value, This is  a test or evaluation related to the 'repness' measure. "+
      "Please analyze the data to understand what the values indicate about the comments. Interpret whether the participants agree with the statements and describe the overall mood. Please give information on what key points. Make it sound like a human would say it."
    

      const graphSummarization2 = "This conversation centers around: " +props.response.conversation.topic +
      ". The graph depicts opinions gathered through voting on statements, where participants could choose to agree, disagree, or skip."+ mappedDataString +
      "Each statement carries a group-aware consensus, showing how much agreement a specific group has towards a statement. " + 
      "Additionally, some statements feature a 'bestAgree' value indicating the highest level of consensus within a particular dataset or group. " +
      "Other metrics include 'nAgree' (number of agreeing participants), 'nSuccess' (number of successful outcomes), 'nTrials' (total number of attempts), 'pSuccess' (success rate), "+ 
      "'repfulFor' (reputation measure), 'repness' (representativeness measure), and 'repnessTest' (test related to representativeness). "+
      "Your task is to analyze these metrics to understand participant agreement, describe the overall sentiment, and highlight key points. Please provide insights in a conversational, human-like manner."

      const graphSummarization3 = "The topic of discussion revolves around "+props.response.conversation.topic +
      ". In our conversation, we've gathered opinions through voting on various statements where participants could express agreement, disagreement, or choose to skip."+ mappedDataString +
      "Each statement in our graph represents a consensus within specific groups, indicating how much agreement there is among participants."+ 
      "Additionally, some statements have a 'bestAgree' value, which reflects the highest level of agreement within certain datasets or groups."+
      "Let's delve into the metrics we've gathered:"+
      "'nAgree' tells us how many participants agreed or provided positive responses to a statement, giving us a quantitative measure of agreement."+
      "'nSuccess' counts the number of successful outcomes or instances within our discussions."+
      "'nTrials' represents the total number of trials, tests, or attempts conducted in our conversation."+
      "'pSuccess' shows the probability of success or the success rate, calculated based on successful outcomes versus total trials."+
      "'repfulFor' indicates how representative or reputable a particular aspect of our data is."+
      "'repness' quantifies how well our sample represents a larger population or set of characteristics."+
      "'repnessTest' relates to tests or evaluations we've conducted regarding the representativeness of our data."+
      "Your task is to interpret these metrics to understand participant agreement, describe the overall mood of the conversation, and identify key points that stand out."+
      "Create a summary which is friendly for new people in the discussion."
      
      
      gptSummaryAPI(graphSummarization)

      setTimeout(groupABSummaryGeneration, 1000);
  })

    // fetchComments().then((res) => {
    //   const mappedData = res.map(item => ({
    //     txt: item?.txt,
    //     tid: item?.tid,
    //   }));

    //   const mappedDataString = JSON.stringify(mappedData);

    //   const poll = extractDataFromString(props.response.pca);

    //   //roup aware consensus is a measure of the extent to which an opinion group in the conversation agrees (by vote) in response to a particular comment. 
    //   const groupAwareConsensusString = JSON.stringify(poll['group-aware-consensus']);
    //   //Representativnes is the degree to which a given comment differentiates one group from another
    //   const Representativnes = JSON.stringify(poll['repness']);   


    //   const pollSummarization = "This is the topic of the conversation:" + props.response.conversation.topic + 
    //   "The graph in the discussion was made by voting on the following statements with agree, disagree or skip" 
    //   + mappedDataString +"The graph shows the following data for the group aware consensus" + 
    //   groupAwareConsensusString + 
    //   "Group aware consensus is a measure of the extent to which an opinion group in the conversation agrees (by vote) in response to a particular comment. " +
    //   "The graph shows the following data for the Representativnes of Comments" +
    //   Representativnes +
    //   "Representativnes is the degree to which a given comment differentiates one group from another" + 
    //   "Please analyze the data to understand what the values indicate about the comments. Interpret whether the participants agree with the statements and describe the overall mood of the topic. Avoid direct references to specific statements."
    //   // gptSummaryAPI(pollSummarization)

    //   // setTimeout(groupABSummaryGeneration, 1000);

    // })
  };

  const groupABSummaryGeneration = () => {
    fetchComments().then((res) => {
      const poll = extractDataFromString(props.response.pca);
      const representativnessA = poll['group-votes'][0];
      const representativnessB = poll['group-votes'][1];
  
      const mappedDataA = res.map(item => {
        const voteStats = representativnessA.votes[item.tid] || { A: 0, D: 0, S: 0 };
        return {
          txt: item?.txt,
          tid: item?.tid,
          Agree: voteStats.A,
          Disagree: voteStats.D,
          Skip: voteStats.S,
        };
      });
      const mappedDataB = res.map(item => {
        const voteStats = representativnessB.votes[item.tid] || { A: 0, D: 0, S: 0 };
        return {
          txt: item?.txt,
          tid: item?.tid,
          Agree: voteStats.A,
          Disagree: voteStats.D,
          Skip: voteStats.S,
        };
      });

      const mappedDataStringA = JSON.stringify(mappedDataA);

      const mappedDataStringB = JSON.stringify(mappedDataB);
  const CommentSummaryPromptA = "The discussion is about:" + props.response.conversation.topic + "This is an object with the discussion statements and how many people of group A agree, disagree or skipped the statement" + mappedDataStringA +  "Please analyze the data to understand what the values indicate about the comments. Interpret whether the participants of group A agree with the statements and describe the overall mood of group A. Please give information on what key points the group A agrees on and what key points the group A disagrees on. Make it sound like a human would say it."
      gptSummaryAPI(CommentSummaryPromptA)
      const CommentSummaryPromptB = "The discussion is about:" + props.response.conversation.topic + "This is an object with the discussion statements and how many people of group B agree, disagree or skipped the statement" + mappedDataStringB +  "Please analyze the data to understand what the values indicate about the comments. Interpret whether the participants of group B agree with the statements and describe the overall mood of group B. Please give information on what key points the group B agrees on and what key points the group B disagrees on. Make it sound like a human would say it."
      gptSummaryAPI(CommentSummaryPromptB)


      // const mappedDataVersion1 = res.map(item => {
      //   const voteStatsA = representativnessB.votes[item.tid] || { A: 0, D: 0, S: 0 };
      //   const voteStatsB = representativnessA.votes[item.tid] || { A: 0, D: 0, S: 0 };
      //   const voteStatAgree = voteStatsA.A + voteStatsB.A;
      //   const voteStatDisagree = voteStatsA.D + voteStatsB.D;
      //   const voteStatTotal = voteStatAgree + voteStatDisagree;
      //   const voteStatAgreePercentage = voteStatAgree / voteStatTotal;
      //   const voteStatDisagreePercentage = voteStatDisagree / voteStatTotal;
      //   return {
      //     Comment: item?.txt, 
      //     Number_of_agree_votes: voteStatAgree,
      //     Number_of_disagree_votes: voteStatDisagree,
      //   };
      // });

      const mappedDataVersion2 = res.map(item => {
        const voteStatsA = representativnessB.votes[item.tid] || { A: 0, D: 0, S: 0 };
        const voteStatsB = representativnessA.votes[item.tid] || { A: 0, D: 0, S: 0 };
        const voteStateTotalA = voteStatsA.A + voteStatsA.D;
        const voteStateTotalB = voteStatsB.A + voteStatsB.D;
        const voteStatAgreePercentageA = voteStatsA.A / voteStateTotalA;
        const voteStatDisagreePercentageA = voteStatsA.D / voteStateTotalA;
        const voteStatAgreePercentageB = voteStatsB.A / voteStateTotalB;  
        const voteStatDisagreePercentageB = voteStatsB.D / voteStateTotalB; 
        return {
          Comment: item?.txt, 
          Group_0_percentage_agreement: voteStatAgreePercentageA,
          Group_0_percentage_disagreement: voteStatDisagreePercentageA,
          Group_1_percentage_agreement: voteStatAgreePercentageB,
          Group_1_percentage_disagreement: voteStatDisagreePercentageB,
        };
      });
  


      // const mappedDataversion1 = JSON.stringify(mappedDataVersion1);
      const mappedDataversion2 = JSON.stringify(mappedDataVersion2);
  
    
      // const Summary_Technique_from_Paper = " In each line, I provide you with comments and percentage of votes" +
      // "that agreed and disagreed with them for Group 0 and Group 1. I want you" +
      // "to do topic modeling on the given comments. Print the detected topics line" +
      // "by line. At the end, generate an overall summary of the comments. In the" +
      // "summary, make sure to include information and quantification on how much" +
      // "agreement versus disagreement there was across Group 0 and Group 1 for" +
      // "different topics. Here are the comments:" + mappedDataversion2

      const Summary_Technique_from_Paper2 = "Analyze the provided comments for Group 0 and Group 1, which include vote percentages for agreement and disagreement. Perform topic modeling and list the topics identified from the comments. Conclude with a summary that quantifies the agreement and disagreement levels for each topic across both groups. The comments are as follows:" + mappedDataversion2
      const Summary_Technique_from_Paper3 = 
      "Provide a summary of the discussion, highlighting the key topics and overall sentiment for Group 0 and Group 1."+
      " Explain how each group's comments contribute to the mood of the conversation, whether it's positive, negative, or mixed. This summary should offer new users a clear insight into the emotional tone and main subjects discussed by both groups."+
      " Here are the comments:" + mappedDataversion2
      // gptSummaryAPI(Summary_Technique_from_Paper3)

      // const mappedDataVersion7 = res.map(item => {
      //   const voteStatsA = representativnessB.votes[item.tid] || { A: 0, D: 0, S: 0 };
      //   const voteStatsB = representativnessA.votes[item.tid] || { A: 0, D: 0, S: 0 };
      //   const voteStateTotalA = voteStatsA.A + voteStatsA.D;
      //   const voteStateTotalB = voteStatsB.A + voteStatsB.D;
      //   const voteStatAgreePercentageA = voteStatsA.A / voteStateTotalA;
      //   const voteStatDisagreePercentageA = voteStatsA.D / voteStateTotalA;
      //   const voteStatAgreePercentageB = voteStatsB.A / voteStateTotalB;  
      //   const voteStatDisagreePercentageB = voteStatsB.D / voteStateTotalB; 
      //   return {
      //     Comment: item?.txt, 
      //     Group_0_percentage_agreement: voteStatAgreePercentageA,
      //     Group_0_percentage_disagreement: voteStatDisagreePercentageA,
      //     Group_1_percentage_agreement: voteStatAgreePercentageB,
      //     Group_1_percentage_disagreement: voteStatDisagreePercentageB,
      //   };
      // });

      // const mappedDataversion7 = JSON.stringify(mappedDataVersion7);
      // const Summary_Technique_from_Paper7 = "Perform topic modeling on the provided comments and print the detected topics line-by-line. At the end, summarize the key topics discussed" +
      // "and quantify the level of agreement vs disagreement between Group 0 and" +
      // "Group 1. Specifically, note which topics had high agreement or disagreement. Provide an overview of the difference in opinion between the two"+
      // "groups based on the topic modeling analysis." + mappedDataversion7
      // gptSummaryAPI(Summary_Technique_from_Paper7)

      // console.log("mappedDataVersion1", Summary_Technique_from_Paper7)
    })
  }
  


  const handleDiscussionSummaryGeneration = () => {
    console.log("I was here 1")
    fetchComments().then((res) => {
      const mappedData = res.map(item => ({
        txt: item?.txt,
        tid: item?.tid,
      }));

      const mappedDataString = JSON.stringify(mappedData);

      const CommentSummaryPrompt = "Please summarize the discussion" + props.response.conversation.topic + "These are the discussion statements" + mappedDataString + props.response.conversation.description + "Determine the primary arguments or viewpoints from the discussion." + "Identify any common themes or points of agreement among the comments." + "This summary will offer a comprehensive overview of the discussion, enabling readers to quickly understand the key topics and the spectrum of views presented." 
      gptSummaryAPI(CommentSummaryPrompt)
      const furtherInformation = "This is the discussion" + props.response.conversation.topic + "These are the discussion statements" + mappedDataString + props.response.conversation.description + "Please identify the three main topics of the discussion. Please provide them in the following schema [topic1] [topic2] [topic3]."
      // console.log("furtherinformation", furtherInformation)
     
      gptSummaryAPI_console(furtherInformation)
    })
  };

  const handleCommentSummary = () => {
    fetchComments().then((res) => {
      const mappedData = res.map(item => {
        // Find the repness data matching the current item's tid
       

        return {
          txt: item?.txt,
          tid: item?.tid,
        };
      });
      const CommentSummaryPrompt = "Please summarize the discussion" + props.response.conversation.topic + "These are the discussion statements" + mappedData + props.response.conversation.description + "Determine the primary arguments or viewpoints from the discussion." + "Identify any common themes or points of agreement among the comments." + "This summary will offer a comprehensive overview of the discussion, enabling readers to quickly understand the key topics and the spectrum of views presented." 
        gptSummaryAPI(CommentSummaryPrompt)
    
    })
  }


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
        // gptSummaryAPI(CommentSummaryPrompt)
    const furtherInformation = "This is the discussion" + props.response.conversation.topic + "This is the main topic of discussion: " + buttonName + "Please identify the three main topics of the discussion. Please provide them in the following schema [topic1] [topic2] [topic3]."
    // console.log("furtherinformation", furtherInformation)
    // gptSummaryAPI_console(furtherInformation)
  };
  

  const fetchComments = () => {
    return PolisNet.polisGet("/api/v3/comments", {
      conversation_id: conversation_id,
      include_social: true,
    })

  }

  const handleBack = () => {
    setTopicsHistory((prevHistory) => {
      const history = prevHistory.slice(0, -1); // Remove the last set of topics
      const lastTopics = history[history.length - 1] || [];
      setExtractedTopics(lastTopics); // Set to the last topics, or empty if none are left
      return history;
    });
  };




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
     
       
          <WidgetContainer>
       
          <Widget
              handleNewUserMessage={handleNewUserMessage}
              title={title}
              subtitle={description}
              senderPlaceHolder="Question about the statement?"
              resizable={true}
              // resizable={true}
              emojis={true}
              

            />
          
         
          
          </WidgetContainer>
          
           
             
          </StyledWidget>
          <StyledWidgetTree>
          {showTreeSummary && <TreeSummary topics={extractedTopics} onButtonClick={log_button_content} onBack={handleBack} topicsHistory={topicsHistory}/>}

          </StyledWidgetTree>
        </div>
      </div>

    </FlexEndContainer>
  );
};

export default ConversationUI;

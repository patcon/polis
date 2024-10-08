import React, { useState, useEffect } from "react";
import { Box, Button } from "theme-ui";
import UnderstandAI from "./UnderstandAI";
import IndividualDeliberation from "./IndividualDeliberation";
import ProgressBar from "./ProgressBar";
import Tutorial from "./Tutorial";
import ConversationUI from "./ConversationUI";
import Legal from "./Legal";

const Deliberation = (props = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
  const [nextButtonState, setnextButtonState] = useState(false);
  const [isConversationExists, setIsConversationExists] = useState(null);
  // const [responseObject, setResponseObject] = useState({});


  useEffect(() => {
    let currentstate = currentTutorialIndex - props.tutorialprogress;
    console.log("current state",currentstate)
    if (currentstate === 1) {
      setnextButtonState(true);
      console.log("nextbtn", nextButtonState)
    }
  }, [currentTutorialIndex, props.tutorialprogress]); 
  

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

const routeprops = {
  "history": {
      "length": 2,
      "action": "POP",
      "location": {
          "pathname": "/c/4rekiewx9s",
          "search": "",
          "hash": ""
      }
  },
  "location": {
      "pathname": "/c/4rekiewx9s",
      "search": "",
      "hash": ""
  },
  "match": {
      "path": "/c/:conversation_id",
      "url": "/c/4rekiewx9s",
      "isExact": true,
      "params": {
          "conversation_id": "4rekiewx9s"
      }
  },
  "response": {
      "user": {
          "uid": 2,
          "email": "www@gmail.com",
          "hname": "www",
          "hasFacebook": false,
          "hasTwitter": false,
          "hasXid": false,
          "xInfo": null,
          "finishedTutorial": false,
          "site_ids": [
              "polis_site_id_4Gunmmc0WqfMXEUNqi"
          ],
          "created": 1697230581516,
          "isPolisDev": false,
          "tutorialprogress": 3
      },
      "ptpt": {
          "pid": 0,
          "uid": 2,
          "vote_count": 1,
          "last_interaction": "1697252806266",
          "subscribed": 0,
          "last_notified": "0",
          "nsli": 0,
          "mod": 0,
          "created": "1697252806099"
      },
      "nextComment": {
          "currentPid": 0
      },
      "conversation": {
          "topic": "test",
          "description": "test123",
          "link_url": null,
          "parent_url": null,
          "upvotes": 1,
          "participant_count": 1,
          "is_anon": false,
          "is_active": true,
          "is_draft": true,
          "is_public": true,
          "is_data_open": false,
          "profanity_filter": true,
          "spam_filter": true,
          "strict_moderation": false,
          "prioritize_seed": false,
          "vis_type": 0,
          "write_type": 1,
          "help_type": 1,
          "write_hint_type": 1,
          "style_btn": null,
          "socialbtn_type": 0,
          "subscribe_type": 1,
          "branding_type": 1,
          "bgcolor": null,
          "help_bgcolor": null,
          "help_color": null,
          "email_domain": null,
          "use_xid_whitelist": false,
          "owner": 2,
          "org_id": 2,
          "context": null,
          "course_id": null,
          "owner_sees_participation_stats": false,
          "auth_needed_to_vote": false,
          "auth_needed_to_write": true,
          "auth_opt_fb": true,
          "auth_opt_tw": true,
          "auth_opt_allow_3rdparty": true,
          "modified": "1697252806163",
          "created": "1697252795333",
          "site_id": "polis_site_id_4Gunmmc0WqfMXEUNqi",
          "auth_opt_fb_computed": true,
          "auth_opt_tw_computed": true,
          "translations": [],
          "ownername": "www",
          "is_mod": true,
          "is_owner": true,
          "conversation_id": "4rekiewx9s"
      },
      "votes": [
          {
              "pid": 0,
              "tid": 0,
              "vote": 0,
              "weight_x_32767": 0,
              "modified": "1697252806163"
          }
      ],
      "pca": "{\"n\":1,\"pca\":{\"comps\":[[0]],\"center\":[0],\"comment-extremity\":[0],\"comment-projection\":[[0],[0]]},\"tids\":[0],\"mod-in\":[0],\"n-cmts\":1,\"in-conv\":[0],\"mod-out\":[],\"repness\":{\"0\":[{\"tid\":0,\"p-test\":0,\"repness\":0.6666666666666667,\"n-trials\":1,\"n-success\":0,\"p-success\":0.3333333333333333,\"repful-for\":\"disagree\",\"repness-test\":-0.8660254}]},\"consensus\":{\"agree\":[],\"disagree\":[]},\"meta-tids\":[],\"votes-base\":{\"0\":{\"A\":[0],\"D\":[0],\"S\":[1]}},\"group-votes\":{\"0\":{\"votes\":{\"0\":{\"A\":0,\"D\":0,\"S\":1}},\"n-members\":1,\"id\":0}},\"base-clusters\":{\"x\":[0],\"y\":[0],\"id\":[0],\"count\":[1],\"members\":[[0]]},\"group-clusters\":[{\"id\":0,\"center\":[0,0],\"members\":[0]}],\"lastModTimestamp\":null,\"user-vote-counts\":{\"0\":1},\"lastVoteTimestamp\":1697252806163,\"comment-priorities\":{\"0\":0.7831078906305026},\"group-aware-consensus\":{\"0\":0.3333333333333333},\"math_tick\":34}",
      "famous": {
          "0": {
              "priority": 1000,
              "tw__twitter_user_id": null,
              "tw__screen_name": null,
              "tw__name": null,
              "tw__followers_count": null,
              "tw__verified": null,
              "tw__location": null,
              "fb__fb_user_id": null,
              "fb__fb_name": null,
              "fb__fb_link": null,
              "fb__fb_public_profile": null,
              "fb__location": null,
              "x_profile_image_url": null,
              "xid": null,
              "x_name": null,
              "x_email": null,
              "pid": 0,
              "isSelf": true,
              "votes": "p",
              "bid": 0
          }
      },
      "acceptLanguage": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
  }
}

const responseObject = {
  "user": {
      "uid": 2,
      "email": "www@gmail.com",
      "hname": "www",
      "hasFacebook": false,
      "hasTwitter": false,
      "hasXid": false,
      "xInfo": null,
      "finishedTutorial": false,
      "site_ids": [
          "polis_site_id_4Gunmmc0WqfMXEUNqi"
      ],
      "created": 1697230581516,
      "isPolisDev": false,
      "tutorialprogress": 3
  },
  "ptpt": {
      "pid": 0,
      "uid": 2,
      "vote_count": 1,
      "last_interaction": "1697252806266",
      "subscribed": 0,
      "last_notified": "0",
      "nsli": 0,
      "mod": 0,
      "created": "1697252806099"
  },
  "nextComment": {
      "currentPid": 0
  },
  "conversation": {
      "topic": "test",
      "description": "test123",
      "link_url": null,
      "parent_url": null,
      "upvotes": 1,
      "participant_count": 1,
      "is_anon": false,
      "is_active": true,
      "is_draft": true,
      "is_public": true,
      "is_data_open": false,
      "profanity_filter": true,
      "spam_filter": true,
      "strict_moderation": false,
      "prioritize_seed": false,
      "vis_type": 0,
      "write_type": 1,
      "help_type": 1,
      "write_hint_type": 1,
      "style_btn": null,
      "socialbtn_type": 0,
      "subscribe_type": 1,
      "branding_type": 1,
      "bgcolor": null,
      "help_bgcolor": null,
      "help_color": null,
      "email_domain": null,
      "use_xid_whitelist": false,
      "owner": 2,
      "org_id": 2,
      "context": null,
      "course_id": null,
      "owner_sees_participation_stats": false,
      "auth_needed_to_vote": false,
      "auth_needed_to_write": true,
      "auth_opt_fb": true,
      "auth_opt_tw": true,
      "auth_opt_allow_3rdparty": true,
      "modified": "1697252806163",
      "created": "1697252795333",
      "site_id": "polis_site_id_4Gunmmc0WqfMXEUNqi",
      "auth_opt_fb_computed": true,
      "auth_opt_tw_computed": true,
      "translations": [],
      "ownername": "www",
      "is_mod": true,
      "is_owner": true,
      "conversation_id": "4rekiewx9s"
  },
  "votes": [
      {
          "pid": 0,
          "tid": 0,
          "vote": 0,
          "weight_x_32767": 0,
          "modified": "1697252806163"
      }
  ],
  "pca": "{\"n\":1,\"pca\":{\"comps\":[[0]],\"center\":[0],\"comment-extremity\":[0],\"comment-projection\":[[0],[0]]},\"tids\":[0],\"mod-in\":[0],\"n-cmts\":1,\"in-conv\":[0],\"mod-out\":[],\"repness\":{\"0\":[{\"tid\":0,\"p-test\":0,\"repness\":0.6666666666666667,\"n-trials\":1,\"n-success\":0,\"p-success\":0.3333333333333333,\"repful-for\":\"disagree\",\"repness-test\":-0.8660254}]},\"consensus\":{\"agree\":[],\"disagree\":[]},\"meta-tids\":[],\"votes-base\":{\"0\":{\"A\":[0],\"D\":[0],\"S\":[1]}},\"group-votes\":{\"0\":{\"votes\":{\"0\":{\"A\":0,\"D\":0,\"S\":1}},\"n-members\":1,\"id\":0}},\"base-clusters\":{\"x\":[0],\"y\":[0],\"id\":[0],\"count\":[1],\"members\":[[0]]},\"group-clusters\":[{\"id\":0,\"center\":[0,0],\"members\":[0]}],\"lastModTimestamp\":null,\"user-vote-counts\":{\"0\":1},\"lastVoteTimestamp\":1697252806163,\"comment-priorities\":{\"0\":0.7831078906305026},\"group-aware-consensus\":{\"0\":0.3333333333333333},\"math_tick\":34}",
  "famous": {
      "0": {
          "priority": 1000,
          "tw__twitter_user_id": null,
          "tw__screen_name": null,
          "tw__name": null,
          "tw__followers_count": null,
          "tw__verified": null,
          "tw__location": null,
          "fb__fb_user_id": null,
          "fb__fb_name": null,
          "fb__fb_link": null,
          "fb__fb_public_profile": null,
          "fb__location": null,
          "x_profile_image_url": null,
          "xid": null,
          "x_name": null,
          "x_email": null,
          "pid": 0,
          "isSelf": true,
          "votes": "p",
          "bid": 0
      }
  },
  "acceptLanguage": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
}



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

  const shouldRenderTutorial = (nextButtonState || !shouldShowNextButton()) && !(nextButtonState && !shouldShowNextButton());
  

  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px"}}>
      {currentIndex === 0 && <IndividualDeliberation {...props} currentIndex={currentIndex} />}
      {currentIndex === 1 && <UnderstandAI {...props} />}
      {currentIndex === 2 &&  <Legal/>}
      {currentIndex === 3 && <ConversationUI {...routeprops} response={responseObject} />}
      {shouldRenderTutorial&& <Tutorial setCurrentIndex={setCurrentTutorialIndex} currentIndex={currentTutorialIndex} email={props} tutorialprogress={props.tutorialprogress} currentIndexpage={currentIndex} setnextButtonState={setnextButtonState}/>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {currentIndex !== 0 && currentTutorialIndex !== 0 && (
          <Button onClick={handleBackClick} sx={{ marginRight: '10px' }}>Back</Button>
        )}
        <ProgressBar progress={progress} fillerStyles={fillerStyles}></ProgressBar>
        {!shouldRenderTutorial && <Button onClick={handleNextClick} sx={{ marginLeft: '10px' }}>Next</Button>}
      </div>
    </Box>
  );
};

export default Deliberation;

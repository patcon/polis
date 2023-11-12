import React, {useState} from 'react';
import { Box } from "theme-ui";
import ArrowIcon from './ArrowIcon';
import PolisButton from './PolisButton';
import PolisNet from "../util/net";




const TutorialsBox = ({ heading, description, email = {}, current_state_index, setcurrent_state_index}) => {

  const descArray = Array.isArray(description) ? description : [description];


    const handleRightArrowClick = () => {   
      console.log("click") 
      if(!(descArray[current_state_index+1] == '')){
        setcurrent_state_index(current_state_index+1);
      }
     
    };
  
    const handleLeftArrowClick = () => {
  
        setcurrent_state_index(current_state_index-1)
      
    };

    const handleTutorialCompletion = (userEmail) => {
      setcurrent_state_index(current_state_index+1)   
      PolisNet.polisPost('/api/v3/updateTutorialDoneByEmail', { email: userEmail })
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
    <Box sx={{ 
        backgroundColor: '#F1F1F1',
        borderRadius: '8px',
        padding: '15px',
        position: 'fixed',
        color: 'black',
        mb: [4],
        bottom: '80px',
        right: '125px',
        width: '600px',
        margin: '10px',
      }}>
         <h2 style={{marginTop: '0px', marginBottom: '10px'}}>{heading}</h2>
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'initial',
            position: 'relative',
          }}>
           
            {(current_state_index != 0) &&<ArrowIcon onClick={handleLeftArrowClick} style={{ position: 'absolute', bottom: '-10px', left: '0', cursor: 'pointer', transform: 'rotate(180deg)'}} />}
            <Box sx={{ marginRight: '10px', marginBottom: '30px'}}>
                <div>{descArray[current_state_index]}</div>
              
            </Box>
            {(descArray[current_state_index+1] == '') ? ( 
              <div>
              
              </div>
            ) : (
                <ArrowIcon onClick={handleRightArrowClick} style={{ position: 'absolute', bottom: '-10px', right: '0', cursor: 'pointer' }} />)}
        
          </Box>
      </Box>
  );
};

export default TutorialsBox;

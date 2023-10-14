import React, {useState} from 'react';
import { Box } from "theme-ui";
import ArrowIcon from './ArrowIcon';
import PolisButton from './PolisButton';
import PolisNet from "../util/net";




const TutorialBox = ({ heading, description, currentIndex, setCurrentIndex, onHide, email = {}, setnextButtonstate  }) => {

  const descArray = Array.isArray(description) ? description : [description];

  const [index, setindex] = useState(0);

    const handleRightArrowClick = () => {
      if(index >= 2){
        setindex(0)
      }else{
        setindex(index+1)
      }
    };
  
    const handleLeftArrowClick = () => {
      if(index != 0){
        setindex(index-1)
      }
    };

    const handleTutorialCompletion = (userEmail) => {
      setnextButtonstate(1)
      console.log("buttonstate set")
      setCurrentIndex(currentIndex+1)
      PolisNet.polisPost('/api/v3/updateTutorialDoneByEmail', { email: userEmail })
        .then(response => {
          console.log(response)
          if (response.success) {
            console.log('Tutorial updated successfully!', response.result);
          } else {
            console.error('Failed to update tutorial:', response.error);
          }
        })
        .fail(err => console.error('Error calling API:', err)); // adjust error handling as needed based on the promise library used in PolisNet
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
            {index > 0 &&
            <ArrowIcon onClick={handleLeftArrowClick} style={{ position: 'absolute', bottom: '-10px', left: '0', cursor: 'pointer', transform: 'rotate(180deg)'}} />}
            <Box sx={{ marginRight: '10px', marginBottom: '30px'}}>
                <div>{descArray[index]}</div> 
            </Box>
            {(index == 2) ? ( 
              <div>
              <PolisButton onClick={() => {
                console.log(email.email);
                handleTutorialCompletion(email.email);
                onHide(); 
              }}  buttonText={'Start'}></PolisButton>
              </div>
            ) : (
            <ArrowIcon onClick={handleRightArrowClick} style={{ position: 'absolute', bottom: '-10', right: '0', cursor: 'pointer' }} />)}
        
          </Box>
      </Box>
  );
};

export default TutorialBox;

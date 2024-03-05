import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  background-color: #BF5700; /* Adjust the color to match the background color in your image */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: auto;
  height: 300px; /* Set the height to 250px */


  /* Hide scrollbar for IE, Edge, and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  /* Hide scrollbar for Chrome, Safari, and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  color: #ffffff; /* Adjust the color to match the title color in your image */
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
  margin-top: 0;
  padding-top: 0;
`;

const Subtitle = styled.h2`
  color: #ffffff; /* Adjust the color to match the subtitle color in your image */
  font-size: 18px;
  text-align: center;
  margin-bottom: 16px;
`;

const Content = styled.p`
  color: #424242; /* Adjust the color to match the content color in your image */
  line-height: 1.6;
`;

const StyledButton = styled.button`
  background-color: #f2a900; /* Button background color */
  color: #ffffff; /* Button text color */
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 5px; /* Space between buttons */
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e58e00; /* Button background color on hover */
    transform: translateY(-2px); /* Slight raise effect on hover */
  }

  &:focus {
    outline: none; /* Removes the default browser outline */
  }

  &:active {
    transform: translateY(1px); /* Pushes the button down when clicked */
  }
`;
const BackButton = styled.button`
  background-color: #f2a900; /* Example background color, adjust as needed */
  color: #ffffff; /* Text color */
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 0; // Adjust space between the Back button and the rest
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e58e00; /* Darker shade on hover */
    transform: translateY(-2px); /* Lift effect */
  }

  &:active {
    transform: translateY(1px); /* Pressed effect */
  }
`;



const TreeSummary = ({ topics, onButtonClick, onBack, topicsHistory }) => (
    <Container>
            {/* <button onClick={onBack}>Back</button> */}
            {
      topicsHistory.length > 1 && 
      Array.isArray(topicsHistory[topicsHistory.length - 2]) && // Check if the second last entry is an array
      topicsHistory[topicsHistory.length - 2].some(topic => topic.trim() !== '') && (
        <BackButton onClick={onBack}>Back</BackButton>
      )
    }
      <Title>Get further related summaries</Title>
      <Subtitle>Click on one of the buttons</Subtitle>
      <Content>
        {topics.map((topic, index) => (
          <StyledButton key={index} onClick={() => onButtonClick(topic)}>
            {topic}
          </StyledButton>
        ))}
      </Content>
    </Container>
  );

export default TreeSummary;

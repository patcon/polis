import React from "react";
import Title from "./Title";
import Subtitle from "./Subtitle";
import HexLogo from "./hexLogo";
import { Box } from "theme-ui";

const ObtainLink = () => {

  return (
    <Box sx={{ maxWidth: "768px", margin: "auto", py: "20px", px: "10px" }}>
      <HexLogo />
      <Title value="Poll Access Required: Request a Link from Admin"/>
      <Subtitle
        value={
          "You need to obtain a poll url to access this page. Please contact an admin for a link to the poll. Pardon me for your inconveniences."
        }
      />
    </Box>
  );
};

export default ObtainLink;

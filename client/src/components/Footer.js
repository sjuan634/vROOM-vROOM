import React from 'react';
import { Box, Icon} from '@chakra-ui/react';
import GitHubIcon from '@mui/icons-material/GitHub';



var style = {
  backgroundColor: "#F8F8F8",
    textAlign: "center",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    margin: "auto",
    alignItems: "center",
    display:"flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding:"10px",
};


const Footer = () => {
  return (
    <Box style={style} >
        <footer
            style={{textAlign: "center"}}
        >
            <div style={{display: 'flex', flexWrap: "wrap", textAlign: "center", alignItems:"center", justifyContent: "center"}}>
        <a style={{display: 'flex', flexWrap: "wrap", textAlign: "center", alignItems:"center", justifyContent: "center"}} href='https://github.com/Nicklb3'> Nick Bonner:
          <Icon as={GitHubIcon}
            color="action"
            fontSize="large"
            boxSize={10}
            mr={5}
            ml={3}
            />
        </a>
      <a style={{display: 'flex', flexWrap: "wrap", textAlign: "center", alignItems:"center", justifyContent: "center"}}href='https://github.com/Mary90272'> Maria Fedorova:
          <Icon as={GitHubIcon}
            color="action"
            fontSize="large"
            boxSize={10}
            mr={10}
            ml={3}
            />
        </a>
        <a style={{display: 'flex', flexWrap: "wrap", textAlign: "center", alignItems:"center", justifyContent: "center"}}href='https://github.com/sjuan634'> Juan Sanchez:
          <Icon as={GitHubIcon}
              color="action"
              fontSize="large"
              boxSize={10}
              mr={10}
              ml={3}
              />
        </a>
        <a style={{display: 'flex', flexWrap: "wrap", textAlign: "center", alignItems:"center", justifyContent: "center"}}href='https://github.com/laboettcher'> Lavinia Boettcher:
          <Icon as={GitHubIcon}
              color="action"
              fontSize="large"
              boxSize={10}
              mr={10}
              ml={3}
              />
        </a>
        <a style={{display: 'flex', flexWrap: "wrap", textAlign: "center", alignItems:"center", justifyContent: "center"}}href='https://github.com/srlevit94'> Shane Levites:
          <Icon as={GitHubIcon}
              color="action"
              fontSize="large"
              boxSize={10}
              mr={5}
              ml={3}
              />
        </a>
      </div>
        </footer>
        </Box>
    );
}


export default Footer
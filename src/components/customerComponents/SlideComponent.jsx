import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../../utils/StateProvider";

const Slide = styled.div`
  /* width: 100vw; */
  /* height: 100vh; */
  height: 100%;
  display: flex;
  align-items: center;
  background-color:#${props=>props.bg};
  flex-basis:calc(100%/${props=>props.no_of_slides});
  flex-shrink:0;
  width:calc(100%/${props=>props.no_of_slides});
  flex:1;
`;
const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
`;
const Image = styled.img`
  height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;
const SlideComponent = ({imgsrc,background_color,title,desc,no_of_slides,id,offer}) => {
  const [{user},dispatch]=useStateValue();
  const navigate=useNavigate();

  return (
    <Slide bg={background_color}>
      <ImageContainer>
        <Image src={imgsrc} />
      </ImageContainer>

      <InfoContainer>
        <Title>{title}</Title>
        <Description>
          {desc}
        </Description>
        <Description>
         A flat {offer}% discount  is on!!!!!...Grab the offer today 
        </Description>
        <Button onClick={(e)=> {e.preventDefault();user?navigate(`/${id}`):navigate('/login')}}>SHOP NOW</Button>
      </InfoContainer>
    </Slide>
  );
};

export default SlideComponent;

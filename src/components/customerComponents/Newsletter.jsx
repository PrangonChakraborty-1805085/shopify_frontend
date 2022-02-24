import React from 'react'
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';

const Container=styled.div`
height:60vh;
background-color:#fcf5f5;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`
const Title=styled.h1`
font-size:70px;
margin-bottom:20px;
`
const Description=styled.div`
font-size:24px;
font-weight:300;
margin-bottom:20px;
`
const InputContainer=styled.div`
 width:50%;
 height:40px;
 display: flex;
 justify-content: space-between;
 border:1px solid lightgray;
`
const Input=styled.input`
flex:9;
border:none;
padding-left:20px;
`
const Button=styled.button`
flex:1;
cursor:pointer;
border:none;
background-color: white;
color:black;
border:1px solid lightgray;
transition: all 0.1s ease;
&:hover{
    color:white;
    background-color:#04a0b8;
}
&:active{
    background-color:teal;
}
`
const Newsletter = () => {
    return (
        <Container>
        <Title>Newsletter</Title>
        <Description>Get timely updates from your favorite products.</Description>
        <InputContainer>
            <Input placeholder="Your email"/>
            <Button>
             <SendIcon/>
            </Button>
        </InputContainer>
            
        </Container>
    )
}

export default Newsletter

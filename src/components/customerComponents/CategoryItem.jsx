import React from 'react'
import styled from 'styled-components'
import {useNavigate}  from 'react-router-dom'
import {useStateValue} from '../../utils/StateProvider'
const Container=styled.div`
flex: 1;
height:70vh;
display: inline-block;
position: relative;
margin:10px;
padding:20px;
`
const Image=styled.img`
width:100%;
height:100%;
margin:3px;
object-fit:cover;
`
const Info=styled.div`
 position: absolute;
 width:100%;
 height:100%;
 top:0;
 left:0;
 display:flex;
 flex-direction: column;
 align-items: center;
 justify-content:center;
`
const Title=styled.h1`
 color:white;
 margin-bottom: 20px;
`
const Button=styled.button`
  border:none;
  padding:10px;
  background-color:white;
  color:gray;
  cursor: pointer;
  font-weight: 900;
`

const CategoryItem = ({item}) => {
    const navigate=useNavigate();
    const [{user},dispatch]=useStateValue();
    return (
        <Container>
         <Image src={item.image_url}/>
         {/* <Image src={item.imgsrc}/> */}
         <Info>
             <Title>{item.category}</Title>
           
             <Button onClick={(e)=> {e.preventDefault();user?navigate(`/${item.category}/products`):navigate('/login')}}>SHOP NOW</Button>

         </Info>
        </Container>
    )
}

export default CategoryItem

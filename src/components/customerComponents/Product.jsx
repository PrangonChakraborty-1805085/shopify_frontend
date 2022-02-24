import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useStateValue } from "../../utils/StateProvider";
import { Link } from "react-router-dom";
import axios from '../../utils/axios';
const Container = styled.div`
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5fc;
  position: relative;
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  object-fit: contain;
  z-index: 2;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  /* top:0; */
  /* left:0; */
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  cursor: pointer;
  ${Container}:hover & {
    opacity: 1;
  }
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease;

  color:${(props) => props.clicked === "crue" && "red"};
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const [clicked,setClicked]=useState(false);
  const [loveEnabled,setloveEnabled]=useState(false);
  const customer_id=sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");
 
  
  //check if customer can give react
  const fetchEnable=async () => {
    axios({
      method: "POST",
      url: `/api/product/react`,
      headers: { token: `Bearer ${token}` },
      data:{ 
        stock_id:item.stock_id,
        customer_id:customer_id,
      },
      // data:user_info
    }).then((res) => {
      console.log('res data is ',res.data);
      setloveEnabled(true);
    },(err)=>{
      setloveEnabled(false);
    });
  }
  useEffect(() => {
    fetchEnable();
  },[])
  
  const sendLoveReact = (e) => {
    e.preventDefault();
    setClicked(true);
    const send = async () => {
      axios({
        method: "POST",
        url: `/api/product/${item.stock_id}/react`,
        headers: { token: `Bearer ${token}` },
        data:{ 
          customer_id:customer_id,
        },
      }).then((res) => {
        // setitems(res.data);
        setloveEnabled(false);
      });
    };
    send();
  };
  return (
    <Container>
      <Circle />
      <Image src={item.image_url} />
      <Info>
        {loveEnabled && (
          <Icon onClick={sendLoveReact}>
            <FavoriteBorderOutlinedIcon clicked={clicked} />
          </Icon>
        )}
        <Link to={`/${item.stock_id}`}>
          <Icon>
            <SearchOutlinedIcon />
          </Icon>
        </Link>
      </Info>
    </Container>
  );
};

export default Product;

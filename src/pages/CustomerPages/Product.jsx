import { Add, Remove } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../../components/customerComponents/Announcement";
import Footer from "../../components/customerComponents/Footer";
import Navbar from "../../components/customerComponents/Navbar";
import Newsletter from "../../components/customerComponents/Newsletter";
import axios from "../../utils/axios";
import { useStateValue } from "../../utils/StateProvider";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  /* height:90vh; */
  object-fit: cover;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  cursor: pointer;
`;
const Button = styled.button`
  padding: 15px;
  border: 1.5px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f7f7f5;
  }
  &:active {
    background-color: #e6e5e3;
  }
`;
const Product = () => {
  ///for product fetching
  let { productId } = useParams();
  const token = sessionStorage.getItem("token");
  const [product_obj, setproduct_obj] = useState({});

  ///for storing amount of products
  const [productAmount, setProductAmount] = useState(1);
  const [stock_id, setstock_id] = useState(productId);

  const fetchProduct = async () => {
    axios({
      method: "GET",
      url: `/api/product/id/${productId}`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setproduct_obj(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchProduct();
  }, []);

  /// for adding product to reducer..
  const [state, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product_obj.stock_id,
        amount: productAmount,
        price: product_obj.price,
        image_url:product_obj.image_url,
        name:product_obj.name,
        description: product_obj.description,
        offer: product_obj.offer,
        category: product_obj.category,
        stock: product_obj.stock,
      },
    });
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImageContainer>
          <Image src={product_obj.image_url} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product_obj.name}</Title>
          <Description>{product_obj.description}</Description>
          <Price>Regular Price : ${product_obj.price}</Price>
          {
            product_obj.offer&& <Price>Offer Price : ${product_obj.price-(product_obj.price*(product_obj.offer/100))}</Price>
            }

          <AddContainer>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Amount</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productAmount}
                label="Amount"
                onChange={(e) => {
                  setProductAmount(e.target.value);
                }}
              >
                {Array(product_obj.stock)
                  .fill()
                  .map((_, i) => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Button onClick={addToBasket}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

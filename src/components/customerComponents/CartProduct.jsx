import React, { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useStateValue } from "../../utils/StateProvider";
import { useEffect } from "react";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  margin-bottom: 10px;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const ProductImage = styled.img`
  width: 300px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
`;

const CartProduct = ({
  id,
  imgsrc,
  name,
  amount,
  price,
  description,
  offer,
  stock,
  category,
  hideamounchange,
}) => {
  const [productamount, setproductamount] = useState(amount);
  const [{ basket }, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: "UPDATE_BASKET",
      body: {
        id: id,
        amount:productamount,
      },
    });
  },[productamount])
  return (
    <Product>
      <ProductDetails>
        <ProductImage src={imgsrc} />
        <Details>
          <ProductName>
            <b>Product:</b>
            {name}
          </ProductName>
          <ProductName>
            <b>Description:</b>
            {description}
          </ProductName>
          <ProductName>
            <b>Category:</b>
            {category}
          </ProductName>
        </Details>
      </ProductDetails>
      <PriceDetails>
        <ProductAmountContainer>
          {hideamounchange === "false" && (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Amount</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productamount}
                label="Amount"
                onChange={(e) => {
                  // e.preventDefault();
                  setproductamount(e.target.value);
                }}
              >
                {Array(stock)
                  .fill()
                  .map((_, i) => (
                    <MenuItem value={i + 1}>{i + 1}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </ProductAmountContainer>
        <ProductPrice>$ {price * productamount}</ProductPrice>
        {offer && (
          <ProductPrice>
            Offer Price: $ {(price - price * (offer / 100)) * productamount}
          </ProductPrice>
        )}
      </PriceDetails>
    </Product>
  );
};

export default CartProduct;

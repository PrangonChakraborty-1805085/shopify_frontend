import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../../components/customerComponents/Announcement";
import Footer from "../../components/customerComponents/Footer";
import Navbar from "../../components/customerComponents/Navbar";
import Newsletter from "../../components/customerComponents/Newsletter";
import Products from "../../components/customerComponents/Products";
import axios from '../../utils/axios'
import { useParams } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductListPage = () => {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const {category}=useParams();
  const token = sessionStorage.getItem("token");
  // const email = sessionStorage.getItem("email");
  const fetchSpecificCategoryProducts = async () => {
    axios({
      method: "GET",
      url: `/api/product/categories/${category}`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchSpecificCategoryProducts();
  }, []);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      {/* <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select>
              <Option disabled selected>Color</Option>
              <Option>White</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Yellow</Option>
              <Option>Green</Option>
              <Option>Purple</Option>
          </Select>
          <Select>
              <Option disabled selected>Size</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select>
              <Option selected>Newest</Option>
              <Option>Price (asc)</Option>
              <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer> */}
      <Products products={data} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductListPage;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { categories } from "../../data";
import CategoryItem from "./CategoryItem";
import axios from "../../utils/axios";

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
  justify-content: space-between;
`;
const Category_Container = styled.div`
  overflow: auto;
  white-space: nowrap;
`;
const Categories = () => {
  const [categories, setcategories] = useState([]);
  const token = sessionStorage.getItem("token");
  const fetchCategories = async () => {
    axios({
      method: "GET",
      url: `/api/product/categories`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      // console.log(res.data);
      setcategories(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Container>
      <h1>Categories</h1>
      <Category_Container>
        {categories.map((category, index) => (
          <CategoryItem item={category} key={index} />
        ))}
      </Category_Container>
    </Container>
  );
};

export default Categories;

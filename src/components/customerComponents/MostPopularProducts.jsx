import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { popular_products } from '../../data';
import Product from './Product';
import axios from '../../utils/axios';


const MainContainer=styled.div`
 display: flex;
 flex-direction: column;
`; 
const Container=styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows:300px;
  grid-template-columns:repeat(4,1fr);
  grid-auto-rows: 300px ;
  grid-auto-columns:repeat(4,1fr);

`
const Title=styled.h1`
 color:black;
 margin-left: 20px;
`

const MostPopularProducts = () => {
    const [products, setproducts] = useState([]);
    const token = sessionStorage.getItem("token");
    const fetchProducts = async () => {
      axios({
        method: "GET",
        url: `/api/product/most_popular`,
        headers: { token: `Bearer ${token}` },
      }).then((res) => {
        // console.log(res.data);
        setproducts(res.data);
      });
    };
    // fetching data just 1st time the component loads..
    //not fetching when the component re-renders each time..the website will then send request continuosly
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
       <MainContainer>
          <Title>Most Popular</Title>
        <Container>
            {products.map((item,index)=>(
                <Product item={item} key={index}/>
            ))}
        </Container>
       </MainContainer>
    
    )
}

export default MostPopularProducts

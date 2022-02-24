import React from 'react'
import styled from 'styled-components'
import { popular_products } from '../../data';
import Product from './Product';

const Container=styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows:300px;
  grid-template-columns:repeat(4,1fr);
  grid-auto-rows: 300px ;
  grid-auto-columns:repeat(4,1fr);

`

const Products = ({products}) => {
    return (
        <Container>
            {products.map((item,index)=>(
                <Product item={item} key={index}/>
            ))}
        </Container>
    )
}

export default Products

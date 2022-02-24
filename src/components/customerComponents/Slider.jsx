import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import SlideComponent from "./SlideComponent";
import axios from '../../utils/axios'
// import { sliderItems } from "../../data";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;
const Carousel = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f5f9ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  width: calc(${(props) => props.len}*100%);
  flex-shrink: 0;
  transition: all 1.5s ease;
  /* transform: translateX(${(props) => props.slide_index * -100}vw); */
  /* transform:translate(${(props) => (props.apply * -100) / props.len}%); */
`;

const Slider = () => {
  const [offer_products, setOffer_products] = useState([]);
  const [sliderLength, setSliderLength] = useState(0);

  const token= sessionStorage.getItem("token");

  const fetchOfferProducts = async () => {
    axios({
      method: "GET",
      url: `/api/product/offers`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setSliderLength(res.data.length);
      setOffer_products(res.data);
    });
  };
  useEffect(() => {
    fetchOfferProducts();
    // setRefresh(false);
    // }, [refresh]);
  }, []);

  const [slideIndex, setSlideIndex] = useState(0); // initially 0th slide
  const [buttonPressed, setbuttonPressed] = useState(0); // initially right
  const handleLeftClick = () => {
    setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderLength-1); //as number of slides is 3..so max index 2
    const wrapper = document.querySelector(Wrapper);
    const carousel = document.querySelector(Carousel);
    if (buttonPressed === -1) {
      wrapper.appendChild(wrapper.firstElementChild);
      setbuttonPressed(1);
    }
    carousel.style.justifyContent = "flex-end";
    const len = sliderLength;
    wrapper.style.transform = `translate(${100 / len}%)`;

    // if(buttonPressed==='right')
    // {
    //   wrapper.appendChild(wrapper.firstElementChild);
    // }
  };
  const handleRightClick = () => {
    setSlideIndex(slideIndex > 1 ? 0 : slideIndex + 1); //here number of sliders is 3 so mod 3..otherwise mod number_of_slides
    setbuttonPressed(-1);
    const wrapper = document.querySelector(Wrapper);
    const carousel = document.querySelector(Carousel);
    const len = sliderLength;
    carousel.style.justifyContent = "flex-start";
    wrapper.style.transform = `translate(${-100 / len}%)`;
  };
  const addSlide = () => {
    const wrapper = document.querySelector(Wrapper);
    if (buttonPressed === 1) {
      //add slide to start when transition starts means clicking left arrow
      wrapper.prepend(wrapper.lastElementChild);
    } else {
      //add slide to end
      wrapper.appendChild(wrapper.firstElementChild); //add the first element in the last
    }
    wrapper.style.transition = "none"; // close the transition temporarily
    wrapper.style.transform = "translate(0)";
    setTimeout(() => {
      wrapper.style.transition = "all 1.5s ease";
    });
  };
  //console.log(sliderItems.length);
  return (
    <Container>
      {/*  passing props in styled components */}
      <Carousel>
        <Arrow direction="left" onClick={handleLeftClick}>
          <ArrowLeftOutlinedIcon />
        </Arrow>
        <Wrapper
          slide_index={slideIndex}
          len={sliderLength}
          onTransitionEnd={addSlide}
        >
          {offer_products.map((slideItem,index) => (
            <SlideComponent
              key={index}
              imgsrc={slideItem.image_url}
              // don't pass '#' in the background_color props
              background_color="fcf1ed"
              title={slideItem.name}
              offer={slideItem.offer}
              no_of_slides={sliderLength}
              id={slideItem.id}
            />
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={handleRightClick}>
          <ArrowRightOutlinedIcon />
        </Arrow>
      </Carousel>
    </Container>
  );
};

export default Slider;

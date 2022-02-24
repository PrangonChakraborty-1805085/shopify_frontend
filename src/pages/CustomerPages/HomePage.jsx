import React, { useEffect, useState } from "react";
import Announcement from "../../components/customerComponents/Announcement";
import Slider from "../../components/customerComponents/Slider";
import Navbar from "../../components/customerComponents/Navbar";
import Categories from "../../components/customerComponents/Categories";
import Products from "../../components/customerComponents/Products";
import Newsletter from "../../components/customerComponents/Newsletter";
import Footer from "../../components/customerComponents/Footer";
import { useStateValue } from "../../utils/StateProvider";
import MostPopularProducts from "../../components/customerComponents/MostPopularProducts";

const HomePage = () => {
  return (
    <div>
      {/* <Announcement /> */}
      <Navbar />
      <Slider />
      <Categories />
      {/* <Products  /> */}
      <MostPopularProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;

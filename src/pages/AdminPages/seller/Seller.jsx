import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import "./seller.css";
import ProductDisplay from "../../../components/sellerComponents/ProductDisplay";
import SellerBio from "../../../components/sellerComponents/SellerBio";
import axios from "../../../utils/axios";
import { useEffect, useState } from "react";

export default function Seller() {
  // const pathname = window.location.pathname;
  let { id } = useParams();
  const token = sessionStorage.getItem("token");
  const [user_obj, setUser_obj] = useState({});
  const [products_info, setProducts_info] = useState([]);
  const fetchSeller = async () => {
    axios({
      method: "GET",
      url: `/api/seller/id/${id}`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setUser_obj(res.data);
    });
  };
  const fetchSellerProducts = async () => {
    axios({
      method: "GET",
      url: `/api/seller/id/${id}/products`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setProducts_info(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchSeller();
    fetchSellerProducts();
  }, []);
  return (
    <div className="seller">
      {/* seller info and update block */}
      <div className="sellerContainer">
        <SellerBio
          email={user_obj.email}
          fullname={user_obj.fullname}
          username={user_obj.username}
          image_url={user_obj.image_url}
          phone_number={user_obj.phone_number}
          join_date={user_obj.join_date}
        />
      </div>
      {/* seller products portion */}
      <div className="sellerProductContainer">
        <div className="sellerProductContainerTitle">
          <h1>Available Product List</h1>
        </div>
        <div className="sellerProducts">
          {products_info.map((product) => (
            <ProductDisplay
              imgsrc={product.image_url}
              name={product.name}
              id={product.id}
              amount={product.stock}
              price={product.price}
              category={product.category}
              description={product.description}
              offer={product.offer}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

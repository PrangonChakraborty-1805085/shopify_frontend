import React,{ useEffect, useState }  from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@mui/icons-material";
import {useStateValue} from '../../../utils/StateProvider'
import axios from "../../../utils/axios";
import {Link, useNavigate} from 'react-router-dom';


export default function Topbar() {
  const [{user},dispatch]=useStateValue();
  const [url, seturl] = useState("");
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const fetchImage = async () => {
    axios({
      method: "GET",
      url: `/api/user/email/${email}`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      // console.log(res.data)
      seturl(res.data.IMAGE_URL);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(()=>{
    fetchImage();
  },[]);
  const navigate=useNavigate();
  const logoutAdmin=()=>{
     dispatch({
       type:"SET_USER",
       user:null,
     })
     sessionStorage.removeItem('email');
     sessionStorage.removeItem('token');
     sessionStorage.removeItem('type');
     sessionStorage.removeItem('id');
     navigate('/');


  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Shopify Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          { user &&
            <div className="topbarEmailContainer" >
            <h3>{user.email}</h3>
          </div>
          }
          {/* <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" /> */}
         {/* <Link to='/'> */}
          <img src={url} alt="" className="topAvatar" onClick={logoutAdmin} />
         {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

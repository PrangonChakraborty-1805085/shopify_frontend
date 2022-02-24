import "./widgetSm.css";
import WidgetSmListItem from "../widgetSmListItem/WidgetSmListItem";
import axios from "../../../utils/axios";
import { useEffect, useState } from "react";

export default function WidgetSm() {
  //   const items =
  //   [{
  //      img_url:"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //      username: "Anna Keller",
  //      email: "Software Engineer"
  //   }, {
  //     img_url:"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //     username: "Anna Keller",
  //     email: "Software Engineer"
  //  },{
  //   img_url:"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   username: "Anna Keller",
  //   email: "Software Engineer"
  // },{
  //   img_url:"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   username: "Anna Keller",
  //   email: "Software Engineer"
  // },{
  //   img_url:"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   username: "Anna Keller",
  //   email: "Software Engineer"
  // }];
  const [items, setItems] = useState([]);
  const token = sessionStorage.getItem("token");
  const fetchNewJoinMembers = async () => {
    axios({
      method: "GET",
      url: `/api/user/newMembers`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setItems(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(()=>{
    fetchNewJoinMembers();
  },[]);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {items?.map((item, index) => {
          return (
            <WidgetSmListItem
              key={index}
              img_url={item.img_url}
              fullname={item.fullname}
              type={item.type}
            />
          );
        })}
      </ul>
    </div>
  );
}

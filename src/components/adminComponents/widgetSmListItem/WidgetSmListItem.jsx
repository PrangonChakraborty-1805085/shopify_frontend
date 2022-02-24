import React from "react";
import "./widgetSmListItem.css";
import { Visibility } from "@mui/icons-material";
const WidgetSmListItem = ({img_url,fullname,type}) => {
  return (
    <li className="widgetSmListItem">
    <img
      src={img_url}
      alt=""
      className="widgetSmImg"
    />
    <div className="widgetSmUser">
      <span className="widgetSmUsername">{fullname}</span>
      <span className="widgetSmUserEmail">{type}</span>
    </div>
    <button className="widgetSmButton">
      <Visibility className="widgetSmIcon" />
      Display
    </button>
  </li>
  );
};

export default WidgetSmListItem;

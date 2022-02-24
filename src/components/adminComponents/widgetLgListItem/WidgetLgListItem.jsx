import React from "react";
import "./widgetLgListItem.css";
const WidgetLgListItem = ({url,customer,date,amount}) => {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <tr className="widgetLgTr">
      <td className="widgetLgUser">
        <img
          src={url}
          alt=""
          className="widgetLgImg"
        />
        <span className="widgetLgName">{customer}</span>
      </td>
      <td className="widgetLgDate">{date}</td>
      <td className="widgetLgAmount">${amount}</td>
      <td className="widgetLgStatus">
        <Button type="Approved" />
      </td>
    </tr>
  );
};

export default WidgetLgListItem;

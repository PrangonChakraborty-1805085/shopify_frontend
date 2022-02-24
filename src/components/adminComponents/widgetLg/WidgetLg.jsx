import "./widgetLg.css";
import WidgetLgListItem from "../widgetLgListItem/WidgetLgListItem";
import { useEffect, useState } from "react";
import axios from '../../../utils/axios';

export default function WidgetLg() {

  const token = sessionStorage.getItem("token");
  const [items, setitems] = useState([]);
  const fetchLatestTrans = async () => {
    axios({
      method: "GET",
      url: `/api/user/transaction/latest`,
      headers: { token: `Bearer ${token}` },
    }).then((res) => {
      setitems(res.data);
    });
  };
  // fetching data just 1st time the component loads..
  //not fetching when the component re-renders each time..the website will then send request continuosly
  useEffect(() => {
    fetchLatestTrans();
  }, []);
  
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {items?.map((item, index) => (
          <WidgetLgListItem
            key={index}
            url={item.customer_image_url}
            customer={item.customer_name}
            date={item.transaction_date}
            amount={item.amount}
          />
        ))}
      </table>
    </div>
  );
}

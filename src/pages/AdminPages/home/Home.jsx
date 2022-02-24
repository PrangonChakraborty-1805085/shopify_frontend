import Chart from "../../../components/adminComponents/chart/Chart";
import FeaturedInfo from "../../../components/adminComponents/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData";
import WidgetSm from "../../../components/adminComponents/widgetSm/WidgetSm";
import WidgetLg from "../../../components/adminComponents/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}

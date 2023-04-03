import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";


const Widget = ({ type }) => {

  function standardLink(type){
    if(type=="user") return "/users/countByUser"
    if(type=="earning") return "/hotels/sumRevenueByHotel"
    return "/hotels/countByHotel"
  }
  const link = standardLink(type)
  const { data, loading, error } = useFetch(`${link}`)
  
  let data1;

  //temporary
  let amount = 9.8;
  const diff = 20;

  switch (type) {
    case "user":
      data1 = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      amount = data[0]?.count
      break;
    case "order":
      data1 = {
        title: "HOTELS",
        isMoney: false,
        link: "View all bookings",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      amount = data[0]?.count
      break;
    case "earning":
      data1 = {
        title: "Revenue",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      amount = data[0]?.revenueAll[0]?.sum
      break;
    case "balance":
      data1 = {
        title: "Rating",
        isMoney: false,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data1.title}</span>
        <span className="counter">
          {data1.isMoney && "$"} {amount}
        </span>
        <span className="link">{data1.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data1.icon}
      </div>
    </div>
  );
};

export default Widget;

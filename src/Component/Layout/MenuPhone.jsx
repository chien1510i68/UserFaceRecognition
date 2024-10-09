import { Button, Drawer, Image } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import logo2 from "../../Assets/logo2.svg";
import home from "../../Assets/home.svg";
import home_click from "../../Assets/home-2-click.svg";
import history from "../../Assets/history-icon.svg";
import history_click from "../../Assets/history-click.svg";
function MenuPhone() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userCode");
    Cookies.remove("userName");
    navigate("/");
  };
  const userName = Cookies.get("userName");
  return (
    <div className="fixed bottom-3 justify-center  bg-white tablet:hidden left-2 right-2   py-1 shadow-md rounded-lg grid grid-cols-3 items-end">
      <div className="col-span-1 text-center" onClick={() => navigate("/home")}>
        {location.pathname === "/home" ? (
          <Image src={home_click} preview={false} />
        ) : (
          <Image src={home} preview={false} />
        )}
        {/* <Image src={(location.pathname === "home") ? home_click : home} preview={false} /> */}
        <h2>Trang chủ</h2>
      </div>
      <div
        className="col-span-1 text-center "
        onClick={() => navigate("/scan")}
      >
        <Image
          src={logo2}
          preview={false}
          className="bg-colorPrimary p-4 rounded-full drop-shadow-md"
        />
      </div>
      <div
        className="col-span-1 text-center"
        onClick={() => navigate("/history")}
      >
        {location.pathname === "/history" ? (
          <Image src={history_click} preview={false} />
        ) : (
          <Image src={history} preview={false} />
        )}
        <h2>Lịch sử</h2>
      </div>
    </div>
  );
}

export default MenuPhone;

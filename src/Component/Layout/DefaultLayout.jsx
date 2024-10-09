import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Image, Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import MenuPhone from "./MenuPhone";
import MenuTablet from "./MenuTablet";
import Cookies from "js-cookie";

function DefaultLayout() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userCode");
    Cookies.remove("userName");
    navigate("/");
  };
  return (
    <Layout className="relative ">
      <div className="grid grid-cols-4  ">
        <div className="tablet:col-span-1 phone:hidden tablet:block tablet:h-[100vh] bg-green-200  pt-10">
          <MenuTablet />
        </div>
        <div className="phone:hidden">
          <div className=" fixed top-0 flex left-0 right-0 justify-between p-5 bg-[#e7e7e7] z-[1000]">
            <Button icon={<MenuOutlined />} onClick={() => setOpenMenu(true)} />
            <Button icon={<LogoutOutlined />} onClick={() => handleLogout()} />
          </div>
        </div>
        {/* <MenuPhone open={openMenu} onClose={() => setOpenMenu(false)} /> */}
        {/* <div className="tablet:col-span-3 phone:col-span-4 phone:absolute tablet:relative phone:top-14 laptop:top-0 z-20 bg-white"> */}
        <Content className="tablet:col-span-3 phone:col-span-4">
          <Outlet />
        </Content>
      </div>
      <div className="phone:block tablet:hidden">
        <MenuPhone />
      </div>
    </Layout>
  );
}

export default DefaultLayout;

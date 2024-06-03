import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Outlet } from "react-router";
import MenuPhone from "./MenuPhone";
import MenuTablet from "./MenuTablet";
function DefaultLayout() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Layout className="relative">
      <div className="grid grid-cols-4  ">
        <div className="tablet:col-span-1 phone:hidden tablet:block tablet:h-[100vh] bg-green-200  pt-10">
          <MenuTablet />
        </div>
        <div className="tablet:hidden">
          <div className=" fixed top-0 flex left-0 right-0 justify-between p-5 bg-[#e7e7e7] z-[1000]">
          
            <Button icon={<MenuOutlined />} onClick={() => setOpenMenu(true)} />
            <Button icon={<LogoutOutlined />} onClick={() => setOpenMenu(true)} />

          </div>
        </div>
        <MenuPhone open={openMenu} onClose={() => setOpenMenu(false)} />
        <div className="tablet:col-span-3 phone:col-span-4 phone:absolute tablet:relative phone:top-14 laptop:top-0 z-20 bg-white">
          <Content className="">
            <Outlet />
          </Content>
        </div>
      </div>
    </Layout>
  );
}

export default DefaultLayout;

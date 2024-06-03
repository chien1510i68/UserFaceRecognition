import { Button, Drawer, Image } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router";
import image from "../../Assets/image_user.png";
function MenuPhone({ open, onClose }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userCode");
    Cookies.remove("userName");
    navigate("/");
  };
  const userName = Cookies.get("userName");
  return (
    <Drawer
      placement={"left"}
      closable={false}
      onClose={onClose}
      width="300"
      open={open}
    >
      <div className="mb-10">
        <div className="w-[20vw] mx-auto  ">
          <Image src={image} />
        </div>
        <h2 className="text-center font-bold text-slate-700">Xin chào {userName}</h2>
      </div>
      <div className="grid grid-cols-1 gap-5 ">
        <Button
          className=" col-span-1 bg-slate-300  font-medium"
          onClick={() => {
            navigate("/scan");
            onClose();
          }}
        >
          Điểm danh{" "}
        </Button>
        <Button
          className=" col-span-1 bg-slate-300  font-medium"
          onClick={() => {
            navigate("/history");
            onClose();
          }}
        >
          Xem lịch sử
        </Button>
        <Button
          className=" col-span-1 bg-slate-300  font-medium"
          onClick={() => {
            navigate("/update");
            onClose();
          }}
        >
          Thay đổi ảnh
        </Button>

        <Button
          className=" col-span-1 bg-slate-300  font-medium"
          onClick={() => handleLogout()}
        >
          Đăng xuất
        </Button>
      </div>
    </Drawer>
  );
}

export default MenuPhone;

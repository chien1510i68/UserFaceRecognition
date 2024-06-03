import React from "react";
import image_user from "../../Assets/image_user.png";
import { Button, Image, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
function MenuTablet(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userCode");
    Cookies.remove("userName");
    navigate("/");
  };
  const userName = Cookies.get("userName");
  return (
    <div>
      <div>
        <div className=" text-center px-5  w-[10vw] mx-auto">
          <Image src={image_user} className="rounded-full " preview={false} />
        </div>
        <h2 className="text-center font-bold text-slate-700">
          Xin chào {userName}
        </h2>
      </div>
      <div className="grid gap-5 tablet:px-[25%] phone:px-0 pt-[5%] ">
        <Button
          className="bg-slate-300  font-medium"
          onClick={() => navigate("/scan")}
        >
          Điểm danh{" "}
        </Button>
        <Button
          className="bg-slate-300  font-medium"
          onClick={() => navigate("/history")}
        >
          Xem lịch sử
        </Button>
        <Button
          className="bg-slate-300  font-medium"
          onClick={() => navigate("/update")}
        >
          Thay đổi ảnh
        </Button>
        {/* <Button
                  className="bg-slate-300  font-medium"
                  onClick={() => navigate("/test")}
                >
                 Test nhận dạng 
                </Button> */}

        <Button
          className="bg-slate-300  font-medium"
          onClick={() => handleLogout()}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

export default MenuTablet;

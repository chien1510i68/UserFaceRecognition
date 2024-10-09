import React from "react";
import user from "../../Assets/student.png";
import { Button, Image } from "antd";
import Cookies from "js-cookie";
import add_image from "../../Assets/add_image.svg";
import logout from "../../Assets/logout.svg";
import lock from "../../Assets/lock.svg";
import edit from "../../Assets/edit.svg";
import { RightOutlined, RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import send from "../../Assets/send.svg";
export default function UserDetail() {
  const userName = Cookies.get("userName");
  const userCode = Cookies.get("userCode");
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt");
    Cookies.remove("userCode");
    Cookies.remove("userName");
    navigate("/");
  };
  return (
    <div className="relative">
      <div className="grid grid-cols-3 items-end">
      <div className="col-span-1 ml-5 block">
          <button
            onClick={() => navigate("/home")}
            className="border-spacing-1 border-[1px] border-solid rounded-md border-blue-300 w-11 h-11 block my-auto text-colorPrimary"
          >
            <RollbackOutlined />
          </button>
        </div>
        <h2 className="text-center text-2xl font-title my-4 col-span-1 text-colorPrimary">
          My Profile{" "}
        </h2>
        <div className="col-span-1"></div>
      </div>
      <div className="">
        <div className="w-[100px] h-[100px] p-5  bg-[#f3f3f3] rounded-full mx-auto mt-5">
          <Image src={user} />
        </div>
        <h2 className="font-description text-lg text-center my-4">
          {userName}
        </h2>
        <h2 className="font-description text-lg text-center my-4">
          {userCode}
        </h2>
      </div>

      {/* <Button className="block mx-auto px-10 rounded-lg my-5">
        Edit profile
      </Button> */}

      <div className="fixed bottom-4 pt-8 w-full bg-white rounded-t-3xl">
        <div className="bg-white grid grid-cols-4   border-b-[.5px] items-center border-[#efefef]  justify-center py-5 " 
        onClick={() => navigate("/edit-profile")}
        >
          <div className=" mx-auto col-span-1 ">
            <Image src={edit} preview={false} />
          </div>
          <p className=" mx-auto col-span-2">Edit Profile</p>
          <div className="col-span-1 mx-auto">
            <Image src={send} preview={false} />
          </div>
        </div>

        <div className="bg-white grid grid-cols-4   border-b-[.5px] items-center border-[#efefef] justify-center py-5 " 
        onClick={() => navigate("")}
        >
          <div className=" mx-auto col-span-1">
            <Image src={add_image} preview={false} />
          </div>

          <p className=" mx-auto col-span-2">Create/Update Images</p>
          <div className="col-span-1 mx-auto">
            <Image src={send} preview={false} />
          </div>
        </div>
        <div className="bg-white grid grid-cols-4   border-b-[.5px] items-center border-[#efefef]  justify-center py-5 " 
        onClick={() => navigate("/reset-password")}
        >
          <div className=" mx-auto col-span-1 ">
            <Image src={lock} preview={false} />
          </div>
          <p className=" mx-auto col-span-2">Change Password</p>
          <div className="col-span-1 mx-auto">
            <Image src={send} preview={false} />
          </div>
        </div>
        <div
          className="bg-white grid grid-cols-4   border-b-[.5px] border-[#efefef] justify-center py-5  " 

          onClick={() => handleLogout()}
        >
          <div className=" mx-auto col-span-1">
            <Image src={logout} preview={false} />
          </div>

          <p className=" mx-auto col-span-2">Logout</p>
          <div className="col-span-1 mx-auto">
            <Image src={send} preview={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

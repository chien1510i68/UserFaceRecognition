import { DatePicker, Image, message } from "antd";
import React from "react";
import user_edit from "../../Assets/edit_user.png";
import { useNavigate } from "react-router";
export default function HomePage() {
  const navigate = useNavigate();
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div>
      <div className="flex justify-between mx-4 my-5">
        <h2 className="font-title text-center text-2xl text-colorPrimary">
          Homepage{" "}
        </h2>
        <Image
          src={user_edit}
          preview={false}
          color={"red"}
          onClick={() => navigate("/user-detail")}
        />
      </div>

    

    </div>
  );
}

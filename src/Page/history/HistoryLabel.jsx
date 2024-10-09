import { UserDeleteOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
import icon from "../../Assets/user-square.svg"

export default function HistoryLabel({ classCode, nameClass, studyGroup }) {
  return (
    <div className="grid grid-cols-5 font-description gap-1 justify-center items-center">
      <div className="col-span-1 text-center">
       <Image src={icon} preview={false} className="text-3xl"/>
      </div>
      <div className="col-span-2 text-left">
        <div className="grid grid-flow-row grid-rows-2">
          <div className="row-span-1">Mã lớp học:</div>
          <div className="row-span-1 ">Tên lớp học:</div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid grid-flow-row grid-rows-2">
          <div className="row-span-1"> {classCode} - {studyGroup}</div>
          <div className="row-span-1 line-clamp-1">{nameClass}</div>
        </div>
      </div>
    </div>
  );
}

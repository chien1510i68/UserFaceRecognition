import { CheckCircleTwoTone, CloseCircleFilled } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import "./table.css"
export default function HistoryContent({ attendances }) {
  const columns = [
    {
      title: "Time Attended",
      dataIndex: "timeAttended",
      align: "center",
      key: "timeAttended",
      render: (text) =>
        text ? text : <i className="text-sm ">Not Attended</i>,
    },

    {
      title: "Status",
      dataIndex: "attended",
      align: "center",

      key: "attended",
      render: (text) =>
        text == true ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          // <CheckCircleTwoTone className="text-base" twoToneColor="#e73b3b" />
          <CloseCircleFilled className="text-base text-[#e73b3b]" />
        ),
    },
    {
      title: "Time created QR",
      align: "center",

      dataIndex: "timeCreateQr",
      key: "age",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={attendances}
        size="small"
        pagination={false}
      />
    </>
  );
}

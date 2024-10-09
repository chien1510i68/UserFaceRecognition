import { Button, Table } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { getHistoryAttended } from "../api/classroom";
import HistoriAttended from "./HistoriAttended";

function CustomRender({ record }) {

 
  return <HistoriAttended data={record} />;
}



function TableJoinedClassroomByUser({ data, isLoading }) {
  const columns = [
    {
      title: "Mã lớp học",
      dataIndex: "classCode",
      align: "center",
      // columnWidth: 200,
      // width : "5%"
    },
    {
      title: "Tên lớp học",
      dataIndex: "nameClass",
      align: "center",
      // columnWidth: 200,
      // width : "20%"
    },
    {
      title: "Nhóm học",
      dataIndex: "studyGroup",
      align: "center",
      // columnWidth: 200,
      // width : "15%"
    },
    {
      align: "center",
      title: "Lịch sử điểm danh",
      dataIndex: "",
      key: "x",
      // columnWidth: 200,
      render: (record) => <CustomRender record={record?.checkinUserDTOS} />,
    },
    
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{
          y: 1200,
          x: 300,
        }}
      />
      {/* <Button onClick={test}>Click me </Button> */}
    </div>
  );
}

export default TableJoinedClassroomByUser;

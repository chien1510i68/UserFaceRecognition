import { Table } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { getHistoryAttended } from "../api/classroom";
import HistoriAttended from "./HistoriAttended";

function CustomRender({ record }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      const res = await getHistoryAttended({
        classroomId: record?.id,
        userCode: Cookies.get("userCode"),
      });
      setData(res != null ? res : []);
    };
    handleGetData();
  }, [record]);

  return <HistoriAttended data={data} />;
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
      render: (record) => <CustomRender record={record} />,
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
    </div>
  );
}

export default TableJoinedClassroomByUser;

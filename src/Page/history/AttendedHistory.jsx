import React, { useEffect, useState } from "react";
import TableJoinedClassroomByUser from "../../Component/Table/TableJoinedClassroomByUser";
import { getClassroomsByUser } from "../../Component/api/classroom";
import Cookies from "js-cookie";
import { Modal, Spin } from "antd";

function AttendedHistory() {
  const [data, setData] = useState([]);
  const userCode = Cookies.get("userCode");
  const [loading, setLoading] = useState(true);
  const handleGetClassroom = () => {
    getClassroomsByUser(userCode).then((res) => {
      setLoading(false);
      setData(res != null ? res : []);
    });
  };
  useEffect(() => {
    handleGetClassroom();
  }, []);
  return (
    <div>
      <h2 className="text-xl uppercase my-5 text-center font-medium phone:hidden tablet:block ">
        danh sách các lớp học mà sinh viên tham gia{" "}
      </h2>
      {data.length == 0 ? (
        <h2 className="text-center text-lg font-normal text-red-400">
          Bạn chưa tham gia lớp học nào
        </h2>
      ) : (
        <div>
          <TableJoinedClassroomByUser data={data} />
          
        </div>
      )}
      <Modal open={loading} closeIcon={false} footer={null}>
        <div className="text-center my-8">
          <Spin />
          <h2 className="mt-5">Đang lấy dữ liệu ...</h2>
        </div>
      </Modal>
    </div>
  );
}

export default AttendedHistory;

import React, { useEffect, useState } from "react";
import TableJoinedClassroomByUser from "../../Component/Table/TableJoinedClassroomByUser";
import {
  getClassroomsByUser,
  getHistoryAttended,
} from "../../Component/api/classroom";
import Cookies from "js-cookie";
import { Button, Modal, Spin } from "antd";
import HistoryItem from "./HistoryItem";

function AttendedHistory() {
  const [data, setData] = useState([]);
  const userCode = Cookies.get("userCode");
  const [loading, setLoading] = useState(true);
  const handleGetClassroom = async () => {
    await getHistoryAttended({ userCode: userCode }).then((res) => {
      setLoading(false);
      setData(res != null ? res : []);
      // console.log("Data in attendance history is : ",res);
    });
  };
  useEffect(() => {
    handleGetClassroom();
  }, []);
  // const handleTest = () =>{
  //   console.log(data);
  // }
  return (
    <div>
      <h2 className="text-xl uppercase my-5 text-center font-medium phone:hidden tablet:block ">
        danh sách các lớp học mà sinh viên tham gia{" "}
      </h2>
      {/* <Button onClick={handleTest}>Click </Button> */}
      {data.length == 0 ? (
        <h2 className="text-center text-lg font-normal text-red-400">
          Bạn chưa tham gia lớp học nào
        </h2>
      ) : (
        <div>
          <div className="phone:hidden tablet:block">
            <TableJoinedClassroomByUser data={data} />
          </div>
          <div className="phone:block tablet:hidden">
            <HistoryItem />
          </div>
          {/* <HistoryItem data={data}/> */}
        </div>
      )}
      <Modal open={loading} closeIcon={false} footer={null}>
        <div className="text-center my-8">
          <Spin />
          <h2 className="mt-5">Đang lấy dữ liệu ...</h2>
        </div>
      </Modal>
    </div>
    // <div className="mx-4">
    //   <HistoryItem/>
    // </div>
  );
}

export default AttendedHistory;

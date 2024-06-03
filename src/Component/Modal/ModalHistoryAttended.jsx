import { Liquid } from "@ant-design/charts";
import { Modal, Table } from "antd";
import React from "react";

function ModalHistoryAttended({ isOpen, onCancel, data, nameClass, quantity }) {
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "userName",
      align: "left",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      align: "center",
    },

    {
      title: "Mã sinh viên",
      dataIndex: "userCode",
      align: "center",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      align: "center",
    },

    {
      title: "Trạng thái",
      dataIndex: "confirmed",
      align: "center",
      render: (record) => (
        <>
          {record?.status === "Yes" ? (
            <p>Chưa điểm danh </p>
          ) : (
            <p>Đã điểm danh</p>
          )}
        </>
      ),
    },
  ];
  const config = {
    percent: data.length / quantity,
    style: {
      outlineBorder: 4,
      outlineDistance: 1,
      waveLength: 20,
    },
  };
  return (
    <Modal
      width={900}
      open={isOpen}
      onCancel={onCancel}
      maskClosable={false}
      footer={null}
    >
      <h2 className="text-lg text-center font-medium mb-7">
        Lịch sử điểm danh của bạn tại lớp {nameClass}
      </h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 20,
        }}
      />
      <div className="max-w-sm mx-auto">
        <h2 className="text-lg text-center font-medium mb-7">
          Tổng số lượng buổi học bạn tham gia là :{data.length} / {quantity}{" "}
        </h2>
        <Liquid {...config} />
        <h2 className="text-center">Biểu đồ thống kê số lượng buổi học của bạn</h2>
      </div>
    </Modal>
  );
}

export default ModalHistoryAttended;

import { Button, Modal, Result } from "antd";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router";

function ModalCofirm({ isOpen, onCancel ,distance}) {
  const navigate = useNavigate()
  const userName = Cookies.get("userName")
  const userCode = Cookies.get("userCode")
  return (
    <div>
      <Modal open={isOpen} footer={null} closeIcon={false}>
        <Result
          status="success"
          title={`Điểm danh thành công sinh viên ${userName} có mã sinh viên ${userCode} `
          // khoảng cách tới giáo viên là  ${distance}
        }
          extra={[
            <Button className="text-green-300 block ml-auto" onClick={() => 
            {
              onCancel();
              navigate("/history")
            }}>
              Xem lịch sử
            </Button>,
          
          ]}
        />
      </Modal>
    </div>
  );
}

export default ModalCofirm;

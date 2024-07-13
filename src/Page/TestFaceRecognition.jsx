
import { Button, Modal, Result, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import Cookies from "js-cookie";
import { faceRecognition } from "../Component/api/face_recognition";
import ModalCofirm from "../Component/Modal/ModalCofirm";
import { predictUser } from "../Component/api/user";
import { useNavigate } from "react-router";

function TestFaceRecognition({ handleCancel }) {
  const webcamRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userCode, setUserCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valuePredict, setValuePredict] = useState(0);
  const [openModalResult, setOpenModalResult] = useState(false);
  const userName = Cookies.get("userName");
  const navigate = useNavigate();
  const capture = async () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();

    // Chuyển chuỗi base64 thành dữ liệu nhị phân
    const binaryData = atob(imageSrc.split(",")[1]);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", blob, "captured_image.jpg");
    formData.append("userCode", Cookies.get("userCode"));

    predictUser(formData)
      .then((res) => {
        setLoading(false);
        if (res?.data?.data >= 80) {
          notification.success({
            message: `Nhận dạng thành công sinh viên ${userName}`,
          });
        } else {
          notification.error({ message: "Không nhận dạng thành công" });
        }
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="sm:pt-[10%] w-[]">
      <div>
        <p className="text-center">
          Sử dụng khuôn mặt của bạn để thử nhận dạng mô hình nhận diện khuôn mặt
        </p>
        <Button onClick={() => navigate("/history")}>Thoát</Button>
      </div>
      <Webcam
        className="block  my-4 rounded-md mx-auto"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />

      <Button
        onClick={capture}
        className="block bg-red-400 rounded-2xl p-5 mx-auto"
      ></Button>
      <ModalCofirm
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        userCode={userCode}
      />
      <Modal open={loading} closeIcon={false} footer={null}>
        <div className="my-8 text-center">
          <Spin />
          <h2 className="mt-5">Đang nhận dạng khuôn mặt</h2>
        </div>
      </Modal>
      <Modal
        open={openModalResult}
        footer={null}
        onCancel={() => setOpenModalResult(false)}
      >
        <Result
          status={`${
            valuePredict == 501 || valuePredict == 500 || valuePredict == 502
              ? "warning"
              : "success"
          }`}
          title={`${
            valuePredict == 501 || valuePredict == 500 || valuePredict == 502
              ? "Có lỗi khi nhận dạng "
              : valuePredict > 80
              ? `Nhận dạng thành công ${userName} với độ chính xác là: ${valuePredict}`
              : "Không thể nhận dạng chính xác khuôn mặt của bạn "
          }`}
          extra={[
            <Button
              onClick={() => setOpenModalResult(false)}
              className="block ml-auto"
            >
              Thoát
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
}

export default TestFaceRecognition;

import { Button, Modal, Result, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import Cookies from "js-cookie";
import { faceRecognition } from "../Component/api/face_recognition";
import ModalCofirm from "../Component/Modal/ModalCofirm";
import { face_recognition_url } from "../Component/api/url";

function TestFaceRecognition({ handleCancel }) {
  const webcamRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userCode, setUserCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valuePredict, setValuePredict] = useState(0);
  const [openModalResult, setOpenModalResult] = useState(false);
  const userName = Cookies.get("userName");
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
    formData.append("file_name", Cookies.get("userCode"));

    fetch(`${face_recognition_url}/predict/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          throw new Error("Có lỗi xảy ra khi gửi yêu cầu.");
        }
        return response.json(); // Chuyển đổi phản hồi thành dạng JSON
      })
      .then((data) => {
        setLoading(false);
        setOpenModalResult(true);
        // console.log(data); // In dữ liệu phản hồi vào console
        // notification.success({
        //   message: "Độ chính xác là: " + data.predictions,
        // }); // Sử dụng dữ liệu trong thông báo
        setValuePredict(data.predictions);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Lỗi khi gửi video:", error);
      });
  };

  return (
    <div className="sm:pt-[10%] w-[]">
      <div>
        <p className="text-center">
         Sử dụng khuôn mặt của bạn để thử nhận dạng mô hình nhận diện khuôn mặt 
        </p>
        <Button onClick={() => handleCancel()}>Thoát</Button>
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
          status={`${valuePredict == 501 || valuePredict == 500 || valuePredict == 502  ? "warning" :"success" }`}
          title={`${
            valuePredict == 501 || valuePredict == 500 || valuePredict == 502 ? "Có lỗi khi nhận dạng " :
            valuePredict > 80
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

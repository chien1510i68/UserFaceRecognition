import { Button, Modal, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
// import ModalCofirm from "./Modal/ModalCofirm";
import Cookies from "js-cookie";
import { replaceImage } from "../api/user";

function ModalEditImage({ isOpen, imageName, onCancel, handleGetImages }) {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);
    // Chuyển chuỗi base64 thành dữ liệu nhị phân
    const binaryData = atob(imageSrc.split(",")[1]);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", blob, "captured_image.jpg");
    formData.append("fileName", imageName);
    try {
      const res = await replaceImage(formData);
      if (res?.data?.success) {
        setLoading(false);
        onCancel();
        handleGetImages();
        notification.success({ message: "Thay đổi thành công" });
      } else {
        setLoading(false);
        notification.error({ message: "Có lỗi khi thay đổi" });
      }
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.error("Error in update images:", error);
    }

    onCancel();
  };

  return (
    <Modal open={isOpen} onCancel={onCancel} footer={null} className="relative">
      <div>
        {loading && (
          <div className="text-center py-10">
            <Spin />
            <h2 className="mt-1">Đang cập nhật</h2>
          </div>
        )}

        <div className={`sm:pt-[10%] ${loading === true ? "hidden" : ""}`}>
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
          {/* <ModalCofirm
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          userCode={userCode}
        /> */}
        </div>
      </div>
    </Modal>
  );
}

export default ModalEditImage;

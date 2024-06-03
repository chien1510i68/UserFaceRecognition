import { Button } from "antd";
import React, { useRef } from "react";
import Webcam from "react-webcam";

function GetImage({ handleAddImage ,next }) {
  const webcamRef = useRef(null);
  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Chuyển chuỗi base64 thành dữ liệu nhị phân
    const binaryData = atob(imageSrc.split(",")[1]);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    handleAddImage(blob);
    next()

  };
  return (
    <div>
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
    </div>
  );
}

export default GetImage;

import { notification } from "antd";
import React, { useState, useRef } from "react";
import QRCodeScanner from "react-qr-scanner";
import { useNavigate } from "react-router";

function ScanQR() {
  const qrRef = useRef(null);
  const navigate = useNavigate()
  const [selectedCamera, setSelectedCamera] = useState("front"); // Mặc định là camera trước

  const handleError = (error) => {
    console.error("Lỗi trong quá trình quét:", error);
    // Xử lý lỗi phù hợp (ví dụ: hiển thị thông báo cho người dùng)
  };
  const handleScan = (data) => {
    if (data != null) {
      // notification.success({ message: data?.text });
      const value = data?.text.split("/")
      const queryParams = {
        qrId: value[0],
        isNormal: value[1]
      };
     
      navigate("/attended" ,{state : queryParams})
    
      
    }
    // console.log(data);
    const handleError = (error) => {
      console.error("Lỗi trong quá trình quét:", error);
      // Xử lý lỗi phù hợp (ví dụ: hiển thị thông báo cho người dùng)
    };
    //   console.log(data?.text);
  };

  return (
    <div>
        <h2 className="text-center font-medium text-xl uppercase my-5">Thực hiện quét mã QR</h2>
      <QRCodeScanner
        ref={qrRef}
        onError={handleError}
        constraints={{
          // audio: true,
          video: { facingMode: "environment" },
        }}
        onScan={handleScan}
        width="100%"
        height="400px"
      />
    </div>
  );
}

export default ScanQR;

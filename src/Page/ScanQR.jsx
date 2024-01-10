import React, { useState } from "react";
import { Input, QRCode, Space } from "antd";
import { useNavigate } from "react-router";


function ScanQR(props) {
  const [text, setText] = useState("https://facerecognition-60f8d.web.app/");
  const navigate = useNavigate()
  return (
    <div>
      <Space direction="vertical" align="center">
        <QRCode
          value={text || "-"}
          onScan={(e) => {
            // Lưu thông tin được quét vào localStorage
            localStorage.setItem("myInfo", e.data);
            navigate("https://facerecognition-60f8d.web.app/")
          }}
        />
        <Input
          placeholder="-"
          maxLength={60}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Space>
    </div>
  );
}

export default ScanQR;

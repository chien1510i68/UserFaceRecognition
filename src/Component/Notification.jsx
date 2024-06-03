import React, { useState, useEffect } from "react";

const Notification = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Nhìn thẳng vào camera ",
    "Quay mặt sang trái",
    "Quay mặt sang phải",
    "Hướng khuôn mặt lên trên",
    "Hướng khuôn mặt xuống dưới",
  ]; // Danh sách các thông báo

  useEffect(() => {
    const interval = setInterval(() => {
      // Tăng chỉ số của thông báo mỗi 3 giây
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval); // Xóa bộ đếm khi component bị xóa khỏi DOM
  }, []);

  return (
    <div>
        <h2>Đặt khuôn mặt vào giữa khung ảnh và </h2>
      <h2 className="text-red-300">{messages[messageIndex]} 3s</h2>
      <p></p>
    </div>
  );
};

export default Notification;

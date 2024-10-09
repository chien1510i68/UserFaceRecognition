import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function AttendancePhoneFace() {
  const videoRef = useRef(null);
  const navigate = useNavigate()
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Lấy quyền truy cập camera trước của thiết bị
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // camera trước
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    }
    startCamera();
  }, []);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setImageSrc(canvas.toDataURL("image/png")); // Lưu hình ảnh dưới dạng base64
  };
  return (
    <div className="relative flex justify-center items-center h-[100vh] bg-[#333]">
        <div className="absolute top-[5vh] grid-cols-3 grid w-full">
        <div className=" col-span-1 ml-8 block">
          <Button
            onClick={() => navigate("/home")}
            className="border-spacing-1 border-[1px] border-solid border-white w-11 h-11 block my-auto text-white "
          >
            <RollbackOutlined />
          </Button>
        </div>
        <h2 className=" col-span-2  text-left font-description text-lg font-medium text-white">
          Attendance by Face
        </h2>
        </div>
      <div className="w-[90%] max-w-[400px] h-[50%] overflow-hidden rounded-[52px]  absolute top-[15vh]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover border-none"
        />
      </div>
      <button className="absolute bottom-6 w-16 h-16 bg-white rounded-[50%] outline-none border-[6px] border-blue-200" onClick={takePhoto}></button>


      {/* Hiển thị ảnh đã chụp */}
      
    </div>
  );
}

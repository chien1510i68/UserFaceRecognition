/*
import React, { useState, useRef, useEffect } from "react";
import Notification from "../Component/Notification";
import { Button } from "antd";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { face_recognition_url } from "../Component/api/url";

const Camera = ({handleTest}) => {
  const [videoBlob, setVideoBlob] = useState(null);
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [time, setTime] = useState(10);
  const [showNotification, setShowNotification] = useState(false);
  const userCode = Cookies.get("userCode");

  useEffect(() => {
    let timer;
    if (recording) {
      // Bắt đầu quay video
      startRecording();

      setShowNotification(true);

      // Đặt thời gian dừng sau 10 giây
      timer = setTimeout(() => {
        stopRecording();
        setRecording(false);
        setShowNotification(false);
      }, 15000);
    }

    // Hủy timer khi component bị unmount hoặc khi quay video đã dừng
    return () => clearTimeout(timer);
  }, [recording]);

  const startRecording = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("Trình duyệt không hỗ trợ quay video");
      return;
    }

    const constraints = {
      video: true,
      // audio: false,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            const blob = new Blob([event.data], { type: "video/webm" });
            setVideoBlob(blob);
          }
        };

        recorder.start();
      })
      .catch((error) => {
        console.error("Lỗi khi quay video:", error);
      });
  };

  const stopRecording = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleSubmit = () => {
    if (videoBlob) {
      const formData = new FormData();
      formData.append("video", videoBlob);
      formData.append("user_code", userCode);

      fetch(`${face_recognition_url}/test/`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Gửi video thành công");
            handleTest()
            setVideoBlob(null);
          } else {
            console.error("Lỗi khi gửi video:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi gửi video:", error);
        });
    }
  };

  return (
    <div>
      {!userCode ? (
        <p className="text-center text-base font-medium"> Bạn cần đăng nhập <Link to={"/"} className="text-sky-600 mx-1"> tại đây</Link> để có thể thay đổi ảnh  </p>
      ) : (
        <div className="w-full my-auto text-center mx-auto ">
          {!recording && !videoBlob && (
            <div className="mx-2">
              <h2 className="text-left">
                Hãy chuẩn bị máy ảnh và môi trường trước khi quay <br /> Nên
                chọn nơi có ánh sáng tốt để hình ảnh có chất lượng tốt hơn giúp
                quá trình nhận dạng diễn ra chính xác hơn{" "}
              </h2>
              <Button className="mt-5" onClick={() => setRecording(true)}>
                Bắt đầu quay
              </Button>
            </div>
          )}
          <div className=" ">
            <video
              className="w-full h-fulll block"
              ref={videoRef}
              controls={false}
            ></video>
          </div>

          {showNotification && (
            <div className="mt-10">
              <Notification />
            </div>
          )}
          {videoBlob && <Button onClick={handleSubmit}>Gửi video</Button>}
        </div>
      )}
    </div>
  );
};

export default Camera;
*/

// ----- demo------------
import { Button } from "antd";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function Camera({ handleAddImage ,title }) {
  const webcamRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const binaryData = atob(imageSrc.split(",")[1]);
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    console.log("Blob in camera " + blob);
    handleAddImage(blob);
  };
  

  return (
    <div>
     
      <div className={`sm:pt-[10%]  ${!loading ? "" : "hidden"} `}>
        <h2 className="text-center font-normal text-red-500">{title}</h2>
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
    </div>
  );
}

export default Camera;

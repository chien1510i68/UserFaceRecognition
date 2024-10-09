import { Button, Spin, notification } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { faceRecognition } from "../../Component/api/face_recognition";
import ModalCofirm from "../../Component/Modal/ModalCofirm";
import Cookies from "js-cookie";
import image1 from "../../Assets/user.png";

function ShowVideo({ qrId }) {
  const webcamRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userCode, setUserCode] = useState(null);
  const [position, setPosition] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [distance , setDistance] = useState(0)

  const [loading, setLoading] = useState(false);


  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    if (longitude == null || latitude == null) {
      notification.error({ message: "Bạn cần cấp quyền truy cập vị trí" });
    } else {setLoading(true);
      const signature = dataURLToBlob(image1);
      const blob = dataURLToBlob(imageSrc);

      const formData = new FormData();
      formData.append("image", blob, "captured_image.jpg");
      formData.append("qrCodeId", qrId);
      formData.append("longitude", longitude);
      formData.append("latitude", latitude);
      formData.append("signature", signature);
      formData.append("userCode", Cookies.get("userCode"));

      try {
        faceRecognition(formData).then((res) => {
          console.log(res?.data);
          setLoading(false);
          if (res?.data?.success) {
            setIsOpen(true);
            setDistance(res?.data?.data?.distance)
          } else {
            notification.error({ message: res?.data?.error?.message });
          }
        });
      } catch (error) {
        setLoading(false);
        console.error("Error in faceRecognition:", error);
      }
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position);
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
      console.log(typeof isNormal);
    });
  }, []);

  return (
    <div>
      <div className={`text-center ${loading ? "" : "hidden"}`}>
        <Spin />
        <h2 className="mt-2">Đang lưu dữ liệu ...</h2>
      </div>
      <div className={`sm:pt-[10%]  ${!loading ? "" : "hidden"} `}>
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
          distance={distance}
/>
      </div>
    </div>
  );
}

export default ShowVideo;

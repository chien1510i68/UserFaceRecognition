import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { Button, Modal, Result, Spin, notification } from "antd";
import SignatureCanvas from "react-signature-canvas";
import image1 from "../Assets/user.png";
import { faceRecognition } from "../Component/api/face_recognition";
import { useNavigate } from "react-router";
function Signature({ qrId }) {
  const [position, setPosition] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [openModalResults, setOpenModalResults] = useState(false);
  const sigCanvas = useRef(null);
  const userName = Cookies.get("userName");
  const userCode = Cookies.get("userCode");
  const navigate = useNavigate();

  const handleSignature = () => {
    setIsSigned(true);
  };

  const handleCheckins = () => {
    if (longitude == null || latitude == null) {
      notification.error({
        message:
          "Bạn cần cho phép website truy cập vị trí hiện tại để điểm danh",
      });
    }
    if (!isSigned) {
      notification.error({
        message: "Bạn cần ký tên trước khi gửi ",
      });
    }else{
    const binaryData = atob(image1.split(",")[1]);
    const uint8Array = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    const signature = dataURLToBlob(dataUrl);
    const formData = new FormData();
    formData.append("image", blob, "captured_image.jpg");
    formData.append("signature", signature, "signature.png");
    formData.append("qrCodeId", qrId);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("userCode", Cookies.get("userCode"));
    // notification.success({ message: longitude });
    // notification.success({ message: latitude });

    try {
      setLoading(true);
      faceRecognition(formData).then((res) => {
        setLoading(false);
        console.log(res?.data);
        if (res?.data?.success) {
          setDistance(res?.data?.data?.distance);
          setOpenModalResults(true);
          // notification.success({
          //   message: `Điểm danh thành công ${userName} có mã sinh viên ${userCode}`,
          // });
          // notification.success({
          //   message: `Khoảng cách:  ${res?.data?.data?.distance} mét`,
          // });

          // console.log(res?.data);
        } else {
          notification.error({ message: res?.data?.error?.message });
        }
      });
    } catch (error) {
      console.error("Error in faceRecognition:", error);
    }
  };
}

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
      <div>
        <h2 className="text-center font-medium text-lg mt-10">
          Thực hiện điểm danh buổi học{" "}
        </h2>

        <div className={`${loading ? "" : "hidden"} text-center `}>
          <Spin />
          <h2 className="mt-2">Đang điểm danh...</h2>
        </div>
      </div>

      <div className="bg-slate-700 py-10 px-10 ">
        <h2 className="text-center font-medium text-sm text-slate-200 mb-5">
          Ký tên để xác nhận điểm danh
        </h2>
        {/* <p className="text-center text-red-200 mb-5">
          Lưu ý: Chữ ký xác nhận phải giống chữ ký những buổi học trước đó
          <br />
          Nếu chữ ký không giống buổi học hôm nay sẽ không được xác nhận là đã
          điểm danh
        </p> */}
        <div className="flex justify-center ">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            backgroundColor="white"
            canvasProps={{ width: 380, height: 200, className: "sigCanvas" }}
            onEnd={handleSignature}
            // className="h-[200px] phone:w-[200px] tablet:w-[900px]"
          />
        </div>
      </div>
      <Button
        className={`block mx-auto mt-10 ${loading ? "hidden" : ""}`}
        onClick={() => handleCheckins()}
      >
        Điểm danh
      </Button>
      <Modal
        open={openModalResults}
        onCancel={() => setOpenModalResults(false)}
        footer={null}
      >
        <Result
          status="success"
          title={`Điểm danh thành công ${userName} có mã sinh viên ${userCode} khoảng cách ${distance} mét`}
          extra={[
            <Button
              className="block ml-auto"
              onClick={() => setOpenModalResults(false)}
            >
              Xem lịch sử{" "}
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
}

export default Signature;

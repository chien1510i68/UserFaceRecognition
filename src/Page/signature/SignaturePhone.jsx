import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { RollbackOutlined } from "@ant-design/icons";
import { Button, Modal, Result, Spin, notification } from "antd";
import SignatureCanvas from "react-signature-canvas";
import image1 from "../../Assets/user.png";
import { faceRecognition } from "../../Component/api/face_recognition";
import { useNavigate } from "react-router";
export default function SignaturePhone({ qrId }) {
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
    } else {
      const binaryData = atob(image1.split(",")[1]);
      const uint8Array = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const dataUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
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
    }
  };

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
  // return (
  //   <>
  //     <div className="relative w-screen h-screen overflow-hidden">
  //       {/* Lớp phủ làm mờ nền ngoại trừ khung giữa */}
  //       <div className="absolute  bg-[rgb(193 193 193 / 40%)] w-full h-full bg-slate-700"></div>

  //       {/* Text hiển thị */}
  //       <div className="absolute top-10 left-8 z-40 ">
  //         <Button
  //         onClick={() => navigate("/scan")}
  //           icon={<RollbackOutlined />}
  //           className="border-spacing-1 border-[1px] border-solid border-white text-white"
  //         />
  //       </div>

  //       <div className="absolute  rounded-lg overflow-hidden z-30 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-transparent ">
  //         <SignatureCanvas
  //           ref={sigCanvas}
  //           penColor="black"
  //           backgroundColor="white"
  //           canvasProps={{ width: 350 , height: 350, className: "sigCanvas" }}
  //           onEnd={handleSignature}
  //           // className="h-[200px] phone:w-[200px] tablet:w-[900px]"
  //         />
  //       </div>

  //       <div className="absolute z-40 top-20 left-1/2 transform translate-x-[-50%] text-center">
  //         <p className="text-white text-xl font-title tracking-tighter">
  //           SIGNATURE
  //         </p>
  //         <p className="text-white text-sm font-description">
  //           Ký tên để xác nhận điểm danh
  //         </p>
  //       </div>
  // <div className="absolute bottom-10 left-1/2 transform translate-x-[-50%] h-10 z-40 w-1/2">
  //   <Button className="text-white block w-full ">Điểm danh</Button>
  // </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="relative phone:w-screen phone:h-screen tablet:w-[70vw] tablet:h-[100vh] overflow-hidden">
        {/* Lớp phủ làm mờ nền ngoại trừ khung giữa */}
        <div className="absolute inset-0 bg-slate-500  z-20"></div>

        <div className="absolute  rounded-lg overflow-hidden z-30 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-transparent ">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            backgroundColor="white"
            canvasProps={{ width: 350, height: 350, className: "sigCanvas" }}
            onEnd={handleSignature}
            // className="h-[200px] phone:w-[200px] tablet:w-[900px]"
          />
        </div>
        {/* Text hiển thị */}
        <div className="absolute top-10 left-8 z-40 ">
          <Button
            icon={<RollbackOutlined />}
            onClick={() => navigate("/scan")}
            className="border-spacing-1 border-[1px] border-solid border-white text-white"
          />
        </div>
        <div className="absolute z-40 top-20 left-1/2 transform translate-x-[-50%] text-center">
          {/* <div className="z-40"> */}
          <p className="text-white text-xl font-title tracking-tighter">
            SIGNATURE
          </p>
          <p className="text-white text-sm font-description">
            Ký tên để xác nhận điểm danh
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform translate-x-[-50%] py-4 z-40 w-1/2">
          <Button
            className="text-white block w-full "
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
              title={
                `Điểm danh thành công ${userName} có mã sinh viên ${userCode} 
          `

                // khoảng cách ${distance} mét
              }
              extra={[
                <Button
                  className="block ml-auto"
                  onClick={() => {
                    setOpenModalResults(false);
                    navigate("/history");
                  }}
                >
                  Xem lịch sử{" "}
                </Button>,
              ]}
            />
          </Modal>
          <Modal open={loading} width={400} footer={null} closeIcon={false} className="mx-auto  text-center ">
            <div className="py-10 ">
              <Spin />
              <h2 className="mt-2">Đang điểm danh...</h2>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

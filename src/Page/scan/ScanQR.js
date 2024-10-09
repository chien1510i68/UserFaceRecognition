// import { notification } from "antd";
// import React, { useState, useRef } from "react";
// import QRCodeScanner from "react-qr-scanner";
// import { useNavigate } from "react-router";

// function ScanQR() {
//   const qrRef = useRef(null);
//   const navigate = useNavigate()
//   const [selectedCamera, setSelectedCamera] = useState("front"); // Mặc định là camera trước

//   const handleError = (error) => {
//     console.error("Lỗi trong quá trình quét:", error);
//     // Xử lý lỗi phù hợp (ví dụ: hiển thị thông báo cho người dùng)
//   };
//   const handleScan = (data) => {
//     if (data != null) {
//       // notification.success({ message: data?.text });
//       const value = data?.text.split("/")
//       const queryParams = {
//         qrId: value[0],
//         isNormal: value[1]
//       };

//       navigate("/attended" ,{state : queryParams})

//     }
//     // console.log(data);
//     const handleError = (error) => {
//       console.error("Lỗi trong quá trình quét:", error);
//       // Xử lý lỗi phù hợp (ví dụ: hiển thị thông báo cho người dùng)
//     };
//     //   console.log(data?.text);
//   };

//   return (
//     <div>
//         <h2 className="text-center font-medium text-xl uppercase my-5">Thực hiện quét mã QR</h2>
//       <QRCodeScanner
//         ref={qrRef}
//         onError={handleError}
//         constraints={{
//           // audio: true,
//           video: { facingMode: "environment" },
//         }}
//         onScan={handleScan}
//         width="100%"
//         height="400px"
//       />
//     </div>
//   );
// }

// export default ScanQR;


import React, { useEffect, useRef, useState } from "react";
import "./box-scan.css";
import QrScanner from "qr-scanner";
import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const ScanQR = () => {
  const videoRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const navigate = useNavigate()

  const handleScan = (data) => {
    if (data != null) {
      // notification.success({ message: data?.text });
      const value = data.split("/")
      const queryParams = {
        qrId: value[0],
        isNormal: value[1]
      };

      navigate("/attended" ,{state : queryParams})

    }
  }

  useEffect(() => {
    const video = videoRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log("decoded qr code:", result?.data);
        handleScan(result.data)
        setScannedText(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();
    console.log("start");

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <>
      <div className="relative phone:w-screen phone:h-screen tablet:w-[70vw] tablet:h-[100vh] overflow-hidden">
        {/* Video nền */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />

        {/* Lớp phủ làm mờ nền ngoại trừ khung giữa */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-20"></div>

        {/* Khung giữa không bị làm mờ */}
        <div className="absolute w-[60vw] h-[60vw] border-2 border-white rounded-lg z-30 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-transparent box-mask"></div>

        {/* Text hiển thị */}
        <div className="absolute top-10 left-8 z-40 ">
          <Button
            icon={<RollbackOutlined />}
            onClick={() =>navigate("/home")}
            className="border-spacing-1 border-[1px] border-solid border-white text-white"
          />
        </div>
        <div className="absolute z-40 top-20 left-1/2 transform translate-x-[-50%] text-center">
          {/* <div className="z-40"> */}
          <p className="text-white text-xl font-title tracking-tighter">
            ATTENDANCE
          </p>
          <p className="text-white text-sm font-description">
            Quét mã QR để xác nhận điêm danh{" "}
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 transform translate-x-[-50%] z-40 w-1/2">
          <Button className="text-white block w-full">Nhập mã</Button>
          {/* {scanned && (
            <div className="mt-4 text-center text-white">
              <p>Nội dung mã QR: {scanned}</p>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ScanQR;


// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser"; // Import Zxing
// import { Button } from "antd";
// import { RollbackOutlined } from "@ant-design/icons";
// import "./box-scan.css";
// import { useNavigate } from "react-router";

// const ScanQR = () => {
//   const navigate = useNavigate()
//   const videoRef = useRef(null);
//   const [scanned, setScannedText] = useState("");
//   const codeReader = useRef(new BrowserMultiFormatReader()).current; // Tạo instance duy nhất của Zxing

//   useEffect(() => {
//     const video = videoRef.current;

//     // Khởi động camera và bắt đầu scan
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: { facingMode: "environment", width: 1280, height: 720 } })
//         .then((stream) => {
//           video.srcObject = stream;
//           video.play();

//           // Quét mã QR bằng Zxing
//           codeReader.decodeFromVideoDevice(
//             null,
//             video,
//             (result, error) => {
//               if (result) {
//                 console.log("decoded qr code:", result.text);
//                 setScannedText(result.text);
//               }
//               if (error && error.name !== "NotFoundException") {
//                 console.error("Error scanning QR code:", error);
//               }
//             }
//           ).catch((err) => {
//             console.error("Error decoding QR code:", err);
//           });
//         })
//         .catch((err) => {
//           console.error("Error accessing camera:", err);
//         });
//     }

//     // Cleanup khi component bị hủy
//     return () => {
//       if (video.srcObject) {
//         let tracks = video.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//       codeReader.stop();
//     };
//   }, [codeReader]);

//   return (
//     <>
//       <div className="relative w-screen h-screen overflow-hidden">
//         {/* Video nền */}
//         <video
//           ref={videoRef}
//           className="absolute top-0 left-0 w-full h-full object-cover z-10"
//         />

//         {/* Lớp phủ làm mờ nền ngoại trừ khung giữa */}
//         <div className="absolute inset-0 bg-black bg-opacity-40 z-20"></div>

//         {/* Khung giữa không bị làm mờ */}
//         <div className="absolute w-[60vw] h-[60vw] border-2 border-white rounded-lg z-30 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-transparent box-mask"></div>

//         {/* Text hiển thị */}
//         <div className="absolute top-10 left-8 z-40 ">
//           <Button
//             icon={<RollbackOutlined />}
//             onClick={() => navigate("/home")}
//             className="border-spacing-1 border-[1px] border-solid border-white text-white"
//           />
//         </div>
//         <div className="absolute z-40 top-20 left-1/2 transform translate-x-[-50%] text-center">
//           <p className="text-white text-xl font-title tracking-tighter">
//             ATTENDANCE
//           </p>
//           <p className="text-white text-sm font-description">
//             Quét mã QR để xác nhận điểm danh
//           </p>
//         </div>
//         <div className="absolute bottom-10 left-1/2 transform translate-x-[-50%] z-40 w-1/2">
//           <Button className="text-white block w-full">Nhập mã</Button>
//           {scanned && (
//             <div className="mt-4 text-center text-white">
//               <p>Nội dung mã QR: {scanned}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ScanQR;

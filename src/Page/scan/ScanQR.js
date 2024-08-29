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

// import QrScanner from "qr-scanner";
// import React, { useEffect, useRef, useState } from "react";

// function ScanQR() {
//   const videoElementRef = useRef(null);
//   const [scanned, setScannedText] = useState("");

//   useEffect(() => {
//     const video = videoElementRef.current;
//     const qrScanner = new QrScanner(
//       video,
//       (result) => {
//         console.log("decoded qr code:", result);
//         setScannedText(result.data);
//       },
//       {
//         returnDetailedScanResult: true,
//         highlightScanRegion: true,
//         highlightCodeOutline: true,
//       }
//     );
//     qrScanner.start();
//     console.log("start");

//     return () => {
//       console.log(qrScanner);
//       qrScanner.stop();
//       qrScanner.destroy();
//     };
//   }, []);
//   return (
//     <div className="w-[100vw] h-[100vh]">
//       <div className="h-full">
//         <video
//           className="object-cover h-full "
//           ref={videoElementRef}
//         />
//       </div>
//       {/* <p className="scannedText">SCANNED: {scanned}</p> */}
//     </div>
//   );
// }
// export default ScanQR;

import React, { useEffect, useRef } from "react";
import "./box-scan.css";

const ScanQR = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // Truy cập camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("Error: " + err);
        });
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />

      <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-500 bg-opacity-50 clip-box"></div>
          <div className="w-[60vw] h-[60vw] border-2 border-r-gray-600 rounded-3xl shadow-[0_0_15px_rgb(75 85 99 / var(--tw-border-opacity))] z-30"></div>
      </div>
    </div>
  );
};

export default ScanQR;

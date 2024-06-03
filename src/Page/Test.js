// import React, { useState } from "react";
// import { Button, message, Modal, notification, Spin, Steps, theme } from "antd";
// import Camera from "./Camera";
// import JSZip from "jszip";
// import { face_recognition_url } from "../Component/api/url";
// import Cookies from "js-cookie";
// import { saveAs } from "file-saver";
// function Test({handleTest}) {
//   const [images, setImages] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const userCode = Cookies.get("userCode");
//   const { token } = theme.useToken();
//   const [loading, setLoading] = useState(false);
//   const next = () => {
//     setCurrent(current + 1);
//   };
//   const prev = () => {
//     setCurrent(current - 1);
//   };
//   const handleAddImage = (blob) => {
//     setImages([...images, blob]);
//     notification.success({ message: "Lưu thành công hình ảnh" });
//     next();
//   };
//   const handleDownloadZip = async () => {
//     setLoading(true);
//     const zip = new JSZip();
//     images.forEach((blob, index) => {
//       zip.file(`image${index + 1}.jpg`, blob);
//     });

//     const content = await zip.generateAsync({ type: "blob" });
//     const formData = new FormData();
//     formData.append("input_folder", content, "images.zip");
//     formData.append("user_code", userCode);

//     try {
//       const response = await fetch(`${face_recognition_url}/detections/`, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         setLoading(false);
//         handleTest()
//         notification.success({ message: "Mô hình đã được huấn luyện thành công" });
//       } else {
//         setLoading(false);
//         notification.error({ message: "Đã xảy ra lỗi khi gửi file ZIP" });
//       }
//     } catch (error) {
//       setLoading(false);
//       notification.error({ message: `Lỗi: ${error.message}` });
//     }
//   };
//   const steps = [
//     {
//       //   title: "Ảnh 1 ",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },

//     {
//       //   title: "Ảnh 2",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 3",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 4",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 5",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 6",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 7",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 8",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 9",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       //   title: "Ảnh 10",
//       content: (
//         <Camera
//           handleAddImage={handleAddImage}
//           title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
//         />
//       ),
//     },
//     {
//       title: "Hoàn tất",
//       content: (
//         <Button onClick={handleDownloadZip}>Thực hiện huấn luyện model nhận dạng</Button>
//       ),
//     },
//   ];

//   const items = steps.map((item) => ({
//     key: item.title,
//     title: item.title,
//   }));

//   const contentStyle = {
//     lineHeight: "260px",
//     textAlign: "center",
//     color: token.colorTextTertiary,
//     backgroundColor: token.colorFillAlter,
//     borderRadius: token.borderRadiusLG,
//     border: `1px dashed ${token.colorBorder}`,
//     marginTop: 16,
//   };
//   return (
//     <>
//       <Steps current={current} items={items}  />
//       <div style={contentStyle}>{steps[current].content}</div>
//       <Modal open={loading} closeIcon={false} footer={null} maskClosable={false}>
//         <div className="my-8 text-center">
//           <Spin />
//           <h2 className="mt-4">Đang huấn luyện model nhận dạng <br/> Công việc này sẽ mất 1 khoảng thời gian. Vui lòng đợi tới khi hoàn thành</h2>
//         </div>
//       </Modal>
//     </>
//   );
// }

// export default Test;


import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { Button, Modal, Result, Spin, notification } from "antd";
import SignatureCanvas from "react-signature-canvas";
import image1 from "../Assets/user.png";
import { faceRecognition } from "../Component/api/face_recognition";
import { useNavigate } from "react-router";
function Test() {
  const [position, setPosition] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const [openModalResults, setOpenModalResults] = useState(false);
  const sigCanvas = useRef(null);
  const userName = Cookies.get("userName");
  const userCode = Cookies.get("userCode");
  const navigate = useNavigate();


  const handleSignature = () => {
    // Xử lý khi người dùng ký vào signature pad
   notification.success({message : "Nguoi dung da ki "})
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
     
    </div>
  );
}



export default Test;
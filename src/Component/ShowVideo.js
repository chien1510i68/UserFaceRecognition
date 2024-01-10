// import { Image } from "antd";
// import React, { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { faceRecognition } from "./api/face_recognition";

// function ShowVideo(props) {
//   const [image, setImage] = useState(null);
//   const webcamRef = useRef(null);
//   const capture =  () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//     faceRecognition({ image: imageSrc }).then((res) => {
//       console.log(res);
//     });
//   };
//   useEffect(() => {
//   }, [image]);
//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//       <button onClick={capture}>Capture photo</button>
//       {image && <Image src={image} />}
//     </div>
//   );
// }

// export default ShowVideo;
import { Button, Image, notification } from "antd";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { faceRecognition } from "./api/face_recognition";

function ShowVideo(props) {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    // Chuyển chuỗi base64 thành dữ liệu nhị phân
    const binaryData = atob(imageSrc.split(",")[1]);

    // Tạo một đối tượng Uint8Array từ dữ liệu nhị phân
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("image", blob, "captured_image.jpg");
    const response = await faceRecognition(formData);
    console.log(response);
    notification.success({message :"Label được phát hiện là: "+ response?.data?.predictions})
  };

  return (
    <div>
      <Webcam
        //   style={{ height: "100vh" }}
        //   width={200}
        className="block w-[80vw] h-[80vh] rounded-md mx-auto"
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />


        <Button onClick={capture}   className="block mx-auto ">
          Chụp ảnh
        </Button>
      {/* {image && <Image src={image} />} */}
    </div>
  );
}

export default ShowVideo;

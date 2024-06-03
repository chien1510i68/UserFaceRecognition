// import { Button, Image, Spin, Steps, Tabs, message, notification } from "antd";
// import React, { useEffect, useState } from "react";
// import { createImages, getImages, login, test } from "../Component/api/user";
// import GetImage from "../Component/Table/GetImage";
// import Cookies from "js-cookie";
// import JSZip from "jszip";
// import ModalEditImage from "../Component/Modal/ModalEditImage";
// import Camera from "./Camera";
// import TestFaceRecognition from "./TestFaceRecognition";

// function UpdateImage(props) {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isTest, setIsTest] = useState(false);
//   const [imageName, setImageName] = useState(null);
//   const [isOpenReplace, setOpenReplace] = useState(false);
//   const [isUpdate, setIsUpdate] = useState(false);

//   const handleGetImages = async () => {
//     const res = await getImages(Cookies.get("userCode"));
//     if (res?.data?.images != []) {
//       setLoading(false);
//       setIsUpdate(true);
//       const demo = res?.data?.images?.map((item) => {
//         return {
//           name: item?.file_name?.split("/")[1],
//           image: item?.encoded_image,
//         };
//       });
//       setImages(demo);
//     } else {
//       setImages([]);
//     }
//   };
//   const handleSetUpdate = () => {
//     setIsTest(false);
//     setIsUpdate(true);
//     handleGetImages();
//   };

//   useEffect(() => {
//     handleGetImages();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl uppercase my-5 text-center font-medium ">
//         quản lý hình ảnh
//       </h2>
//       {/* <Button onClick={() => handleGetImages()}>Click me</Button> */}
//       {loading && (
//         <div className="text-center">
//           <Spin />
//         </div>
//       )}
//       {isUpdate && (
//         <>
//           <div className="grid grid-cols-5 gap-3">
//             {images &&
//               images.map((image) => (
//                 <div className="col-span-1">
//                   <Image
//                     src={`data:image/jpeg;base64,${image?.image}`}
//                     alt=""
//                   />
//                   <div className="flex justify-around items-center">
//                     <h2 className="text-center phone:hidden">{image.name}</h2>
//                     <Button
//                       onClick={() => {
//                         setImageName(image.name);
//                         setOpenReplace(true);
//                       }}
//                     >
//                       Thay ảnh
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//           <div>
//             {images?.length == 0 && (
//               <div>
//                 <Camera
//                   handleTest={() => {
//                     setIsTest(true);
//                     setIsUpdate(false);
//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         </>
//       )}
//       {isTest && (
//         <>
//           <TestFaceRecognition
//             handleCancel={handleSetUpdate}
//           />
//         </>
//       )}

//       <ModalEditImage
//         isOpen={isOpenReplace}
//         imageName={imageName}
//         handleGetImages={handleGetImages}
//         onCancel={() => setOpenReplace(false)}
//       />
//     </div>
//   );
// }

// export default UpdateImage;

// ------------------- demo ----------------
import { Button, Image, Modal, Spin } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import ModalEditImage from "../Component/Modal/ModalEditImage";
import { getImages } from "../Component/api/user";
import TestFaceRecognition from "./TestFaceRecognition";
import GetImagesToTrain from "./GetImagesToTrain";

function UpdateImage(props) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTest, setIsTest] = useState(false);
  const [imageName, setImageName] = useState(null);
  const [isOpenReplace, setOpenReplace] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleGetImages = async () => {
    setLoading(true)
    const res = await getImages(Cookies.get("userCode"));
    if (res?.data?.images != []) {
      setLoading(false);
      setIsUpdate(true);
      const demo = res?.data?.images?.map((item) => {
        return {
          name: item?.file_name?.split("/")[1],
          image: item?.encoded_image,
        };
      });
      setImages(demo);
    } else {
      setImages([]);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  return (
    <div>
      <h2 className="text-xl uppercase my-5 text-center font-medium ">
        quản lý hình ảnh
      </h2>
      {/* <Button onClick={() => handleGetImages()}>Click me</Button> */}

      {isUpdate && (
        <>
          <div className="grid grid-cols-5 gap-3">
            {images &&
              images.map((image) => (
                <div className="col-span-1">
                  <Image
                    src={`data:image/jpeg;base64,${image?.image}`}
                    alt=""
                  />
                  {/* <div className="flex justify-around items-center">
                    <h2 className="text-center phone:hidden">{image.name}</h2>
                    <Button
                      onClick={() => {
                        setImageName(image.name);
                        setOpenReplace(true);
                      }}
                    >
                      Thay ảnh
                    </Button>
                  </div> */}
                </div>
              ))}
          </div>
          <div>
           
          </div>
        </>
      )}
      {images?.length == 0 && !isTest && (
        <div>
          <div>
            <GetImagesToTrain handleTest = {() => setIsTest(true)}/>
          </div>
        </div>
      )}

      {isTest && (
        <>
          <TestFaceRecognition
          // handleCancel={}
          />
        </>
      )}
      {/* <ModalEditImage
        isOpen={isOpenReplace}
        imageName={imageName}
        handleGetImages={handleGetImages}
        onCancel={() => setOpenReplace(false)}
      /> */}
      <Modal open={loading} closeIcon={false} footer={null} >
      <div className={`${loading ? "" : "hidden"} text-center `}>
      
      
          <Spin />
          <h2 className="mt-2">Kiểm tra dữ liệu ......</h2>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateImage;

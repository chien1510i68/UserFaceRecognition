import {
  Button,
  Card,
  Modal,
  Spin,
  notification,
  theme
} from "antd";
import Cookies from "js-cookie";
import JSZip from "jszip";
import React, { useState } from "react";
import { face_recognition_url } from "../Component/api/url";
import Camera from "./Camera";

function GetImagesToTrain({ handleTest }) {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const userCode = Cookies.get("userCode");
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const handleNextClick = () => {
    setCurrentContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
  };

  const handleAddImage = (blob) => {
    console.log(" Blob in Test" + blob);
    setImages((prevImages) => [...prevImages, blob]);
    // notification.success({ message: "Lưu thành công hình ảnh" });
    handleNextClick();
  };
  const handleDownloadZip = async () => {
    setLoading(true);
    const zip = new JSZip();
    images.forEach((blob, index) => {
      zip.file(`image${index + 1}.jpg`, blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    // saveAs(content, "example.zip");

    const formData = new FormData();
    formData.append("input_folder", content, "images.zip");
    formData.append("user_code", userCode);

    try {
      const response = await fetch(`${face_recognition_url}/detections/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setLoading(false);
        handleTest();
        notification.success({
          message: "Mô hình đã được huấn luyện thành công",
        });
      } else {
        setLoading(false);
        notification.error({ message: "Đã xảy ra lỗi khi gửi file ZIP" });
      }
    } catch (error) {
      setLoading(false);
      notification.error({ message: `Lỗi: ${error.message}` });
    }
  };

  const contents = [
    <Camera
      handleAddImage={handleAddImage}
      title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt sang trái một góc 30 độ"}
    />,
    <Camera
      handleAddImage={handleAddImage}
      title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt sang phải một góc 30 độ"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt lên trên 1 góc 30 độ"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt xuống dưới 1 góc 30 độ"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Chụp chính diện khuôn mặt để điện thoại cách mặt chừng 50cm"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt lên trên 1 góc 30 độ"}
    />,
    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt lên trên 1 góc 30 độ"}
    />,

    <Camera
      handleAddImage={handleAddImage}
      title={"Quay mặt xuống dưới 1 góc 30 độ"}
    />,

    <Button className="block mx-auto" onClick={handleDownloadZip}>
      Thực hiện huấn luyện model nhận dạng
    </Button>,
  ];
  return (
    <div className="w-full">
      <Card
        title={
          <h2
            className={`text-center ${
              currentContentIndex == 10 ? "hidden" : ""
            } phone:mx-4 tablet:mx-0`}
          >
            Ảnh {currentContentIndex + 1}
          </h2>
        }
        bordered={false}
      >
        {contents[currentContentIndex]}
      </Card>
      <Modal
        open={loading}
        closeIcon={false}
        footer={null}
        maskClosable={false}
      >
        <div className="my-8 text-center">
          <Spin />
          <h2 className="mt-4">
            Đang huấn luyện model nhận dạng <br /> Công việc này sẽ mất 1 khoảng
            thời gian. Vui lòng đợi tới khi hoàn thành
          </h2>
        </div>
      </Modal>
    </div>
  );
}

export default GetImagesToTrain;

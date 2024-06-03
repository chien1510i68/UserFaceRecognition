import ShowVideo from "../Component/ShowVideo";

import { useLocation } from "react-router";

import { notification } from "antd";
import Signature from "./Signature";

function FaceRecognition(props) {
  const location = useLocation();

  const queryParams = location.state;
  const { qrId, isNormal } = queryParams;

  return (
    <div className="relative">
      {isNormal === "true" ? (
        <Signature qrId={qrId} />
      ) : isNormal === "false" ? (
        <div className=" pt-10 ">
          <ShowVideo qrId={qrId} />
        </div>
      ) : (
        notification.error({ message: "QR không hợp lệ" })
      )}
    
    </div>
  );
}

export default FaceRecognition;

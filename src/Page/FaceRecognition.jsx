import ShowVideo from "./attendance/ShowVideo";

import { useLocation } from "react-router";

import { notification } from "antd";
import Signature from "./signature/Signature";
import SignaturePhone from "./signature/SignaturePhone";
import AttendancePhoneFace from "./attendance/AttendancePhoneFace";

function FaceRecognition(props) {
  const location = useLocation();

  const queryParams = location.state;
  const { qrId, isNormal } = queryParams;

  return (
    <div className="relative">
      {isNormal === "true" ? (
        <>
          <div className="phone:hidden tablet:block">
            <Signature qrId={qrId} />
          </div>
          <div className="phone:block tablet:hidden">
            <SignaturePhone qrId={qrId} />
          </div>
        </>
      ) : isNormal === "false" ? (
        <div className="  ">
          <div className="phone:hidden tablet:block">
            <ShowVideo qrId={qrId} />
          </div>
          <div className="tablet:hidden phone:block">
            <AttendancePhoneFace/>
          </div>
        </div>
      ) : (
        notification.error({ message: "QR không hợp lệ" })
      )}
    </div>
  );
}

export default FaceRecognition;

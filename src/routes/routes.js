import DefaultLayout from "../Component/Layout/DefaultLayout";
import DefaultLayoutPhone from "../Component/Layout/DefaultLayoutPhone";
import ShowVideo from "../Page/attendance/ShowVideo";
import AttendedHistory from "../Page//history/AttendedHistory";
import Camera from "../Page/Camera";
import FaceRecognition from "../Page/FaceRecognition";
import HomePage from "../Page/home/HomePage";
import Login from "../Page/login/Login";
import ScanQR from "../Page/scan/ScanQR";
import Signature from "../Page/signature/Signature";
import SignaturePhone from "../Page/signature/SignaturePhone";
import Test from "../Page/Test";
import UpdateImage from "../Page/UpdateImage";
import EditProfile from "../Page/user/EditProfile";
import ResetPassword from "../Page/user/ResetPassword";
import UserDetail from "../Page/user/UserDetail";

const { createBrowserRouter } = require("react-router-dom");

export const routerPage = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    element: <DefaultLayout />,
    path: "",
    children: [
      {
        path: "/scan",
        element: <ScanQR />,
      },
     
      {
        path: "test",
        element: <Test />,
      },

      {
        path: "history",
        element: <AttendedHistory />,
      },
      {
        path: "update",
        element: <UpdateImage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
     
      
    ],
  },
  {
    path: "user-detail",
    element: <UserDetail />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "edit-profile",
    element: <EditProfile />,
  },
  {
    path: "/attended",
    element: <FaceRecognition />,
  },
  
  
]);

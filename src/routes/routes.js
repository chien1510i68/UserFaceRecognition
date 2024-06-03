import DefaultLayout from "../Component/Layout/DefaultLayout";
import ShowVideo from "../Component/ShowVideo";
import AttendedHistory from "../Page/AttendedHistory";
import Camera from "../Page/Camera";
import FaceRecognition from "../Page/FaceRecognition";
import Login from "../Page/Login";
import ScanQR from "../Page/ScanQR";
import Test from "../Page/Test";
import TestFaceRecognition from "../Page/TestFaceRecognition";
import UpdateImage from "../Page/UpdateImage";

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
        path: "/attended",
        element: <FaceRecognition />,
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
      // {
      //   path: "training",
      //   element: <StepsCreateVideo />,
      // },
    ],
  },
]);

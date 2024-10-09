import React, { useEffect, useState } from "react";
import { Collapse, ConfigProvider } from "antd";
import { historyAttendance } from "../../Component/api/user";
import { getHistoryAttended } from "../../Component/api/classroom";
import Cookies from "js-cookie";
import { theme } from "antd";
import HistoryLabel from "./HistoryLabel";
import HistoryContent from "./HistoryContent";
export default function HistoryItem() {
  const text = "this is the text";
  const [activeKey, setActiveKey] = useState("");
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 8,
    marginTop: 8,
    background: "#e6e7e7",
    borderRadius: token.borderRadiusLG,
    marginLeft: 16,
    marginRight: 16,

    border: "none",
  };
  const handleChangeKey = (key) => {
    setActiveKey(key);
  };
  const handleGetData = async () => {
    const userCode = Cookies.get("userCode");
    const res = await getHistoryAttended({ userCode: userCode });
    console.log("data api is: ", res);
    if (res != null) {
      setItems(
        res?.map((item, index) => ({
          showArrow: false,
          key: index,
          label: (
            <HistoryLabel
              classCode={item?.classCode}
              nameClass={item?.nameClass}
              studyGroup={item?.studyGroup}
            />
          ),
          children: <HistoryContent attendances={item?.checkinUserDTOS} />,
          style: panelStyle,
        }))
      );
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <div className="">
      <p className="text-colorPrimary text-2xl  text-center my-4 font-title tracking-tighter">
        Attendance History
      </p>
      <div className=" pt-5">
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerPadding: "10px 0px",
                contentPadding: "10px",

                // marginSM: "20px",
              },
            },
          }}
        >
          <Collapse
            accordion
            items={items}
            onChange={handleChangeKey}
            style={{
              background: token.colorBgContainer,
            }}
            bordered={false}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}

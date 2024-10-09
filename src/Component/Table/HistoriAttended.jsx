import React, { useEffect, useState } from "react";
import { Button, Divider, Space, Tooltip } from "antd";
import { getHistoryAttended } from "../api/classroom";
import { CheckOutlined } from "@ant-design/icons";

function HistoriAttended({ data }) {


  return (
    <>
      <Space wrap>
        {data &&
          data.map((item) => (
            <Tooltip
              title={
                <>
                  <p>Buổi học ngày {item?.timeCreateQr}</p>
                  {item?.attended && <p>Điểm danh lúc {item?.timeAttended}</p>}
                </>
              }
              color={item?.attended ? "#87d068" : "#d53939"}
              key={item?.timeCreateQr}
            >
              <div>
                <CheckOutlined
                  className={`p-1 rounded-xl  border ${
                    item?.attended ? "bg-lime-400" : "bg-red-300"
                  } text-gray-800`}
                />
              </div>
            </Tooltip>
          ))}
      </Space>
    </>
  );
}
export default HistoriAttended;

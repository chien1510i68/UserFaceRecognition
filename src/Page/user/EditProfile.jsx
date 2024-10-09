import {
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  RollbackOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Image, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import user_edit from "../../Assets/student.png";
import { getUserDetail, updateUser } from "../../Component/api/user";
import Cookies from "js-cookie";

export default function EditProfile() {
  const [infor, setInfor] = useState(null);
  const userCode = Cookies.get("userCode");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);

  const handleGetData = async () => {
    const res = await getUserDetail(userCode);
    if (res?.data?.success) {
      const userData = res?.data?.data;
      setInfor(userData);
      console.log(userData);
    }
  };
  const handleSubmit = async (values) => {
    const data = { ...values, dob: dob, userCode: userCode };
    console.log(data);
    const res = await updateUser(data);
    if (res?.data?.success) {
      navigate("/user-detail");
      notification.success({ message: "Đã cập nhật thành công" });
    } else {
      notification.error({ message: "Có lỗi khi cập nhật" });
    }
    // console.log(res);
  };

  const onChange = (date, dateString) => {
    const [y, m, d] = dateString.split("-");
    const formatDate = `${d}-${m}-${y}`;
    setDob(formatDate);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    if (infor) {
      form.setFieldsValue(infor);
    }
  }, [infor, form]);

  return (
    <div className="relative">
      <div className="grid grid-cols-3 items-end">
        <div className="col-span-1 ml-4 block">
          <button
            onClick={() => navigate("/user-detail")}
            className="border-spacing-1 border-[1px] border-solid rounded-md border-blue-300 w-11 h-11 block my-auto text-colorPrimary"
          >
            <RollbackOutlined />
          </button>
        </div>
        <h2 className="text-center text-2xl font-title my-4 col-span-1 text-colorPrimary">
          Edit Profile
        </h2>
        <div className="col-span-1"></div>
      </div>
      <div className="">
        <div className="w-[100px] h-[100px] p-5 bg-[#f3f3f3] rounded-full mx-auto mt-5">
          <Image src={user_edit} />
        </div>
        <h2 className="font-description text-base font-medium text-center my-4">
          Chỉnh sửa thông tin người dùng
        </h2>
      </div>

      <Form
        form={form}
        name="dependencies"
        autoComplete="off"
        className="mx-4 mt-10"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item label="Date of birth" className="w-full ">
          <DatePicker
            onChange={onChange}
            className="w-full py-3"
            placeholder={infor?.dob}
          />
        </Form.Item>
        <Form.Item label="Classname" name="classname">
          <Input prefix={<UsergroupAddOutlined className="pr-3 py-3" />} />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              required: false,
              message: "Please enter your phone number!",
            },
            {
              pattern: /^[0-9]{10,11}$/, // Regex để ràng buộc chỉ nhập 10 chữ số
              message: "Phone number must be exactly 10 digits!",
            },
          ]}
        >
          <Input className="pl-3" prefix={<PhoneOutlined className="pr-3 py-3" />} />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input prefix={<EnvironmentOutlined className="pr-3 py-3" />} />
        </Form.Item>

        <Form.Item className=" py-2">
          <Button
            htmlType="submit"
            className=" w-full bg-colorPrimary text-white mx-auto h-14 "
          >
            Submit
          </Button>
        </Form.Item>
        <p
          className="text-right text-colorPrimary font-description font-medium"
          onClick={() => navigate("/home")}
        >
          Back to homepage
        </p>
      </Form>
    </div>
  );
}

import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../Assets/logo.svg";
import { login } from "../../Component/api/user";
import Cookies from "js-cookie";

function LoginPhone() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    const res = await login({
      userCode: values.userCode,
      password: values.password,
    });
    if (res?.data?.success) {
      setLoading(false);
      Cookies.set("jwt", res?.data?.data?.jwt);
      Cookies.set("userCode", res?.data?.data?.userCode);
      Cookies.set("userName", res?.data?.data?.userName);
      navigate("/home");
    } else {
      setLoading(false);
      notification.error({
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
    console.log(res);
  };

  return (
    <>
      <div className="relative w-[100vw] h-[100vh]">
        <div className="flex justify-center items-center bg-colorPrimary py-4">
          <img src={logo} alt="Logo" />
          <h2 className="text-center font-logo text-3xl ml-2 text-[#FFFFFF]">
            Attendance
          </h2>
        </div>

        <div className="absolute left-0 right-0  bottom-[60%] translate-y-1/2">
          <h2 className="font-title font-normal my-10 text-colorPrimary text-center text-2xl">
            SIGN IN
          </h2>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            className="mx-6"
            onFinish={onFinish}
          >
            <Form.Item
              name="userCode"
              rules={[
                {
                  required: true,
                  message: "Please input your userCode!",
                },
              ]}
            >
              <Input
                placeholder="Mã sinh viên"
                className="h-10 border-10"
                prefix={<UserOutlined className="text-xl mr-2" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                className="h-10"
                placeholder="Mật khẩu"
                prefix={<KeyOutlined className="text-xl mr-2" />}
              />
            </Form.Item>

            <Form.Item className="">
              <Button
                loading={loading}
                className="w-full border-solid border-2 border-colorPrimary  h-10 inline-flex justify-center items-center "
                htmlType="submit"
                // onClick={() => navigate("/attended/show-video")}
              >
                <p className="text-description font-medium"> ĐĂNG NHẬP</p>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginPhone;

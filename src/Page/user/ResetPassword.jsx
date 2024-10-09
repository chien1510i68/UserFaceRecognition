import { LockOutlined, RollbackOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleResetPassword = (values) => {
    console.log(values);
  };
  return (
    <div className="">
      <div className="grid grid-cols-3 items-end ">
      <div className="col-span-1 ml-4 block">
          <button
            onClick={() => navigate("/user-detail")}
            className="border-spacing-1 border-[1px] border-solid rounded-md border-blue-300 w-11 h-11 block my-auto text-colorPrimary"
          >
            <RollbackOutlined />
          </button>
        </div>
        <h2 className=" col-span-2 text-left font-description text-lg font-medium text-colorPrimary mt-10">
          Reset your password
        </h2>
        {/* <div className="col-span-1"></div> */}
      </div>
      <Form
        form={form}
        name="dependencies"
        autoComplete="off"
        className="mx-4 mt-[20vh]"
        onFinish={handleResetPassword}
        //   style={{
        //     maxWidth: 600,
        //   }}
        layout="vertical"
      >
        <Form.Item
          label="Old Password"
          name="old_password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password className="py-3" prefix={<LockOutlined />} />
        </Form.Item>
        {/* <Alert message=" Try modify `Password2` and then modify `Password`" type="info" showIcon /> */}

        <Form.Item
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password className="py-3" prefix={<LockOutlined />} />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="py-3" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item className="py-2">
          <Button
            htmlType="submit"
            className="block w-full bg-colorPrimary text-white h-14  mx-auto"
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

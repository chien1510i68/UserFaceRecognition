import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router";

export default function DefaultLayoutPhone() {
  return (
    <div className="phone:block tablet:hidden">
      <Layout>
        <Outlet />
        <Footer>
          <h2>this is the footer</h2>
        </Footer>
      </Layout>
    </div>
  );
}

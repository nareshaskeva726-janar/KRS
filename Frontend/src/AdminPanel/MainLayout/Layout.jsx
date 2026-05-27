import React, { useState } from "react";
import { Layout as AntLayout, Grid } from "antd";
import { Outlet } from "react-router-dom";

import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

const { Content } = AntLayout;
const { useBreakpoint } = Grid;

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const screens = useBreakpoint();

  return (
    <AntLayout style={{ height: "100vh", overflow: "hidden" }}>

      {/* ================= SIDEBAR (DESKTOP ONLY) ================= */}
      {screens.md && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: collapsed ? 80 : 250,
            zIndex: 100,
            transition: "0.2s",
          }}
        >
          <SideBar
            collapsed={collapsed}
            mobile={false}
          />
        </div>
      )}

      {/* ================= MAIN ================= */}
      <AntLayout
        style={{
          marginLeft: screens.md ? (collapsed ? 80 : 250) : 0,
          transition: "0.2s",
          height: "100vh",
        }}
      >

        {/* NAVBAR */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: screens.md ? (collapsed ? 80 : 250) : 0,
            height: 64,
            zIndex: 99,
          }}
        >
          <NavBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        </div>

        {/* CONTENT */}
        <Content
          style={{
            marginTop: 64,
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            padding: 20,
            background: "#f5f5f5",
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>

      {/* ================= MOBILE DRAWER ================= */}
      <SideBar
        collapsed={false}
        mobile={true}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

    </AntLayout>
  );
};

export default Layout;
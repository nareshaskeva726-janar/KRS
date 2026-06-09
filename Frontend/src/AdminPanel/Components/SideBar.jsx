import React from "react";
import { Layout, Menu, Drawer, Grid, Button, Tooltip } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useLogoutMutation } from "../../Store/APIS/krsApi";
import toast from "react-hot-toast";
const { Sider } = Layout;
const { useBreakpoint } = Grid;

const SideBar = ({
  collapsed,
  mobile = false,
  open = false,
  onClose,
  onNavigate,
}) => {

  const [logoutUser, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();



  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error(error?.data?.message || "Logout failed");
    }
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/products",
      icon: <AppstoreOutlined />,
      label: "Products",
    },
    {
      key: "/admin/products-history",
      icon: <HistoryOutlined />,
      label: "Products History",
    },
    {
      key: "/admin/notifications",
      icon: <NotificationOutlined />,
      label: "Notifications",
    }
  ];

  const handleClick = ({ key }) => {
    navigate(key);

    if (mobile && onClose) onClose();
    if (onNavigate) onNavigate();
  };

  const menu = (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={handleClick}
      items={menuItems}
      theme="dark"
      style={{
        background: "transparent",
        borderRight: "none",
        height: "80vh"
      }}
      className="custom-menu"
    />
  );

  const LogoutButton = () => (
    <div className="mt-auto p-4 border-t border-[#1f1f1f]">
      <Button
        type="primary"
        danger
        block
        onClick={handleLogout}
        className="!bg-[#c90202] hover:!bg-red-700 font-semibold"
      >
        {!collapsed ? <><LogoutOutlined /> <span className="font-semibold">Logout</span> </> : <Tooltip title="logout" placement="right"><LogoutOutlined /></Tooltip>}
      </Button>
    </div>
  );

  /* ================= MOBILE ================= */
  if (mobile) {
    return (
      <Drawer
        open={open}
        onClose={onClose}
        placement="left"
        width={250}
        closable={false}
        title={null}
        headerStyle={{ display: "none" }}
        bodyStyle={{
          padding: 0,
          background: "#000",
          height: "100%",
        }}
      >
        <div className="flex flex-col h-full">
          {/* LOGO */}
          <div className="h-20 flex items-center border-b border-[#1f1f1f] px-4">
            <div className="flex items-center gap-3">
              <img
                src={assets.logoTwo}
                alt="KRS"
                className="h-12 w-12 object-contain"
              />
              <div className="leading-tight">
                <h1 className="text-white font-bold tracking-widest text-sm">
                  KRS<span className="text-[#c90202]"> LIFELINE</span>
                </h1>
                <p className="text-[10px] text-gray-400 tracking-[3px]">
                  ECOMMERCE
                </p>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="flex-1">{menu}</div>

          {/* LOGOUT */}
          <LogoutButton />
        </div>
      </Drawer>
    );
  }

  /* ================= DESKTOP ================= */
  if (!screens.md) return null;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={250}
      collapsedWidth={80}
      style={{
        minHeight: "100vh",
        background: "#040a17",
        borderRight: "1px solid #1f1f1f",
      }}
    >
      <div className="flex flex-col h-full">
        {/* LOGO */}
        <div
          className={`h-20 flex items-center border-b border-[#1f1f1f] ${collapsed ? "justify-center" : "px-4"
            }`}
        >
          {!collapsed ? (
            <div className="mx-auto">
              <img
                src={assets.newKrs}
                alt="KRS"
                className="w-35 object-contain"
              />
            </div>
          ) : (
            <div className="w-11 h-11 flex items-center justify-center">
              <img
                src={assets.logo}
                alt=""
                className="rounded-lg w-10 h-10"
              />
            </div>
          )}
        </div>

        {/* MENU */}
        <div className="flex-1">{menu}</div>

        {/* LOGOUT */}
        <LogoutButton />
      </div>
    </Sider>
  );
};

export default SideBar;
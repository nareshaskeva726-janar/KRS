import React, { useState } from "react";
import {
  Layout,
  Button,
  Space,
  Grid,
  Tooltip,
  Popover,
  Badge,
  Typography,
  Divider,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  TruckOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery, useLogoutMutation } from "../../Store/APIS/krsApi";
import { toast } from "react-hot-toast"
const { Header } = Layout;
const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

// E‑commerce mock notifications with red‑accented types
const mockNotifications = [
  { id: 1, title: "New order #1001", description: "Paid – $124.99 • Ready to ship", time: "2 min ago", type: "order", read: false },
  { id: 2, title: "Payment received", description: "+$89.00 from Order #998", time: "15 min ago", type: "payment", read: false },
  { id: 3, title: "Low stock alert", description: "Product “Wireless Headphones” (SKU: WH-01) – only 3 left", time: "1 hour ago", type: "alert", read: true },
  { id: 4, title: "Shipping updated", description: "Order #995 – Out for delivery", time: "3 hours ago", type: "shipping", read: true },
  { id: 5, title: "Review received", description: "⭐ 5 stars on “Smart Watch” – new rating", time: "yesterday", type: "review", read: false },
];

// Red‑themed icons & colors
const getIcon = (type) => {
  switch (type) {
    case "order": return <ShoppingCartOutlined style={{ color: "#cf1322", fontSize: 18 }} />;
    case "payment": return <DollarOutlined style={{ color: "#cf1322", fontSize: 18 }} />;
    case "shipping": return <TruckOutlined style={{ color: "#cf1322", fontSize: 18 }} />;
    case "alert": return <WarningOutlined style={{ color: "#fa541c", fontSize: 18 }} />;
    case "review": return <CheckCircleOutlined style={{ color: "#cf1322", fontSize: 18 }} />;
    default: return <BellOutlined style={{ color: "#cf1322", fontSize: 18 }} />;
  }
};

const NotificationCard = ({ notification }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 16px",
        margin: "4px 0",
        borderRadius: 10,
        backgroundColor: notification.read ? "#fff" : "#fff2f0",
        borderLeft: notification.read ? "none" : "3px solid #cf1322",
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      className="notification-item"
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff1f0"}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notification.read ? "#fff" : "#fff2f0"}
    >
      <div style={{ marginTop: 2 }}>{getIcon(notification.type)}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <Text strong={!notification.read} style={{ fontSize: 14 }}>
            {notification.title}
          </Text>
          <Text type="secondary" style={{ fontSize: 11 }}>{notification.time}</Text>
        </div>
        <Text type="secondary" style={{ fontSize: 12, display: "block" }}>
          {notification.description}
        </Text>
      </div>
      {!notification.read && (
        <Badge status="processing" style={{ backgroundColor: "#cf1322", marginTop: 4 }} />
      )}
    </div>
  );
};

const NotificationContent = ({ onClose }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleViewAll = () => {
    onClose?.();
    navigate("/admin/notifications");
  };


  return (
    <div style={{ width: 380, maxHeight: 480, display: "flex", flexDirection: "column" }}>
      {/* Header with red accent */}
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ffccc7", padding: "20px" }}>
        <Title level={5} style={{ margin: 0, color: "#a8071a" }}>Notifications</Title>
        {unreadCount > 0 && (
          <Button type="link" size="small" icon={<ClearOutlined />} onClick={markAllAsRead} style={{ color: "#cf1322" }}>
            Clear all
          </Button>
        )}
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: "center", padding: 32 }}>
            <BellOutlined style={{ fontSize: 32, color: "#ffccc7", marginBottom: 8 }} />
            <div>No notifications</div>
          </div>
        ) : (
          notifications.map(notif => (
            <NotificationCard key={notif.id} notification={notif} />
          ))
        )}
      </div>

      {/* Footer with "View all" button that navigates */}
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: "10px 16px", textAlign: "center" }}>
        <Button type="link" size="small" onClick={handleViewAll} style={{ color: "#cf1322", fontWeight: 700, fontFamily: "outfit" }}>
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

const NavBar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {




  const [logoutUser, { isLoading }] = useLogoutMutation();


  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();

      // 👤 REMOVE USER FROM LOCALSTORAGE
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error(error?.data?.message || "Logout failed");
    }
  };


  const screens = useBreakpoint();
  const navigate = useNavigate();
  const { data } = useGetMeQuery();
  const userRole = data?.user?.role;
  const [notificationOpen, setNotificationOpen] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        padding: "0 16px",
        borderBottom: "1px solid lightgray",
      }}
    >
      {/* Left - Sidebar toggle */}
      <Space>
        {screens.md && (
          <Button
            type="text"
            icon={
              <span style={{ fontSize: 20, }}>
                {collapsed ? <MenuUnfoldOutlined style={{ color: "#C6181E" }} /> : <MenuFoldOutlined style={{ color: "#C6181E" }} />}
              </span>
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{ width: 42, height: 42 }}
          />
        )}

        {!screens.md && (
          <Button
            type="text"
            icon={<span style={{ fontSize: 18, color: "#C6181E" }}><MenuOutlined /></span>}
            onClick={() => setMobileOpen(true)}
            style={{ width: 42, height: 42 }}
          />
        )}
      </Space>

      {/* Right - Notifications, User Role, Logout Icon */}
      <Space size={14}>
        <Popover
          content={
            <NotificationContent
              onClose={() => setNotificationOpen(false)}
            />}
          title={null}
          trigger="click"
          open={notificationOpen}
          onOpenChange={setNotificationOpen}
          placement="bottomRight"
          overlayStyle={{ width: 400, padding: 0 }}
          overlayInnerStyle={{ padding: 0 }}
        >
          <Tooltip title="Notifications">
            <div className="relative cursor-pointer flex items-center justify-center w-10 h-10">
              <BellOutlined
                style={{
                  fontSize: 22,
                  color: "#000",
                }}
              />
              {unreadCount > 0 && (
                <span
                  className="absolute top-[1px] right-[3px] min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center leading-none shadow-sm"
                >
                  {unreadCount}
                </span>
              )}
            </div>
          </Tooltip>
        </Popover>

        <Button
          type="text"
          icon={<UserOutlined />}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff1f1",
            border: "1px solid #ffd6d6",
            borderRadius: 999,
            padding: "4px 12px",
            height: 34,
            color: "#c90202",
            fontWeight: 600,
            fontFamily: "'Outfit', sans-serif",
            maxWidth: screens.xs ? 140 : 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {userRole}
        </Button>

        <Tooltip title="Logout">
          <Button
            danger
            onClick={handleLogout}
            type="text"
            icon={<LogoutOutlined style={{ fontSize: 20 }} />}
            style={{ border: "none", outline: "none" }}
          />
        </Tooltip>
      </Space>
    </Header>
  );
};

export default NavBar;
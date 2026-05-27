import React, { useState, useMemo } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Image,
  Grid,
  Input,
  Select,
  DatePicker,
  Tooltip,
  Avatar,
  Popconfirm,
  message,
  Modal,
} from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  DownloadOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  EditFilled,
  CloseCircleFilled,
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  TagOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Option } = Select;

const PRIMARY = "#c90202";
const FONT = "'Outfit', sans-serif";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ACTION_CONFIG = {
  Created: { color: "#00875a", bg: "#e6f6f0", icon: <CheckCircleFilled />, tagColor: "success" },
  Updated: { color: "#0065bd", bg: "#e6f0fb", icon: <EditFilled />,        tagColor: "processing" },
  Deleted: { color: "#c90202", bg: "#fff1f0", icon: <CloseCircleFilled />, tagColor: "error" },
};

const STATUS_CONFIG = {
  Success: { color: "#00875a", bg: "#e6f6f0", tagColor: "success" },
  Updated: { color: "#fa8c16", bg: "#fff7e6", tagColor: "warning" },
  Removed: { color: "#c90202", bg: "#fff1f0", tagColor: "error" },
};

const USER_COLORS = {
  Admin:   "#c90202",
  Manager: "#0065bd",
  Staff:   "#7c3aed",
};

const initialData = [
  {
    key: "1",
    product: "Nike Air Max",
    action: "Created",
    user: "Admin",
    date: "2026-05-20",
    status: "Success",
    image: "https://images.unsplash.com/photo-1606813909359-8a09a0d2a3c3?w=80&q=70",
    note: "New product listed with 24 units in stock.",
  },
  {
    key: "2",
    product: "Apple Watch Series 9",
    action: "Updated",
    user: "Manager",
    date: "2026-05-21",
    status: "Updated",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=80&q=70",
    note: "Price updated from ₹42,000 to ₹38,999.",
  },
  {
    key: "3",
    product: "Samsung Galaxy S24",
    action: "Deleted",
    user: "Admin",
    date: "2026-05-22",
    status: "Removed",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&q=70",
    note: "Product discontinued. Removed from catalogue.",
  },
  {
    key: "4",
    product: "Leather Jacket",
    action: "Created",
    user: "Staff",
    date: "2026-05-23",
    status: "Success",
    image: "https://images.unsplash.com/photo-1520975922284-9f59a3a3f8f7?w=80&q=70",
    note: "Seasonal item added ahead of winter collection.",
  },
  {
    key: "5",
    product: "Sony WH-1000XM5",
    action: "Updated",
    user: "Manager",
    date: "2026-05-24",
    status: "Updated",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=70",
    note: "Stock qty adjusted: 10 → 45 units.",
  },
  {
    key: "6",
    product: "Running Shoes Pro",
    action: "Created",
    user: "Staff",
    date: "2026-05-25",
    status: "Success",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=70",
    note: "New arrival added with 3 colour variants.",
  },
];

// ─── View Detail Modal ────────────────────────────────────────────────────────
const DetailModal = ({ record, open, onClose }) => {
  if (!record) return null;
  const ac = ACTION_CONFIG[record.action] || {};
  const sc = STATUS_CONFIG[record.status] || {};
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={480}
      style={{ top: 60 }}
      styles={{ body: { padding: 0 } }}
    >
      {/* Top banner */}
      <div
        style={{
          background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`,
          padding: "28px 28px 20px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Image
            src={record.image}
            width={64}
            height={64}
            style={{ borderRadius: 12, objectFit: "cover", border: "2px solid rgba(255,255,255,0.15)" }}
            fallback="https://via.placeholder.com/64"
            preview={false}
          />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 17, fontFamily: FONT }}>
              {record.product}
            </div>
            <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
              <Tag
                style={{
                  background: ac.bg, color: ac.color,
                  border: "none", borderRadius: 6,
                  fontFamily: FONT, fontWeight: 600, fontSize: 12,
                }}
              >
                {ac.icon} {record.action}
              </Tag>
              <Tag
                style={{
                  background: sc.bg, color: sc.color,
                  border: "none", borderRadius: 6,
                  fontFamily: FONT, fontWeight: 600, fontSize: 12,
                }}
              >
                {record.status}
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Detail rows */}
      <div style={{ padding: "20px 28px 28px" }}>
        {[
          { icon: <UserOutlined />, label: "Performed by", value: record.user },
          { icon: <CalendarOutlined />, label: "Date", value: record.date },
          { icon: <TagOutlined />, label: "Action", value: record.action },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 0", borderBottom: "1px solid #f5f5f5",
            }}
          >
            <div
              style={{
                width: 34, height: 34, borderRadius: 8,
                background: "#f5f5f5", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#888", fontSize: 15, flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#aaa", fontFamily: FONT, fontWeight: 500 }}>
                {label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: FONT, color: "#1a1a1a" }}>
                {value}
              </div>
            </div>
          </div>
        ))}

        {record.note && (
          <div
            style={{
              marginTop: 16, background: "#fafafa", borderRadius: 10,
              padding: "12px 16px", border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ fontSize: 11, color: "#aaa", fontFamily: FONT, fontWeight: 600, marginBottom: 4 }}>
              NOTE
            </div>
            <div style={{ fontSize: 13, color: "#444", fontFamily: FONT, lineHeight: 1.6 }}>
              {record.note}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

// ─── Mobile Timeline Card ─────────────────────────────────────────────────────
const TimelineCard = ({ record, onView, onDelete }) => {
  const ac = ACTION_CONFIG[record.action] || {};
  const sc = STATUS_CONFIG[record.status] || {};
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        borderLeft: `3px solid ${ac.color}`,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      }}
    >
      <Image
        src={record.image}
        width={48}
        height={48}
        style={{ borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
        fallback="https://via.placeholder.com/48"
        preview={false}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, fontFamily: FONT, color: "#1a1a1a", marginBottom: 6 }}>
          {record.product}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          <Tag
            style={{
              background: ac.bg, color: ac.color, border: "none",
              borderRadius: 6, fontFamily: FONT, fontWeight: 600, fontSize: 11,
            }}
          >
            {ac.icon} {record.action}
          </Tag>
          <Tag
            style={{
              background: sc.bg, color: sc.color, border: "none",
              borderRadius: 6, fontFamily: FONT, fontWeight: 600, fontSize: 11,
            }}
          >
            {record.status}
          </Tag>
        </div>
        <div
          style={{
            display: "flex", gap: 14, fontSize: 12,
            color: "#888", fontFamily: FONT, fontWeight: 500,
          }}
        >
          <span><UserOutlined style={{ marginRight: 4 }} />{record.user}</span>
          <span><ClockCircleOutlined style={{ marginRight: 4 }} />{record.date}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onView(record)}
          style={{
            background: "#1a1a1a", color: "#fff", border: "none",
            borderRadius: 7, fontFamily: FONT, fontWeight: 600,
          }}
        />
        <Popconfirm
          title="Delete this record?"
          onConfirm={() => onDelete(record.key)}
          okText="Delete"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <Button
            size="small"
            icon={<DeleteOutlined />}
            danger
            style={{ borderRadius: 7 }}
          />
        </Popconfirm>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductsHistory = () => {
  const screens = useBreakpoint();
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState(null);
  const [userFilter, setUserFilter] = useState(null);
  const [viewRecord, setViewRecord] = useState(null);

  // ── Filtered data ─────────────────────────────────────────────────────────
  const filtered = useMemo(
    () =>
      data.filter((r) => {
        const matchSearch = r.product.toLowerCase().includes(search.toLowerCase());
        const matchAction = actionFilter ? r.action === actionFilter : true;
        const matchUser = userFilter ? r.user === userFilter : true;
        return matchSearch && matchAction && matchUser;
      }),
    [data, search, actionFilter, userFilter]
  );

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(
    () => ({
      total: data.length,
      created: data.filter((d) => d.action === "Created").length,
      updated: data.filter((d) => d.action === "Updated").length,
      deleted: data.filter((d) => d.action === "Deleted").length,
    }),
    [data]
  );

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = (key) => {
    setData((prev) => prev.filter((r) => r.key !== key));
    message.success("Record deleted");
  };

  const handleExport = () => {
    const exportData = data.map((item) => ({
      Product: item.product,
      Action: item.action,
      User: item.user,
      Date: item.date,
      Status: item.status,
      Note: item.note || "",
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "History");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "products-history.xlsx");
    message.success("Exported successfully");
  };

  // ── Table columns ─────────────────────────────────────────────────────────
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      sorter: (a, b) => a.product.localeCompare(b.product),
      render: (text, record) => (
        <Space size={12}>
          <Image
            src={record.image}
            width={44}
            height={44}
            style={{
              borderRadius: 10, objectFit: "cover",
              border: "1px solid #f0f0f0", flexShrink: 0,
            }}
            fallback="https://via.placeholder.com/44"
            preview={false}
          />
          <div>
            <div style={{ fontWeight: 700, fontFamily: FONT, fontSize: 14, color: "#1a1a1a" }}>
              {text}
            </div>
            <div style={{ fontSize: 11, color: "#bbb", fontFamily: FONT }}>
              {record.date}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      filters: ["Created", "Updated", "Deleted"].map((v) => ({ text: v, value: v })),
      onFilter: (val, record) => record.action === val,
      render: (action) => {
        const { color, bg, icon } = ACTION_CONFIG[action] || {};
        return (
          <Tag
            style={{
              background: bg, color, border: "none",
              borderRadius: 7, fontFamily: FONT,
              fontWeight: 600, padding: "3px 10px",
            }}
          >
            <Space size={4}>{icon}{action}</Space>
          </Tag>
        );
      },
    },
    {
      title: "Performed By",
      dataIndex: "user",
      render: (user) => (
        <Space size={8}>
          <Avatar
            size={28}
            style={{
              background: USER_COLORS[user] || "#888",
              fontSize: 12, fontFamily: FONT, fontWeight: 700,
            }}
          >
            {user[0]}
          </Avatar>
          <span style={{ fontWeight: 600, fontFamily: FONT, fontSize: 13 }}>{user}</span>
        </Space>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (text) => (
        <span style={{ fontFamily: FONT, fontWeight: 500, color: "#666", fontSize: 13 }}>
          <ClockCircleOutlined style={{ marginRight: 6, color: "#ccc" }} />
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const { color, bg } = STATUS_CONFIG[status] || {};
        return (
          <Tag
            style={{
              background: bg, color, border: "none",
              borderRadius: 7, fontFamily: FONT,
              fontWeight: 600, padding: "3px 10px",
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="View details">
            <Button
              size="small"
              icon={<EyeOutlined />}
              onClick={() => setViewRecord(record)}
              style={{
                background: "#1a1a1a", color: "#fff", border: "none",
                borderRadius: 7, fontFamily: FONT, fontWeight: 600,
              }}
            >
              View
            </Button>
          </Tooltip>
          <Popconfirm
            title="Delete this record?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.key)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button
              size="small"
              icon={<DeleteOutlined />}
              danger
              style={{ borderRadius: 7, fontFamily: FONT }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const isMobile = screens.xs || (!screens.sm && !screens.md);

  return (
    <div style={{ background: "#f7f7f8", minHeight: "100vh", padding: isMobile ? 12 : 24, fontFamily: FONT }}>

      {/* ── Page Header ── */}
      <div
        style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", flexWrap: "wrap",
          gap: 12, marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 800, color: "#1a1a1a", fontFamily: FONT }}>
            Product History
          </h2>
          <p style={{ margin: "3px 0 0", color: "#999", fontFamily: FONT, fontSize: 14, fontWeight: 500 }}>
            Full audit log of all product activity and changes
          </p>
        </div>
        <Button
          icon={<DownloadOutlined />}
          onClick={handleExport}
          style={{
            color: PRIMARY, borderColor: PRIMARY,
            borderRadius: 9, fontWeight: 700,
            fontFamily: FONT, height: 38,
          }}
        >
          Export
        </Button>
      </div>

      {/* ── Stat Chips ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 10, marginBottom: 20,
        }}
      >
        {[
          { label: "Total Events",  value: stats.total,   color: "#1a1a1a", border: "#e0e0e0" },
          { label: "Created",       value: stats.created, color: "#00875a", border: "#b7ebd6" },
          { label: "Updated",       value: stats.updated, color: "#0065bd", border: "#b3d4f5" },
          { label: "Deleted",       value: stats.deleted, color: PRIMARY,   border: "#ffc9c9" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "14px 18px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color, lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 5, fontWeight: 600, letterSpacing: "0.03em" }}>
              {s.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: isMobile ? 12 : 20,
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        }}
      >
        {/* Filters toolbar */}
        <div
          style={{
            display: "flex", flexWrap: "wrap", gap: 10,
            marginBottom: 16, justifyContent: "space-between",
          }}
        >
          <Space wrap>
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined style={{ color: "#ccc" }} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              style={{ width: isMobile ? "100%" : 220, borderRadius: 8, fontFamily: FONT }}
            />
            <Select
              placeholder="All Actions"
              allowClear
              value={actionFilter}
              onChange={setActionFilter}
              style={{ width: 130 }}
            >
              {["Created", "Updated", "Deleted"].map((a) => (
                <Option key={a} value={a}>{a}</Option>
              ))}
            </Select>
            <Select
              placeholder="All Users"
              allowClear
              value={userFilter}
              onChange={setUserFilter}
              style={{ width: 130 }}
            >
              {["Admin", "Manager", "Staff"].map((u) => (
                <Option key={u} value={u}>{u}</Option>
              ))}
            </Select>
          </Space>
          <span style={{ fontSize: 13, color: "#aaa", fontFamily: FONT, alignSelf: "center" }}>
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Mobile: timeline cards | Desktop: table */}
        {isMobile ? (
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", fontFamily: FONT }}>
                No records found
              </div>
            ) : (
              filtered.map((record) => (
                <TimelineCard
                  key={record.key}
                  record={record}
                  onView={setViewRecord}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        ) : (
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="key"
            scroll={{ x: 820 }}
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
              showTotal: (total) => (
                <span style={{ fontFamily: FONT, color: "#aaa", fontSize: 13 }}>
                  {total} records
                </span>
              ),
            }}
            rowClassName={() => "history-row"}
            locale={{
              emptyText: (
                <div style={{ padding: "40px 0", color: "#bbb", fontFamily: FONT }}>
                  No history records found
                </div>
              ),
            }}
          />
        )}
      </div>

      {/* ── Detail Modal ── */}
      <DetailModal
        record={viewRecord}
        open={!!viewRecord}
        onClose={() => setViewRecord(null)}
      />

      <style>{`
        .history-row:hover td { background: #fafafa !important; }
        .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-family: ${FONT} !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          color: #999 !important;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ant-pagination-item-active { border-color: ${PRIMARY} !important; }
        .ant-pagination-item-active a { color: ${PRIMARY} !important; }
      `}</style>
    </div>
  );
};

export default ProductsHistory;
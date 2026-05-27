import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Image,
  Modal,
  Input,
  Upload,
  message,
  Grid,
  Select,
  InputNumber,
  Form,
  Popconfirm,
  Tooltip,
  Spin,
} from "antd";

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../Store/APIS/krsApi";

import {
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { useBreakpoint } = Grid;
const { Option } = Select;

const PRIMARY = "#c90202";
const FONT = "'Outfit', sans-serif";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Furniture",
  "Food & Beverages",
  "Books",
  "Sports",
  "Beauty",
  "Toys",
  "Other",
];

// ─── Status helpers ───────────────────────────────────────────────────────────
const getStatus = (qty) =>
  qty > 5 ? "In Stock" : qty > 0 ? "Low Stock" : "Out of Stock";

const STATUS_COLOR = {
  "In Stock": { tag: "success", dot: "#52c41a" },
  "Low Stock": { tag: "warning", dot: "#fa8c16" },
  "Out of Stock": { tag: "error", dot: "#ff4d4f" },
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa" }}>
    <InboxOutlined style={{ fontSize: 48, marginBottom: 12, display: "block" }} />
    <p style={{ fontFamily: FONT, fontWeight: 500, margin: 0 }}>No products found</p>
    <p style={{ fontFamily: FONT, fontSize: 13, marginTop: 4 }}>
      Try adjusting your search or add a new product
    </p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Products = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  // API hooks
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();



  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = add mode
  const [previewImage, setPreviewImage] = useState(null);   // cover image
  const [imageFile, setImageFile] = useState(null);         // cover File obj
  const [galleryFiles, setGalleryFiles] = useState([]);

  const productsData = data?.products || [];

  // ── Derived data ─────────────────────────────────────────────────────────
  const filtered = productsData.filter((item) => {
    const matchSearch = item.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchCat = categoryFilter
      ? item.category === categoryFilter
      : true;

    return matchSearch && matchCat;
  });

  const stats = {
    total: productsData.length,
    inStock: productsData.filter((d) => d.qty > 5).length,
    lowStock: productsData.filter((d) => d.qty > 0 && d.qty <= 5).length,
    outOfStock: productsData.filter((d) => d.qty === 0).length,
  };

  // ── Modal helpers ─────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingProduct(null);
    setPreviewImage(null);
    setImageFile(null);
    setGalleryFiles([]);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingProduct(record);
    setPreviewImage(record.image || null);
    setImageFile(null);
    // Seed gallery from existing images array (strings/URLs)
    const existing = (record.images || []).map((img, i) => ({
      uid: `existing-${i}`,
      file: null,
      url: typeof img === "string" ? img : img?.path || img?.url,
    }));
    setGalleryFiles(existing);
    form.setFieldsValue({
      name: record.name,
      category: record.category,
      price: record.price,
      qty: record.qty,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setPreviewImage(null);
    setImageFile(null);
    setGalleryFiles([]);
    form.resetFields();
  };

  // ── Save (add / edit) with API ───────────────────────────────────────────
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("qty", values.qty);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      galleryFiles.forEach((g) => {
        if (g.file) formData.append("images", g.file);
      });

      if (editingProduct) {
        await updateProduct({
          id: editingProduct._id,
          data: formData,
        }).unwrap();
        message.success("Product updated successfully");
      } else {
        await createProduct(formData).unwrap();
        message.success("Product added successfully");
      }

      closeModal();
      refetch();
    } catch (error) {
      message.error(
        error?.data?.message || "Operation failed. Please try again."
      );
    }
  };

  // ── Delete with API ────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      message.success("Product deleted");
      refetch();
    } catch (error) {
      message.error(error?.data?.message || "Delete failed. Please try again.");
    }
  };

  // ── Image upload handlers (same as before) ─────────────────────────────────
  const handleImageUpload = (file) => {
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const handleGalleryUpload = (file) => {
    const entry = { uid: file.uid || Date.now(), file, url: URL.createObjectURL(file) };
    setGalleryFiles((prev) => [...prev, entry]);
    return false;
  };



  const removeGalleryItem = (uid) =>
    setGalleryFiles((prev) => prev.filter((g) => g.uid !== uid));

  // ── Export to Excel (uses current filtered data) ────────────────────────────
  const handleExport = () => {
    const exportData = filtered.map((item) => ({
      Name: item.name,
      SKU: item.sku || "-",
      Category: item.category,
      Price: item.price,
      Quantity: item.qty,
      Status: getStatus(item.qty),
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(
      new Blob([buf], { type: "application/octet-stream" }),
      "products.xlsx"
    );
    message.success("Exported successfully");
  };

  // ── Bulk upload ───────────────────────────────────────────────────────────
  const handleBulkUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const wb = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
        const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        const imported = json.map((item, i) => ({
          name: item.Name || item.name || "Unnamed",
          sku: item.SKU || item.sku || "",
          category: item.Category || item.category || "Other",
          price: Number(item.Price || item.price || 0),
          qty: Number(item.Quantity || item.qty || 0),
          description: item.Description || item.description || "",
          image: "https://via.placeholder.com/100",
          images: [],
        }));
        // Create products one by one (or bulk if API supports)
        for (const product of imported) {
          await createProduct(product).unwrap();
        }
        message.success(`${imported.length} products imported`);
        refetch();
      } catch (error) {
        message.error("Bulk upload failed. Please check file format.");
      }
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  // ── Table columns (unchanged) ─────────────────────────────────────────────────────────
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      sorter: (a, b) => a.name?.localeCompare(b.name),
      render: (text, record) => (
        <Space size={12}>
          <Image
            src={record.image}
            width={46}
            height={46}
            style={{
              borderRadius: 10,
              objectFit: "cover",
              border: "1px solid #f0f0f0",
              flexShrink: 0,
            }}
            fallback="https://via.placeholder.com/100"
            preview={false}
          />
          <div>
            <div style={{ fontWeight: 600, fontFamily: FONT, fontSize: 14 }}>
              {text}
            </div>
            {record.sku && (
              <div style={{ fontSize: 12, color: "#aaa", fontFamily: FONT }}>
                SKU: {record.sku}
              </div>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",

      filters: [
        ...new Set(productsData.map((item) => item.category))
      ].map((cat) => ({
        text: cat,
        value: cat,
      })),

      onFilter: (value, record) => record.category === value,

      render: (t) => (
        <Tag
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            borderRadius: 6,
            border: "none",
            background: "#f5f5f5",
            color: "#555",
          }}
        >
          {t}
        </Tag>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      render: (p) => (
        <span style={{ color: PRIMARY, fontWeight: 700, fontFamily: FONT }}>
          ₹{Number(p).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "qty",
      sorter: (a, b) => a.qty - b.qty,
      render: (q) => (
        <span style={{ fontWeight: 600, fontFamily: FONT }}>{q}</span>
      ),
    },
    {
      title: "Status",
      render: (_, r) => {
        const status = getStatus(r.qty);
        const { tag } = STATUS_COLOR[status];
        return (
          <Tag
            color={tag}
            style={{ fontFamily: FONT, fontWeight: 600, borderRadius: 6 }}
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
          <Tooltip title="Edit product">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => openEdit(record)}
              style={{
                borderColor: "#d9d9d9",
                borderRadius: 8,
                fontFamily: FONT,
              }}
            />
          </Tooltip>
          <Tooltip title="Delete product">
            <Popconfirm
              title="Delete this product?"
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record._id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button
                icon={<DeleteOutlined />}
                size="small"
                danger
                style={{ borderRadius: 8 }}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // // Show error state if API fails
  // if (isError) {
  //   return (
  //     <div style={{ textAlign: "center", padding: 48, fontFamily: FONT }}>
  //       <p style={{ color: "#ff4d4f" }}>Failed to load products. Please try again later.</p>
  //       <Button onClick={() => refetch()} style={{ marginTop: 16 }}>Retry</Button>
  //     </div>
  //   );
  // }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        background: "#fafafa",
        minHeight: "100vh",
        padding: screens.xs ? 12 : 24,
        fontFamily: FONT,
      }}
    >
      {/* ── Page header ── */}
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            margin: 0,
            color: "#1a1a1a",
            fontFamily: FONT,
          }}
        >
          Products
        </h2>
        <p
          style={{
            margin: "4px 0 0",
            color: "#888",
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Manage your inventory, pricing and stock levels
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: screens.xs
            ? "1fr 1fr"
            : "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total Products", value: stats.total, color: "#1a1a1a" },
          { label: "In Stock", value: stats.inStock, color: "#c90202" },
          { label: "Low Stock", value: stats.lowStock, color: "#1a1a1a" },
          { label: "Out of Stock", value: stats.outOfStock, color: PRIMARY },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: "16px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              borderTop: `3px solid ${s.color}`,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: s.color,
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#888",
                marginTop: 6,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Table card ── */}
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: screens.xs ? 12 : 20,
          boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <Space wrap>
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined style={{ color: "#bbb" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{
                width: screens.xs ? "100%" : 240,
                fontFamily: FONT,
                borderRadius: 8,
              }}
            />
            <Select
              placeholder="Filter Category"
              allowClear
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: 180, fontFamily: FONT }}
            >
              {[...new Set(productsData.map((item) => item.category))].map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </Space>

          <Space wrap>
            <Upload beforeUpload={handleBulkUpload} showUploadList={false} accept=".xlsx,.xls,.csv">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, fontFamily: FONT, fontWeight: 600 }}
              >
                Bulk Upload
              </Button>
            </Upload>

            <Button
              icon={<DownloadOutlined />}
              onClick={handleExport}
              style={{
                color: PRIMARY,
                borderColor: PRIMARY,
                borderRadius: 8,
                fontWeight: 600,
                fontFamily: FONT,
              }}
            >
              Export
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={openAdd}
              style={{
                background: PRIMARY,
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontFamily: FONT,
              }}
            >
              Add Product
            </Button>
          </Space>
        </div>

        {/* Table with loading indicator */}
        <Spin spinning={isLoading} tip="Loading products...">
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            scroll={{ x: 860 }}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              showTotal: (total) => (
                <span style={{ fontFamily: FONT, color: "#888", fontSize: 13 }}>
                  {total} products
                </span>
              ),
            }}
            locale={{ emptyText: <EmptyState /> }}
            rowClassName={() => "product-row"}
            style={{ fontFamily: FONT }}
          />
        </Spin>
      </div>

      {/* ── Add / Edit Modal (unchanged) ── */}
      <Modal
        title={
          <div style={{ fontFamily: FONT }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </span>
            <p
              style={{
                fontSize: 13,
                color: "#888",
                margin: "2px 0 0",
                fontWeight: 400,
              }}
            >
              {editingProduct
                ? "Update the product details below"
                : "Fill in the details to add a new product"}
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText={editingProduct ? "Save Changes" : "Add Product"}
        cancelText="Cancel"
        width={screens.xs ? "95vw" : 640}
        style={{ top: 40, fontFamily: FONT }}
        confirmLoading={isCreating || isUpdating}
        okButtonProps={{
          style: {
            background: PRIMARY,
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontFamily: FONT,
          },
        }}
        cancelButtonProps={{
          style: { borderRadius: 8, fontFamily: FONT },
        }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 16, fontFamily: FONT }}
          requiredMark={false}
        >
          {/* Name */}
          <Form.Item
            label={<b style={{ fontFamily: FONT }}>Product Name *</b>}
            name="name"
            rules={[{ required: true, message: "Product name is required" }]}
          >
            <Input
              placeholder="e.g. Wireless Headphones"
              style={{ borderRadius: 8, fontFamily: FONT }}
            />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label={<b style={{ fontFamily: FONT }}>Category *</b>}
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input
              placeholder="Enter category"
              style={{ borderRadius: 8, fontFamily: FONT }}
            />
          </Form.Item>

          {/* Price + Qty */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: screens.xs ? "1fr" : "1fr 1fr",
              gap: 12,
            }}
          >
            <Form.Item
              label={<b style={{ fontFamily: FONT }}>Price (₹) *</b>}
              name="price"
              rules={[
                { required: true, message: "Price is required" },
                { type: "number", min: 0, message: "Must be positive" },
              ]}
            >
              <InputNumber
                placeholder="0.00"
                min={0}
                precision={2}
                prefix="₹"
                style={{ width: "100%", borderRadius: 8, fontFamily: FONT }}
              />
            </Form.Item>

            <Form.Item
              label={<b style={{ fontFamily: FONT }}>Quantity *</b>}
              name="qty"
              rules={[
                { required: true, message: "Quantity is required" },
                { type: "number", min: 0, message: "Must be 0 or more" },
              ]}
            >
              <InputNumber
                placeholder="0"
                min={0}
                style={{ width: "100%", borderRadius: 8, fontFamily: FONT }}
              />
            </Form.Item>
          </div>

          {/* Cover image */}
          <Form.Item label={<b style={{ fontFamily: FONT }}>Cover Image</b>}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
              <Upload
                beforeUpload={handleImageUpload}
                maxCount={1}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} style={{ borderRadius: 8, fontFamily: FONT }}>
                  {previewImage ? "Change" : "Upload"}
                </Button>
              </Upload>

              {previewImage && (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Image
                    src={previewImage}
                    width={72}
                    height={72}
                    style={{ objectFit: "cover", borderRadius: 10, border: "1px solid #eee" }}
                    fallback="https://via.placeholder.com/100"
                  />
                  <Button
                    size="small"
                    danger
                    onClick={() => { setPreviewImage(null); setImageFile(null); }}
                    style={{
                      position: "absolute", top: -8, right: -8,
                      borderRadius: "50%", width: 20, height: 20,
                      minWidth: 20, padding: 0, fontSize: 10, lineHeight: "20px",
                    }}
                  >✕</Button>
                </div>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 6, fontFamily: FONT }}>
              Main product thumbnail — JPG, PNG, WEBP
            </p>
          </Form.Item>

          {/* Gallery images */}
          <Form.Item
            label={
              <b style={{ fontFamily: FONT }}>
                Gallery Images{" "}
                <span style={{ fontWeight: 400, color: "#aaa", fontSize: 12 }}>
                  (up to 5)
                </span>
              </b>
            }
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
              {galleryFiles.map((g) => (
                <div key={g.uid} style={{ position: "relative", display: "inline-block" }}>
                  <Image
                    src={
                      typeof g === "string"
                        ? g
                        : g.url || g.path || ""
                    }
                    width={68}
                    height={68}
                    style={{ objectFit: "cover", borderRadius: 10, border: "1px solid #eee" }}
                    fallback="https://via.placeholder.com/100"
                  />
                  <Button
                    size="small"
                    danger
                    onClick={() => removeGalleryItem(g.uid)}
                    style={{
                      position: "absolute", top: -8, right: -8,
                      borderRadius: "50%", width: 20, height: 20,
                      minWidth: 20, padding: 0, fontSize: 10, lineHeight: "20px",
                    }}
                  >✕</Button>
                </div>
              ))}

              {galleryFiles.length < 8 && (
                <Upload
                  beforeUpload={handleGalleryUpload}
                  showUploadList={false}
                  accept="image/*"
                  multiple
                >
                  <div
                    style={{
                      width: 68, height: 68, borderRadius: 10,
                      border: "1.5px dashed #d9d9d9",
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      cursor: "pointer", color: "#bbb", fontSize: 11,
                      fontFamily: FONT, gap: 4,
                      transition: "border-color 0.2s",
                    }}
                  >
                    <PlusOutlined style={{ fontSize: 18 }} />
                    <span>Add</span>
                  </div>
                </Upload>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 2, fontFamily: FONT }}>
              These map to the <code>images</code> array — shown in product gallery / carousel
            </p>
          </Form.Item>

          {/* Live stock status preview */}
          <Form.Item noStyle shouldUpdate>
            {() => {
              const qty = form.getFieldValue("qty");
              if (qty == null || qty === "") return null;
              const status = getStatus(Number(qty));
              const { tag } = STATUS_COLOR[status];
              return (
                <div
                  style={{
                    background: "#fafafa", borderRadius: 8,
                    padding: "10px 14px", display: "flex",
                    alignItems: "center", gap: 10, border: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ fontFamily: FONT, fontSize: 13, color: "#555", fontWeight: 500 }}>
                    Stock status preview:
                  </span>
                  <Tag color={tag} style={{ fontFamily: FONT, fontWeight: 600, margin: 0 }}>
                    {status}
                  </Tag>
                </div>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>

      {/* Row hover style */}
      <style>{`
        .product-row:hover td { background: #fff8f8 !important; }
        .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-family: ${FONT};
          font-weight: 700;
          font-size: 13px;
          color: #555 !important;
        }
        .ant-pagination-item-active {
          border-color: ${PRIMARY} !important;
        }
        .ant-pagination-item-active a {
          color: ${PRIMARY} !important;
        }
      `}</style>
    </div>
  );
};

export default Products;
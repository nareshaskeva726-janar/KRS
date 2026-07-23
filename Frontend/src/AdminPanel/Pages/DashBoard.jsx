import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Input, Select, Badge, Avatar, Space, Drawer, Dropdown, Menu } from 'antd'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  ShoppingCartOutlined,
  InboxOutlined,
  RiseOutlined,
  DollarOutlined,
  PlusOutlined,
  UploadOutlined,
  DownloadOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MenuOutlined,
  CloseOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
}

const cardHover = {
  hover: {
    y: -4,
    boxShadow: "0 20px 25px -12px rgba(0, 0, 0, 0.08)",
    transition: { duration: 0.25, ease: "easeOut" }
  },
  tap: { scale: 0.98 }
}

const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hover: { backgroundColor: "#fafafa", transition: { duration: 0.15 } }
}

const buttonHover = {
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.97 }
}

// ─── Brand colors ───────────────────────────────────────────────────────────
const RED = '#E24B4A'
const RED_DARK = '#A32D2D'
const RED_DARKER = '#791F1F'
const RED_LIGHT = '#FCEBEB'
const RED_MID = '#F7C1C1'

// ─── Dummy Data ──────────────────────────────────────────────────────────────
const revenueData = {
  '7d': [
    { label: 'Mon', revenue: 8200 },
    { label: 'Tue', revenue: 9400 },
    { label: 'Wed', revenue: 7800 },
    { label: 'Thu', revenue: 11200 },
    { label: 'Fri', revenue: 13500 },
    { label: 'Sat', revenue: 14100 },
    { label: 'Sun', revenue: 10900 },
  ],
  '30d': [
    { label: 'Week 1', revenue: 42000 },
    { label: 'Week 2', revenue: 55000 },
    { label: 'Week 3', revenue: 61000 },
    { label: 'Week 4', revenue: 71000 },
  ],
  '90d': [
    { label: 'April', revenue: 180000 },
    { label: 'May', revenue: 220000 },
    { label: 'June', revenue: 284500 },
  ],
}

const categoryData = [
  { name: 'Home Appliances', value: 40, color: RED },
  { name: 'Electrical', value: 24, color: '#EF9F27' },
  { name: 'Tools', value: 18, color: '#1D9E75' },
  { name: 'Safety Gear', value: 11, color: '#7F77DD' },
  { name: 'Others', value: 7, color: '#378ADD' },
]

const ordersBarData = [
  { day: 'Mon', orders: 32 },
  { day: 'Tue', orders: 45 },
  { day: 'Wed', orders: 28 },
  { day: 'Thu', orders: 60 },
  { day: 'Fri', orders: 75 },
  { day: 'Sat', orders: 82 },
  { day: 'Sun', orders: 55 },
]

const products = [
  { key: '1', name: 'Iron Box Vanitha', emoji: '🔌', category: 'Home Appliances', price: 450, stock: 10, maxStock: 15, status: 'In Stock' },
  { key: '2', name: 'Electrical Gloves', emoji: '🧤', category: 'Safety Gear', price: 550, stock: 20, maxStock: 20, status: 'In Stock' },
  { key: '3', name: 'Water Kettle', emoji: '🫖', category: 'Home Appliances', price: 480, stock: 7, maxStock: 15, status: 'Low Stock' },
  { key: '4', name: 'Wire Stripper Pro', emoji: '🔧', category: 'Tools', price: 780, stock: 5, maxStock: 15, status: 'Low Stock' },
  { key: '5', name: 'LED Torch 5W', emoji: '🔦', category: 'Electrical', price: 320, stock: 35, maxStock: 35, status: 'In Stock' },
  { key: '6', name: 'Mixi Grinder', emoji: '🪚', category: 'Home Appliances', price: 1200, stock: 12, maxStock: 15, status: 'In Stock' },
  { key: '7', name: 'Safety Helmet', emoji: '⛑️', category: 'Safety Gear', price: 650, stock: 0, maxStock: 10, status: 'Out of Stock' },
]

const recentOrders = [
  { id: '#ORD-1084', customer: 'Ravi Kumar', city: 'Chennai', amount: 1650, time: 'Today, 11:42 AM', status: 'Delivered' },
  { id: '#ORD-1083', customer: 'Meena S', city: 'Madurai', amount: 450, time: 'Today, 9:15 AM', status: 'Processing' },
  { id: '#ORD-1082', customer: 'Arun P', city: 'Coimbatore', amount: 2340, time: 'Yesterday, 6:20 PM', status: 'Delivered' },
  { id: '#ORD-1081', customer: 'Lakshmi R', city: 'Salem', amount: 780, time: 'Yesterday, 3:08 PM', status: 'Shipped' },
  { id: '#ORD-1080', customer: 'Karthik M', city: 'Trichy', amount: 960, time: '10 Jun, 1:50 PM', status: 'Delivered' },
  { id: '#ORD-1079', customer: 'Priya N', city: 'Dindigul', amount: 1100, time: '10 Jun, 11:05 AM', status: 'Processing' },
  { id: '#ORD-1078', customer: 'Selvam K', city: 'Tirunelveli', amount: 3200, time: '9 Jun, 4:30 PM', status: 'Delivered' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatINR = (v) =>
  '₹' + Number(v).toLocaleString('en-IN')

const statusIcon = (s) => {
  if (s === 'In Stock') return <CheckCircleOutlined className="text-green-600" />
  if (s === 'Low Stock') return <WarningOutlined className="text-amber-500" />
  return <CloseCircleOutlined className="text-red-500" />
}

const statusTag = (s) => {
  const map = {
    'In Stock': { color: 'green', text: 'In Stock' },
    'Low Stock': { color: 'gold', text: 'Low Stock' },
    'Out of Stock': { color: 'red', text: 'Out of Stock' },
  }
  const { color, text } = map[s] || {}
  return <Tag color={color}>{text}</Tag>
}

const orderStatusTag = (s) => {
  const map = {
    Delivered: 'green',
    Shipped: 'blue',
    Processing: 'gold',
    Cancelled: 'red',
  }
  return <Tag color={map[s] || 'default'}>{s}</Tag>
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const KpiCard = ({ icon, label, value, sub, trend, accentColor, index }) => (
  <motion.div
    variants={fadeInUp}
    whileHover="hover"
    whileTap="tap"
    custom={index}
    className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-2 relative overflow-hidden"
    style={{ cursor: 'pointer' }}
  >
    <div
      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
      style={{ background: accentColor }}
    />
    <div className="flex items-center justify-between pl-2">
      <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</span>
      <motion.div
        whileHover={{ rotate: 5, scale: 1.05 }}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-base flex-shrink-0"
        style={{ background: accentColor }}
      >
        {icon}
      </motion.div>
    </div>
    <div className="pl-2">
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
      <div className={`text-xs mt-1 flex items-center gap-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
        {trend === 'up' && <RiseOutlined className="animate-pulse" />}
        {trend === 'down' && <WarningOutlined />}
        {sub}
      </div>
    </div>
  </motion.div>
)

const StockBar = ({ stock, maxStock, status }) => {
  const pct = maxStock > 0 ? Math.round((stock / maxStock) * 100) : 0
  const color = status === 'In Stock' ? '#1D9E75' : status === 'Low Stock' ? '#EF9F27' : '#E24B4A'
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 w-6">{stock}</span>
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full" 
          style={{ width: `${pct}%`, background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm"
      >
        <p className="text-gray-500 text-xs mb-1">{label}</p>
        <p className="font-semibold" style={{ color: RED }}>{formatINR(payload[0].value)}</p>
      </motion.div>
    )
  }
  return null
}

const OrdersTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-sm"
      >
        <p className="text-gray-500 text-xs mb-1">{label}</p>
        <p className="font-semibold" style={{ color: RED }}>{payload[0].value} orders</p>
      </motion.div>
    )
  }
  return null
}

// ─── Product table columns ────────────────────────────────────────────────────
const productColumns = [
  {
    title: 'Product',
    dataIndex: 'name',
    key: 'name',
    render: (name, row) => (
      <div className="flex items-center gap-3">
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-lg border border-gray-100 flex-shrink-0"
        >
          {row.emoji}
        </motion.div>
        <div>
          <div className="text-sm font-medium text-gray-800">{name}</div>
          <div className="text-xs text-gray-400">{row.category}</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (v) => <span className="font-semibold text-sm" style={{ color: RED_DARK }}>{formatINR(v)}</span>,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    render: (_, row) => <StockBar stock={row.stock} maxStock={row.maxStock} status={row.status} />,
    width: 160,
    responsive: ['md'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (s) => (
      <div className="flex items-center gap-1.5">
        {statusIcon(s)}
        {statusTag(s)}
      </div>
    ),
    filters: [
      { text: 'In Stock', value: 'In Stock' },
      { text: 'Low Stock', value: 'Low Stock' },
      { text: 'Out of Stock', value: 'Out of Stock' },
    ],
    onFilter: (value, record) => record.status === value,
  },
]

// Custom animated table row component
const AnimatedTableRow = React.forwardRef((props, ref) => (
  <motion.tr
    ref={ref}
    {...props}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2 }}
    whileHover={{ backgroundColor: "#fafafa", transition: { duration: 0.1 } }}
  />
))

const tableComponents = {
  body: {
    row: AnimatedTableRow,
  },
}

// ─── Mobile Filter Drawer ───────────────────────────────────────────────────
const MobileFilterDrawer = ({ visible, onClose, search, setSearch, filterCat, setFilterCat, categoryOptions }) => (
  <Drawer
    title="Filter Products"
    placement="bottom"
    closable={false}
    onClose={onClose}
    visible={visible}
    height="auto"
    className="rounded-t-2xl"
    bodyStyle={{ padding: '20px' }}
  >
    <div className="flex justify-between items-center mb-4">
      <span className="text-lg font-semibold">Filters</span>
      <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
    </div>
    <div className="space-y-4">
      <div>
        <label className="text-xs text-gray-500 font-medium mb-1 block">Search</label>
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 font-medium mb-1 block">Category</label>
        <Select
          value={filterCat}
          onChange={setFilterCat}
          className="w-full"
          options={categoryOptions.map(cat => ({ value: cat, label: cat === 'all' ? 'All Categories' : cat }))}
        />
      </div>
      <Button 
        type="primary" 
        block 
        onClick={onClose}
        style={{ background: RED, borderColor: RED }}
      >
        Apply Filters
      </Button>
    </div>
  </Drawer>
)

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const [range, setRange] = useState('7d')
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('all')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'all' || p.category === filterCat
    return matchSearch && matchCat
  })

  const totalRevenue = '₹2,84,500'
  const totalOrders = 342
  const inStock = products.filter((p) => p.status === 'In Stock').length
  const avgOrder = '₹831'

  const categoryOptions = ['all', ...new Set(products.map(p => p.category))]

  // Responsive columns for product table
  const getResponsiveColumns = () => {
    if (isMobile) {
      return productColumns.filter(col => col.key !== 'stock' && col.key !== 'status')
    }
    if (isTablet) {
      return productColumns.filter(col => col.key !== 'stock')
    }
    return productColumns
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.main 
        className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* ── KPI Row ── */}
        <motion.div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" variants={staggerContainer}>
          <KpiCard
            icon={<DollarOutlined />}
            label="Total Revenue"
            value={totalRevenue}
            sub="+18.4% vs last month"
            trend="up"
            accentColor={RED}
          />
          <KpiCard
            icon={<ShoppingCartOutlined />}
            label="Orders"
            value={totalOrders}
            sub="+9.2% vs last month"
            trend="up"
            accentColor="#EF9F27"
          />
          <KpiCard
            icon={<InboxOutlined />}
            label="In Stock Products"
            value={`${inStock} / ${products.length}`}
            sub="2 running low"
            trend="down"
            accentColor="#1D9E75"
          />
          <KpiCard
            icon={<RiseOutlined />}
            label="Avg. Order Value"
            value={avgOrder}
            sub="+3.1% vs last month"
            trend="up"
            accentColor="#7F77DD"
          />
        </motion.div>

        {/* ── Charts Row ── */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4"
          variants={staggerContainer}
        >
          {/* Revenue Area Chart */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-3 sm:p-4"
            variants={fadeInUp}
            whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.05)", transition: { duration: 0.2 } }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h2 className="text-sm font-semibold text-gray-700">Revenue over time</h2>
              <div className="flex gap-1 w-full sm:w-auto">
                {['7d', '30d', '90d'].map((r) => (
                  <motion.button
                    key={r}
                    onClick={() => setRange(r)}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className={`flex-1 sm:flex-none px-3 py-1 text-xs rounded-full border transition-all font-medium ${
                      range === r
                        ? 'text-white border-transparent'
                        : 'text-gray-400 border-gray-200 hover:border-gray-300'
                    }`}
                    style={range === r ? { background: RED, borderColor: RED } : {}}
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
              <AreaChart data={revenueData[range]} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={RED} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={RED} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: isMobile ? 10 : 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: isMobile ? 10 : 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v >= 1000 ? `₹${Math.round(v / 1000)}k` : `₹${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={RED}
                  strokeWidth={2}
                  fill="url(#revGrad)"
                  dot={{ r: isMobile ? 2 : 4, fill: RED, strokeWidth: 0 }}
                  activeDot={{ r: isMobile ? 4 : 6, fill: RED }}
                  animationDuration={800}
                  animationBegin={200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart + Category list */}
          <motion.div 
            className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4"
            variants={fadeInUp}
            whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.05)", transition: { duration: 0.2 } }}
          >
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Sales by category</h2>
            <ResponsiveContainer width="100%" height={isMobile ? 140 : 150}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 35 : 45}
                  outerRadius={isMobile ? 55 : 68}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={800}
                  animationBegin={300}
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-2">
              {categoryData.map((c, i) => (
                <motion.div 
                  key={c.name} 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                    <span className="text-xs text-gray-600">{c.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{c.value}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Orders Bar + Recent Orders ── */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4"
          variants={staggerContainer}
        >
          {/* Weekly orders bar chart */}
          <motion.div 
            className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4"
            variants={fadeInUp}
            whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.05)", transition: { duration: 0.2 } }}
          >
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Orders this week</h2>
            <ResponsiveContainer width="100%" height={isMobile ? 150 : 180}>
              <BarChart data={ordersBarData} barSize={isMobile ? 16 : 20} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: isMobile ? 10 : 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip content={<OrdersTooltip />} />
                <Bar dataKey="orders" radius={[4, 4, 0, 0]} animationDuration={800} animationBegin={200}>
                  {ordersBarData.map((_, i) => (
                    <Cell key={i} fill={i === ordersBarData.length - 2 ? RED : RED_MID} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Orders list */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-3 sm:p-4"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">Recent orders</h2>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="small" type="link" style={{ color: RED_DARK, padding: 0 }}>
                  View all →
                </Button>
              </motion.div>
            </div>
            <div className="space-y-0 divide-y divide-gray-50">
              <AnimatePresence>
                {recentOrders.slice(0, isMobile ? 4 : 6).map((o, idx) => (
                  <motion.div
                    key={o.id}
                    variants={listItem}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: idx * 0.03 }}
                    className="flex flex-col xs:flex-row items-start xs:items-center justify-between py-2.5 px-1 rounded-lg cursor-pointer gap-2 xs:gap-0"
                  >
                    <div className="flex items-center gap-3 w-full xs:w-auto">
                      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                        <Avatar
                          size={isMobile ? 28 : 32}
                          style={{ background: RED_LIGHT, color: RED_DARK, fontSize: 12, fontWeight: 600 }}
                        >
                          {o.customer.charAt(0)}
                        </Avatar>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">{o.id}</div>
                        <div className="text-xs text-gray-400 truncate">{o.customer} · {o.city}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 w-full xs:w-auto justify-between xs:justify-end">
                      <div className="text-right hidden xs:block">
                        <div className="text-xs text-gray-400">{o.time}</div>
                      </div>
                      {!isMobile && orderStatusTag(o.status)}
                      <div className="text-sm font-semibold flex-shrink-0" style={{ color: RED_DARK }}>
                        {formatINR(o.amount)}
                      </div>
                    </div>
                    {isMobile && (
                      <div className="flex items-center gap-2 w-full xs:hidden">
                        {orderStatusTag(o.status)}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Product Inventory Section ── */}
        <motion.div 
          className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4"
          variants={fadeInUp}
          whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.05)", transition: { duration: 0.2 } }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Product Inventory</h2>
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
              {!isMobile ? (
                <>
                  <Input
                    placeholder="Search products..."
                    prefix={<SearchOutlined className="text-gray-400" />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64"
                    allowClear
                  />
                  <Select
                    value={filterCat}
                    onChange={setFilterCat}
                    className="w-full sm:w-40"
                    options={categoryOptions.map(cat => ({ value: cat, label: cat === 'all' ? 'All Categories' : cat }))}
                  />
                </>
              ) : (
                <Button 
                  icon={<FilterOutlined />} 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="w-full"
                >
                  Filter
                </Button>
              )}
            </div>
          </div>
          
          <Table
            columns={getResponsiveColumns()}
            dataSource={filteredProducts}
            pagination={{ 
              pageSize: isMobile ? 3 : 5,
              size: isMobile ? 'small' : 'default',
              showSizeChanger: !isMobile,
            }}
            components={tableComponents}
            rowKey="key"
            className="product-table"
            scroll={isMobile ? { x: true } : undefined}
          />
        </motion.div>
      </motion.main>

      {/* ── Mobile Filter Drawer ── */}
      <MobileFilterDrawer
        visible={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        search={search}
        setSearch={setSearch}
        filterCat={filterCat}
        setFilterCat={setFilterCat}
        categoryOptions={categoryOptions}
      />
    </div>
  )
}

export default Dashboard
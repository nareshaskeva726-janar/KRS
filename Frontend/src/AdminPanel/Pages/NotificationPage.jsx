import React, { useState } from 'react'
import { Button, Tag, Tabs, Badge, Avatar, Dropdown, Menu, Empty, Switch } from 'antd'
import {
  BellOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  InboxOutlined,
  UserOutlined,
  SettingOutlined,
  DeleteOutlined,
  MailOutlined,
  CloseOutlined,
  MoreOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  TagOutlined,
  GiftOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Brand Colors ───────────────────────────────────────────────────────────
const RED = '#E24B4A'
const RED_LIGHT = '#FCEBEB'
const RED_DARK = '#A32D2D'

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
      ease: "easeOut"
    }
  }
}

const listItem = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  hover: { 
    backgroundColor: "#fafafa", 
    transition: { duration: 0.15 },
    scale: 1.01,
  }
}

// ─── Dummy Notification Data ──────────────────────────────────────────────
const notificationTypes = {
  order: { icon: <ShoppingCartOutlined />, color: '#EF9F27', bg: '#FFF8E7' },
  revenue: { icon: <DollarOutlined />, color: RED, bg: RED_LIGHT },
  inventory: { icon: <InboxOutlined />, color: '#1D9E75', bg: '#E8F5EF' },
  system: { icon: <SettingOutlined />, color: '#7F77DD', bg: '#F0EEFA' },
  user: { icon: <UserOutlined />, color: '#378ADD', bg: '#E8F2FA' },
  promotion: { icon: <GiftOutlined />, color: '#E86B9E', bg: '#FCE8F1' },
}

const allNotifications = [
  {
    id: '1',
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-1085 from Ravi Kumar for ₹1,650 has been placed',
    time: '2 minutes ago',
    read: false,
    priority: 'high',
    action: 'View Order',
    actionLink: '#',
    avatar: 'R',
    avatarColor: '#EF9F27',
  },
  {
    id: '2',
    type: 'revenue',
    title: 'Revenue Milestone Achieved',
    message: 'You\'ve crossed ₹2,50,000 in total revenue this month!',
    time: '15 minutes ago',
    read: false,
    priority: 'high',
    action: 'View Report',
    actionLink: '#',
    avatar: '₹',
    avatarColor: RED,
  },
  {
    id: '3',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Water Kettle is running low on stock (7 units remaining)',
    time: '1 hour ago',
    read: false,
    priority: 'medium',
    action: 'Restock Now',
    actionLink: '#',
    avatar: '📦',
    avatarColor: '#1D9E75',
  },
  {
    id: '4',
    type: 'order',
    title: 'Order Delivered',
    message: 'Order #ORD-1084 has been successfully delivered to Meena S',
    time: '2 hours ago',
    read: true,
    priority: 'low',
    action: 'View Details',
    actionLink: '#',
    avatar: '✅',
    avatarColor: '#1D9E75',
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    message: 'New inventory management features are now available',
    time: '4 hours ago',
    read: true,
    priority: 'medium',
    action: 'Learn More',
    actionLink: '#',
    avatar: '⚡',
    avatarColor: '#7F77DD',
  },
  {
    id: '6',
    type: 'revenue',
    title: 'Payment Received',
    message: 'Payment of ₹2,340 received from Arun P for order #ORD-1082',
    time: '5 hours ago',
    read: true,
    priority: 'low',
    action: 'View Receipt',
    actionLink: '#',
    avatar: '💳',
    avatarColor: RED,
  },
  {
    id: '7',
    type: 'inventory',
    title: 'Stock Updated',
    message: 'New shipment of LED Torch 5W has been added (35 units)',
    time: '6 hours ago',
    read: true,
    priority: 'low',
    action: 'View Stock',
    actionLink: '#',
    avatar: '🔦',
    avatarColor: '#1D9E75',
  },
  {
    id: '8',
    type: 'user',
    title: 'New Customer Registration',
    message: 'Suresh Kumar from Erode has created a new account',
    time: '8 hours ago',
    read: true,
    priority: 'low',
    action: 'View Profile',
    actionLink: '#',
    avatar: '👤',
    avatarColor: '#378ADD',
  },
  {
    id: '9',
    type: 'promotion',
    title: 'Flash Sale Reminder',
    message: 'Your flash sale on Home Appliances starts tomorrow at 10 AM',
    time: '12 hours ago',
    read: true,
    priority: 'medium',
    action: 'Setup Promotion',
    actionLink: '#',
    avatar: '🎉',
    avatarColor: '#E86B9E',
  },
  {
    id: '10',
    type: 'order',
    title: 'Order Cancelled',
    message: 'Order #ORD-1080 has been cancelled by Karthik M',
    time: '1 day ago',
    read: true,
    priority: 'medium',
    action: 'View Details',
    actionLink: '#',
    avatar: '❌',
    avatarColor: '#E24B4A',
  },
  {
    id: '11',
    type: 'inventory',
    title: 'Inventory Report Ready',
    message: 'Monthly inventory report for June is now available for download',
    time: '2 days ago',
    read: true,
    priority: 'low',
    action: 'Download Report',
    actionLink: '#',
    avatar: '📊',
    avatarColor: '#1D9E75',
  },
  {
    id: '12',
    type: 'system',
    title: 'Security Alert',
    message: 'New login detected from a new device in Chennai',
    time: '3 days ago',
    read: true,
    priority: 'high',
    action: 'Review Activity',
    actionLink: '#',
    avatar: '🔒',
    avatarColor: '#7F77DD',
  },
]

// ─── Stats Cards ──────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(0,0,0,0.06)" }}
    className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4"
  >
    <div 
      className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
      style={{ background: color, color: 'white' }}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</div>
      <div className="text-xl font-semibold text-gray-800">{value}</div>
    </div>
  </motion.div>
)

// ─── Notification Item ────────────────────────────────────────────────────
const NotificationItem = ({ notification, onMarkRead, onDelete, isSelected }) => {
  const typeInfo = notificationTypes[notification.type] || notificationTypes.system
  const priorityColors = {
    high: { dot: RED, bg: RED_LIGHT },
    medium: { dot: '#EF9F27', bg: '#FFF8E7' },
    low: { dot: '#1D9E75', bg: '#E8F5EF' },
  }
  const priorityColor = priorityColors[notification.priority] || priorityColors.low

  return (
    <motion.div
      variants={listItem}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`relative rounded-xl p-4 transition-all cursor-pointer ${
        !notification.read ? 'bg-white border-l-4 border-red-500' : 'bg-white'
      } border border-gray-100 hover:border-gray-200`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar/Icon */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0"
          style={{ background: notification.avatarColor + '20', color: notification.avatarColor }}
        >
          {notification.avatar}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-semibold text-gray-800 truncate">
                  {notification.title}
                </h4>
                {!notification.read && (
                  <Badge dot className="flex-shrink-0" />
                )}
                <Tag 
                  color={priorityColor.dot}
                  className="text-xs flex-shrink-0"
                >
                  {notification.priority}
                </Tag>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <ClockCircleOutlined className="text-xs" />
                  {notification.time}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <TagOutlined className="text-xs" />
                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
              {!notification.read && (
                <Button
                  size="small"
                  type="text"
                  icon={<CheckOutlined />}
                  onClick={(e) => {
                    e.stopPropagation()
                    onMarkRead(notification.id)
                  }}
                  className="text-green-600 hover:text-green-700"
                />
              )}
              <Button
                size="small"
                type="text"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(notification.id)
                }}
                className="text-gray-400 hover:text-red-500"
              />
            </div>
          </div>

          {/* Action Button */}
          {notification.action && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3"
            >
              <Button
                size="small"
                type="primary"
                ghost
                style={{ borderColor: RED, color: RED }}
                className="text-xs"
              >
                {notification.action}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main NotificationPage ───────────────────────────────────────────────
const NotificationPage = () => {
  const [notifications, setNotifications] = useState(allNotifications)
  const [activeTab, setActiveTab] = useState('all')
  const [isSelectMode, setIsSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])

  // Stats
  const total = notifications.length
  const unread = notifications.filter(n => !n.read).length
  const highPriority = notifications.filter(n => n.priority === 'high' && !n.read).length
  const today = notifications.filter(n => n.time.includes('minute') || n.time.includes('hour')).length

  // Filter notifications
  const getFilteredNotifications = () => {
    let filtered = notifications

    switch (activeTab) {
      case 'unread':
        filtered = filtered.filter(n => !n.read)
        break
      case 'read':
        filtered = filtered.filter(n => n.read)
        break
      case 'high':
        filtered = filtered.filter(n => n.priority === 'high')
        break
      case 'order':
      case 'revenue':
      case 'inventory':
      case 'system':
      case 'user':
      case 'promotion':
        filtered = filtered.filter(n => n.type === activeTab)
        break
      default:
        break
    }

    return filtered
  }

  const filteredNotifications = getFilteredNotifications()

  // Handlers
  const handleMarkRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const handleDeleteSelected = () => {
    setNotifications(prev => prev.filter(n => !selectedIds.includes(n.id)))
    setSelectedIds([])
    setIsSelectMode(false)
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id))
    }
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  // Tab items
  const tabItems = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: `Unread (${unread})` },
    { key: 'read', label: 'Read' },
    { key: 'high', label: 'High Priority' },
    { key: 'order', label: 'Orders' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'inventory', label: 'Inventory' },
  ]

  // Dropdown menu for bulk actions
  const bulkActionMenu = (
    <Menu>
      <Menu.Item key="1" icon={<CheckOutlined />} onClick={handleMarkAllRead}>
        Mark All as Read
      </Menu.Item>
      {selectedIds.length > 0 && (
        <Menu.Item key="2" icon={<DeleteOutlined />} onClick={handleDeleteSelected}>
          Delete Selected ({selectedIds.length})
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.main 
        className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
  

        {/* ── Stats Row ── */}
        {/* <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          variants={staggerContainer}
        >
          <StatCard
            icon={<BellOutlined />}
            label="Total"
            value={total}
            color="#7F77DD"
          />
          <StatCard
            icon={<MailOutlined />}
            label="Unread"
            value={unread}
            color={RED}
          />
          <StatCard
            icon={<WarningOutlined />}
            label="High Priority"
            value={highPriority}
            color="#EF9F27"
          />
          <StatCard
            icon={<ClockCircleOutlined />}
            label="Today"
            value={today}
            color="#1D9E75"
          />
        </motion.div> */}

        {/* ── Tabs & Filters ── */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-xl border border-gray-100 p-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              className="notification-tabs w-full sm:w-auto"
              size="small"
              tabBarStyle={{ 
                marginBottom: 0,
                borderBottom: 'none',
              }}
            />
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Switch
                checked={isSelectMode}
                onChange={setIsSelectMode}
                size="small"
                className="flex-shrink-0"
              />
              <span className="text-xs text-gray-500 flex-shrink-0">Select</span>
              {isSelectMode && (
                <div className="flex items-center gap-2 ml-2">
                  <Button
                    size="small"
                    onClick={handleSelectAll}
                    className="text-xs"
                  >
                    {selectedIds.length === filteredNotifications.length ? 'Deselect All' : 'Select All'}
                  </Button>
                  {selectedIds.length > 0 && (
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={handleDeleteSelected}
                      className="text-xs"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Notification List ── */}
        <motion.div 
          variants={fadeInUp}
          className="space-y-3"
        >
          {filteredNotifications.length > 0 ? (
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="relative">
                  {isSelectMode && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(notification.id)}
                        onChange={() => toggleSelect(notification.id)}
                        className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500 cursor-pointer"
                      />
                    </div>
                  )}
                  <div className={isSelectMode ? 'pl-8' : ''}>
                    <NotificationItem
                      notification={notification}
                      onMarkRead={handleMarkRead}
                      onDelete={handleDelete}
                      isSelected={selectedIds.includes(notification.id)}
                    />
                  </div>
                </div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border border-gray-100 p-12 text-center"
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div>
                    <p className="text-gray-500 text-base font-medium">No notifications</p>
                    <p className="text-gray-400 text-sm">You're all caught up!</p>
                  </div>
                }
              >
                <Button 
                  type="primary"
                  style={{ background: RED, borderColor: RED }}
                  onClick={() => setActiveTab('all')}
                >
                  View All Notifications
                </Button>
              </Empty>
            </motion.div>
          )}
        </motion.div>

        {/* ── Load More ── */}
        {filteredNotifications.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="flex justify-center"
          >
            <Button 
              type="ghost"
              className="border-gray-200 hover:border-red-300"
            >
              Load More Notifications
            </Button>
          </motion.div>
        )}
      </motion.main>
    </div>
  )
}

export default NotificationPage
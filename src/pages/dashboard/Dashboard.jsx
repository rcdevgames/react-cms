import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const Dashboard = () => {
  // Data untuk revenue chart (dummy data)
  const revenueData = {
    today: 2850000,
    yesterday: 2450000,
    lastWeek: 18500000,
    thisMonth: 76500000,
    lastMonth: 72000000
  }

  // Data untuk sales chart
  const salesData = [
    { name: 'Senin', sales: 2450000 },
    { name: 'Selasa', sales: 2850000 },
    { name: 'Rabu', sales: 3100000 },
    { name: 'Kamis', sales: 2900000 },
    { name: 'Jumat', sales: 3500000 },
    { name: 'Sabtu', sales: 4200000 },
    { name: 'Minggu', sales: 3800000 },
  ]

  // Data untuk product pie chart
  const productData = [
    { name: 'Nasi Goreng Spesial', value: 142 },
    { name: 'Ayam Bakar Madu', value: 98 },
    { name: 'Es Teh Manis', value: 234 },
    { name: 'Sate Ayam', value: 87 },
    { name: 'Juice Alpukat', value: 76 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const formatToRupiah = (value) => {
    return `Rp ${value.toLocaleString('id-ID')}`
  }

  // Top selling menu items
  const topSellingItems = [
    { name: 'Nasi Goreng Spesial', sold: 142, revenue: 2840000 },
    { name: 'Ayam Bakar Madu', sold: 98, revenue: 2450000 },
    { name: 'Es Teh Manis', sold: 234, revenue: 1170000 },
    { name: 'Sate Ayam', sold: 87, revenue: 1740000 },
    { name: 'Juice Alpukat', sold: 76, revenue: 912000 }
  ]

  // Recent orders
  const recentOrders = [
    { id: '#ORD001', table: 'Meja 12', items: 4, total: 185000, status: 'completed', time: '5 mins ago' },
    { id: '#ORD002', table: 'Meja 08', items: 2, total: 95000, status: 'in-progress', time: '12 mins ago' },
    { id: '#ORD003', table: 'Take Away', items: 3, total: 145000, status: 'completed', time: '25 mins ago' },
    { id: '#ORD004', table: 'Meja 15', items: 5, total: 275000, status: 'completed', time: '34 mins ago' }
  ]

  // Low stock alerts
  const lowStockItems = [
    { name: 'Ayam Fillet', current: 2, minimum: 5, unit: 'kg' },
    { name: 'Beras', current: 10, minimum: 25, unit: 'kg' },
    { name: 'Minyak Goreng', current: 5, minimum: 10, unit: 'liter' }
  ]

  const stats = [
    {
      title: 'Today\'s Revenue',
      value: `Rp ${(revenueData.today).toLocaleString('id-ID')}`,
      change: '+16%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Orders Today',
      value: '86',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Average Order Value',
      value: 'Rp 145.000',
      change: '+5%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Monthly Target',
      value: '85%',
      change: 'Rp 15jt to go',
      changeType: 'neutral',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Owner!</h2>
        <p className="text-blue-100">Berikut ringkasan bisnis F&B Anda hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">from last month</span>
                </div>
              </div>
              <div className="text-blue-400">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Top Selling Menu</h3>
          <div className="space-y-4">
            {topSellingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.sold} terjual</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">Rp {item.revenue.toLocaleString('id-ID')}</p>
                  <p className="text-gray-400 text-sm">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Orders & Low Stock */}
        <div className="space-y-6">
          {/* Recent Orders */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Pesanan Terbaru</h3>
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'completed' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                    <div>
                      <p className="text-white font-medium">{order.table}</p>
                      <p className="text-gray-400 text-xs">{order.id} • {order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">Rp {order.total.toLocaleString('id-ID')}</p>
                    <p className="text-gray-400 text-xs">{order.items} items</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Stok Menipis</h3>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border-l-4 border-red-500">
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-400 text-sm">Minimum: {item.minimum} {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-bold">{item.current} {item.unit}</p>
                    <p className="text-gray-400 text-xs">Sisa stok</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold text-white">Grafik Penjualan Minggu Ini</h3>
            <select className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-1 text-sm w-full sm:w-auto">
              <option value="week">Mingguan</option>
              <option value="month">Bulanan</option>
            </select>
          </div>
          <div className="h-[300px] sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{
                  top: 20,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  tickFormatter={formatToRupiah}
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  formatter={(value) => formatToRupiah(value)}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Bar dataKey="sales" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Performance Pie Chart */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Performa Produk</h3>
          </div>
          <div className="h-[300px] sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <Legend 
                  formatter={(value, entry) => <span style={{ color: '#9CA3AF' }}>{value}</span>}
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Ringkasan Pendapatan</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Hari Ini</p>
              <p className="text-white font-medium text-lg sm:text-xl">Rp {revenueData.today.toLocaleString('id-ID')}</p>
              <p className="text-green-400 text-sm mt-1">+{Math.round((revenueData.today - revenueData.yesterday) / revenueData.yesterday * 100)}% dari kemarin</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Minggu Ini</p>
              <p className="text-white font-medium text-lg sm:text-xl">Rp {revenueData.lastWeek.toLocaleString('id-ID')}</p>
              <p className="text-green-400 text-sm mt-1">+12% dari minggu lalu</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Bulan Ini</p>
              <p className="text-white font-medium text-lg sm:text-xl">Rp {revenueData.thisMonth.toLocaleString('id-ID')}</p>
              <p className="text-green-400 text-sm mt-1">+6% dari bulan lalu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
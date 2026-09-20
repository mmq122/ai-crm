import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const isActive = (p: string) => location.pathname === p
  
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex w-full" dir="rtl">
      <aside className="w-[280px] min-w-[280px] bg-white border-l border-gray-200 flex flex-col h-screen sticky top-0">
        <div className="p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white font-bold">◈</div>
            <div>
              <h1 className="font-bold text-sm">نظام التذاكر الذكي</h1>
              <p className="text-[11px] text-gray-500">AI-CRM v2.0 • 127 تذكرة</p>
            </div>
          </div>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full">LIVE</span>
            <div className="text-left">
              <p className="text-xs font-bold">الإيجنت يشتغل 24/7</p>
              <p className="text-[10px] text-gray-500">يعالج التذاكر تلقائياً</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <Link to="/dashboard" className={`flex items-center justify-between p-3 rounded-xl ${isActive('/dashboard') ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">الرئيسية</span>
          </Link>
          <Link to="/tickets" className={`flex items-center justify-between p-3 rounded-xl ${isActive('/tickets') ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">التذاكر</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">127</span>
          </Link>
          <Link to="/agent-monitor" className={`flex items-center justify-between p-3 rounded-xl ${isActive('/agent-monitor') ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">الوكيل المراقب</span>
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">6</span>
          </Link>
          <Link to="/maturity" className={`flex items-center justify-between p-3 rounded-xl ${isActive('/maturity') ? 'bg-green-600 text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">نضج النظام</span>
          </Link>
          <Link to="/reports" className={`p-3 rounded-xl block ${isActive('/reports') ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">التحليلات</span>
          </Link>
          <Link to="/users" className={`p-3 rounded-xl block ${isActive('/users') ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">الفريق</span>
          </Link>
          <Link to="/system-tests" className={`p-3 rounded-xl block ${isActive('/system-tests') ? 'bg-black text-white' : 'hover:bg-gray-50'}`}>
            <span className="text-sm">اختبارات النظام</span>
          </Link>
        </nav>

        <div className="p-3 border-t flex items-center justify-between">
          <button className="text-xs border px-3 py-1.5 rounded-lg">خروج</button>
          <div className="flex items-center gap-2">
            <div className="text-left">
              <p className="text-xs font-bold">مدير النظام</p>
              <p className="text-[10px] text-green-600">● متصل</p>
            </div>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs">م</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}

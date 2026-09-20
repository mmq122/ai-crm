export default function Reports(){
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="bg-black text-white px-4 py-2 rounded-xl text-xs">اليوم</button>
          <button className="bg-white border px-4 py-2 rounded-xl text-xs">هذا الأسبوع</button>
          <button className="bg-white border px-4 py-2 rounded-xl text-xs">هذا الشهر</button>
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold">📊 التحليلات - إحصائيات شاملة</h1>
          <p className="text-xs text-gray-500 mt-1">تذاكر • رضا المستخدمين • حالة النظام • تحديث لحظي</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold text-sm flex justify-between"><span>💌 التذاكر</span><span className="bg-black text-white text-[10px] px-2 py-1 rounded-full">127 إجمالي</span></h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-red-50 border rounded-xl p-3 text-center"><p className="text-xl font-bold text-red-500">8</p><p className="text-[11px]">جديد</p></div>
            <div className="bg-yellow-50 border rounded-xl p-3 text-center"><p className="text-xl font-bold text-yellow-600">12</p><p className="text-[11px]">قيد العمل</p></div>
            <div className="bg-blue-50 border rounded-xl p-3 text-center"><p className="text-xl font-bold text-blue-600">15</p><p className="text-[11px]">بانتظار العميل</p></div>
            <div className="bg-green-50 border rounded-xl p-3 text-center"><p className="text-xl font-bold text-green-600">92</p><p className="text-[11px]">تم الحل</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold text-sm flex justify-between"><span>😊 رضا المستخدمين</span><span className="bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full">94%+ 5%</span></h3>
          <p className="text-4xl font-bold text-center mt-6">94%</p>
          <p className="text-xs text-gray-500 text-center">معدل الرضا العام</p>
        </div>
        <div className="bg-white rounded-2xl border p-5">
          <h3 className="font-bold text-sm">⚙️ حالة النظام</h3>
          <div className="space-y-3 mt-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex justify-between"><span className="text-xs">⏱️ وقت التشغيل</span><span className="text-sm font-bold text-green-600">99.8%</span></div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex justify-between"><span className="text-xs">⚡ سرعة الاستجابة</span><span className="text-sm font-bold text-blue-600">45ms</span></div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex justify-between"><span className="text-xs">🤖 دقة AI</span><span className="text-sm font-bold text-purple-600">92.3%</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

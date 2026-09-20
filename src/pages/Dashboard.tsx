export default function Dashboard(){
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">نظرة عامة</h1>
          <p className="text-sm text-gray-500 mt-1">ملخص أداء اليوم - 27 مايو 2026</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs bg-green-50 border border-green-200 px-3 py-1.5 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            بيئة عمل هادئة
          </span>
          <button className="text-xs bg-black text-white px-4 py-2 rounded-full">التذاكر</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-xs text-gray-500">قيد المعالجة</p>
          <p className="text-3xl font-bold mt-2 text-orange-500">12</p>
          <p className="text-[11px] text-gray-400 mt-1">بواسطة الفريق</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-xs text-gray-500">بانتظار العميل</p>
          <p className="text-3xl font-bold mt-2 text-blue-500">15</p>
          <p className="text-[11px] text-gray-400 mt-1">ينتظر رد</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-xs text-gray-500">تم الحل اليوم</p>
          <p className="text-3xl font-bold mt-2 text-green-500">23</p>
          <p className="text-[11px] text-gray-400 mt-1">مكتملة</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-xs text-gray-500">جديد</p>
          <p className="text-3xl font-bold mt-2">35</p>
          <p className="text-[11px] text-gray-400 mt-1">تذكرة</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-10 text-center">
        <p className="text-sm text-gray-500">لوحة التحكم جاهزة - قائمة واحدة فقط بدون تكرار</p>
      </div>
    </div>
  )
}

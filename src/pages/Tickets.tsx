export default function Tickets(){
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">التذاكر • 127 تذكرة حقيقية • كل حالة بعمود</h1>
          <p className="text-xs text-gray-500 mt-1">اسحب بين الأعمدة • 0 تلقائيا كل 15 ثانية</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">+ إضافة يدوية</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border p-4">
          <h3 className="font-bold text-sm flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full"></span>جديد 35</h3>
          <div className="mt-4 space-y-3">
            <div className="border rounded-xl p-3"><p className="text-xs font-bold">T-127 خطأ 500 في تسجيل الدخول</p><p className="text-[11px] text-gray-500 mt-1">عاجلة • تقني • أحمد</p></div>
            <div className="border rounded-xl p-3"><p className="text-xs font-bold">T-126 قاعدة البيانات بطيئة 4 ثواني</p><p className="text-[11px] text-gray-500 mt-1">عاجلة • أداء • خالد</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border p-4">
          <h3 className="font-bold text-sm flex items-center gap-2"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span>قيد العمل 35</h3>
        </div>
        <div className="bg-white rounded-2xl border p-4">
          <h3 className="font-bold text-sm flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span>بانتظار 30</h3>
        </div>
        <div className="bg-white rounded-2xl border p-4">
          <h3 className="font-bold text-sm flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>تم الحل 27</h3>
        </div>
      </div>
    </div>
  )
}

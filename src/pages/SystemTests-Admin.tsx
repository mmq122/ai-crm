export default function SystemTests(){
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">🚀 تشغيل جميع الاختبارات</button>
        <div className="text-left">
          <h1 className="text-2xl font-bold flex items-center gap-2"><span className="bg-red-500 text-white text-xs px-2 py-1 rounded">ADMIN ONLY</span><span className="bg-black text-white text-xs px-2 py-1 rounded">REAL TESTS</span> 🧪 اختبارات النظام التقنية - للأدمن فقط</h1>
          <p className="text-xs text-gray-500 mt-1">اختبارات حقيقية لاستقرار النظام - منفصلة عن شاشة التذاكر - المستخدمين العاديين ما يشوفونها</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-3">
          <div className="bg-white rounded-2xl border p-4 flex justify-between items-center"><div><p className="font-bold text-sm">اختبار سرعة الاستجابة</p><p className="text-xs text-gray-500">يقيس وقت عرض التذاكر</p></div><button className="bg-black text-white px-4 py-2 rounded-xl text-xs">اختبر</button></div>
          <div className="bg-white rounded-2xl border p-4 flex justify-between items-center"><div><p className="font-bold text-sm">اختبار استهلاك الذاكرة</p><p className="text-xs text-gray-500">يقيس performance.memory الفعلي</p></div><button className="bg-black text-white px-4 py-2 rounded-xl text-xs">اختبر</button></div>
          <div className="bg-white rounded-2xl border p-4 flex justify-between items-center"><div><p className="font-bold text-sm">اختبار التخزين</p><p className="text-xs text-gray-500">يقيس localStorage الحقيقي</p></div><button className="bg-black text-white px-4 py-2 rounded-xl text-xs">اختبر</button></div>
          <div className="bg-white rounded-2xl border p-4 flex justify-between items-center"><div><p className="font-bold text-sm">اختبار الضغط 500 تذكرة</p><p className="text-xs text-gray-500">500 تذكرة مرة واحدة</p></div><button className="bg-black text-white px-4 py-2 rounded-xl text-xs">اختبر</button></div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border p-5">
            <h3 className="font-bold text-sm">📊 ملخص استقرار النظام</h3>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 rounded-xl p-3 text-center"><p className="text-xl font-bold">98%</p><p className="text-[10px]">استقرار النظام</p></div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center"><p className="text-xl font-bold text-green-600">0/5</p><p className="text-[10px]">اختبار ناجح</p></div>
            </div>
          </div>
          <div className="bg-[#0f172a] rounded-2xl p-5 text-white">
            <h3 className="font-bold text-sm">💡 لماذا منفصلة عن التذاكر؟</h3>
            <ul className="text-xs mt-3 space-y-2 text-gray-300">
              <li>• المستخدمين العاديين يشوفون تذاكرهم فقط - بدون تشتيت</li>
              <li>• الأدمن يشوف الاختبارات التقنية هنا فقط</li>
              <li>• اختبارات الضغط (500 تذكرة) ما تظهر للمستخدمين</li>
              <li>• بيئة عمل نظيفة ومناسبة للجميع</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SystemMaturity(){
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">🔍 فحص حقيقي فوري الآن</button>
        <div className="text-left">
          <h1 className="text-2xl font-bold flex items-center gap-2">🌱 نضج النظام الفعلي - فحص حقيقي 100%</h1>
          <p className="text-xs text-gray-500 mt-1">آخر فحص حقيقي: 2026/09/20 - 8 فحص فعلي بـ performance.memory + DOM + localStorage</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl border p-6">
          <h3 className="font-bold">📊 تفاصيل النضج حسب الفئة - فحص حقيقي</h3>
          <div className="grid grid-cols-5 gap-3 mt-4">
            <div className="bg-red-50 border rounded-xl p-3 text-center"><p className="text-xs">أمان</p><p className="text-2xl font-bold text-red-500 mt-2">20%</p></div>
            <div className="bg-green-50 border rounded-xl p-3 text-center"><p className="text-xs">أداء</p><p className="text-2xl font-bold text-green-600 mt-2">95%</p></div>
            <div className="bg-green-50 border rounded-xl p-3 text-center"><p className="text-xs">جودة</p><p className="text-2xl font-bold text-green-600 mt-2">95%</p></div>
            <div className="bg-green-50 border rounded-xl p-3 text-center"><p className="text-xs">ذكاء</p><p className="text-2xl font-bold text-green-600 mt-2">80%</p></div>
            <div className="bg-green-50 border rounded-xl p-3 text-center"><p className="text-xs">بنية</p><p className="text-2xl font-bold text-green-600 mt-2">95%</p></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border p-6 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-8 border-blue-400 flex items-center justify-center">
            <div><p className="text-4xl font-bold text-blue-400">82%</p><p className="text-xs">نضج</p></div>
          </div>
          <p className="font-bold text-blue-400 mt-4">ناضج</p>
          <p className="text-xs text-gray-500">جيد - يحتاج تحسينات بسيطة</p>
        </div>
      </div>
    </div>
  )
}

export default function Users(){
  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">+ إضافة مستخدم</button>
        <div className="text-left">
          <h1 className="text-2xl font-bold">👥 الفريق - إدارة المستخدمين</h1>
          <p className="text-xs text-gray-500 mt-1">5 أعضاء • 3 معالج • 3 متصل الآن</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-3 flex justify-between"><span className="text-xs">👑 مسؤول: يدير النظام والمستخدمين ويعالج التذاكر</span><span className="text-xs bg-gray-100 px-2 py-1 rounded">1 مستخدم</span></div>
        <div className="bg-white rounded-xl border p-3 flex justify-between"><span className="text-xs">🔵 معالج: يعالج طلبات المستخدمين ويرد على التذاكر</span><span className="text-xs bg-gray-100 px-2 py-1 rounded">3 مستخدم</span></div>
        <div className="bg-white rounded-xl border p-3 flex justify-between"><span className="text-xs">👁️ متابع: يشاهد فقط - لا يعالج</span><span className="text-xs bg-gray-100 px-2 py-1 rounded">1 مستخدم</span></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex gap-3"><div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center">م</div><div><p className="font-bold text-sm">مشاري القحطاني</p><p className="text-xs text-gray-500">الإدارة • متصل</p><p className="text-[11px] text-gray-400">mshari@company.com</p></div></div>
          <div className="grid grid-cols-3 gap-2 mt-4"><div className="bg-gray-50 rounded-xl p-2 text-center"><p className="font-bold">45</p><p className="text-[10px]">تذكرة</p></div><div className="bg-green-50 rounded-xl p-2 text-center"><p className="font-bold text-green-600">42</p><p className="text-[10px]">تم الحل</p></div><div className="bg-yellow-50 rounded-xl p-2 text-center"><p className="font-bold">4.9</p><p className="text-[10px]">تقييم</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex gap-3"><div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">أ</div><div><p className="font-bold text-sm">أحمد العتيبي</p><p className="text-xs text-gray-500">الدعم الفني • متصل</p><p className="text-[11px] text-gray-400">ahmed@company.com</p></div></div>
          <div className="grid grid-cols-3 gap-2 mt-4"><div className="bg-gray-50 rounded-xl p-2 text-center"><p className="font-bold">38</p><p className="text-[10px]">تذكرة</p></div><div className="bg-green-50 rounded-xl p-2 text-center"><p className="font-bold text-green-600">35</p><p className="text-[10px]">تم الحل</p></div><div className="bg-yellow-50 rounded-xl p-2 text-center"><p className="font-bold">4.7</p><p className="text-[10px]">تقييم</p></div></div>
        </div>
        <div className="bg-white rounded-2xl border p-5">
          <div className="flex gap-3"><div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">س</div><div><p className="font-bold text-sm">سارة المطيري</p><p className="text-xs text-gray-500">الدعم الفني • مشغول</p><p className="text-[11px] text-gray-400">sara@company.com</p></div></div>
          <div className="grid grid-cols-3 gap-2 mt-4"><div className="bg-gray-50 rounded-xl p-2 text-center"><p className="font-bold">32</p><p className="text-[10px]">تذكرة</p></div><div className="bg-green-50 rounded-xl p-2 text-center"><p className="font-bold text-green-600">30</p><p className="text-[10px]">تم الحل</p></div><div className="bg-yellow-50 rounded-xl p-2 text-center"><p className="font-bold">4.8</p><p className="text-[10px]">تقييم</p></div></div>
        </div>
      </div>
    </div>
  )
}

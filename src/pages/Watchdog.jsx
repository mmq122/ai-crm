import { useState } from 'react';

export default function Watchdog() {
  const [fixed, setFixed] = useState(false);
  return (
    <div className="p-6 max-w-4xl mx-auto" dir="rtl">
      <div className="mb-6">
        <h1 className="text-xl font-bold">مركز الأمان <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mr-2">{fixed ? 'تم' : '1 تحتاجك'}</span></h1>
        <p className="text-sm text-gray-500 mt-1">الحارس الذكي يراقب تلقائيا</p>
      </div>
      <div className={`bg-white border rounded-2xl p-5 ${fixed ? 'border-green-200 bg-green-50' : 'border-red-200'}`}>
        <h3 className="font-bold text-sm">{fixed ? 'تم الاصلاح بنجاح' : 'محاولة ادخال كود ضار'}</h3>
        <p className="text-xs text-gray-600 mt-1">{fixed ? 'نظفنا الكود وحفظنا التقرير' : 'منعنا كود خطير في تعليق عميل'}</p>
        {!fixed && (
          <button onClick={() => setFixed(true)} className="w-full bg-black text-white py-3 rounded-xl mt-5 font-bold text-sm">اصلاح وتوثيق</button>
        )}
      </div>
    </div>
  )
}
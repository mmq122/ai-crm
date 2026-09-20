import { useState } from 'react';

export default function AgentMonitor() {
  const [fixed, setFixed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              الوكيل المراقب
              {!fixed && <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">1 تحتاجك</span>}
              {fixed && <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">كل شيء تمام</span>}
            </h1>
            <p className="text-sm text-gray-500 mt-2">الحارس الذكي يراقب النظام لحظيا</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white border px-4 py-2 rounded-xl text-sm">مسح الاشعارات</button>
            <button className="bg-black text-white px-4 py-2 rounded-xl text-sm">فحص الان</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border p-5">
              <h3 className="font-bold text-sm">تقارير الاصلاح</h3>
              <div className="mt-6 border-2 border-dashed rounded-xl p-8 text-center">
                {fixed ? (
                  <div className="text-green-600">
                    <p className="text-2xl">✅</p>
                    <p className="text-xs font-bold mt-2">تم اصلاح المشكلة</p>
                    <p className="text-[11px] text-gray-500 mt-1">{new Date().toLocaleString('ar-SA')}</p>
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <p className="text-xs">لا يوجد تقارير بعد</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center">
                <h3 className="font-bold">المشاكل</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">فحص حقيقي</span>
              </div>

              <div className={`p-5 ${fixed ? 'bg-green-50' : 'bg-red-50/50'}`}>
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${fixed ? 'bg-green-500' : 'bg-red-500'}`}>{fixed ? '✓' : '!'}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{fixed ? 'تم حل المشكلة' : 'ثغرة XSS محتملة'}</h4>
                    <p className="text-xs text-gray-600 mt-2">{fixed ? 'تم تنظيف الكود وحفظ التقرير' : 'فحص: اختبار ادخال يحتاج تنظيف'}</p>
                    {!fixed && (
                      <button onClick={() => setFixed(true)} className="w-full bg-black text-white py-3 rounded-xl mt-4 font-bold text-sm">اصلاح وتوثيق</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

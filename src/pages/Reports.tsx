import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function ReportsAnalytics(){
  const [timeRange, setTimeRange] = useState('اليوم')
  
  const stats = {
    tickets: { total: 127, new: 8, inProgress: 12, waiting: 15, solved: 92, urgent: 3 },
    satisfaction: { score: 94, happy: 78, neutral: 32, angry: 17, trend: '+5%' },
    system: { uptime: '99.8%', response: '45ms', aiAccuracy: '92.3%', errors: 2 }
  }

  return (
    <Layout activePath="/reports">
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>📊 التحليلات - إحصائيات شاملة</h2>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>تذاكر • رضا المستخدمين • حالة النظام • تحديث لحظي</p>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['اليوم','هذا الأسبوع','هذا الشهر'].map(r=>(
              <button key={r} onClick={()=>setTimeRange(r)} style={{ padding: '7px 12px', borderRadius: '8px', border: timeRange===r ? 'none' : '1px solid #e2e8f0', background: timeRange===r ? '#0f172a' : 'white', color: timeRange===r ? 'white' : '#475569', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>
        {/* Top Stats - 3 categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
          {/* Tickets Stats */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>🎫 التذاكر</h3>
              <span style={{ fontSize: '10px', background: '#0f172a', color: 'white', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>{stats.tickets.total} إجمالي</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#dc2626' }}>{stats.tickets.new}</div>
                <div style={{ fontSize: '10px', color: '#991b1b' }}>جديد</div>
              </div>
              <div style={{ padding: '10px', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fde68a', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#d97706' }}>{stats.tickets.inProgress}</div>
                <div style={{ fontSize: '10px', color: '#92400e' }}>قيد العمل</div>
              </div>
              <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb' }}>{stats.tickets.waiting}</div>
                <div style={{ fontSize: '10px', color: '#1e40af' }}>بانتظار العميل</div>
              </div>
              <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#16a34a' }}>{stats.tickets.solved}</div>
                <div style={{ fontSize: '10px', color: '#166534' }}>تم الحل</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', padding: '10px', background: '#fef2f2', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#dc2626' }}>🔴 عاجلة تحتاج تدخل فوري</span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#dc2626' }}>{stats.tickets.urgent}</span>
            </div>
          </div>

          {/* Satisfaction */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>😊 رضا المستخدمين</h3>
              <span style={{ fontSize: '10px', background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>{stats.satisfaction.score}% {stats.satisfaction.trend}</span>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0f172a' }}>{stats.satisfaction.score}%</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>معدل الرضا العام</div>
              <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${stats.satisfaction.score}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '10px' }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#f0fdf4', borderRadius: '8px' }}>
                <div style={{ fontSize: '16px' }}>😊</div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{stats.satisfaction.happy}</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>راضي</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '16px' }}>😐</div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{stats.satisfaction.neutral}</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>محايد</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#fef2f2', borderRadius: '8px' }}>
                <div style={{ fontSize: '16px' }}>😡</div>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>{stats.satisfaction.angry}</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>غاضب</div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>⚙️ حالة النظام</h3>
              <span style={{ fontSize: '10px', background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>● يعمل</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>⏱️ وقت التشغيل</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>{stats.system.uptime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>⚡ سرعة الاستجابة</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb' }}>{stats.system.response}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>🤖 دقة AI</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#7c3aed' }}>{stats.system.aiAccuracy}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: stats.system.errors>0 ? '#fef2f2' : '#f0fdf4', borderRadius: '8px', border: `1px solid ${stats.system.errors>0 ? '#fecaca' : '#bbf7d0'}` }}>
                <span style={{ fontSize: '11px', fontWeight: 600 }}>⚠️ أخطاء تحتاج تدخل</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: stats.system.errors>0 ? '#dc2626' : '#16a34a' }}>{stats.system.errors}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 16px 0' }}>📈 التذاكر خلال {timeRange}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', padding: '0 10px' }}>
              {[12, 8, 15, 10, 18, 14, 22, 19, 25, 20, 28, 23].map((h,i)=>(
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '100%', height: `${h*4}px`, background: i===11 ? '#0f172a' : '#e2e8f0', borderRadius: '6px 6px 0 0', transition: 'all 0.3s' }}></div>
                  <span style={{ fontSize: '9px', color: '#94a3b8' }}>{i+1}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '11px' }}>
              <span>إجمالي {timeRange}: <strong>127 تذكرة</strong></span>
              <span>متوسط يومي: <strong>18 تذكرة</strong></span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>+12% عن السابق</span>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 14px 0' }}>🎯 أكثر المشاكل تكراراً - يتعلم منها الوكيل</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { problem: 'مشكلة تسجيل الدخول', count: 23, percent: 85, autoFix: true },
                { problem: 'بطء الموقع', count: 18, percent: 70, autoFix: true },
                { problem: 'استفسار فاتورة', count: 15, percent: 60, autoFix: false },
                { problem: 'مشكلة دفع', count: 12, percent: 50, autoFix: true },
              ].map((item,i)=>(
                <div key={i} style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>{item.problem}</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', background: 'white', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>{item.count} مرة</span>
                      {item.autoFix && <span style={{ fontSize: '9px', background: '#10b981', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>يُصلح تلقائياً</span>}
                    </div>
                  </div>
                  <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.percent}%`, height: '100%', background: item.autoFix ? '#10b981' : '#0f172a', borderRadius: '10px' }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', padding: '10px', background: '#f0fdf4', borderRadius: '8px', fontSize: '10px', color: '#166534', lineHeight: 1.6 }}>
              💡 <strong>الوكيل يتعلم:</strong> كل مشكلة متكررة يتم تدريب المودل عليها → يصلحها تلقائياً المرة القادمة بدون تدخلك
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

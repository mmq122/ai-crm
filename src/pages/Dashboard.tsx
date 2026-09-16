import { useState } from 'react'
import Layout from '../components/Layout'

export default function DashboardWork(){
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  
  const quickStats = [
    { label: 'التذاكر الجديدة', value: '8', icon: '📥', color: '#ef4444', action: 'تحتاج توزيع' },
    { label: 'قيد المعالجة', value: '12', icon: '⚙️', color: '#f59e0b', action: 'بواسطة الفريق' },
    { label: 'بانتظار العميل', value: '15', icon: '⏳', color: '#3b82f6', action: 'ينتظر رد' },
    { label: 'تم الحل اليوم', value: '23', icon: '✅', color: '#10b981', action: 'مكتملة' },
  ]

  const teamWorkload = [
    { name: 'أحمد العتيبي', role: 'معالج تقني', tickets: 5, status: 'يعمل', avatar: 'أ', color: '#2563eb' },
    { name: 'سارة المطيري', role: 'معالج مالي', tickets: 3, status: 'متاح', avatar: 'س', color: '#10b981' },
    { name: 'خالد الدوسري', role: 'معالج عام', tickets: 4, status: 'مشغول', avatar: 'خ', color: '#f59e0b' },
  ]

  const recentTickets = [
    { id: 'T-127', title: 'الخدمة معطلة عاجل!!!', customer: 'مشاري', priority: 'عاجلة', assigned: 'أحمد', time: 'الآن', color: '#ef4444' },
    { id: 'T-125', title: 'استفسار عن الفاتورة', customer: 'سارة', priority: 'متوسطة', assigned: 'سارة', time: 'قبل 3 ساعات', color: '#f59e0b' },
  ]

  return (
    <Layout activePath="/dashboard">
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '20px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>مرحباً {user.name?.split(' ')[0]||'مدير'} 👋 بيئة عمل منظمة ومريحة</h2>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0 0' }}>نظام يفرق بين مشاكل النظام ومشاكل المستخدمين • كل شيء في مكانه • بدون تشتيت</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', fontSize: '11px', color: '#166534' }}>
              <div style={{ fontWeight: 700 }}>● بيئة العمل</div>
              <div style={{ fontSize: '10px', marginTop: '2px' }}>هادئة ومنظمة</div>
            </div>
            <button onClick={()=>window.location.href='/tickets'} style={{ padding: '10px 16px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>📋 التذاكر</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 28px' }}>
        {/* Work-friendly stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
          {quickStats.map((s,i)=>(
            <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: s.color, marginTop: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{s.action}</div>
              </div>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: s.color+'15', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{s.icon}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
          {/* Tickets - Assigned clearly */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>🎫 التذاكر - موزعة على المسؤولين</h3>
              <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>كل تذكرة لها مسؤول</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentTickets.map(t=>(
                <div key={t.id} style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{t.title}</span>
                      <span style={{ fontSize: '9px', background: t.color+'15', color: t.color, padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>{t.priority}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>{t.id} • {t.customer} • {t.time} → يعالجها: <strong style={{ color: '#0f172a' }}>{t.assigned}</strong></div>
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', fontSize: '10px', cursor: 'pointer' }}>عرض</button>
                </div>
              ))}
            </div>
            <button onClick={()=>window.location.href='/tickets'} style={{ width: '100%', marginTop: '12px', padding: '10px', background: '#f8fafc', border: '1px dashed #e2e8f0', borderRadius: '8px', fontSize: '11px', color: '#64748b', cursor: 'pointer' }}>عرض كل التذاكر (127) → كل تذكرة لها مسؤول واضح</button>
          </div>

          {/* Team Workload - Clear */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '18px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 12px 0' }}>👥 الفريق - من يعالج ماذا؟ واضح</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {teamWorkload.map(m=>(
                  <div key={m.name} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.color+'15', color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>{m.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '11px', fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{m.role} • {m.status} • {m.tickets} تذاكر</div>
                    </div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.status==='يعمل' ? '#10b981' : m.status==='متاح' ? '#3b82f6' : '#f59e0b' }}></div>
                  </div>
                ))}
              </div>
              <button onClick={()=>window.location.href='/users'} style={{ width: '100%', marginTop: '10px', padding: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>إدارة الفريق →</button>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '12px', padding: '16px', color: 'white' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 8px 0' }}>✨ بيئة عمل مريحة ومنظمة</h3>
              <div style={{ fontSize: '11px', lineHeight: 1.6, opacity: 0.9 }}>
                ✓ <strong>فصل واضح:</strong><br/>
                مشاكل النظام (خلل/ثغرة) → يعالجها الوكيل تلقائياً<br/>
                مشاكل المستخدمين (تذاكر) → للمسؤول المختص<br/><br/>
                ✓ <strong>بدون تشتيت:</strong><br/>
                كل شيء في مكانه، تنبيهات ذكية فقط عند الحاجة<br/>
                واجهة هادئة ومريحة للعمل اليومي
              </div>
            </div>
          </div>
        </div>

        {/* System Health - Separated */}
        <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 12px 0' }}>🛡️ حالة النظام - يعالج نفسه تلقائياً</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '8px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#16a34a' }}>98%</div>
                <div style={{ fontSize: '10px', color: '#166534' }}>صحة النظام</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>يحدث نفسه تلقائياً</div>
              </div>
              <div style={{ padding: '10px', background: '#eff6ff', borderRadius: '8px', textAlign: 'center', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#2563eb' }}>24/7</div>
                <div style={{ fontSize: '10px', color: '#1e40af' }}>مراقبة مستمرة</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>بدون تدخلك</div>
              </div>
            </div>
            <button onClick={()=>window.location.href='/agent-monitor'} style={{ width: '100%', marginTop: '10px', padding: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>🛡️ شاشة مراقبة النظام →</button>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 12px 0' }}>📊 تحليلات العمل - إحصائيات مريحة</h3>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800 }}>94%</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>رضا العملاء</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800 }}>23</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>تم إصلاحه اليوم</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 800 }}>4h</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>وقت موفر</div>
              </div>
            </div>
            <button onClick={()=>window.location.href='/reports'} style={{ width: '100%', padding: '8px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}>📊 التحليلات الكاملة →</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

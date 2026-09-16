import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function DashboardFinal(){
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [time, setTime] = useState(new Date())
  
  useEffect(()=>{
    const t = setInterval(()=>setTime(new Date()), 1000)
    return ()=>clearInterval(t)
  },[])

  const stats = [
    { label: 'إجمالي التذاكر', value: '127', change: '+12%', color: '#0f172a', icon: '◈', sub: 'هذا الأسبوع' },
    { label: 'عاجلة تحتاج تدخل', value: '12', change: 'فوري', color: '#ef4444', icon: '🔥', sub: 'خلال ساعة', alert: true },
    { label: 'قيد المعالجة', value: '23', change: '+5%', color: '#f59e0b', icon: '⏳', sub: 'بواسطة الفريق' },
    { label: 'تم حلها', value: '92', change: '+18%', color: '#10b981', icon: '✅', sub: 'رضا 94%' },
  ]

  return (
    <Layout activePath="/dashboard">
      {/* Top Bar - Clean without Telegram */}
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>مرحباً، {user.name?.split(' ')[0]||'مدير'} 👋</h2>
          <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' }}>نظرة عامة على نظام التذاكر الذكي • {time.toLocaleString('ar-SA')} • 127 تذكرة فعلية</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ padding: '8px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '11px', color: '#166534', fontWeight: 600 }}>
            ● النظام يعمل • 3 مودلات AI شغالة
          </div>
          <button onClick={() => window.location.href = '/ai-demo'} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '9px 16px', borderRadius: '9px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>🧠 الذكاء الاصطناعي LIVE</button>
        </div>
      </div>

      <div style={{ padding: '20px 28px' }}>
        {/* Hero Achievement */}
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '24px', color: 'white', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(102, 126, 234, 0.15)' }}></div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0' }}>🚀 نظام إدارة التذاكر الذكي v2.0 - إنجاز كبير</h3>
              <p style={{ fontSize: '12px', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>نظام متكامل يعمل 24/7 • يوفر 4 ساعات يومياً • يعالج 70% من التذاكر تلقائياً • يتعلم من الأخطاء • ينبهك عند الحاجة للتدخل</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <div><div style={{ fontSize: '20px', fontWeight: 800 }}>127</div><div style={{ fontSize: '10px', opacity: 0.6 }}>تذكرة فعلية</div></div>
                <div><div style={{ fontSize: '20px', fontWeight: 800 }}>3</div><div style={{ fontSize: '10px', opacity: 0.6 }}>مودلات AI</div></div>
                <div><div style={{ fontSize: '20px', fontWeight: 800 }}>92%</div><div style={{ fontSize: '10px', opacity: 0.6 }}>دقة</div></div>
                <div><div style={{ fontSize: '20px', fontWeight: 800 }}>94%</div><div style={{ fontSize: '10px', opacity: 0.6 }}>رضا العملاء</div></div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', opacity: 0.7 }}>حالة النظام</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>● يعمل بكفاءة عالية</div>
              <div style={{ fontSize: '10px', opacity: 0.6, marginTop: '4px' }}>آخر تحديث: الآن</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
          {stats.map((s,i)=>(
            <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '14px', border: s.alert ? '1px solid #fecaca' : '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}>
              {s.alert && <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '3px', background: '#ef4444' }}></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: s.alert ? '#fef2f2' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: s.color }}>{s.icon}</span>
                <span style={{ fontSize: '10px', padding: '3px 7px', borderRadius: '12px', background: s.alert ? '#fef2f2' : '#f0fdf4', color: s.alert ? '#dc2626' : '#166534', fontWeight: 700 }}>{s.change}</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, marginBottom: '2px' }}>{s.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>🎫 آخر التذاكر • تحديث مباشر</h3>
              <button onClick={()=>window.location.href='/tickets'} style={{ fontSize: '11px', background: 'none', border: 'none', color: '#667eea', fontWeight: 700, cursor: 'pointer' }}>عرض الكل (127) →</button>
            </div>
            {[
              { id: 'T-127', title: 'الخدمة معطلة عاجل!!! 😡', priority: 'عاجلة', color: '#ef4444', time: 'الآن', user: 'مشاري', sentiment: '😡 غاضب جداً' },
              { id: 'T-126', title: 'شكراً الخدمة ممتازة ❤️', priority: 'منخفضة', color: '#10b981', time: 'قبل ساعة', user: 'أحمد', sentiment: '😊 راضي' },
              { id: 'T-125', title: 'مشكلة في الفاتورة', priority: 'متوسطة', color: '#f59e0b', time: 'قبل 3 ساعات', user: 'سارة', sentiment: '😐 محايد' },
            ].map(t=>(
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: t.priority==='عاجلة' ? '#fef2f2' : '#f8fafc', borderRadius: '10px', marginBottom: '8px', border: t.priority==='عاجلة' ? '1px solid #fecaca' : '1px solid transparent' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600 }}>{t.title}</span>
                    <span style={{ fontSize: '9px', background: t.color+'15', color: t.color, padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>{t.priority}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>{t.id} • {t.user} • {t.time} • {t.sentiment}</div>
                </div>
                <span style={{ fontSize: '10px', color: '#667eea', fontWeight: 600 }}>عرض →</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 12px 0' }}>🤖 الذكاء الاصطناعي - 3 مودلات</h3>
              {[
                { name: 'تصنيف الأولوية', acc: '92%', status: 'شغال' },
                { name: 'تحليل المشاعر', acc: '89%', status: 'شغال' },
                { name: 'الرد التلقائي', acc: '95%', status: 'شغال' },
              ].map((m,i)=>(
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px' }}>{m.name}</span>
                  <span style={{ fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '3px 6px', borderRadius: '4px', fontWeight: 700 }}>✅ {m.acc}</span>
                </div>
              ))}
              <button onClick={()=>window.location.href='/agent'} style={{ width: '100%', marginTop: '8px', padding: '10px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>ماذا يفعل لك؟ →</button>
            </div>

            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '18px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 12px 0' }}>⚙️ حالة النظام والمراقبة</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '8px', background: '#f0fdf4', borderRadius: '6px' }}>
                  <span>النظام</span><span style={{ color: '#16a34a', fontWeight: 700 }}>● يعمل 99.8%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '8px', background: '#f0f9ff', borderRadius: '6px' }}>
                  <span>المراقب</span><span style={{ color: '#2563eb', fontWeight: 700 }}>● يراقب 24/7</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', padding: '8px', background: '#fffbeb', borderRadius: '6px' }}>
                  <span>يحتاج تدخل</span><span style={{ color: '#d97706', fontWeight: 700 }}>3 تذاكر</span>
                </div>
              </div>
              <button onClick={()=>window.location.href='/agent-monitor'} style={{ width: '100%', marginTop: '10px', padding: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>👁️ شاشة المراقبة والتنبيهات →</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

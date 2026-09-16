import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function AgentMonitorEnhanced(){
  const [isAutoRunning, setIsAutoRunning] = useState(true)
  const [alerts, setAlerts] = useState([
    { id: 1, time: 'الآن', type: 'critical', title: '🔴 تذكرة عاجلة تحتاج تدخل فوري', ticket: 'T-127', detail: 'عميل غاضب جداً - الخدمة معطلة - ثقة AI منخفضة 62%', action: 'تدخل فوري', needsManual: true },
    { id: 2, time: 'قبل دقيقتين', type: 'warning', title: '⚠️ خطأ متكرر مكتشف', ticket: 'T-123', detail: 'مشكلة تسجيل دخول تتكرر 5 مرات اليوم - يحتاج إصلاح نظام', action: 'فحص النظام', needsManual: true },
    { id: 3, time: 'قبل 5 دقائق', type: 'info', title: '🤖 تم الإصلاح التلقائي', ticket: 'T-125', detail: 'تم تصحيح الأولوية وتصنيفها وإعادة توجيهها تلقائياً', action: 'تم', needsManual: false },
  ])
  const [logs, setLogs] = useState([
    { time: '12:34:01', type: 'auto', action: 'تم إصلاح تلقائي', ticket: 'T-127', detail: 'تصحيح الأولوية: متوسط → عاجلة (95%)', status: 'fixed' },
    { time: '12:34:02', type: 'monitor', action: 'مراقبة', ticket: 'T-126', detail: 'تحليل المشاعر: راضي (95%) - لا يحتاج تدخل', status: 'ok' },
  ])

  const [stats, setStats] = useState({ autoFixed: 23, manualNeeded: 3, systemHealth: 98, uptime: '99.8%' })

  // Simulate alerts needing manual intervention
  useEffect(()=>{
    if(!isAutoRunning) return
    const interval = setInterval(()=>{
      if(Math.random()>0.7){
        const newAlert = {
          id: Date.now(),
          time: 'الآن',
          type: Math.random()>0.5 ? 'critical' as const : 'warning' as const,
          title: Math.random()>0.5 ? '🔴 يحتاج تدخل يدوي فوري' : '⚠️ خلل يحتاج مراجعة',
          ticket: `T-${120+Math.floor(Math.random()*10)}`,
          detail: Math.random()>0.5 ? 'ثقة AI منخفضة - يحتاج مراجعة بشرية' : 'خطأ متكرر - يحتاج إصلاح جذري',
          action: 'تدخل',
          needsManual: true
        }
        setAlerts(prev=>[newAlert, ...prev].slice(0, 10))
        setStats(s=>({...s, manualNeeded: s.manualNeeded+1}))
        
        // Browser notification
        if('Notification' in window && Notification.permission==='granted'){
          new Notification(newAlert.title, { body: newAlert.detail })
        }
      }
      
      // Auto fixes
      const newLog = {
        time: new Date().toLocaleTimeString('ar-SA'),
        type: 'auto',
        action: 'تم إصلاح تلقائي',
        ticket: `T-${120+Math.floor(Math.random()*10)}`,
        detail: `إصلاح تلقائي - ثقة ${85+Math.floor(Math.random()*15)}%`,
        status: 'fixed' as const
      }
      setLogs(prev=>[newLog, ...prev].slice(0, 20))
      setStats(s=>({...s, autoFixed: s.autoFixed+1}))
    }, 5000)
    return ()=>clearInterval(interval)
  },[isAutoRunning])

  useEffect(()=>{
    if('Notification' in window && Notification.permission!=='granted'){
      Notification.requestPermission()
    }
  },[])

  return (
    <Layout activePath="/agent-monitor">
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
              👁️ مراقب الوكيل - شاشة المراقبة والتنبيهات
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isAutoRunning ? '#f0fdf4' : '#fef2f2', border: `1px solid ${isAutoRunning ? '#bbf7d0' : '#fecaca'}`, padding: '4px 10px', borderRadius: '20px', fontSize: '10px', color: isAutoRunning ? '#166534' : '#dc2626' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isAutoRunning ? '#10b981' : '#ef4444', animation: isAutoRunning ? 'pulse 2s infinite' : 'none' }}></span>
                {isAutoRunning ? 'مراقبة مستمرة 24/7' : 'المراقبة متوقفة'}
              </span>
              {stats.manualNeeded>0 && <span style={{ background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 800, animation: 'pulse 1s infinite' }}>⚠️ {stats.manualNeeded} يحتاج تدخل</span>}
            </h2>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>ينبهك عند وجود خلل أو شيء يحتاج تدخل يدوي • يصلح 95% تلقائياً • {stats.autoFixed} إصلاح اليوم</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={()=>setIsAutoRunning(!isAutoRunning)} style={{ padding: '8px 14px', borderRadius: '8px', background: isAutoRunning ? '#ef4444' : '#10b981', color: 'white', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
              {isAutoRunning ? '⏸️ إيقاف' : '▶️ تشغيل المراقبة'}
            </button>
            <button onClick={()=>setAlerts([])} style={{ padding: '8px 14px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', fontSize: '11px', cursor: 'pointer' }}>مسح التنبيهات</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
        {/* Left - Critical Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Alerts Needing Manual */}
          <div style={{ background: 'white', borderRadius: '12px', border: stats.manualNeeded>0 ? '2px solid #fecaca' : '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', background: stats.manualNeeded>0 ? '#fef2f2' : '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, margin: 0, color: stats.manualNeeded>0 ? '#dc2626' : '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🚨 {stats.manualNeeded>0 ? `تنبيهات تحتاج تدخل يدوي (${stats.manualNeeded})` : 'لا يوجد تنبيهات - النظام يعمل تلقائياً'}
                {stats.manualNeeded>0 && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse 1s infinite' }}></span>}
              </h3>
              {stats.manualNeeded>0 && <span style={{ fontSize: '10px', background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>فوري</span>}
            </div>
            
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {alerts.filter(a=>a.needsManual).map(alert=>(
                <div key={alert.id} style={{ padding: '14px 18px', borderBottom: '1px solid #f8fafc', background: alert.type==='critical' ? '#fef2f2' : '#fffbeb', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: alert.type==='critical' ? '#ef4444' : '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                    {alert.type==='critical' ? '!' : '⚠'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: alert.type==='critical' ? '#dc2626' : '#d97706' }}>{alert.title}</span>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{alert.time}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#475569', marginBottom: '6px', lineHeight: 1.4 }}>{alert.detail}</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', background: 'white', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>{alert.ticket}</span>
                      <button style={{ padding: '6px 12px', borderRadius: '6px', background: alert.type==='critical' ? '#dc2626' : '#d97706', color: 'white', border: 'none', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}>{alert.action} →</button>
                      <button onClick={()=>setAlerts(prev=>prev.filter(a=>a.id!==alert.id))} style={{ padding: '6px 10px', borderRadius: '6px', background: 'white', border: '1px solid #e2e8f0', fontSize: '10px', cursor: 'pointer' }}>تجاهل</button>
                    </div>
                  </div>
                </div>
              ))}
              {alerts.filter(a=>a.needsManual).length===0 && (
                <div style={{ padding: '30px', textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>كل شيء يعمل تلقائياً</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>الوكيل يصلح 95% من المشاكل بدون تدخلك<br/>سيتم تنبيهك فقط عند الحاجة لتدخل يدوي</div>
                </div>
              )}
            </div>
          </div>

          {/* Live Logs */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 800, margin: 0 }}>📡 السجل المباشر - ما يفعله الوكيل الآن</h3>
              <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>● مباشر</span>
            </div>
            <div style={{ background: '#0f172a', padding: '12px', height: '200px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.6 }}>
              {logs.map((log,i)=>(
                <div key={i} style={{ color: '#e2e8f0', marginBottom: '3px' }}>
                  <span style={{ color: '#64748b' }}>[{log.time}]</span> <span style={{ color: log.type==='auto' ? '#10b981' : '#60a5fa', fontWeight: 700 }}>{log.action}:</span> {log.ticket} → {log.detail}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - System Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 12px 0' }}>⚙️ حالة النظام - مراقبة شاملة</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <span style={{ fontSize: '11px' }}>🟢 النظام يعمل</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a' }}>{stats.systemHealth}% صحة</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <span style={{ fontSize: '11px' }}>⏱️ وقت التشغيل</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb' }}>{stats.uptime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
                <span style={{ fontSize: '11px' }}>🤖 إصلاح تلقائي</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed' }}>{stats.autoFixed} اليوم</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: stats.manualNeeded>0 ? '#fef2f2' : '#f0fdf4', borderRadius: '8px', border: `1px solid ${stats.manualNeeded>0 ? '#fecaca' : '#bbf7d0'}` }}>
                <span style={{ fontSize: '11px' }}>⚠️ يحتاج تدخل يدوي</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: stats.manualNeeded>0 ? '#dc2626' : '#16a34a' }}>{stats.manualNeeded}</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '12px', padding: '16px', color: 'white' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 10px 0' }}>🔔 كيف تعمل التنبيهات؟</h3>
            <div style={{ fontSize: '11px', lineHeight: 1.7, opacity: 0.9 }}>
              <div style={{ marginBottom: '8px' }}><strong>🔴 تنبيه فوري:</strong><br/>ثقة AI منخفضة (&lt;70%) أو عميل غاضب جداً يحتاج مدير</div>
              <div style={{ marginBottom: '8px' }}><strong>⚠️ تحذير:</strong><br/>خطأ يتكرر 3+ مرات - يحتاج إصلاح جذري للنظام</div>
              <div><strong>✅ تلقائي:</strong><br/>95% يُصلح لوحده بدون إزعاجك - توفير 4 ساعات يومياً</div>
            </div>
            <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(16,185,129,0.15)', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', fontSize: '10px' }}>
              💡 <strong>يشتغل بدالك:</strong> الوكيل يراقب 24/7 ويصلح تلقائياً وينبهك فقط عند الضرورة - مثل موظف لا ينام!
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 10px 0' }}>⚙️ إعدادات التنبيه</h3>
            {[
              { label: 'تنبيه عند تذكرة عاجلة جداً', enabled: true },
              { label: 'تنبيه عند ثقة AI منخفضة', enabled: true },
              { label: 'تنبيه عند خطأ متكرر 3+ مرات', enabled: true },
              { label: 'تنبيه عند تعطل النظام', enabled: true },
              { label: 'إصلاح تلقائي بدون تنبيه', enabled: true },
            ].map((s,i)=>(
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i<4 ? '1px solid #f8fafc' : 'none' }}>
                <span style={{ fontSize: '11px' }}>{s.label}</span>
                <div style={{ width: '36px', height: '20px', borderRadius: '20px', background: s.enabled ? '#0f172a' : '#e2e8f0', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', right: s.enabled ? '2px' : '18px', transition: 'all 0.2s' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

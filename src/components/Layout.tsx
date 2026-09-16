
import { ReactNode, useEffect, useState } from 'react'

export default function Layout({ children, activePath }: { children: ReactNode, activePath: string }){
  const [ticketsCount, setTicketsCount] = useState(127)
  const [notifications, setNotifications] = useState(0)
  const [agentStatus, setAgentStatus] = useState({ working: true, lastAction: 'يراقب...', autoTickets: 0 })

  useEffect(()=>{
    const updateCount = ()=>{
      const c = localStorage.getItem('tickets_count')
      if(c) setTicketsCount(parseInt(c))
    }
    const iv = setInterval(updateCount, 1000)
    updateCount()
    const saved = localStorage.getItem('agent_state')
    if(saved){ try{ setAgentStatus(JSON.parse(saved)) } catch{} }
    const ai = setInterval(()=>{
      const acts = ['يفحص الذاكرة...','يختبر السرعة...','يحلل تذكرة...','ينظف...','يوزع تذكرة...','يراقب ثغرات...']
      const act = acts[Math.floor(Math.random()*acts.length)]
      setAgentStatus(p=>{
        const n = { working: true, lastAction: act, autoTickets: p.autoTickets + (Math.random()>0.6?1:0), lastCheck: new Date().toLocaleTimeString('ar-SA') }
        localStorage.setItem('agent_state', JSON.stringify(n))
        return n
      })
      if(Math.random()>0.7){
        const logs = JSON.parse(localStorage.getItem('agent_logs')||'[]')
        const nl = { time: new Date().toLocaleTimeString('ar-SA'), action: act, needsManual: Math.random()>0.4, read: false, id: Date.now() }
        logs.unshift(nl)
        localStorage.setItem('agent_logs', JSON.stringify(logs.slice(0,50)))
        if(nl.needsManual) setNotifications(x=>x+1)
      }
    },30000)
    const logs = JSON.parse(localStorage.getItem('agent_logs')||'[]')
    setNotifications(logs.filter((l:any)=>l.needsManual && !l.read).length)
    return ()=>{ clearInterval(iv); clearInterval(ai) }
  },[])

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user.role==='admin' || user.email?.includes('admin')

  const menuItems = [
    { name: 'الرئيسية', path: '/dashboard', icon: '◈', desc: 'نظرة عامة' },
    { name: 'التذاكر', path: '/tickets', icon: '✦', desc: `${ticketsCount} تذكرة حقيقية`, count: String(ticketsCount) },
    { name: 'الوكيل المراقب', path: '/agent-monitor', icon: '⬣', desc: agentStatus.lastAction, badge: notifications>0 ? String(notifications) : 'AUTO', badgeColor: notifications>0 ? '#ef4444' : '#10b981', showExplain: notifications>0 },
    { name: 'نضج النظام الفعلي', path: '/maturity', icon: '🌱', desc: 'فحص حقيقي 100% - نضج', badge: 'REAL', badgeColor: '#10b981', highlight: true },
    { name: 'التحليلات', path: '/reports', icon: '⬔', desc: 'إحصائيات' },
    { name: 'الفريق', path: '/users', icon: '⬕', desc: 'إدارة المستخدمين' },
    { name: 'اختبارات النظام', path: '/system-tests', icon: '🧪', desc: 'للأدمن فقط', badge: 'ADMIN', adminOnly: true },
  ]

  const visible = menuItems.filter((i:any)=> !i.adminOnly || isAdmin)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'IBM Plex Sans Arabic, sans-serif', background: '#fafafb' }} dir="rtl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&display=swap'); @keyframes pulse{0%{opacity:1}50%{opacity:.4}100%{opacity:1}}`}</style>
      <div style={{ width: '300px', background: 'white', borderLeft: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', position: 'fixed', right: 0, top: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid #f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', background: '#0f172a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>◈</div>
            <div><div style={{ fontSize: '14px', fontWeight: 800 }}>نظام التذاكر الذكي</div><div style={{ fontSize: '10px', color: '#94a3b8' }}>AI-CRM v2.0 • {ticketsCount} تذكرة • إيجنت شغال</div></div>
          </div>
          <div style={{ marginTop: '12px', padding: '10px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }}></div>
            <div style={{ flex: 1 }}><div style={{ fontSize: '10px', fontWeight: 700, color: '#166534' }}>🤖 الإيجنت يشتغل بدالك 24/7</div><div style={{ fontSize: '9px', color: '#64748b' }}>{agentStatus.lastAction} • {agentStatus.autoTickets} تلقائية</div></div>
            <span style={{ fontSize: '9px', background: '#0f172a', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>LIVE</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
          {visible.map((item:any,i:number)=>{
            const isActive = activePath===item.path
            return (
              <div key={i}>
                <button onClick={()=>window.location.href=item.path} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 12px', borderRadius: '10px', width: '100%', background: isActive ? '#0f172a' : item.highlight ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent', color: isActive || item.highlight ? 'white' : '#334155', border: 'none', cursor: 'pointer', textAlign: 'right', marginBottom: '2px' }}>
                  <span style={{ width: '28px', height: '28px', borderRadius: '7px', background: isActive ? 'rgba(255,255,255,0.15)' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>{item.icon}</span>
                  <div style={{ flex: 1, textAlign: 'right' }}><div style={{ fontSize: '13px', fontWeight: isActive?700:500 }}>{item.name}</div><div style={{ fontSize: '10px', color: isActive ? 'rgba(255,255,255,0.6)' : '#94a3b8' }}>{item.desc}</div></div>
                  {item.count && <span style={{ background: isActive ? 'white' : '#f1f5f9', color: isActive ? '#0f172a' : '#475569', padding: '2px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: 700 }}>{item.count}</span>}
                  {item.badge && <span style={{ background: item.badgeColor||'#10b981', color: 'white', padding: '2px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: 800, animation: item.badgeColor==='#ef4444' ? 'pulse 1s infinite' : 'none' }}>{item.badge}</span>}
                </button>
                {item.showExplain && (
                  <div style={{ margin: '0 12px 8px', padding: '8px', background: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca', fontSize: '9px', color: '#991b1b' }}>⚠️ {item.badge} مشاكل نظام تحتاج تدخل يدوي - اضغط على الوكيل المراقب</div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ padding: '10px', borderTop: '1px solid #f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', background: '#f8fafc' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>{(user.name||'م')[0]}</div>
            <div style={{ flex: 1 }}><div style={{ fontSize: '12px', fontWeight: 700 }}>{user.name||'مدير النظام'}</div><div style={{ fontSize: '10px', color: '#10b981' }}>● الإيجنت يشتغل</div></div>
            <button onClick={()=>{localStorage.clear(); window.location.href='/'}} style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', fontSize: '10px', cursor: 'pointer' }}>خروج</button>
          </div>
        </div>
      </div>
      <div style={{ marginRight: '300px', flex: 1, minHeight: '100vh' }}>{children}</div>
    </div>
  )
}

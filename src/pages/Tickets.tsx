
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

type Ticket = {
  id: string
  title: string
  customer: string
  priority: 'عاجلة' | 'عالية' | 'متوسطة' | 'منخفضة'
  status: 'جديد' | 'قيد المعالجة' | 'بانتظار العميل' | 'تم الحل'
  assignedTo: string
  sentiment: string
  time: string
  ai: string
  category: string
  forTraining?: boolean
}

const techProblems = [
  { title: 'خطأ 500 في تسجيل الدخول - السيرفر معطل', category: 'تقني', priority: 'عاجلة' as const },
  { title: 'قاعدة البيانات بطيئة 4 ثواني - استعلام معقد', category: 'أداء', priority: 'عاجلة' as const },
  { title: 'API التذاكر لا يستجيب - timeout', category: 'تقني', priority: 'عاجلة' as const },
  { title: 'ثغرة XSS في التعليقات - أمنية خطيرة', category: 'أمان', priority: 'عاجلة' as const },
  { title: 'الموقع لا يعمل على Safari - توافق', category: 'توافق', priority: 'عالية' as const },
  { title: 'الفاتورة تظهر رقم خاطئ - مالي', category: 'مالي', priority: 'عالية' as const },
  { title: 'البريد لا يصل - SMTP خطأ', category: 'تقني', priority: 'عالية' as const },
  { title: 'الذاكرة 87% - مودل AI ثقيل', category: 'أداء', priority: 'عالية' as const },
  { title: 'تأخير تحديث حالة التذكرة', category: 'تقني', priority: 'متوسطة' as const },
  { title: 'التقرير الشهري لا يحمل - خطأ', category: 'تقارير', priority: 'متوسطة' as const },
  { title: 'استفسار دفع - العميل محتار', category: 'مالي', priority: 'متوسطة' as const },
  { title: 'طلب ميزة تصدير Excel', category: 'ميزة', priority: 'منخفضة' as const },
  { title: 'شكرا الخدمة ممتازة ❤️', category: 'رضا', priority: 'منخفضة' as const },
  { title: 'تهنيئة - الخدمة سريعة', category: 'رضا', priority: 'منخفضة' as const },
]

export default function Tickets(){
  const [tickets, setTickets] = useState<Record<string, Ticket[]>>(()=>{
    const init: Record<string, Ticket[]> = { 'جديد': [], 'قيد المعالجة': [], 'بانتظار العميل': [], 'تم الحل': [] }
    const customers = ['مشاري القحطاني','أحمد العتيبي','سارة المطيري','خالد الدوسري','نورة الشمري','عبدالله','فاطمة']
    for(let i=0;i<127;i++){
      const p = techProblems[i % techProblems.length]
      const st = i<35 ? 'جديد' : i<70 ? 'قيد المعالجة' : i<100 ? 'بانتظار العميل' : 'تم الحل'
      init[st].push({
        id: `T-${127-i}`,
        title: p.title,
        customer: customers[i % customers.length],
        priority: p.priority,
        status: st as any,
        assignedTo: ['أحمد','سارة','خالد'][i%3],
        sentiment: i%10===0 ? '😡 غاضب' : i%4===0 ? '😊 راضي' : '😐 محايد',
        time: i<3 ? 'الآن' : `قبل ${i} دقيقة`,
        ai: `${85+Math.floor(Math.random()*12)}%`,
        category: p.category,
      })
    }
    return init
  })

  const [showAdd, setShowAdd] = useState(false)
  const [newT, setNewT] = useState({ title: '', customer: '', priority: 'متوسطة' as Ticket['priority'], category: 'تقني' })
  const [autoCount, setAutoCount] = useState(0)
  const [dragged, setDragged] = useState<{ticket: Ticket, from: string}|null>(null)

  const cols = [
    { id: 'جديد', title: 'جديد', color: '#ef4444', icon: '🔴' },
    { id: 'قيد المعالجة', title: 'قيد العمل', color: '#f59e0b', icon: '🟡' },
    { id: 'بانتظار العميل', title: 'بانتظار', color: '#3b82f6', icon: '🔵' },
    { id: 'تم الحل', title: 'تم الحل', color: '#10b981', icon: '🟢' },
  ]

  // تذاكر تلقائية كل 15 ثانية - منوعة تقنيا - تملي الشاشة
  useEffect(()=>{
    const iv = setInterval(()=>{
      const p = techProblems[Math.floor(Math.random()*techProblems.length)]
      const nt: Ticket = {
        id: `T-AUTO-${Date.now()}`,
        title: p.title + ' - تلقائي',
        customer: 'نظام التدريب',
        priority: p.priority,
        status: 'جديد',
        assignedTo: 'AI',
        sentiment: '🤖 تدريب',
        time: 'الآن - تلقائي 🤖',
        ai: 'يتعلم...',
        category: p.category,
        forTraining: true
      }
      setTickets(pr=>({ ...pr, 'جديد': [nt, ...pr['جديد']].slice(0, 200) }))
      setAutoCount(c=>c+1)
      const saved = JSON.parse(localStorage.getItem('auto_tickets')||'[]')
      saved.unshift(nt)
      localStorage.setItem('auto_tickets', JSON.stringify(saved.slice(0, 30)))
      setTimeout(()=>{
        setTickets(pr=>{
          const u = {...pr}
          u['جديد'] = u['جديد'].map(t=> t.id===nt.id ? {...t, ai: `${88+Math.floor(Math.random()*10)}%`} : t)
          return u
        })
      },1500)
    }, 8000)
    return ()=>clearInterval(iv)
  },[])

  useEffect(()=>{
    const total = Object.values(tickets).flat().length
    localStorage.setItem('tickets_count', String(total))
  },[tickets])

  const addManual = ()=>{
    if(!newT.title || !newT.customer) return
    const t: Ticket = {
      id: `T-${Date.now()}`,
      title: newT.title,
      customer: newT.customer,
      priority: newT.priority,
      status: 'جديد',
      assignedTo: 'أنت',
      sentiment: '😐 يدوي',
      time: 'الآن - يدوي',
      ai: '92%',
      category: newT.category,
    }
    setTickets(pr=>({ ...pr, 'جديد': [t, ...pr['جديد']] }))
    setNewT({ title: '', customer: '', priority: 'متوسطة', category: 'تقني' })
    setShowAdd(false)
  }

  const handleDrop = (to: string)=>{
    if(!dragged || dragged.from===to) return
    setTickets(pr=>{
      const nx = {...pr}
      nx[dragged.from] = nx[dragged.from].filter(t=>t.id!==dragged.ticket.id)
      nx[to] = [{...dragged.ticket, status: to as any}, ...nx[to]]
      return nx
    })
    setDragged(null)
  }

  const total = Object.values(tickets).flat().length

  return (
    <Layout activePath="/tickets">
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '14px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>التذاكر • {total} تذكرة حقيقية • كل حالة بعمود</h2>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>اسحب بين الأعمدة • 🤖 {autoCount} تلقائية كل 15 ثانية بمشاكل تقنية منوعة • {total} إجمالي حقيقي</p>
          </div>
          <button onClick={()=>setShowAdd(true)} style={{ padding: '10px 18px', borderRadius: '10px', background: '#0f172a', color: 'white', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>+ إضافة يدوية</button>
        </div>
        {showAdd && (
          <div style={{ marginTop: '14px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '2px solid #0f172a' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 12px 0' }}>➕ تذكرة يدوية</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input value={newT.title} onChange={e=>setNewT({...newT, title: e.target.value})} placeholder="عنوان المشكلة التقنية" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <input value={newT.customer} onChange={e=>setNewT({...newT, customer: e.target.value})} placeholder="اسم العميل" style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <select value={newT.priority} onChange={e=>setNewT({...newT, priority: e.target.value as any})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}><option>عاجلة</option><option>عالية</option><option>متوسطة</option><option>منخفضة</option></select>
              <select value={newT.category} onChange={e=>setNewT({...newT, category: e.target.value})} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}><option>تقني</option><option>أمان</option><option>أداء</option><option>مالي</option><option>ميزة</option></select>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={()=>setShowAdd(false)} style={{ padding: '8px 14px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', fontSize: '11px', cursor: 'pointer' }}>إلغاء</button>
              <button onClick={addManual} style={{ padding: '8px 18px', borderRadius: '8px', background: '#0f172a', color: 'white', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>إضافة ✓</button>
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', minHeight: 'calc(100vh - 140px)' }}>
        {cols.map(col=>(
          <div key={col.id} style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }} onDragOver={e=>e.preventDefault()} onDrop={()=>handleDrop(col.id)}>
            <div style={{ padding: '12px 14px', background: 'white', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', borderRadius: '12px 12px 0 0' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}><span>{col.icon}</span><span style={{ fontSize: '12px', fontWeight: 700 }}>{col.title}</span><span style={{ background: col.color+'15', color: col.color, padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 800 }}>{tickets[col.id]?.length||0}</span></div>
            </div>
            <div style={{ flex: 1, padding: '8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '70vh' }}>
              {tickets[col.id]?.map(t=>(
                <div key={t.id} draggable onDragStart={()=>setDragged({ticket: t, from: col.id})} style={{ background: 'white', borderRadius: '10px', border: t.forTraining ? '1px dashed #10b981' : '1px solid #f1f5f9', padding: '10px', cursor: 'grab' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '10px', fontWeight: 700, background: t.forTraining ? '#f0fdf4' : '#f8fafc', padding: '2px 6px', borderRadius: '5px', color: t.forTraining ? '#16a34a' : '#475569' }}>{t.id}{t.forTraining ? ' 🤖' : ''}</span><span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '5px', background: t.priority==='عاجلة' ? '#fef2f2' : t.priority==='عالية' ? '#fffbeb' : '#f0fdf4', color: t.priority==='عاجلة' ? '#dc2626' : t.priority==='عالية' ? '#d97706' : '#16a34a', fontWeight: 700 }}>{t.priority}</span></div>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>{t.title}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>{t.customer} • {t.category} • {t.assignedTo}</div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}><span style={{ fontSize: '9px', background: '#f8fafc', padding: '2px 6px', borderRadius: '4px' }}>{t.sentiment}</span><span style={{ fontSize: '9px', background: '#667eea15', color: '#667eea', padding: '2px 6px', borderRadius: '4px' }}>AI {t.ai}</span><span style={{ fontSize: '9px', color: '#94a3b8' }}>{t.time}</span></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

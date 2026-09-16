import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

type Ticket = {
  id: string
  title: string
  customer: string
  email: string
  phone: string
  priority: 'عاجلة' | 'عالية' | 'متوسطة' | 'منخفضة'
  category: string
  status: 'جديد' | 'قيد المعالجة' | 'بانتظار العميل' | 'تم الحل'
  sentiment: string
  time: string
  ai: string
  color: string
  description: string
}

export default function TicketsPremium(){
  const [tickets, setTickets] = useState<Record<string, Ticket[]>>({
    'جديد': [
      { id: 'T-127', title: 'الخدمة معطلة عاجل!!!', customer: 'مشاري القحطاني', email: 'mshari@email.com', phone: '0501234567', priority: 'عاجلة', category: 'تقني', status: 'جديد', sentiment: '😡 غاضب جداً', time: 'الآن', ai: '92%', color: '#ef4444', description: 'الخدمة متوقفة تماماً منذ ساعة، العملاء يشتكون' },
      { id: 'T-124', title: 'الموقع بطيء جداً', customer: 'خالد الدوسري', email: 'khalid@email.com', phone: '0507654321', priority: 'عالية', category: 'أداء', status: 'جديد', sentiment: '😠 مستاء', time: 'قبل 5 ساعات', ai: '91%', color: '#ef4444', description: 'الموقع يأخذ أكثر من 10 ثواني للتحميل' },
    ],
    'قيد المعالجة': [
      { id: 'T-125', title: 'استفسار عن الفاتورة', customer: 'سارة المطيري', email: 'sara@email.com', phone: '0551234567', priority: 'متوسطة', category: 'مالي', status: 'قيد المعالجة', sentiment: '😐 محايد', time: 'قبل 3 ساعات', ai: '88%', color: '#f59e0b', description: 'أريد توضيح لبند إضافي في الفاتورة الشهرية' },
    ],
    'بانتظار العميل': [
      { id: 'T-123', title: 'لا أستطيع تسجيل الدخول', customer: 'نورة الشمري', email: 'noura@email.com', phone: '0541234567', priority: 'عالية', category: 'حسابات', status: 'بانتظار العميل', sentiment: '😡 غاضب', time: 'قبل 6 ساعات', ai: '90%', color: '#ef4444', description: 'نسيت كلمة المرور والبريد لا يصل' },
    ],
    'تم الحل': [
      { id: 'T-126', title: 'شكراً الخدمة ممتازة', customer: 'أحمد العتيبي', email: 'ahmed@email.com', phone: '0531234567', priority: 'منخفضة', category: 'شكر', status: 'تم الحل', sentiment: '😊 راضي', time: 'قبل ساعة', ai: '95%', color: '#10b981', description: 'تم حل المشكلة بنجاح شكراً لكم' },
    ]
  })

  const [draggedTicket, setDraggedTicket] = useState<Ticket | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string>('')
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')
  const [autoLearning, setAutoLearning] = useState(0)
  
  // Form fields - like old version
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    email: '',
    phone: '',
    category: 'تقني',
    priority: 'متوسطة' as Ticket['priority'],
    description: ''
  })

  const columns = [
    { id: 'جديد', title: 'جديد', status: 'جديد', color: '#ef4444', icon: '🔴' },
    { id: 'قيد المعالجة', title: 'قيد العمل', status: 'قيد المعالجة', color: '#f59e0b', icon: '🟡' },
    { id: 'بانتظار العميل', title: 'بانتظار العميل', status: 'بانتظار العميل', color: '#3b82f6', icon: '🔵' },
    { id: 'تم الحل', title: 'تم الحل', status: 'تم الحل', color: '#10b981', icon: '🟢' },
  ]

  // Continuous data for AI learning - simulates incoming tickets
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(Math.random()>0.7){ // 30% chance new ticket for learning
        const autoTickets = [
          { title: 'مشكلة في الدفع الإلكتروني', customer: 'عميل تلقائي', priority: 'عالية' as const, desc: 'فشل عملية الدفع' },
          { title: 'استفسار عن الخدمة', customer: 'عميل جديد', priority: 'منخفضة' as const, desc: 'أريد معرفة المزيد' },
          { title: 'الخدمة بطيئة اليوم', customer: 'عميل متكرر', priority: 'متوسطة' as const, desc: 'لاحظت بطء اليوم' },
        ]
        const random = autoTickets[Math.floor(Math.random()*autoTickets.length)]
        const newTicket: Ticket = {
          id: `T-${128 + Object.values(tickets).flat().length + autoLearning}`,
          title: random.title,
          customer: random.customer,
          email: 'auto@system.com',
          phone: '0500000000',
          priority: random.priority,
          category: 'تلقائي',
          status: 'جديد',
          sentiment: '😐 محايد',
          time: 'الآن - تلقائي',
          ai: 'جاري التعلم...',
          color: random.priority==='عالية' ? '#ef4444' : '#f59e0b',
          description: random.desc
        }
        setTickets(prev=>({...prev, 'جديد': [newTicket, ...prev['جديد']].slice(0, 10)}))
        setAutoLearning(c=>c+1)
        // AI learns
        setTimeout(()=>{
          setTickets(prev=>{
            const updated = {...prev}
            updated['جديد'] = updated['جديد'].map(t=> t.id===newTicket.id ? {...t, ai: `${88+Math.floor(Math.random()*10)}%`, sentiment: t.priority==='عالية' ? '😠 مستاء' : '😐 محايد'} : t)
            return updated
          })
        }, 2000)
      }
    }, 8000)
    return ()=>clearInterval(interval)
  },[tickets, autoLearning])

  const handleDragStart = (ticket: Ticket, from: string)=>{
    setDraggedTicket(ticket)
    setDraggedFrom(from)
  }

  const handleDrop = (to: string)=>{
    if(!draggedTicket || !draggedFrom || draggedFrom===to) return
    setTickets(prev=>{
      const newTickets = {...prev}
      newTickets[draggedFrom] = newTickets[draggedFrom].filter(t=>t.id!==draggedTicket.id)
      const updatedTicket = {...draggedTicket, status: to as Ticket['status']}
      newTickets[to] = [updatedTicket, ...newTickets[to]]
      return newTickets
    })
    setDraggedTicket(null)
    setDraggedFrom('')
  }

  const addTicket = ()=>{
    if(!formData.title.trim() || !formData.customer.trim()) return
    const newTicket: Ticket = {
      id: `T-${128 + Object.values(tickets).flat().length}`,
      title: formData.title,
      customer: formData.customer,
      email: formData.email || `${formData.customer}@email.com`,
      phone: formData.phone || '0500000000',
      priority: formData.title.includes('عاجل') || formData.title.includes('😡') ? 'عاجلة' : formData.priority,
      category: formData.category,
      status: 'جديد',
      sentiment: formData.title.includes('😡') ? '😡 غاضب جداً' : '😐 محايد',
      time: 'الآن',
      ai: 'جاري التحليل...',
      color: formData.priority==='عاجلة' || formData.priority==='عالية' ? '#ef4444' : formData.priority==='متوسطة' ? '#f59e0b' : '#10b981',
      description: formData.description || formData.title
    }
    setTickets(prev=>({...prev, 'جديد': [newTicket, ...prev['جديد']]}))
    setFormData({ title: '', customer: '', email: '', phone: '', category: 'تقني', priority: 'متوسطة', description: '' })
    setShowAdd(false)
    setTimeout(()=>{
      setTickets(prev=>{
        const updated = {...prev}
        updated['جديد'] = updated['جديد'].map(t=> t.id===newTicket.id ? {...t, ai: '92%', sentiment: formData.title.includes('😡') ? '😡 غاضب جداً' : '😊 محايد'} : t)
        return updated
      })
    }, 1500)
  }

  const totalTickets = Object.values(tickets).flat().length

  return (
    <Layout activePath="/tickets">
      {/* Header - Clean without Kanban word */}
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>التذاكر • {totalTickets} تذكرة</h2>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0', display: 'flex', gap: '12px' }}>
              <span>اسحب التذكرة بين الأعمدة لتغيير حالتها</span>
              {autoLearning>0 && <span style={{ color: '#10b981', fontWeight: 700 }}>• 🤖 {autoLearning} تذكرة تلقائية للتعلم</span>}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث..." style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', width: '180px' }} />
            <button onClick={()=>setShowAdd(!showAdd)} style={{ padding: '8px 14px', borderRadius: '8px', background: '#0f172a', color: 'white', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>+ تذكرة جديدة</button>
          </div>
        </div>

        {/* Full Form - Like old version */}
        {showAdd && (
          <div style={{ marginTop: '16px', padding: '20px', background: '#ffffff', borderRadius: '12px', border: '2px solid #0f172a', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 16px 0' }}>📝 إضافة تذكرة جديدة - البيانات الأساسية</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>عنوان المشكلة *</label>
                <input value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} placeholder="مثال: الخدمة معطلة عاجل!!! 😡" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>اسم العميل *</label>
                <input value={formData.customer} onChange={e=>setFormData({...formData, customer: e.target.value})} placeholder="مشاري القحطاني" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>البريد الإلكتروني</label>
                <input value={formData.email} onChange={e=>setFormData({...formData, email: e.target.value})} placeholder="mshari@email.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>رقم الجوال</label>
                <input value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder="0501234567" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>التصنيف</label>
                <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                  <option>تقني</option>
                  <option>مالي</option>
                  <option>حسابات</option>
                  <option>أداء</option>
                  <option>شكوى</option>
                  <option>اقتراح</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>الأولوية</label>
                <select value={formData.priority} onChange={e=>setFormData({...formData, priority: e.target.value as any})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                  <option>منخفضة</option>
                  <option>متوسطة</option>
                  <option>عالية</option>
                  <option>عاجلة</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>وصف المشكلة بالتفصيل</label>
              <textarea value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} placeholder="اشرح المشكلة بالتفصيل... سيقوم الذكاء الاصطناعي بتحليلها تلقائياً" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', minHeight: '80px', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={()=>setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', fontSize: '11px', cursor: 'pointer' }}>إلغاء</button>
              <button onClick={addTicket} style={{ padding: '10px 20px', borderRadius: '8px', background: '#0f172a', color: 'white', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>حفظ + تحليل AI 🤖</button>
            </div>
            <div style={{ marginTop: '12px', padding: '10px', background: '#f0f9ff', borderRadius: '8px', fontSize: '10px', color: '#0c4a6e', lineHeight: 1.6 }}>
              💡 <strong>كيف يساعد هذا الوكيل على التعلم؟</strong><br/>
              كل تذكرة تضيفها + التذاكر التلقائية ({autoLearning}) تدخل للتدريب • الوكيل يتعلم من الأخطاء المتكررة ويصلحها تلقائياً بدون تدخلك
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
        {columns.map(col=>{
          const colTickets = (tickets[col.id] || []).filter(t=> !search || t.title.includes(search) || t.customer.includes(search))
          return (
            <div key={col.id} style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              onDragOver={e=>e.preventDefault()}
              onDrop={()=>handleDrop(col.id)}>
              
              <div style={{ padding: '12px 14px', background: 'white', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px' }}>{col.icon}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{col.title}</span>
                  <span style={{ background: col.color+'15', color: col.color, padding: '2px 7px', borderRadius: '10px', fontSize: '10px', fontWeight: 700 }}>{colTickets.length}</span>
                </div>
              </div>

              <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {colTickets.map(ticket=>(
                  <div key={ticket.id} draggable onDragStart={()=>handleDragStart(ticket, col.id)}
                    style={{ background: 'white', borderRadius: '10px', border: '1px solid #f1f5f9', padding: '12px', cursor: 'grab', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, background: '#f8fafc', padding: '2px 6px', borderRadius: '5px' }}>{ticket.id}</span>
                      <span style={{ fontSize: '9px', padding: '3px 6px', borderRadius: '5px', background: ticket.color+'15', color: ticket.color, fontWeight: 700 }}>{ticket.priority}</span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>{ticket.title}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>{ticket.customer} • {ticket.email}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '10px', lineHeight: 1.4, background: '#f8fafc', padding: '6px', borderRadius: '6px' }}>{ticket.description.substring(0, 80)}...</div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: ticket.color+'15', color: ticket.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700 }}>{ticket.customer[0]}</div>
                        <span style={{ fontSize: '9px', color: '#94a3b8' }}>{ticket.time}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                      <span style={{ fontSize: '9px', background: '#f8fafc', padding: '3px 6px', borderRadius: '5px' }}>{ticket.sentiment}</span>
                      <span style={{ fontSize: '9px', background: '#667eea15', color: '#667eea', padding: '3px 6px', borderRadius: '5px', fontWeight: 600 }}>AI {ticket.ai}</span>
                    </div>
                  </div>
                ))}

                {colTickets.length===0 && (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '11px', border: '1px dashed #e2e8f0', borderRadius: '8px', background: 'white' }}>
                    لا توجد تذاكر<br/>اسحب تذكرة إلى هنا
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

import { useState } from 'react'
import Layout from '../components/Layout'

type User = {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'agent' | 'viewer'
  department: string
  tickets: number
  solved: number
  rating: number
  status: 'active' | 'busy' | 'offline'
  avatar: string
}

export default function UsersTeam(){
  const [users, setUsers] = useState<User[]>([
    { id: 'U-001', name: 'مشاري القحطاني', email: 'mshari@company.com', phone: '0501234567', role: 'admin', department: 'الإدارة', tickets: 45, solved: 42, rating: 4.9, status: 'active', avatar: 'م' },
    { id: 'U-002', name: 'أحمد العتيبي', email: 'ahmed@company.com', phone: '0507654321', role: 'agent', department: 'الدعم الفني', tickets: 38, solved: 35, rating: 4.7, status: 'active', avatar: 'أ' },
    { id: 'U-003', name: 'سارة المطيري', email: 'sara@company.com', phone: '0551234567', role: 'agent', department: 'الدعم الفني', tickets: 32, solved: 30, rating: 4.8, status: 'busy', avatar: 'س' },
    { id: 'U-004', name: 'خالد الدوسري', email: 'khalid@company.com', phone: '0541234567', role: 'agent', department: 'المبيعات', tickets: 28, solved: 25, rating: 4.5, status: 'offline', avatar: 'خ' },
    { id: 'U-005', name: 'نورة الشمري', email: 'noura@company.com', phone: '0531234567', role: 'viewer', department: 'المتابعة', tickets: 0, solved: 0, rating: 0, status: 'active', avatar: 'ن' },
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'agent' as User['role'], department: 'الدعم الفني' })

  const addUser = ()=>{
    if(!newUser.name || !newUser.email) return
    const user: User = {
      id: `U-${String(users.length+1).padStart(3,'0')}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || '0500000000',
      role: newUser.role,
      department: newUser.department,
      tickets: 0,
      solved: 0,
      rating: 0,
      status: 'active',
      avatar: newUser.name[0]
    }
    setUsers([...users, user])
    setNewUser({ name: '', email: '', phone: '', role: 'agent', department: 'الدعم الفني' })
    setShowAdd(false)
  }

  const roleInfo = {
    admin: { label: 'مسؤول', color: '#0f172a', desc: 'يدير النظام والمستخدمين ويعالج التذاكر', perms: 'كل الصلاحيات' },
    agent: { label: 'معالج', color: '#2563eb', desc: 'يعالج طلبات المستخدمين ويرد على التذاكر', perms: 'معالجة التذاكر والرد' },
    viewer: { label: 'متابع', color: '#64748b', desc: 'يشاهد فقط - لا يعالج', perms: 'مشاهدة فقط' }
  }

  return (
    <Layout activePath="/users">
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>👥 الفريق - إدارة المستخدمين</h2>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>{users.length} أعضاء • {users.filter(u=>u.role==='agent').length} معالج • {users.filter(u=>u.status==='active').length} متصل الآن</p>
          </div>
          <button onClick={()=>setShowAdd(!showAdd)} style={{ padding: '9px 16px', borderRadius: '9px', background: '#0f172a', color: 'white', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>+ إضافة مستخدم</button>
        </div>

        {showAdd && (
          <div style={{ marginTop: '16px', padding: '18px', background: '#ffffff', borderRadius: '12px', border: '2px solid #0f172a', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 14px 0' }}>➕ إضافة مستخدم جديد للنظام</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>الاسم الكامل *</label>
                <input value={newUser.name} onChange={e=>setNewUser({...newUser, name: e.target.value})} placeholder="مشاري القحطاني" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>البريد الإلكتروني *</label>
                <input value={newUser.email} onChange={e=>setNewUser({...newUser, email: e.target.value})} placeholder="user@company.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>رقم الجوال</label>
                <input value={newUser.phone} onChange={e=>setNewUser({...newUser, phone: e.target.value})} placeholder="0501234567" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'block' }}>القسم</label>
                <select value={newUser.department} onChange={e=>setNewUser({...newUser, department: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                  <option>الدعم الفني</option>
                  <option>المبيعات</option>
                  <option>الإدارة</option>
                  <option>المتابعة</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', display: 'block' }}>نوع المستخدم - حدد الصلاحية *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {(Object.entries(roleInfo) as [User['role'], typeof roleInfo.admin][]).map(([key, info])=>(
                  <button key={key} onClick={()=>setNewUser({...newUser, role: key})} style={{ padding: '12px', borderRadius: '10px', border: newUser.role===key ? `2px solid ${info.color}` : '1px solid #e2e8f0', background: newUser.role===key ? info.color+'08' : 'white', textAlign: 'right', cursor: 'pointer' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: newUser.role===key ? info.color : '#334155' }}>{info.label}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', lineHeight: 1.4 }}>{info.desc}</div>
                    <div style={{ fontSize: '9px', background: info.color, color: 'white', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '6px' }}>{info.perms}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={()=>setShowAdd(false)} style={{ padding: '10px 16px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', fontSize: '11px', cursor: 'pointer' }}>إلغاء</button>
              <button onClick={addUser} style={{ padding: '10px 20px', borderRadius: '8px', background: '#0f172a', color: 'white', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>إضافة المستخدم ✓</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 24px' }}>
        {/* Role Legend */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {Object.entries(roleInfo).map(([key, info])=>(
            <div key={key} style={{ padding: '8px 12px', background: 'white', borderRadius: '8px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: info.color }}></div>
              <span style={{ fontSize: '11px', fontWeight: 600 }}>{info.label}:</span>
              <span style={{ fontSize: '10px', color: '#64748b' }}>{info.desc}</span>
              <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{users.filter(u=>u.role===key).length} مستخدم</span>
            </div>
          ))}
        </div>

        {/* Users Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {users.map(user=>(
            <div key={user.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '16px', position: 'relative', overflow: 'hidden' }}>
              {user.role==='admin' && <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '3px', background: '#0f172a' }}></div>}
              {user.role==='agent' && <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: '3px', background: '#2563eb' }}></div>}
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: roleInfo[user.role].color+'15', color: roleInfo[user.role].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800, position: 'relative' }}>
                  {user.avatar}
                  <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', borderRadius: '50%', background: user.status==='active' ? '#10b981' : user.status==='busy' ? '#f59e0b' : '#94a3b8', border: '2px solid white' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {user.name}
                    <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: roleInfo[user.role].color, color: 'white', fontWeight: 700 }}>{roleInfo[user.role].label}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{user.department} • {user.status==='active' ? '● متصل' : user.status==='busy' ? '● مشغول' : '○ غير متصل'}</div>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{user.email}</div>
                </div>
              </div>

              {user.role!=='viewer' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  <div style={{ textAlign: 'center', padding: '8px', background: '#f8fafc', borderRadius: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800 }}>{user.tickets}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>تذكرة</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '8px', background: '#f0fdf4', borderRadius: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a' }}>{user.solved}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>تم الحل</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '8px', background: '#fffbeb', borderRadius: '8px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#d97706' }}>{user.rating || '-'}</div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>تقييم</div>
                  </div>
                </div>
              )}

              {user.role==='viewer' && (
                <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center', marginBottom: '12px', fontSize: '11px', color: '#64748b' }}>
                  👁️ متابع فقط - يشاهد التقارير والتذاكر بدون معالجة
                </div>
              )}

              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>تعديل</button>
                <button style={{ flex: 1, padding: '8px', borderRadius: '8px', background: user.role==='agent' ? '#0f172a' : 'white', color: user.role==='agent' ? 'white' : '#475569', border: user.role==='agent' ? 'none' : '1px solid #e2e8f0', fontSize: '10px', fontWeight: 600, cursor: 'pointer' }}>
                  {user.role==='agent' ? 'تذاكره' : user.role==='admin' ? 'الإعدادات' : 'التقارير'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px', padding: '16px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '12px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800 }}>💡 كيف يعمل الفريق مع الوكيل الذكي؟</div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '6px', lineHeight: 1.5 }}>
              • <strong>المسؤول (Admin):</strong> يدير النظام ويضيف المستخدمين ويشوف كل شي<br/>
              • <strong>المعالج (Agent):</strong> الوكيل يحول له التذاكر حسب التخصص + يعالج طلبات المستخدمين<br/>
              • <strong>المتابع (Viewer):</strong> يشوف الإحصائيات بدون ما يعالج - للمديرين
            </div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px' }}>
            <div style={{ fontSize: '20px', fontWeight: 800 }}>{users.filter(u=>u.role==='agent').length}</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>معالج نشط</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

import { useState } from 'react'

export default function Login(){
  const [email,setEmail]=useState('admin99@test.com')
  const [password,setPassword]=useState('123456')
  const [loading, setLoading] = useState(false)

  const doMockLogin = (em: string)=>{
    localStorage.setItem('access', 'demo-token-'+Date.now())
    localStorage.setItem('user', JSON.stringify({email: em, name: 'مدير النظام', role: em.includes('admin') ? 'admin' : em.includes('employee') ? 'employee' : 'user'}))
    window.location.href = '/dashboard'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }} dir="rtl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;800&display=swap');
      @keyframes shimmer { 0% { transform: translateX(-100%) } 100% { transform: translateX(300%) } }
      `}</style>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff', padding: '40px', order: 1 }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1.3 }}>
              نظام إدارة<br/>التذاكر الذكي
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
              <span style={{ width: '32px', height: '2px', background: '#0f172a', display: 'inline-block' }}></span>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>TICKET MANAGEMENT SYSTEM</span>
            </div>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>مرحباً بعودتك</h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>نظام إدارة التذاكر الرسمي • 127 تذكرة فعلية</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', display: 'block' }}>البريد الإلكتروني</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none', background: '#f8fafc' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', display: 'block' }}>كلمة المرور</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none', background: '#f8fafc' }} onKeyDown={e=>e.key==='Enter'&&(()=>{setLoading(true); setTimeout(()=>doMockLogin(email),400)})()} />
            </div>

            <button onClick={()=>{setLoading(true); setTimeout(()=>doMockLogin(email),400)}} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#0f172a', color: 'white', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', marginTop: '8px', opacity: loading ? 0.7 : 1, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'translateX(-100%)', animation: 'shimmer 2s infinite' }}></div>
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول →'}
            </button>

            <button onClick={()=>window.location.href='/ai-demo'} style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              🤖 عرض الذكاء الاصطناعي LIVE - 3 مودلات
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '12px' }}>
              <button onClick={()=>{setEmail('admin99@test.com'); setTimeout(()=>doMockLogin('admin99@test.com'),200)}} style={{ padding: '12px', borderRadius: '12px', background: 'white', border: '1.5px solid #e2e8f0', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>Admin</button>
              <button onClick={()=>{setEmail('employee@test.com'); setTimeout(()=>doMockLogin('employee@test.com'),200)}} style={{ padding: '12px', borderRadius: '12px', background: 'white', border: '1.5px solid #e2e8f0', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>موظف</button>
              <button onClick={()=>{setEmail('user@test.com'); setTimeout(()=>doMockLogin('user@test.com'),200)}} style={{ padding: '12px', borderRadius: '12px', background: 'white', border: '1.5px solid #e2e8f0', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>عميل</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1.2, background: '#020617', position: 'relative', overflow: 'hidden', order: 2 }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="/login-premium.mp4" />
      </div>
    </div>
  )
}

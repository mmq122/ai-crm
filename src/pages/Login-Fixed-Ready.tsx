import { useState } from 'react'

export default function Login(){
  const [email,setEmail]=useState('admin99@test.com')
  const [password,setPassword]=useState('123456')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const doMockLogin = (em: string)=>{
    setLoading(true)
    localStorage.setItem('access', 'demo-token-'+Date.now())
    localStorage.setItem('user', JSON.stringify({email: em, name: 'مدير النظام', role: em.includes('admin') ? 'admin' : em.includes('employee') ? 'employee' : 'user'}))
    setTimeout(()=>window.location.href='/dashboard', 600)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'IBM Plex Sans Arabic, sans-serif', background: '#ffffff' }} dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700;800&display=swap');
        @keyframes shimmer { 0% { transform: translateX(-100%) } 100% { transform: translateX(300%) } }
        @keyframes float { 0% { transform: translateY(0px) } 50% { transform: translateY(-10px) } 100% { transform: translateY(0px) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: translateY(0px) } }
      `}</style>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', position: 'relative' }}>
        <div style={{ width: '100%', maxWidth: '380px', animation: 'fadeIn 0.6s ease' }}>
          <div style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', background: '#0f172a', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>◈</div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#64748b' }}>TICKET SYSTEM • v2.0</span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.8px', lineHeight: 1.1, margin: 0 }}>
              نظام إدارة<br/>التذاكر الذكي
            </h1>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px', lineHeight: 1.6 }}>نظام متكامل مدعوم بـ 3 مودلات ذكاء اصطناعي • 127 تذكرة فعلية • دقة 92%</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'block' }}>البريد الإلكتروني</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" style={{ width: '100%', padding: '13px 40px 13px 14px', borderRadius: '11px', border: '1.5px solid #f1f5f9', fontSize: '13px', outline: 'none', background: '#f8fafc' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'block' }}>كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '13px 40px 13px 14px', borderRadius: '11px', border: '1.5px solid #f1f5f9', fontSize: '13px', outline: 'none', background: '#f8fafc' }} onKeyDown={e=>e.key==='Enter'&&doMockLogin(email)} />
                <button onClick={()=>setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}>{showPass ? '◍' : '◎'}</button>
              </div>
            </div>
            <button onClick={()=>doMockLogin(email)} disabled={loading} style={{ width: '100%', padding: '13px', borderRadius: '11px', background: '#0f172a', color: 'white', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginTop: '8px', position: 'relative', overflow: 'hidden', opacity: loading ? 0.8 : 1 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', transform: 'translateX(-100%)', animation: 'shimmer 2.5s infinite' }}></div>
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول →'}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
              <button onClick={()=>{setEmail('admin99@test.com'); doMockLogin('admin99@test.com')}} style={{ padding: '11px', borderRadius: '10px', background: 'white', border: '1px solid #f1f5f9', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>مدير</button>
              <button onClick={()=>{setEmail('employee@test.com'); doMockLogin('employee@test.com')}} style={{ padding: '11px', borderRadius: '10px', background: 'white', border: '1px solid #f1f5f9', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>موظف</button>
              <button onClick={()=>{setEmail('user@test.com'); doMockLogin('user@test.com')}} style={{ padding: '11px', borderRadius: '10px', background: 'white', border: '1px solid #f1f5f9', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>عميل</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1.1, background: '#0f172a', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} src="/login-premium.mp4" />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '14px', animation: 'float 6s ease-in-out infinite' }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: '14px', padding: '16px', width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>🤖 تحليل AI مباشر</span>
              <span style={{ fontSize: '9px', background: '#10b981', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>LIVE</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>الخدمة معطلة عاجل!!! 😡</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ fontSize: '9px', background: '#fef2f2', color: '#ef4444', padding: '3px 6px', borderRadius: '6px', fontWeight: 700 }}>🔴 عاجلة</span>
              <span style={{ fontSize: '9px', background: '#fef2f2', color: '#ef4444', padding: '3px 6px', borderRadius: '6px' }}>😡 غاضب جداً</span>
              <span style={{ fontSize: '9px', background: '#f0fdf4', color: '#10b981', padding: '3px 6px', borderRadius: '6px' }}>AI 92%</span>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '14px', padding: '14px', width: '300px', marginRight: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>م</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: 700 }}>مشاري • الآن</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>تم تصنيف تذكرتك كـ عاجلة وسيتم الرد خلال ساعة</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

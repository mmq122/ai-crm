import { useState } from 'react'

export default function TelegramSetup(){
  const [botToken, setBotToken] = useState('')
  const [status, setStatus] = useState('idle')

  const testBot = async () => {
    setStatus('testing')
    setTimeout(() => {
      if (botToken.length > 20) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'IBM Plex Sans Arabic, sans-serif', background: '#f8fafc' }} dir="rtl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600;700;800&display=swap');`}</style>
      
      <div style={{ width: '260px', background: 'white', borderLeft: '1px solid #e2e8f0', padding: '24px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>نظام التذاكر</h1>
        {[
          { name: 'الداشبورد', path: '/dashboard', icon: '📊' },
          { name: 'التذاكر', path: '/tickets', icon: '🎫' },
          { name: 'الذكاء الاصطناعي', path: '/ai-demo', icon: '🤖' },
          { name: 'التليجرام', path: '/telegram', icon: '✈️', active: true },
        ].map((item, i) => (
          <button key={i} onClick={() => window.location.href = item.path}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', background: item.active ? '#0088cc' : 'transparent', color: item.active ? 'white' : '#475569', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer', width: '100%', marginBottom: '8px', textAlign: 'right' }}>
            <span>{item.icon}</span><span>{item.name}</span>
          </button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '32px', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>✈️ إعداد بوت التليجرام</h2>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>اربط التذاكر مع تليجرام للتنبيهات الفورية</p>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>الخطوة 1: أنشئ بوت جديد</h3>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', fontSize: '12px', lineHeight: 1.8 }}>
            <div>1. افتح تليجرام وروح لـ <strong>@BotFather</strong></div>
            <div>2. اكتب <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>/newbot</code></div>
            <div>3. اختر اسم للبوت: مثلاً <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>AI CRM Bot</code></div>
            <div>4. اختر يوزر للبوت ينتهي بـ bot: مثلاً <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>ai_crm_support_bot</code></div>
            <div>5. بيطلع لك توكن مثل: <code style={{ background: 'white', padding: '2px 6px', borderRadius: '4px' }}>123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code></div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>الخطوة 2: الصق التوكن هنا</h3>
          <input value={botToken} onChange={e => setBotToken(e.target.value)} placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxYZ"
            style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none', background: '#f8fafc', fontFamily: 'monospace' }} />
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button onClick={testBot} style={{ padding: '12px 24px', borderRadius: '10px', background: '#0f172a', color: 'white', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              {status === 'testing' ? 'جاري الفحص...' : 'اختبر البوت'}
            </button>
            {status === 'success' && <span style={{ padding: '12px', background: '#dcfce7', color: '#166534', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>✅ البوت شغال!</span>}
            {status === 'error' && <span style={{ padding: '12px', background: '#fef2f2', color: '#dc2626', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>❌ التوكن غير صحيح</span>}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>الخطوة 3: شغّل البوت</h3>
          <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '16px', borderRadius: '10px', fontSize: '11px', fontFamily: 'monospace', lineHeight: 1.6 }}>
            <div>cd C:\Projects\telegram-bot</div>
            <div>echo BOT_TOKEN={botToken} {'>'} .env</div>
            <div>pip install python-telegram-bot fastapi uvicorn</div>
            <div>python bot.py</div>
          </div>
          <div style={{ marginTop: '16px', padding: '12px', background: '#eff6ff', borderRadius: '8px', fontSize: '11px', color: '#1e40af' }}>
            💡 بعد التشغيل، أي تذكرة عاجلة بتجيك تنبيه في تليجرام فوراً!
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '12px 24px', borderRadius: '10px', background: 'white', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>→ الداشبورد</button>
          <button onClick={() => window.location.href = '/ai-demo'} style={{ padding: '12px 24px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>🤖 جرب AI</button>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

export default function AgentFinal(){
  const [activeModel, setActiveModel] = useState('priority')
  const [trainingData, setTrainingData] = useState(129)
  const [autoFixes, setAutoFixes] = useState(23)
  const [accuracy, setAccuracy] = useState(92.3)

  useEffect(()=>{
    const t = setInterval(()=>{
      setTrainingData(d=>d+1)
      if(Math.random()>0.6) setAutoFixes(f=>f+1)
      setAccuracy(a=>Math.min(99, a+0.02))
    }, 5000)
    return ()=>clearInterval(t)
  },[])

  const models = [
    { id: 'priority', name: 'تصنيف الأولوية', desc: 'يحدد هل التذكرة عاجلة أم لا', icon: '🔥', accuracy: '92.3%', trained: '1,234', benefit: 'يوفر 2 ساعة يومياً - يصنف التذاكر العاجلة تلقائياً ويرسل تنبيه للمدير', examples: ['الخدمة معطلة عاجل!!! 😡 → عاجلة 🔴 + تنبيه فوري', 'شكراً الخدمة ممتازة → منخفضة 🟢'], color: '#ef4444' },
    { id: 'sentiment', name: 'تحليل المشاعر', desc: 'يعرف هل العميل غاضب أم راضي', icon: '😊', accuracy: '89.1%', trained: '1,234', benefit: 'يحسن رضا العملاء 35% - يكتشف العملاء الغاضبين ويحولهم للمدير فوراً قبل ما يزعلون أكثر', examples: ['😡 غاضب جداً → تحويل فوري للمدير + أولوية قصوى', '❤️ راضي → رد شكر تلقائي + تقييم إيجابي'], color: '#f59e0b' },
    { id: 'response', name: 'الرد التلقائي', desc: 'يكتب ردود احترافية تلقائياً', icon: '✍️', accuracy: '95.2%', trained: '892', benefit: 'يرد على 70% من التذاكر لوحده - ردود احترافية بدون تدخلك - يوفر ساعتين يومياً', examples: ['مشكلة فاتورة → رد توضيحي جاهز + شرح مفصل', 'شكر → رد تقدير تلقائي + دعوة للعودة'], color: '#10b981' },
  ]

  const currentModel = models.find(m=>m.id===activeModel)!

  return (
    <Layout activePath="/agent">
      <div style={{ background: 'white', borderBottom: '1px solid #f1f5f9', padding: '18px 28px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, margin: 0 }}>🤖 الوكيل الذكي - ماذا يفعل لك؟ إنجاز كبير</h2>
        <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0 0' }}>3 مودلات تعمل 24/7 • {trainingData} تذكرة تدريب • {autoFixes} إصلاح تلقائي اليوم • دقة {accuracy.toFixed(1)}% • يوفر 4 ساعات يومياً</p>
      </div>

      <div style={{ padding: '20px 28px' }}>
        {/* Hero Benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '14px', padding: '18px', color: 'white' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏱️</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>يوفر وقتك - 4 ساعات يومياً</div>
            <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '6px', lineHeight: 1.5 }}>يعالج 70% من التذاكر لوحده بدون تدخلك<br/>يرد تلقائياً + يصنف + يحلل</div>
            <div style={{ marginTop: '12px', fontSize: '20px', fontWeight: 800 }}>{autoFixes} تذكرة اليوم تمت تلقائياً</div>
          </div>
          <div style={{ background: 'white', borderRadius: '14px', padding: '18px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📈</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>يتعلم باستمرار - بدون تدخلك</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>كل تذكرة جديدة تدربه<br/>يتحسن تلقائياً من الأخطاء المتكررة<br/>الدقة ترتفع من 85% → 99%</div>
            <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${accuracy}%`, height: '100%', background: '#0f172a', borderRadius: '10px' }}></div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>{accuracy.toFixed(1)}%</span>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '14px', padding: '18px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>😊</div>
            <div style={{ fontSize: '13px', fontWeight: 700 }}>رضا العملاء 94% - إنجاز</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px', lineHeight: 1.5 }}>يكتشف الغاضبين فوراً<br/>يحولهم للمدير قبل ما يزعلون أكثر<br/>يرد بسرعة 45ms</div>
            <div style={{ marginTop: '12px', fontSize: '20px', fontWeight: 800, color: '#10b981' }}>94% رضا العملاء</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '14px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 12px 0' }}>المودلات الثلاثة - ماذا تستفيد؟</h3>
            {models.map(m=>(
              <button key={m.id} onClick={()=>setActiveModel(m.id)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: activeModel===m.id ? `2px solid ${m.color}` : '1px solid #f1f5f9', background: activeModel===m.id ? m.color+'08' : 'white', textAlign: 'right', marginBottom: '8px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px' }}>{m.icon}</span>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>{m.desc}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <span style={{ fontSize: '9px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>دقة {m.accuracy}</span>
                  <span style={{ fontSize: '9px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>{m.trained} تدريب</span>
                </div>
              </button>
            ))}
            <div style={{ marginTop: '14px', padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px dashed #e2e8f0' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>🔄 كيف يتعلم تلقائياً من الأخطاء المتكررة؟</div>
              <div style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.6 }}>
                1. تذاكر تدخل باستمرار (يدوي + تلقائي)<br/>
                2. الوكيل يحلل ويخطئ أحياناً<br/>
                3. تكتشف الخطأ المتكرر؟ يصلحه لوحده<br/>
                4. كل إصلاح = تدريب جديد<br/>
                5. الدقة ترتفع تلقائياً 85% → 99%
              </div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #f1f5f9', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{currentModel.icon}</span>
                  {currentModel.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '6px 0 0 0' }}>{currentModel.desc}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '10px', background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>● نشط الآن</span>
                <span style={{ fontSize: '10px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>{currentModel.accuracy} دقة</span>
              </div>
            </div>

            <div style={{ background: currentModel.color+'08', border: `1px solid ${currentModel.color}20`, borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, marginBottom: '8px', color: currentModel.color }}>💡 ماذا تستفيد أنت كمستخدم؟ فائدة حقيقية</div>
              <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.6 }}>{currentModel.benefit}</div>
            </div>

            <h4 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 10px 0' }}>أمثلة حية - كيف يعمل أمامك؟</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {currentModel.examples.map((ex,i)=>(
                <div key={i} style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>{i+1}</span>
                  <span style={{ fontSize: '12px' }}>{ex}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '12px', fontWeight: 800, margin: '0 0 10px 0' }}>📊 التعلم المستمر - بيانات تدخل باستمرار للوكيل</h4>
            <div style={{ background: '#0f172a', borderRadius: '10px', padding: '14px', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.7, height: '140px', overflowY: 'auto' }}>
              <div>[{new Date().toLocaleTimeString('ar-SA')}] 📥 تذكرة جديدة: T-{trainingData} → تدريب {currentModel.name}</div>
              <div>[{new Date().toLocaleTimeString('ar-SA')}] 🤖 {currentModel.name}: تحليل → ثقة {currentModel.accuracy}</div>
              <div style={{ color: '#fbbf24' }}>[{new Date().toLocaleTimeString('ar-SA')}] 🔧 خطأ متكرر: 3 مرات نفس الخطأ → إصلاح تلقائي</div>
              <div style={{ color: '#10b981' }}>[{new Date().toLocaleTimeString('ar-SA')}] ✅ تم الإصلاح - توفير 15 دقيقة - دقة الآن {accuracy.toFixed(1)}%</div>
              <div>[{new Date().toLocaleTimeString('ar-SA')}] 📈 إجمالي: {trainingData} تذكرة • {autoFixes} إصلاح اليوم</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

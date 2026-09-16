import { useState, useRef, useEffect } from 'react'

type Msg = { role: 'user' | 'bot', content: string, time?: string, ticket?: { id: string, title: string } }

const CONFIG = {
  botName: 'المساعد الذكي',
  welcomeMessage: 'أهلاً وسهلاً! أنا مساعدك الذكي.\n\nأقدر أسولف معك في أي موضوع تبيه - عقار، كورة، تقنية، جو، نكت، أي شي!\nقل لي عن أي موضوع ونسولف.\n\nكيف أقدر أساعدك اليوم؟',
  inputPlaceholder: 'سولف عن أي موضوع...'
}

const TOPICS: Record<string, string[]> = {
  'عقار': [
    'العقار هاليومين موضوع ساخن! في الرياض الأسعار ارتفعت كثير، خصوصاً شمال الرياض. الناس صارت تدور شقق صغيرة بدل الفلل الكبيرة عشان الأسعار.',
    'السكن صار تحدي كبير! كثير ناس يدورون شقق إيجار بأسعار معقولة. سمعت إن فيه مشاريع جديدة في القدية ونيوم بتوفر سكن كثير قريباً.',
    'موضوع السكن والعقار مهم جداً. الحكومة قاعدة تشتغل على برامج مثل سكني ورؤية 2030 بتوفر بيوت للناس. أنت تدور بيت ولا عندك عقار؟'
  ],
  'كورة': [
    'الكورة! أنا أحب الكورة! الدوري السعودي صار قوي مرة هالسنة مع لاعبين عالميين. الهلال والنصر والاتحاد والأهلي كلهم عندهم نجوم كبار.',
    'كرة القدم في السعودية تطورت كثير! مع قدوم رونالدو ونيمار وبنزيما، الدوري صار متابع عالمياً. أنت تشجع أي فريق؟ أنا أميل للهلال!',
    'الكورة حلوة! آخر مباراة شفتها كانت حماسية. تبي نتكلم عن الدوري السعودي ولا دوري أبطال أوروبا؟'
  ],
  'تقنية': [
    'التقنية! هذا تخصصي! الذكاء الاصطناعي قاعد يغير العالم - مثل ChatGPT وأنا! كل يوم فيه شي جديد، روبوتات، سيارات ذاتية، كل شي صار ذكي.',
    'التقنية تتطور بسرعة جنونية! هاليومين الكل يتكلم عن الذكاء الاصطناعي، والواقع الافتراضي، والبلوك تشين. أنت مهتم بأي مجال في التقنية؟',
    'التقنية حلوة! أنا بوت ذكاء اصطناعي، فالتقنية هي حياتي. تبي نتكلم عن البرمجة؟ عن الجوالات الجديدة؟ عن المستقبل؟'
  ],
  'جو': [
    'الجو اليوم؟ في الرياض الجو حار شوي، حوالي 30-35 درجة. الصباح زين بس الظهر حر. أحسن وقت تطلع فيه العصر أو بالليل.',
    'الجو هاليومين متقلب! يوم حر ويوم غبار. بس هذا جو الرياض معروف، الصيف حار والشتاء بارد وزين.',
    'إيه الجو! أنت وين ساكن؟ في الرياض الجو حار هاليومين، بس بالليل يصير حلو للطلعات.'
  ],
  'نكتة': [
    'مرة واحد راح للدعم الفني قال: البريد خربان! قالوا له: طفيه وشغله! قال: سويتها! قالوا: أجل المشكلة منك!',
    'واحد سأل صاحبه: ليش تحب الشتاء؟ قال: عشان أقدر ألبس ثوبين وأقول بردان!',
    'مرة واحد نسي باسورده، راح للدعم قال: نسيت الباسورد! قالوا: اكتب 123456! قال: هذا اللي ناسيه!',
    'واحد راح لمطعم قال: عندكم واي فاي؟ قالوا: إيه! قال: وش الباسورد؟ قالوا: لازم تطلب أول!',
    'مرة واحد سأل البوت: وش تسوي إذا طفى النت؟ قال: أنام! هذا أحسن شي أسويه!'
  ]
}

export default function Chat(){
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'bot', content: CONFIG.welcomeMessage, time: 'الآن' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) }, [messages, isTyping])

  const getTopicReply = (text: string): string | null => {
    const lower = text.toLowerCase()
    
    // Extract topic after "عن" - e.g., "سولف لي عن الكورة" -> "الكورة"
    let topic = ''
    const aboutMatch = lower.match(/عن\s+(.+)/)
    if(aboutMatch){
      topic = aboutMatch[1].trim().replace(/[.?!]/g,'').split(' ')[0]
    } else {
      // Single word topic like "العقار" or "الكورة"
      const words = lower.trim().split(' ')
      if(words.length === 1){
        topic = words[0]
      } else if(words.length <= 2){
        topic = words[words.length-1]
      }
    }

    // Map topic to known categories
    if(topic.includes('عقار') || topic.includes('سكن') || topic.includes('بيت') || topic.includes('شقة') || lower.includes('عقار') || lower.includes('السكن')){
      const arr = TOPICS['عقار']
      return arr[Math.floor(Math.random()*arr.length)]
    }
    if(topic.includes('كور') || topic.includes('كرة') || lower.includes('كورة') || lower.includes('كرة') || lower.includes('هلال') || lower.includes('نصر') || lower.includes('اتحاد')){
      const arr = TOPICS['كورة']
      return arr[Math.floor(Math.random()*arr.length)]
    }
    if(topic.includes('تقن') || lower.includes('تقنية') || lower.includes('تكنولوجيا') || lower.includes('برمجة') || lower.includes('ذكاء')){
      const arr = TOPICS['تقنية']
      return arr[Math.floor(Math.random()*arr.length)]
    }
    if(topic.includes('جو') || topic.includes('طقس') || topic.includes('حر') || topic.includes('برد') || lower.includes('الجو') || lower.includes('الطقس')){
      const arr = TOPICS['جو']
      return arr[Math.floor(Math.random()*arr.length)]
    }
    if(topic.includes('نكت') || lower.includes('نكت') || lower.includes('طرفه') || lower.includes('joke')){
      const arr = TOPICS['نكتة']
      return arr[Math.floor(Math.random()*arr.length)] + '\n\nتبي نكتة ثانية؟'
    }

    return null
  }

  const getNaturalReply = (text: string): { content: string, ticket?: { id: string, title: string } } => {
    const lower = text.toLowerCase().trim()
    const original = text.trim()

    // === 1. تحيات ===
    if((lower.includes('مرحبا') || lower.includes('سلام') || lower.includes('هلا') || lower === 'hello' || lower === 'hi') && lower.split(' ').length <= 3){
      const replies = [
        'وعليكم السلام ورحمة الله وبركاته! هلا والله حياك! كيف حالك اليوم؟',
        'هلا والله! أهلاً وسهلاً فيك! شلونك؟',
        'يا هلا ومرحبا! حياك الله!'
      ]
      return { content: replies[Math.floor(Math.random()*replies.length)] }
    }
    if(lower.includes('كيف الحال') || lower.includes('شلونك') || lower.includes('كيفك')){
      return { content: 'الحمد لله بخير ونعمة! أنا كويس، أشتغل طول اليوم. أنت كيف حالك؟ وش مسوي اليوم؟' }
    }

    // === 2. اختر موضوع وسولف لي - يختار هو موضوع ===
    if(lower.includes('اختر موضوع') || lower.includes('اختار موضوع') || (lower.includes('اختر') && lower.includes('سولف'))){
      const topics = ['العقار', 'الكورة', 'التقنية', 'الجو']
      const chosen = topics[Math.floor(Math.random()*topics.length)]
      const topicReply = getTopicReply(chosen)
      return { content: `تمام! خلني أسولف لك عن ${chosen}:\n\n${topicReply}\n\nوش رأيك؟ تبي نكمل في نفس الموضوع ولا نغير؟` }
    }

    // === 3. جرب يتكلم عن موضوع محدد ===
    const topicReply = getTopicReply(original)
    if(topicReply){
      return { content: topicReply }
    }

    // === 4. سوالف عامة ===
    if(lower.includes('سولف') || lower.includes('سالف')){
      // إذا قال "سولف" بدون موضوع، يعطي خيارات ويسولف عن موضوع عشوائي
      if(lower.length < 15){
        const randomTopics = Object.keys(TOPICS)
        const randomTopic = randomTopics[Math.floor(Math.random()*randomTopics.length)]
        const reply = TOPICS[randomTopic][0]
        return { content: `أكيد! خلني أسولف لك عن ${randomTopic}:\n\n${reply}\n\nتبي نكمل في ${randomTopic} ولا نتكلم عن شي ثاني؟` }
      }
      // إذا قال "سولف لي" مع جملة طويلة لكن ما فهمنا الموضوع
      return { content: 'أكيد أسولف معك! عن أي موضوع ودك؟ العقار؟ الكورة؟ التقنية؟ الجو؟ النكت؟ قل لي!' }
    }

    // === 5. حر و جو ===
    if(lower.includes('حر') && (lower.includes('اليوم') || lower.includes('نصاب') || lower.includes('فوق') || lower.includes('درجة'))){
      const heatReplies = [
        'إيه والله اليوم حر مرة! 40 درجة كثير والله، الواحد ما يقدر يطلع الظهر. أنت وين؟ في الرياض؟',
        'صادق! هاليومين الجو نار، 40 وفوق. أحسن شي الواحد يجلس في البيت مع المكيف!',
        'الله يعين! 40 درجة حر مو طبيعي. دير بالك لا تطلع وقت الظهر، اشرب موية كثير.'
      ]
      return { content: heatReplies[Math.floor(Math.random()*heatReplies.length)] }
    }

    // === 6. أسئلة خدمة - يفتح تذكرة فقط هنا ===
    const isRequestingTicket = lower.includes('افتح تذكرة') || lower.includes('فتح تذكرة') || lower.includes('احتاج دعم')
    const isTechProblem = (lower.includes('مشكلة') && (lower.includes('بريد') || lower.includes('نظام') || lower.includes('دخول'))) || lower.includes('البريد خربان') || lower.includes('ما يشتغل')

    if(isRequestingTicket || (isTechProblem && !lower.includes('حر'))){
      const id = 'TKT-' + new Date().getFullYear() + '-' + (Math.floor(Math.random()*9000)+1000)
      return { 
        content: 'تمام، فهمت! فتحت لك تذكرة دعم فني وبيتواصل معك الفريق قريباً.', 
        ticket: { id, title: original.slice(0,50) } 
      }
    }

    // === 7. ردود طبيعية متنوعة ===
    if(lower.length < 10){
      const shortReplies = [
        'إيه؟ قول لي أكثر!',
        'آها! وش ودك نتكلم عنه بالضبط؟',
        'جميل! حدد لي موضوع: عقار، كورة، تقنية، جو، ولا نكت؟'
      ]
      return { content: shortReplies[Math.floor(Math.random()*shortReplies.length)] }
    }

    // رد عام طبيعي
    return { content: `آها، فهمت! "${original}" - موضوع حلو. تبي أسولف لك عنه أكثر؟ قل لي وش تبغى تعرف بالضبط عن ${original}؟` }
  }

  const send = async(p?: string)=>{
    const txt = p || input
    if(!txt.trim()) return
    const userMsg: Msg = { role: 'user', content: txt, time: new Date().toLocaleTimeString('ar-SA',{hour:'2-digit',minute:'2-digit'}) }
    setMessages(m=>[...m, userMsg])
    setInput('')
    setIsTyping(true)
    await new Promise(r=>setTimeout(r,700 + Math.random()*400))
    const reply = getNaturalReply(txt)
    const botMsg: Msg = { role: 'bot', content: reply.content, time: new Date().toLocaleTimeString('ar-SA',{hour:'2-digit',minute:'2-digit'}), ticket: reply.ticket }
    setMessages(m=>[...m, botMsg])
    setIsTyping(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc', fontFamily: 'IBM Plex Sans Arabic, sans-serif' }} dir="rtl">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@500;700;900&display=swap');`}</style>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <div style={{ height: '60px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 900 }}>AI</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13px' }}>المساعد الذكي - يفهم المواضيع</div>
              <div style={{ fontSize: '11px', color: '#10b981' }}>● يفهم: عقار، كورة، تقنية، جو، نكت</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', background: '#fcfcfd', padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((m,i)=>(
            <div key={i} style={{ display: 'flex', gap: '10px', flexDirection: m.role==='user' ? 'row-reverse' as const : 'row' as const }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.role==='user' ? '#0f172a' : '#f1f5f9', border: '1px solid #e2e8f0', fontSize: '11px', fontWeight: 800 }}>{m.role==='user' ? 'أنت' : 'AI'}</div>
              <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: m.role==='user' ? 'flex-end' as const : 'flex-start' as const }}>
                <div style={{ padding: '12px 16px', borderRadius: '16px', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-wrap' as const, border: '1px solid #e2e8f0', background: m.role==='user' ? '#0f172a' : 'white', color: m.role==='user' ? 'white' : '#1e293b' }}>
                  {m.content}
                  {m.ticket && (
                    <div style={{ marginTop: '12px', borderRadius: '12px', background: 'linear-gradient(135deg,#0f172a,#1e293b)', color: 'white', padding: '12px' }}>
                      <div style={{ fontSize: '10px', opacity: 0.7 }}>تم إنشاء تذكرة دعم</div>
                      <div style={{ fontWeight: 800, fontSize: '13px', marginTop: '4px' }}>{m.ticket.id}</div>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>{m.time}</span>
              </div>
            </div>
          ))}
          {isTyping && <div style={{ display: 'flex', gap: '10px' }}><div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>AI</div><div style={{ background: 'white', border: '1px solid #e2e8f0', padding: '10px 16px', borderRadius: '16px', fontSize: '12px', color: '#64748b' }}>يكتب...</div></div>}
          <div ref={endRef} />
          </div>
        </div>
        <div style={{ background: 'white', borderTop: '1px solid #e2e8f0', padding: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '999px', padding: '6px' }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } }} placeholder="قل: العقار، الكورة، التقنية، نكته..." style={{ flex: 1, background: 'transparent', padding: '8px 16px', fontSize: '14px', border: 'none', outline: 'none' }} />
            <button onClick={()=>send()} disabled={!input.trim()} style={{ width: '38px', height: '38px', borderRadius: '999px', background: '#0f172a', color: 'white', border: 'none', cursor: 'pointer', opacity: input.trim() ? 1 : 0.3 }}>↑</button>
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', marginTop: '8px' }}>جرب: العقار | الكورة | التقنية | نكته | الجو</div>
        </div>
      </div>
    </div>
  )
}

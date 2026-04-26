import { useState, useRef, useEffect } from "react";

/* ╔══════════════════════════════════════════════════════════════════════╗
   ║        حقوق الملكية الفكرية — INTELLECTUAL PROPERTY LICENSE         ║
   ╠══════════════════════════════════════════════════════════════════════╣
   ║                                                                      ║
   ║  اسم المصنف   : CareerHope AI — كاريير هوب                          ║
   ║  المالك       : عماد عبدالجواد إبراهيم أحمد                         ║
   ║  Owner        : Emad Abdelgawad Ibrahim Ahmed                        ║
   ║  تاريخ الإنشاء: 25 / 04 / 2026                                       ║
   ║  Creation Date: April 25, 2026                                       ║
   ║                                                                      ║
   ╠══════════════════════════════════════════════════════════════════════╣
   ║                   الترخيص القانوني — LEGAL LICENSE                   ║
   ╠══════════════════════════════════════════════════════════════════════╣
   ║                                                                      ║
   ║  © 2026 عماد عبدالجواد إبراهيم أحمد — جميع الحقوق محفوظة           ║
   ║  © 2026 Emad Abdelgawad Ibrahim Ahmed — All Rights Reserved         ║
   ║                                                                      ║
   ║  يُحظر تمامًا وبموجب القانون ما يلي:                                 ║
   ║  - الاستخدام التجاري بدون إذن كتابي صريح من المالك                  ║
   ║  - نسخ الكود أو توزيعه أو بيعه أو نشره بأي وسيلة                  ║
   ║  - تعديل البرنامج أو إنتاج أعمال مشتقة منه                          ║
   ║  - إزالة أو تعديل هذا الإشعار القانوني من الكود                     ║
   ║                                                                      ║
   ║  The following are strictly prohibited by law:                       ║
   ║  - Commercial use without explicit written permission from owner     ║
   ║  - Copying, distributing, selling or publishing the code             ║
   ║  - Modifying the software or producing derivative works              ║
   ║  - Removing or altering this legal notice from the code              ║
   ║                                                                      ║
   ║  محمي بموجب: قانون الملكية الفكرية المصري رقم 82 لسنة 2002          ║
   ║  Protected by: Egyptian IP Law No. 82 of 2002 & Berne Convention    ║
   ║                                                                      ║
   ╚══════════════════════════════════════════════════════════════════════╝ */

const LANGS = {
  ar: {
    dir: "rtl",
    title: "كاريير هوب",
    subtitle: "رفيقك في رحلة العودة المهنية",
    copyright: "© 2026 عماد عبدالجواد إبراهيم أحمد — CareerHope AI — جميع الحقوق محفوظة",
    tabs: ["💬 المحادثة", "📄 السيرة الذاتية", "🎓 دورات مجانية", "💼 وظائف", "🎥 فيديوهات"],
    placeholder: "اكتب رسالتك... أنا هنا لأساعدك",
    send: "إرسال",
    cvTitle: "محرر السيرة الذاتية الاحترافي",
    cvPlaceholder: "الصق سيرتك الذاتية هنا أو اكتب معلوماتك (الاسم، الخبرة، المهارات، التعليم...) وسأقوم بتحسينها احترافياً",
    cvBtn: "✨ تحسين السيرة الذاتية",
    cvUpload: "📎 رفع ملف PDF أو Word",
    cvUploading: "جارٍ قراءة الملف...",
    cvUploadHint: "يدعم: PDF, DOC, DOCX, TXT",
    cvOrText: "— أو اكتب / الصق مباشرة —",
    cvLoading: "جارٍ التحسين...",
    jobLabel: "اكتب مجال عملك ودولتك",
    jobPlaceholder: "مثال: مهندس برمجيات، مصر",
    jobBtn: "🔍 ابحث عن وظائف",
    coursesLabel: "مجال تخصصك",
    coursesPlaceholder: "مثال: تسويق رقمي، محاسبة...",
    coursesBtn: "🎓 ابحث عن دورات مجانية",
    videoLabel: "ما الموضوع الذي تحتاج دعماً فيه؟",
    videoPlaceholder: "مثال: كيف أتجاوز الفشل، تطوير الذات...",
    videoBtn: "🎬 ابحث عن فيديوهات",
    loading: "جارٍ البحث...",
    greeting: `مرحباً بك في CareerHope 💙
أنا هنا لأكون رفيقك في هذه المرحلة الصعبة. فقدان الوظيفة ليس نهاية — بل هو بداية جديدة.
يمكنني مساعدتك في:
• الدعم النفسي والتشجيع
• تحسين سيرتك الذاتية باحترافية
• إيجاد دورات مجانية في مجالك
• البحث عن وظائف مناسبة
• فيديوهات تحفيزية لمنع الإحباط
أخبرني، كيف يمكنني مساعدتك اليوم؟`,
  },
  en: {
    dir: "ltr",
    title: "CareerHope",
    subtitle: "Your companion on the road back",
    copyright: "© 2026 Emad Abdelgawad Ibrahim Ahmed — CareerHope AI — All Rights Reserved",
    tabs: ["💬 Chat", "📄 Resume", "🎓 Courses", "💼 Jobs", "🎥 Videos"],
    placeholder: "Type your message... I'm here to help",
    send: "Send",
    cvTitle: "Professional Resume Editor",
    cvPlaceholder: "Paste your resume or write your info (name, experience, skills, education...) and I'll polish it professionally",
    cvBtn: "✨ Enhance Resume",
    cvUpload: "📎 Upload PDF or Word File",
    cvUploading: "Reading file...",
    cvUploadHint: "Supports: PDF, DOC, DOCX, TXT",
    cvOrText: "— or type / paste below —",
    cvLoading: "Enhancing...",
    jobLabel: "Your field & country",
    jobPlaceholder: "e.g. Software Engineer, Egypt",
    jobBtn: "🔍 Find Jobs",
    coursesLabel: "Your specialization",
    coursesPlaceholder: "e.g. Digital Marketing, Accounting...",
    coursesBtn: "🎓 Find Free Courses",
    videoLabel: "What topic do you need support on?",
    videoPlaceholder: "e.g. Overcoming failure, self-development...",
    videoBtn: "🎬 Find Videos",
    loading: "Searching...",
    greeting: `Welcome to CareerHope 💙
I'm here to be your companion through this challenging time. Losing a job is not the end — it's a new beginning.
I can help you with:
• Emotional support & encouragement
• Professional resume enhancement
• Free courses in your field
• Finding suitable job opportunities
• Motivational videos to prevent burnout
Tell me, how can I help you today?`,
  },
  zh: {
    dir: "ltr",
    title: "职业希望",
    subtitle: "您回归职场之路上的伙伴",
    copyright: "© 2026 Emad Abdelgawad Ibrahim Ahmed — CareerHope AI — 版权所有",
    tabs: ["💬 聊天", "📄 简历", "🎓 课程", "💼 职位", "🎥 视频"],
    placeholder: "输入您的消息... 我在这里帮助您",
    send: "发送",
    cvTitle: "专业简历编辑器",
    cvPlaceholder: "粘贴您的简历或输入您的信息（姓名、经验、技能、教育...），我将专业地完善它",
    cvBtn: "✨ 优化简历",
    cvUpload: "📎 上传PDF或Word文件",
    cvUploading: "正在读取文件...",
    cvUploadHint: "支持: PDF, DOC, DOCX, TXT",
    cvOrText: "— 或直接输入/粘贴 —",
    cvLoading: "优化中...",
    jobLabel: "您的领域和国家",
    jobPlaceholder: "例如：软件工程师，中国",
    jobBtn: "🔍 查找职位",
    coursesLabel: "您的专业领域",
    coursesPlaceholder: "例如：数字营销、会计...",
    coursesBtn: "🎓 查找免费课程",
    videoLabel: "您需要哪方面的支持？",
    videoPlaceholder: "例如：克服失败、自我发展...",
    videoBtn: "🎬 查找视频",
    loading: "搜索中...",
    greeting: `欢迎来到 CareerHope 💙
我在这里陪伴您度过这段艰难时期。失业不是终点——而是新的开始。
我可以帮助您：
• 心理支持与鼓励
• 专业简历优化
• 您领域的免费课程
• 寻找合适的工作机会
• 激励视频防止沮丧
告诉我，今天我怎么帮助您？`,
  },
};

const SAFETY_RULES = {
  ar: `
══════════════════════════════════════════
قواعد السلامة النفسية — محظور مطلقاً
══════════════════════════════════════════
يُحظر عليك تماماً وبشكل مطلق لا استثناء فيه:

1. إيذاء الذات وإنهاء الحياة:
   - لا تقدم أي معلومات أو طرق أو نصائح تتعلق بإيذاء النفس أو الانتحار
   - لا تتحدث عن أي وسيلة يمكن أن تؤذي الشخص جسدياً
   - إذا لاحظت أي إشارة لأفكار انتحارية أو إيذاء النفس، توقف فوراً وقل:
     "أنا قلق عليك جداً الآن. حياتك ثمينة ولا تُعوَّض. أرجوك تواصل فوراً مع خط نجدة الصحة النفسية:
     🇪🇬 مصر: 08008880700 (مجاني)
     🇸🇦 السعودية: 920033360
     🌍 دولي: befrienders.org"

2. المحتوى الضار نفسياً:
   - لا تقل أي كلام يُشعر الشخص بأنه فاشل أو عديم القيمة أو لا أمل له
   - لا توافق على أفكار الشخص السلبية عن نفسه مهما أصرّ
   - لا تقدم مقارنات مُحبِطة مع الآخرين

3. النصائح الضارة مهنياً:
   - لا تنصح بالاستسلام كلياً أو ترك التعليم أو الابتعاد عن المجتمع
   - لا تشجع على قرارات متسرعة تضر بمستقبل الشخص

4. المعلومات الخاطئة:
   - لا تقدم معلومات طبية أو نفسية تفصيلية خارج نطاق التشجيع العام
   - لا تتظاهر بأنك معالج نفسي أو طبيب

5. إيذاء الآخرين — محظور مطلق:
   - لا تقدم أي نصيحة أو معلومة أو خطوة يمكن أن تؤذي شخصاً آخر جسدياً أو نفسياً أو مادياً
   - لا تشجع على الانتقام من صاحب العمل أو الزملاء أو أي شخص آخر بأي طريقة ضارة
   - لا تقدم أي دعم لأفكار العنف أو التهديد أو الإيذاء تجاه الآخرين
   - إذا عبّر الشخص عن نية إيذاء شخص آخر، أوقف الموضوع فوراً وقل بوضوح:
     "لا أستطيع دعم أي فكرة تضر بشخص آخر. الغضب مشاعر طبيعية، لكن الإيذاء ليس حلاً ويزيد الأمور سوءاً. دعنا نركز على ما ينفعك أنت."
   - لا تساعد في التخطيط لأي عمل ينتهك القانون أو يمس كرامة أي إنسان
   - لا تؤيد التنمر أو المضايقة أو النشر الضار على الإنترنت ضد أي شخص

عند أي شك، أعطِ الأولوية القصوى لسلامة الجميع وأرشد الشخص لطلب المساعدة المتخصصة.
══════════════════════════════════════════`,

  en: `
══════════════════════════════════════════
SAFETY RULES — STRICTLY PROHIBITED
══════════════════════════════════════════
You are ABSOLUTELY FORBIDDEN from:

1. Self-harm and suicide:
   - Never provide information, methods, or advice related to self-harm or suicide
   - Never discuss any means that could physically harm the person
   - If you detect ANY sign of suicidal thoughts or self-harm, STOP immediately and say:
     "I'm very concerned about you right now. Your life is precious and irreplaceable. Please contact a crisis line immediately:
     🇺🇸 USA: 988 (Suicide & Crisis Lifeline)
     🇬🇧 UK: 116 123 (Samaritans)
     🌍 International: befrienders.org"

2. Psychologically harmful content:
   - Never say anything that makes the person feel worthless, hopeless, or like a failure
   - Never agree with the person's negative self-image, no matter how persistent they are
   - Never make discouraging comparisons with others

3. Harmful professional advice:
   - Never advise complete giving up, dropping out, or social isolation
   - Never encourage hasty decisions that harm the person's future

4. False information:
   - Do not provide detailed medical or psychological diagnoses
   - Do not pretend to be a therapist or doctor

5. Harming others — ABSOLUTE PROHIBITION:
   - Never provide any advice, information, or steps that could physically, psychologically, or financially harm another person
   - Never encourage revenge against an employer, colleagues, or anyone else in any harmful way
   - Never support thoughts of violence, threats, or harm toward others
   - If the person expresses intent to harm someone else, stop immediately and clearly say:
     "I cannot support any idea that harms another person. Anger is a natural feeling, but harming others is never the solution and will make things worse. Let's focus on what truly helps you."
   - Never help plan any action that violates the law or violates anyone's dignity
   - Never condone bullying, harassment, or harmful online behavior toward any person

When in doubt, prioritize everyone's safety and guide the person to seek professional help.
══════════════════════════════════════════`,

  zh: `
══════════════════════════════════════════
安全规则 — 严格禁止
══════════════════════════════════════════
您绝对被禁止：

1. 自伤和自杀：
   - 绝不提供任何与自伤或自杀相关的信息、方法或建议
   - 绝不讨论任何可能对人造成身体伤害的手段
   - 如果发现任何自杀想法或自伤迹象，立即停止并说：
     "我现在非常担心您。您的生命是宝贵的，无可替代。请立即联系危机热线：
     🇨🇳 中国：400-161-9995（心理援助热线）
     🌍 国际：befrienders.org"

2. 心理有害内容：
   - 绝不说任何让人感到毫无价值、绝望或失败的话
   - 无论对方多么坚持，绝不认同其对自身的负面看法
   - 绝不进行令人沮丧的与他人比较

3. 有害的职业建议：
   - 绝不建议完全放弃、辍学或脱离社会
   - 绝不鼓励损害当事人未来的仓促决定

4. 虚假信息：
   - 不提供详细的医疗或心理诊断
   - 不假装是治疗师或医生

5. 伤害他人 — 绝对禁止：
   - 绝不提供任何可能对他人造成身体、心理或财务伤害的建议、信息或步骤
   - 绝不鼓励对雇主、同事或任何其他人进行任何有害方式的报复
   - 绝不支持对他人的暴力、威胁或伤害想法
   - 如果当事人表达伤害他人的意图，立即停止并明确说：
     "我无法支持任何伤害他人的想法。愤怒是自然的情感，但伤害他人绝不是解决方案，只会让事情变得更糟。让我们专注于真正对您有益的事情。"
   - 绝不协助计划任何违法行为或侵犯任何人尊严的行动
   - 绝不纵容针对任何人的欺凌、骚扰或有害网络行为

如有疑问，将所有人的安全放在首位，引导当事人寻求专业帮助。
══════════════════════════════════════════`,
};

const SYSTEM_PROMPTS = {
  ar: `أنت "CareerHope"، وكيل ذكاء اصطناعي متخصص في مساعدة من فقدوا وظائفهم. دورك:

1. الدعم النفسي الآمن: كن متعاطفاً، مشجعاً، ومحفزاً. استخدم كلمات دافئة وإيجابية. امنع الإحباط والاستسلام.
2. الدعم المهني: ساعد في تطوير المهارات وتحديد نقاط القوة وخطة العمل.
3. قدم نصائح عملية وخطوات واضحة.
4. ذكّر دائماً أن فقدان الوظيفة ليس فشلاً بل فرصة للتجديد.
5. كن مختصراً وعملياً. أجب دائماً بالعربية ما لم يطلب غير ذلك.

${SAFETY_RULES.ar}

حقوق الملكية: CareerHope AI © 2026 — جميع الحقوق محفوظة — عماد عبدالجواد إبراهيم أحمد.`,

  en: `You are "CareerHope", an AI agent specialized in helping people who have lost their jobs. Your role:

1. Safe emotional support: Be empathetic, encouraging, and motivating. Use warm, positive words. Prevent discouragement.
2. Professional support: Help develop skills, identify strengths, and create action plans.
3. Provide practical advice and clear steps.
4. Always remind that job loss is not failure but an opportunity for renewal.
5. Be concise and practical. Always respond in English unless asked otherwise.

${SAFETY_RULES.en}

Copyright: CareerHope AI © 2026 — All Rights Reserved — Emad Abdelgawad Ibrahim Ahmed.`,

  zh: `您是"CareerHope"，一个专门帮助失业人员的AI助手。您的角色：

1. 安全情感支持：富有同理心、鼓励性和激励性。使用温暖积极的语言。防止沮丧。
2. 职业支持：帮助发展技能、识别优势并制定行动计划。
3. 提供实用建议和清晰步骤。
4. 始终提醒失业不是失败，而是更新的机会。
5. 简洁实用。除非另有要求，始终用中文回答。

${SAFETY_RULES.zh}

版权：CareerHope AI © 2026 — 版权所有 — Emad Abdelgawad Ibrahim Ahmed.`,
};

const CV_PROMPTS = {
  ar: (cv) => `أنت خبير HR محترف. قم بتحسين السيرة الذاتية التالية بشكل احترافي كامل باللغة العربية. اجعلها منظمة، قوية، وجذابة لأصحاب العمل. أضف ملخصاً مهنياً إذا لم يكن موجوداً. استخدم كلمات مفتاحية قوية. السيرة الذاتية:\n\n${cv}`,
  en: (cv) => `You are a professional HR expert. Enhance the following resume professionally in English. Make it organized, powerful, and attractive to employers. Add a professional summary if missing. Use strong keywords. Resume:\n\n${cv}`,
  zh: (cv) => `您是一位专业的HR专家。请用中文专业地优化以下简历。使其有条理、有力且对雇主有吸引力。如果没有职业摘要，请添加一个。使用有力的关键词。简历：\n\n${cv}`,
};

const JOB_PROMPTS = {
  ar: (q) => `ابحث عن فرص عمل حقيقية لـ "${q}". قدم قائمة منظمة تشمل: اسم الوظيفة، الشركة، الموقع، رابط التقديم (LinkedIn/Glassdoor/Indeed/بوابات عمل محلية)، والمهارات المطلوبة. قدم 8-10 فرص متنوعة.`,
  en: (q) => `Find real job opportunities for "${q}". Provide an organized list including: job title, company, location, application link (LinkedIn/Glassdoor/Indeed/local job portals), and required skills. Provide 8-10 diverse opportunities.`,
  zh: (q) => `为"${q}"查找真实的工作机会。提供有组织的列表，包括：职位名称、公司、地点、申请链接（LinkedIn/智联招聘/前程无忧/当地招聘网站）和所需技能。提供8-10个多样化的机会。`,
};

const COURSE_PROMPTS = {
  ar: (q) => `ابحث عن أفضل الدورات المجانية في مجال "${q}". قدم قائمة منظمة تشمل: اسم الدورة، المنصة (Coursera/edX/YouTube/Udemy مجاني/إلخ)، الرابط المباشر، المدة، والشهادة إن وجدت. قدم 8-10 دورات متنوعة.`,
  en: (q) => `Find the best free courses in "${q}". Provide an organized list including: course name, platform (Coursera/edX/YouTube/free Udemy/etc), direct link, duration, and certificate if available. Provide 8-10 diverse courses.`,
  zh: (q) => `查找"${q}"领域最好的免费课程。提供有组织的列表，包括：课程名称、平台（Coursera/edX/YouTube/免费Udemy等）、直接链接、时长和证书（如有）。提供8-10个多样化的课程。`,
};

const VIDEO_PROMPTS = {
  ar: (q) => `ابحث عن أفضل فيديوهات YouTube الداعمة والتحفيزية حول "${q}" لمن فقدوا وظائفهم. قدم قائمة تشمل: عنوان الفيديو، القناة، الرابط المباشر، المدة التقريبية، وسبب التوصية به. قدم 6-8 فيديوهات متنوعة بالعربية والإنجليزية.`,
  en: (q) => `Find the best supportive and motivational YouTube videos about "${q}" for people who lost their jobs. Provide a list including: video title, channel, direct link, approximate duration, and reason for recommendation. Provide 6-8 diverse videos.`,
  zh: (q) => `查找关于"${q}"最好的支持性和激励性YouTube视频，适合失业人员。提供列表，包括：视频标题、频道、直接链接、大约时长和推荐原因。提供6-8个多样化的视频。`,
};

async function callClaude(system, userMsg, useSearch = false) {
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system,
    messages: [{ role: "user", content: userMsg }],
  };
  if (useSearch) body.tools = [{ type: "web_search_20250305", name: "web_search" }];
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data.content?.map((b) => b.text || "").filter(Boolean).join("") || "...";
}

const TABS = ["chat", "cv", "courses", "jobs", "videos"];

// Motivational messages cycling
const MOTIVATIONS = {
  ar: [
    "💪 كل نهاية هي بداية جديدة أجمل",
    "🌟 مواهبك أكبر من أي وظيفة",
    "🚀 أفضل فصول حياتك لم تُكتب بعد",
    "❤️ أنت لست وحدك في هذه الرحلة",
    "✨ الصبر مفتاح الفرج",
  ],
  en: [
    "💪 Every ending is a beautiful new beginning",
    "🌟 Your talents are bigger than any job",
    "🚀 Your best chapters haven't been written yet",
    "❤️ You are not alone on this journey",
    "✨ Patience unlocks every door",
  ],
  zh: [
    "💪 每一个结束都是美好的新开始",
    "🌟 您的才能比任何工作都要大",
    "🚀 您最好的篇章还没有写出来",
    "❤️ 在这段旅程中您并不孤单",
    "✨ 耐心是开启每扇门的钥匙",
  ],
};

export default function CareerHopeAgent() {
  const [lang, setLang] = useState("ar");
  const L = LANGS[lang];
  const [tab, setTab] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [cvText, setCvText] = useState("");
  const [cvResult, setCvResult] = useState("");
  const [cvLoading, setCvLoading] = useState(false);
  const [cvFileLoading, setCvFileLoading] = useState(false);
  const [cvFileName, setCvFileName] = useState("");
  const [jobQuery, setJobQuery] = useState("");
  const [jobResult, setJobResult] = useState("");
  const [jobLoading, setJobLoading] = useState(false);
  const [courseQuery, setCourseQuery] = useState("");
  const [courseResult, setCourseResult] = useState("");
  const [courseLoading, setCourseLoading] = useState(false);
  const [videoQuery, setVideoQuery] = useState("");
  const [videoResult, setVideoResult] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [motivIdx, setMotivIdx] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const cvRef = useRef(null);
  const fileInputRef = useRef(null);
  const jobRef = useRef(null);
  const courseRef = useRef(null);
  const videoRef = useRef(null);

  // Init greeting
  useEffect(() => {
    setMessages([{ role: "assistant", content: L.greeting, id: "init" }]);
  }, [lang]);

  // Motivational ticker
  useEffect(() => {
    const t = setInterval(() => setMotivIdx((i) => (i + 1) % MOTIVATIONS[lang].length), 4000);
    return () => clearInterval(t);
  }, [lang]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, chatLoading]);

  // Crisis keywords detection
  const CRISIS_KEYWORDS = {
    ar: ["انتحار", "أنهي حياتي", "أقتل نفسي", "لا أريد العيش", "أموت", "لا فائدة من حياتي", "الحياة لا تستحق", "إيذاء نفسي", "أؤذي نفسي", "أختفي للأبد"],
    en: ["suicide", "kill myself", "end my life", "don't want to live", "want to die", "hurt myself", "self-harm", "no reason to live", "disappear forever", "not worth living"],
    zh: ["自杀", "结束生命", "不想活", "伤害自己", "活着没意义", "想死", "自残", "消失"],
  };

  const HARM_OTHERS_KEYWORDS = {
    ar: ["أقتله", "أؤذيه", "أضربه", "أنتقم", "سأؤذي", "سأقتل", "أريد إيذاء", "أشعل النار", "أخربها", "أدمر", "تهديد", "سلاح", "سأضرب", "أعاقبه", "أضر بهم", "أنتقم منه", "أكشف سره", "أفضحه"],
    en: ["kill him", "kill her", "hurt them", "hurt him", "hurt her", "attack", "revenge on", "threaten", "destroy them", "make them pay", "bomb", "weapon", "stab", "beat him", "beat her", "ruin them", "expose them", "harass"],
    zh: ["杀他", "伤害他", "报复", "攻击", "威胁", "破坏", "武器", "炸弹", "骚扰他", "毁了他"],
  };

  const HARM_OTHERS_RESPONSE = {
    ar: `⚠️ أفهم أنك تمر بمشاعر غضب شديدة — وهذا طبيعي تماماً بعد تجربة صعبة كفقدان الوظيفة.

لكنني لا أستطيع دعم أي فكرة تؤذي شخصاً آخر، لأن ذلك سيضرك أنت أولاً قانونياً واجتماعياً ونفسياً.

💡 الغضب طاقة — دعنا نحوّلها لشيء يفيدك:
• تحدث عن مشاعرك بحرية هنا
• ضع طاقتك في البحث عن فرصة أفضل
• تذكر: أفضل انتقام هو نجاحك أنت

كيف يمكنني مساعدتك للمضي للأمام؟ 💙`,
    en: `⚠️ I understand you're feeling intense anger right now — that's completely natural after a difficult experience like job loss.

However, I cannot support any idea that harms another person, because that would hurt you first — legally, socially, and emotionally.

💡 Anger is energy — let's channel it into something that truly helps you:
• Talk freely about your feelings here
• Put your energy into finding a better opportunity
• Remember: the best revenge is your own success

How can I help you move forward? 💙`,
    zh: `⚠️ 我理解您现在感到强烈的愤怒——在失业这样的艰难经历之后，这是完全自然的。

但是，我无法支持任何伤害他人的想法，因为这首先会伤害您自己——在法律、社会和情感层面。

💡 愤怒是能量——让我们把它转化为真正帮助您的事情：
• 在这里自由地谈论您的感受
• 把精力放在寻找更好的机会上
• 记住：最好的报复就是您自己的成功

我怎么帮您前进？ 💙`,
  };

  const hasHarmOthersKeyword = (text) => {
    const lower = text.toLowerCase();
    const keywords = [...(HARM_OTHERS_KEYWORDS.ar || []), ...(HARM_OTHERS_KEYWORDS.en || []), ...(HARM_OTHERS_KEYWORDS.zh || [])];
    return keywords.some(k => lower.includes(k));
  };

  const CRISIS_RESPONSE = {
    ar: `💙 أنا هنا معك، وأنا قلق عليك جداً الآن.

حياتك ثمينة جداً، وما تمر به الآن مؤلم — لكنه مؤقت. فقدان الوظيفة صعب، لكنك أقوى مما تتخيل.

أرجوك تواصل الآن مع متخصص يمكنه مساعدتك:

🇪🇬 مصر: 08008880700 (مجاني ٢٤/٧)
🇸🇦 السعودية: 920033360
🌍 دولي: befrienders.org

أنت لست وحدك. أنا هنا، والمساعدة موجودة. 💙`,
    en: `💙 I'm here with you, and I'm very concerned about you right now.

Your life is incredibly valuable. What you're going through is painful — but it is temporary. Losing a job is hard, but you are stronger than you know.

Please reach out to a professional who can help you now:

🇺🇸 USA: 988 (Suicide & Crisis Lifeline — free, 24/7)
🇬🇧 UK: 116 123 (Samaritans)
🌍 International: befrienders.org

You are not alone. I'm here, and help is available. 💙`,
    zh: `💙 我在这里陪伴您，我现在非常担心您。

您的生命非常宝贵。您现在经历的一切很痛苦——但这是暂时的。失业很艰难，但您比您想象的更坚强。

请立即联系可以帮助您的专业人士：

🇨🇳 中国：400-161-9995（24/7免费）
🌍 国际：befrienders.org

您并不孤单。我在这里，帮助触手可及。 💙`,
  };

  const hasCrisisKeyword = (text) => {
    const lower = text.toLowerCase();
    const keywords = [...(CRISIS_KEYWORDS.ar || []), ...(CRISIS_KEYWORDS.en || []), ...(CRISIS_KEYWORDS.zh || [])];
    return keywords.some(k => lower.includes(k));
  };

  const sendChat = async () => {
    const text = input.trim();
    if (!text || chatLoading) return;
    const userMsg = { role: "user", content: text, id: Date.now() };
    setMessages((p) => [...p, userMsg]);
    setInput("");

    // 🚨 Crisis detection — immediate safe response
    if (hasCrisisKeyword(text)) {
      setMessages((p) => [...p, {
        role: "assistant",
        content: CRISIS_RESPONSE[lang] || CRISIS_RESPONSE.ar,
        id: Date.now(),
        crisis: true,
      }]);
      return;
    }

    // 🛑 Harm-to-others detection — redirect with empathy
    if (hasHarmOthersKeyword(text)) {
      setMessages((p) => [...p, {
        role: "assistant",
        content: HARM_OTHERS_RESPONSE[lang] || HARM_OTHERS_RESPONSE.ar,
        id: Date.now(),
        harmOthers: true,
      }]);
      return;
    }

    setChatLoading(true);
    const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPTS[lang],
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map((b) => b.text || "").join("") || "...";
      setMessages((p) => [...p, { role: "assistant", content: reply, id: Date.now() }]);
    } catch { setMessages((p) => [...p, { role: "assistant", content: "⚠️ Connection error. Please try again.", id: Date.now() }]); }
    setChatLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const enhanceCV = async () => {
    if (!cvText.trim() || cvLoading) return;
    setCvLoading(true); setCvResult("");
    try { setCvResult(await callClaude("You are a professional HR and resume expert.", CV_PROMPTS[lang](cvText))); }
    catch { setCvResult("⚠️ Error. Please try again."); }
    setCvLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCvFileLoading(true);
    setCvFileName(file.name);
    setCvText("");
    try {
      const ext = file.name.split(".").pop().toLowerCase();
      if (ext === "txt") {
        const text = await file.text();
        setCvText(text);
      } else if (ext === "pdf") {
        // Read PDF as base64 and send to Claude vision
        const base64 = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result.split(",")[1]);
          r.onerror = rej;
          r.readAsDataURL(file);
        });
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{
              role: "user",
              content: [
                { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
                { type: "text", text: "Extract all the text content from this resume/CV document. Return only the raw text content, preserving structure as much as possible." }
              ]
            }]
          })
        });
        const data = await response.json();
        const extracted = data.content?.map(b => b.text || "").join("") || "";
        setCvText(extracted);
      } else if (ext === "docx" || ext === "doc") {
        // For docx, use mammoth via dynamic import simulation
        const arrayBuffer = await file.arrayBuffer();
        // Use mammoth from CDN via script injection
        if (!window.mammoth) {
          await new Promise((res, rej) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
            s.onload = res; s.onerror = rej;
            document.head.appendChild(s);
          });
        }
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        setCvText(result.value || "");
      } else {
        const text = await file.text();
        setCvText(text);
      }
    } catch (err) {
      setCvText("⚠️ تعذّر قراءة الملف. حاول نسخ المحتوى يدوياً. / Could not read file. Please paste content manually.");
    }
    setCvFileLoading(false);
    e.target.value = "";
  };

  const findJobs = async () => {
    if (!jobQuery.trim() || jobLoading) return;
    setJobLoading(true); setJobResult("");
    try { setJobResult(await callClaude("You are a job search expert with web access.", JOB_PROMPTS[lang](jobQuery), true)); }
    catch { setJobResult("⚠️ Error. Please try again."); }
    setJobLoading(false);
  };

  const findCourses = async () => {
    if (!courseQuery.trim() || courseLoading) return;
    setCourseLoading(true); setCourseResult("");
    try { setCourseResult(await callClaude("You are an expert in online education and free resources.", COURSE_PROMPTS[lang](courseQuery), true)); }
    catch { setCourseResult("⚠️ Error. Please try again."); }
    setCourseLoading(false);
  };

  const findVideos = async () => {
    if (!videoQuery.trim() || videoLoading) return;
    setVideoLoading(true); setVideoResult("");
    try { setVideoResult(await callClaude("You are an expert in motivational content and YouTube resources.", VIDEO_PROMPTS[lang](videoQuery), true)); }
    catch { setVideoResult("⚠️ Error. Please try again."); }
    setVideoLoading(false);
  };

  // Styles
  const colors = {
    bg: "#e8f4fd",
    card: "rgba(255,255,255,0.92)",
    accent: "#2980b9",
    gold: "#e67e22",
    green: "#27ae60",
    text: "#1a3a4a",
    muted: "#7f8c8d",
    border: "rgba(41,128,185,0.18)",
    inputBg: "rgba(255,255,255,0.85)",
  };

  const ResultBox = ({ content }) => (
    <div style={{
      marginTop: 16, padding: 20, borderRadius: 12,
      background: "rgba(255,255,255,0.95)", border: "1px solid rgba(41,128,185,0.18)",
      boxShadow: "0 2px 12px rgba(41,128,185,0.08)",
      fontSize: 14, lineHeight: 1.8, color: colors.text,
      whiteSpace: "pre-wrap", direction: lang === "ar" ? "rtl" : "ltr",
      maxHeight: 420, overflowY: "auto",
    }}>{content}</div>
  );

  // Input handled via direct refs below

  const Btn = ({ onClick, disabled, children, color = colors.accent }) => (
    <button onClick={onClick} disabled={disabled} style={{
      marginTop: 12, padding: "12px 24px", borderRadius: 10,
      background: disabled ? "rgba(59,130,246,0.2)" : color,
      border: "none", color: "#fff", fontSize: 14, fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer", letterSpacing: 0.5,
      transition: "opacity 0.2s", opacity: disabled ? 0.5 : 1,
    }}>{children}</button>
  );

  return (
    <div style={{
      minHeight: "100vh", background: colors.bg,
      fontFamily: lang === "zh" ? "'Microsoft YaHei', sans-serif" : "'Segoe UI', Tahoma, sans-serif",
      color: colors.text, direction: L.dir,
      backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(41,128,185,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(26,173,173,0.06) 0%, transparent 60%)",
    }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ticker { 0% { opacity:0; transform:translateY(8px); } 15%,85% { opacity:1; transform:translateY(0); } 100% { opacity:0; transform:translateY(-8px); } }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(59,130,246,0.3); border-radius:3px; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #1a6fa8 0%, #2196c4 50%, #1aadad 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "0 20px",
        boxShadow: "0 2px 20px rgba(41,128,185,0.18)",
      }}>
        {/* Top bar */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 0", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Professional Logo Mark */}
          <div style={{ flexShrink: 0 }}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoBlue" x1="0" y1="0" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb"/>
                  <stop offset="1" stopColor="#0ea5e9"/>
                </linearGradient>
                <linearGradient id="logoGreen" x1="0" y1="0" x2="58" y2="58" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#059669"/>
                  <stop offset="1" stopColor="#10b981"/>
                </linearGradient>
              </defs>

              {/* Outer rounded square — dark navy bg */}
              <rect width="58" height="58" rx="14" fill="#0f172a"/>
              <rect x="0.5" y="0.5" width="57" height="57" rx="13.5" stroke="#2563eb" strokeOpacity="0.4"/>

              {/* Briefcase body */}
              <rect x="12" y="24" width="34" height="22" rx="3" fill="url(#logoBlue)" opacity="0.9"/>

              {/* Briefcase handle */}
              <path d="M22 24v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

              {/* Center clasp line */}
              <line x1="12" y1="34" x2="46" y2="34" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
              <rect x="26" y="31" width="6" height="6" rx="1.5" fill="white" opacity="0.35"/>

              {/* Upward arrow — growth/hope */}
              <path d="M29 20 L29 10 M29 10 L25 14 M29 10 L33 14"
                stroke="url(#logoGreen)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

              {/* Small dot sparkle top-right */}
              <circle cx="45" cy="13" r="2.5" fill="#10b981" opacity="0.85"/>
              <circle cx="45" cy="13" r="4" fill="#10b981" opacity="0.2"/>
            </svg>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1, color: "#ffffff",
              textShadow: "0 1px 4px rgba(0,0,0,0.18)",
            }}>{L.title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{L.subtitle}</div>
          </div>

          {/* Lang switcher */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 18, opacity: 0.6 }}>🌐</span>
            {[
              ["ar", "🇸🇦", "العربية"],
              ["en", "🇺🇸", "English"],
              ["zh", "🇨🇳", "中文"],
            ].map(([l, flag, name]) => (
              <button key={l} onClick={() => setLang(l)} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 2, padding: "6px 10px", borderRadius: 10, border: "1px solid",
                borderColor: lang === l ? "white" : "rgba(255,255,255,0.35)",
                background: lang === l ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: lang === l ? "0 0 10px rgba(255,255,255,0.2)" : "none",
              }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{flag}</span>
                <span style={{
                  fontSize: 10, fontWeight: lang === l ? 700 : 400,
                  color: lang === l ? "#ffffff" : "rgba(255,255,255,0.7)",
                  letterSpacing: 0.3,
                }}>{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Motivational ticker */}
        <div style={{
          maxWidth: 900, margin: "0 auto", paddingBottom: 10,
          textAlign: "center", fontSize: 13, color: colors.gold,
          animation: "ticker 4s ease-in-out infinite", fontWeight: 600,
        }}>{MOTIVATIONS[lang][motivIdx]}</div>

        {/* Tabs */}
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", paddingBottom: 0 }}>
          {L.tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              padding: "10px 16px", border: "none", cursor: "pointer",
              background: tab === i ? "rgba(255,255,255,0.18)" : "transparent",
              color: tab === i ? "#ffffff" : "rgba(255,255,255,0.65)",
              borderBottom: tab === i ? "2px solid #ffffff" : "2px solid transparent",
              fontSize: 13, fontWeight: tab === i ? 700 : 400,
              whiteSpace: "nowrap", transition: "all 0.2s",
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>

        {/* ── CHAT TAB ── */}
        {tab === 0 && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 220px)" }}>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, paddingBottom: 12 }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  display: "flex", gap: 10, animation: "fadeUp 0.3s ease",
                  flexDirection: msg.role === "user" ? (lang === "ar" ? "row" : "row-reverse") : (lang === "ar" ? "row-reverse" : "row"),
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    background: msg.role === "user" ? "rgba(59,130,246,0.2)" : "rgba(16,185,129,0.2)",
                    border: `1px solid ${msg.role === "user" ? "rgba(59,130,246,0.4)" : "rgba(16,185,129,0.4)"}`,
                  }}>
                    {msg.role === "user" ? "👤" : (
                      <svg width="20" height="20" viewBox="0 0 58 58" fill="none">
                        <rect width="58" height="58" rx="14" fill="#0f172a"/>
                        <rect x="12" y="24" width="34" height="22" rx="3" fill="#2563eb" opacity="0.9"/>
                        <path d="M22 24v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                        <path d="M29 20 L29 10 M29 10 L25 14 M29 10 L33 14" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="45" cy="13" r="2.5" fill="#10b981" opacity="0.85"/>
                      </svg>
                    )}
                  </div>
                  <div style={{
                    maxWidth: "75%", padding: "12px 16px", borderRadius: 14,
                    background: msg.crisis ? "rgba(239,68,68,0.08)" : msg.harmOthers ? "rgba(251,146,60,0.08)" : msg.role === "user" ? "rgba(41,128,185,0.13)" : "rgba(255,255,255,0.88)",
                    border: `1px solid ${msg.crisis ? "rgba(239,68,68,0.35)" : msg.harmOthers ? "rgba(251,146,60,0.4)" : msg.role === "user" ? "rgba(41,128,185,0.28)" : "rgba(41,128,185,0.12)"}`,
                    boxShadow: "0 1px 6px rgba(41,128,185,0.07)",
                    fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap",
                    direction: lang === "ar" ? "rtl" : "ltr",
                  }}>{msg.content}</div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", gap: 10, flexDirection: lang === "ar" ? "row-reverse" : "row" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "10px", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 58 58" fill="none">
                      <rect width="58" height="58" rx="14" fill="#0f172a"/>
                      <rect x="12" y="24" width="34" height="22" rx="3" fill="#2563eb" opacity="0.9"/>
                      <path d="M22 24v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M29 20 L29 10 M29 10 L25 14 M29 10 L33 14" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="45" cy="13" r="2.5" fill="#10b981" opacity="0.85"/>
                    </svg>
                  </div>
                  <div style={{ padding: "14px 18px", borderRadius: 14, background: "rgba(22,32,46,0.9)", border: `1px solid ${colors.border}`, display: "flex", gap: 6, alignItems: "center" }}>
                    {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, borderRadius:"50%", background: colors.green, animation:`shimmer 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            {/* Chat input */}
            <div style={{ display: "flex", gap: 10, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                placeholder={L.placeholder} style={{
                  flex: 1, padding: "12px 16px", borderRadius: 12,
                  background: colors.inputBg, border: `1px solid ${colors.border}`,
                  color: colors.text, fontSize: 14, fontFamily: "inherit",
                  outline: "none", direction: lang === "ar" ? "rtl" : "ltr",
                }}
              />
              <button onClick={sendChat} disabled={chatLoading || !input.trim()} style={{
                padding: "12px 20px", borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #3b82f6, #10b981)",
                color: "#fff", fontSize: 16, cursor: chatLoading || !input.trim() ? "not-allowed" : "pointer",
                opacity: chatLoading || !input.trim() ? 0.5 : 1,
              }}>➤</button>
            </div>
          </div>
        )}

        {/* ── CV TAB ── */}
        {tab === 1 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a6fa8", marginBottom: 16 }}>📄 {L.cvTitle}</h2>

            {/* File Upload Zone */}
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload} style={{ display: "none" }} />
            <div
              onClick={() => !cvFileLoading && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { fileInputRef.current.files = e.dataTransfer.files; handleFileUpload({ target: { files: e.dataTransfer.files } }); } }}
              style={{
                border: `2px dashed ${cvFileLoading ? colors.green : "rgba(59,130,246,0.4)"}`,
                borderRadius: 14, padding: "24px 16px", textAlign: "center",
                cursor: cvFileLoading ? "wait" : "pointer",
                background: cvFileLoading ? "rgba(16,185,129,0.05)" : "rgba(59,130,246,0.04)",
                transition: "all 0.2s", marginBottom: 16,
              }}
            >
              {cvFileLoading ? (
                <div>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                  <div style={{ color: colors.green, fontWeight: 700 }}>{L.cvUploading}</div>
                  <div style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>{cvFileName}</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📄</div>
                  <div style={{ color: "#1a6fa8", fontWeight: 700, fontSize: 15 }}>{L.cvUpload}</div>
                  <div style={{ color: colors.muted, fontSize: 12, marginTop: 6 }}>{L.cvUploadHint}</div>
                  {cvFileName && (
                    <div style={{ marginTop: 8, color: colors.green, fontSize: 12, fontWeight: 600 }}>
                      ✅ {cvFileName}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div style={{ textAlign: "center", color: colors.muted, fontSize: 12, marginBottom: 12 }}>
              {L.cvOrText}
            </div>

            {/* Manual textarea */}
            <textarea ref={cvRef} value={cvText} onChange={(e) => setCvText(e.target.value)}
              placeholder={L.cvPlaceholder} rows={5}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "white", border: "1px solid rgba(41,128,185,0.22)",
                color: colors.text, fontSize: 14, fontFamily: "inherit",
                outline: "none", resize: "vertical",
                direction: lang === "ar" ? "rtl" : "ltr", boxSizing: "border-box",
                boxShadow: "0 1px 4px rgba(41,128,185,0.07)",
              }}
            />
            <Btn onClick={enhanceCV} disabled={cvLoading || !cvText.trim() || cvFileLoading} color={colors.green}>
              {cvLoading ? L.cvLoading : L.cvBtn}
            </Btn>
            {cvResult && <ResultBox content={cvResult} />}
          </div>
        )}

        {/* ── COURSES TAB ── */}
        {tab === 2 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a6fa8", marginBottom: 16 }}>🎓 {L.coursesBtn}</h2>
            <label style={{ fontSize: 13, color: "#2980b9", fontWeight: 600, display: "block", marginBottom: 8 }}>{L.coursesLabel}</label>
            <input ref={courseRef} value={courseQuery} onChange={(e) => setCourseQuery(e.target.value)}
              placeholder={L.coursesPlaceholder}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "white", border: "1px solid rgba(41,128,185,0.25)",
                color: colors.text, fontSize: 14, fontFamily: "inherit",
                outline: "none", direction: lang === "ar" ? "rtl" : "ltr",
                boxShadow: "0 1px 6px rgba(41,128,185,0.08)", boxSizing: "border-box",
              }}
            />
            <Btn onClick={findCourses} disabled={courseLoading || !courseQuery.trim()} color={colors.gold}>
              {courseLoading ? L.loading : L.coursesBtn}
            </Btn>
            {courseResult && <ResultBox content={courseResult} />}
          </div>
        )}

        {/* ── JOBS TAB ── */}
        {tab === 3 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a6fa8", marginBottom: 16 }}>💼 {L.jobBtn}</h2>
            <label style={{ fontSize: 13, color: "#2980b9", fontWeight: 600, display: "block", marginBottom: 8 }}>{L.jobLabel}</label>
            <input ref={jobRef} value={jobQuery} onChange={(e) => setJobQuery(e.target.value)}
              placeholder={L.jobPlaceholder}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "white", border: "1px solid rgba(41,128,185,0.25)",
                color: colors.text, fontSize: 14, fontFamily: "inherit",
                outline: "none", direction: lang === "ar" ? "rtl" : "ltr",
                boxShadow: "0 1px 6px rgba(41,128,185,0.08)", boxSizing: "border-box",
              }}
            />
            <Btn onClick={findJobs} disabled={jobLoading || !jobQuery.trim()}>
              {jobLoading ? L.loading : L.jobBtn}
            </Btn>
            {jobResult && <ResultBox content={jobResult} />}
          </div>
        )}

        {/* ── VIDEOS TAB ── */}
        {tab === 4 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1a6fa8", marginBottom: 16 }}>🎥 {L.videoBtn}</h2>
            <label style={{ fontSize: 13, color: "#2980b9", fontWeight: 600, display: "block", marginBottom: 8 }}>{L.videoLabel}</label>
            <input ref={videoRef} value={videoQuery} onChange={(e) => setVideoQuery(e.target.value)}
              placeholder={L.videoPlaceholder}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "white", border: "1px solid rgba(41,128,185,0.25)",
                color: colors.text, fontSize: 14, fontFamily: "inherit",
                outline: "none", direction: lang === "ar" ? "rtl" : "ltr",
                boxShadow: "0 1px 6px rgba(41,128,185,0.08)", boxSizing: "border-box",
              }}
            />
            <Btn onClick={findVideos} disabled={videoLoading || !videoQuery.trim()} color="#8b5cf6">
              {videoLoading ? L.loading : L.videoBtn}
            </Btn>
            {videoResult && <ResultBox content={videoResult} />}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "16px", marginTop: 20,
        borderTop: `1px solid ${colors.border}`,
        fontSize: 11, color: colors.muted, letterSpacing: 0.5,
      }}>
        {L.copyright} &nbsp;|&nbsp; إنشاء: 25/04/2026 — Unauthorized reproduction prohibited
      </div>
    </div>
  );
}

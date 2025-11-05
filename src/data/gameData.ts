export interface Question {
  id: number;
  value: number;
  text: string;
  answer: string;
  used: boolean;
}

export interface Category {
  id: number;
  name: string;
  questions: Question[];
}

export interface Team {
  name: string;
  score: number;
  helps: {
    mute: { available: boolean; active: boolean };
    double: { available: boolean; active: boolean };
    friend: { available: boolean; active: boolean };
  };
}

/* قاعدة بيانات هادئة وواضحة: 5 أسئلة فقط لكل فئة، 600 → 200 */
export const initialCategories: Category[] = [
  {
    id: 1,
    name: "البرمجة",
    questions: [
      { id: 1, value: 200, text: "ما هو المتغير؟", answer: "مكان في الذاكرة نخزن فيه قيمة", used: false },
      { id: 2, value: 200, text: "ما الفرق بين for و while؟", answer: "الـ for للعدد المعروف، while للتكرار المشروط", used: false },
      { id: 3, value: 400, text: "ما هو الكائن (Object)؟", answer: "بنية فيها خصائص ووظائف", used: false },
      { id: 4, value: 400, text: "ما هو الـ API؟", answer: "واجهة للتواصل بين البرامج", used: false },
      { id: 5, value: 600, text: "اشرح مفهوم OOP بإيجاز", answer: "تنظيم الكود في كائنات تدعم الوراثة والتغليف", used: false },
      { id: 6, value: 600, text: "ما هو الـ Framework؟", answer: "هيكل عمل لتسهيل تطوير التطبيقات", used: false },
    ],
  },
  {
    id: 2,
    name: "الشبكات",
    questions: [
      { id: 1, value: 200, text: "ما هو عنوان IP؟", answer: "معرّف رقمي للجهاز على الشبكة", used: false },
      { id: 2, value: 200, text: "ما وظيفة الـ DNS؟", answer: "تحويل أسماء النطاقات إلى عناوين IP", used: false },
      { id: 3, value: 400, text: "ما الفرق بين LAN و WAN؟", answer: "LAN محلية، WAN واسعة", used: false },
      { id: 4, value: 400, text: "ما هو الـ Router؟", answer: "جهاز يوجّه الترافيك بين الشبكات", used: false },
      { id: 5, value: 600, text: "اشرح بإيجاز HTTPS", answer: "HTTP مع تشفير TLS لحماية البيانات", used: false },
      { id: 6, value: 600, text: "ما هو الـ Subnet Mask؟", answer: "يحدد جزء} الشبكة من العنوان", used: false },
    ],
  },
  {
    id: 3,
    name: "الذكاء الاصطناعي",
    questions: [
      { id: 1, value: 200, text: "ما هو الـ AI؟", answer: "جعل الحاسوب يؤدي مهام شبيهة بالإنسان", used: false },
      { id: 2, value: 200, text: "ما هو الـ Model؟", answer: "تمثيل رياضي متعلم من البيانات", used: false },
      { id: 3, value: 400, text: "ما الفرق بين التدريب والاختبار؟", answer: "التدريب للتعلّم، الاختبار لقياس الدقة", used: false },
      { id: 4, value: 400, text: "ما هي الـ Dataset؟", answer: "مجموعة بيانات للتدريب أو التقييم", used: false },
      { id: 5, value: 600, text: "اذكري مثال على AI في الحياة اليومية", answer: "المساعدات الصوتية أو التوصيات", used: false },
      { id: 6, value: 600, text: "ما هو التعلم العميق؟", answer: "شبكات عصبية متعددة الطبقات", used: false },
    ],
  },
  {
    id: 4,
    name: "الأمن السيبراني",
    questions: [
      { id: 1, value: 200, text: "ما هو الجدار الناري؟", answer: "آلية لتصفية الترافيك", used: false },
      { id: 2, value: 200, text: "ما هو التصيّد؟", answer: "خداع المستخدم للحصول على بياناته", used: false },
      { id: 3, value: 400, text: "ما هو التشفير؟", answer: "تحويل البيانات لشكل غير مقروء", used: false },
      { id: 4, value: 400, text: "اذكري نوعين من الهجمات", answer: "DoS, MITM, Brute Force", used: false },
      { id: 5, value: 600, text: "ما الفرق بين الأمن المادي والرقمي؟", answer: "المادي يحمي الأجهزة، الرقمي يحمي البيانات", used: false },
      { id: 6, value: 600, text: "ما هو الـ VPN؟", answer: "شبكة خاصة افتراضية لتأمين الاتصال", used: false },
    ],
  },
  {
    id: 5,
    name: "قواعد البيانات",
    questions: [
      { id: 1, value: 200, text: "SQL؟", answer: "لغة استعلام بنيوية", used: false },
      { id: 2, value: 200, text: "SQL vs NoSQL؟", answer: "مخطط ثابت مقابل مرن", used: false },
      { id: 3, value: 400, text: "فهرسة؟", answer: "تسريع الاستعلام", used: false },
      { id: 4, value: 400, text: "ACID؟", answer: "اتومية، اتساق، عزل، ديمومة", used: false },
      { id: 5, value: 600, text: "Normalization؟", answer: "تقليل التكرار", used: false },
      { id: 6, value: 600, text: "JOIN أنواع؟", answer: "INNER, LEFT, RIGHT, FULL", used: false },
    ],
  },

  // 6) نظم التشغيل (جديدة)
  {
    id: 6,
    name: "نظم التشغيل",
    questions: [
      { id: 1, value: 200, text: "Kernel؟", answer: "نواة النظام", used: false },
      { id: 2, value: 200, text: "Process vs Thread؟", answer: "عملية مقابل خيط", used: false },
      { id: 3, value: 400, text: "Concurrency؟", answer: "تشغيل متزامن للمهام", used: false },
      { id: 4, value: 400, text: "Virtual Memory؟", answer: "ذاكرة افتراضية", used: false },
      { id: 5, value: 600, text: "Scheduling؟", answer: "جدولة العمليات", used: false },
      { id: 6, value: 600, text: "Deadlock؟", answer: "حالة توقف العمليات", used: false },
    ],
  },
  // PTI 
  {
    id: 7,
    name: "PTI",
    questions: [
      { id: 1, value: 100, text: "ما هو PTI؟", answer: "اختصار لـ 'Proactive Threat Intelligence'", used: false },
    ],
  },
];
